import { Fragment, useEffect, useLayoutEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowRight, ArrowUpRight, Bot, Calculator, Check, ChevronLeft, ChevronRight, Clock, Link2, Mail, MapPin, Menu,
  MessageCircle, MessagesSquare, Phone, Plus, ShieldCheck, Users, X,
} from "lucide-react";
import type { BusinessTemplate, Lang, LocalizedContent, TourOffer } from "@/templates/types";
import { pick } from "@/lib/i18n";
import { whatsappLink } from "@/sites/shared/whatsapp";
import { useReturnFocus } from "@/sites/shared/return-focus";
import { SECRETARIA_LANGUAGES, SecretariaCard } from "@/sites/shared/secretaria-card";
import { secretaryToken } from "@/sites/shared/secretary-converse";
import { scrollToEl, useScrollPause, useSiteMotion } from "./motion";
import { usd } from "./quote";
import { QuoteBuilder, QuoteDialog } from "./quote-builder";
import { ConciergeChat, ConciergeDock } from "./concierge";
import { BTN_GHOST, BTN_SUN, EXTERNAL, Photo, PRESS, siteVars, useScrolledPast, useSectionInView } from "./ui";

/*
  Tamarindo Tours Discovery: a one-page site for a private boat tour operator.
  Navy and teal from the logo, sunset orange for the main actions, sand for
  the light sections; Instrument Serif headlines over Inter. Motion lives in
  motion.ts (GSAP) and only moves what React draws.

  Honesty rules this page keeps:
  - Every fact, price and policy comes from the template, which comes from the
    business. Ratings link to where they can be checked; no quotes are shown.
  - The request form and the Secretaria say "request": Willy confirms each
    date. Nothing here claims a booking (the site cannot see his calendar).
  - Unpublished (no plwSiteId) the form says it is a preview and sends nothing.
*/

const FONT = "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap";
const TRIPADVISOR = "https://www.tripadvisor.com/Attraction_Review-g309253-d14215079-Reviews-Tamarindo_Tours_Discovery-Tamarindo_Province_of_Guanacaste.html";
const YOUTUBE = "https://www.youtube.com/channel/UCSNggXGbVniG1N4eE21B-4w";
const MAPS = "https://www.google.com/maps/search/?api=1&query=El+Chiringuito+Playa+Tamarindo+Costa+Rica";


/** The quote builder and the chat, open from anywhere on the page. */
type Trip = { openQuote: (tour?: number) => void; openChat: () => void };
type Site = { template: BusinessTemplate; t: LocalizedContent; lang: Lang; trip: Trip };

/** A WhatsApp chat with the business, with a first message ready. */
function wa(template: BusinessTemplate, text: string): string {
  return whatsappLink(template.brand, text);
}

/** A heading whose words rise from behind their masks (motion.ts, data-words). */
function Words({ text }: { text: string }) {
  return (
    <span data-words>
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="w inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-top">
            <span className="inline-block">{w}</span>
          </span>
        </Fragment>
      ))}
    </span>
  );
}

/** A number drawn as digit strips that roll to their value (motion.ts, data-odometer). */
function Odometer({ value }: { value: string }) {
  return (
    <>
      <span className="sr-only">{value}</span>
      <span aria-hidden data-odometer className="inline-flex">
        {[...value].map((ch, i) =>
          /\d/.test(ch) ? (
            <span key={i} className="inline-block h-[1.05em] overflow-hidden">
              <span data-digit={ch} className="flex flex-col" style={{ transform: `translateY(-${Number(ch) * 10}%)` }}>
                {"0123456789".split("").map((d) => <span key={d} className="h-[1.05em] leading-[1.05em]">{d}</span>)}
              </span>
            </span>
          ) : (
            <span key={i} className="leading-[1.05em]">{ch}</span>
          ),
        )}
      </span>
    </>
  );
}

function Eyebrow({ children, tone = "sea" }: { children: ReactNode; tone?: "sea" | "teal" | "sun" }) {
  const color = { sea: "text-(--sea)", teal: "text-(--teal)", sun: "text-(--sun)" }[tone];
  return <p className={`tt-eyebrow ${color}`}>{children}</p>;
}

/** The logo is an off-centre round badge on a square: frame just the badge. */
function Logo({ src, size = "size-11" }: { src?: string; size?: string }) {
  if (!src) return null;
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-full bg-white ${size}`}>
      <img src={src} alt="" className="size-full translate-y-[6%] scale-[1.36] object-cover" />
    </span>
  );
}

/** Height of the preview page's notice bar, so the fixed header sits below it. */
function usePreviewBannerHeight(): number {
  const [h, setH] = useState(0);
  useLayoutEffect(() => {
    const bar = document.querySelector<HTMLElement>("[data-preview-banner]");
    if (!bar) return;
    const ro = new ResizeObserver(() => setH(bar.offsetHeight));
    ro.observe(bar);
    return () => ro.disconnect();
  }, []);
  return h;
}

/* ------------------------------------------------------------------ */

function Nav({ template, t, lang, trip, setLang, onJump }: Site & { setLang: (l: Lang) => void; onJump: (e: MouseEvent<HTMLAnchorElement>) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState(false);
  const focus = useReturnFocus();
  useScrollPause(menu);
  const top = usePreviewBannerHeight();
  const { brand } = template;

  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last) > 6) { setHidden(y > last && y > 640); last = y; }
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links = [
    { href: "#tours", label: t.nav.services },
    { href: "#captain", label: t.nav.why },
    { href: "#booking", label: t.nav.process },
    { href: "#gallery", label: pick(lang, "Gallery", "Galería") },
    { href: "#faq", label: t.nav.faq },
  ];
  const book = wa(template, pick(lang, "Hi Willy! I'd like to book a private boat tour.", "¡Hola Willy! Quisiera reservar un tour privado en bote."));

  return (
    <header
      style={{ top }}
      className={`fixed inset-x-0 z-50 transition-[translate,background-color,box-shadow] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
        hidden && !menu ? "-translate-y-full" : ""
      } ${scrolled ? "bg-(--navy)/80 backdrop-blur-xl" : "bg-transparent"} ${scrolled && !hidden ? "shadow-[0_12px_40px_-24px_rgba(0,0,0,.6)]" : ""}`}
    >
      <div className="tt-wrap flex h-[72px] items-center justify-between gap-6 text-white">
        <a href="#top" onClick={onJump} className="flex min-w-0 items-center gap-3">
          <Logo src={brand.logo} />
          <span className="truncate font-semibold tracking-tight max-[440px]:sr-only">{brand.name}</span>
        </a>
        <nav className="hidden items-center gap-7 text-sm text-white/80 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={onJump} className="tt-link py-1 transition-colors hover:text-white">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <LangSwitch lang={lang} setLang={setLang} hidden={!!template.lockedLang} />
          <button type="button" onClick={() => trip.openQuote()} className={`hidden h-11 items-center gap-2 rounded-full bg-(--sun) px-5 text-sm font-semibold text-(--navy) hover:bg-[#F7B567] md:inline-flex ${PRESS}`}>
            {pick(lang, "Get a quote", "Cotizar")}
          </button>
          <Dialog.Root open={menu} onOpenChange={setMenu}>
            <Dialog.Trigger className={`grid size-11 place-items-center rounded-full bg-white/10 hover:bg-white/20 lg:hidden ${PRESS}`} aria-label={pick(lang, "Open menu", "Abrir menú")}>
              <Menu className="size-5" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content
                {...focus}
                aria-describedby={undefined}
                className="tt-site fixed inset-0 z-[80] flex flex-col bg-(--navy) px-6 pb-10 pt-6 text-white data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-500"
                style={siteVars(template)}
              >
                <Dialog.Title className="sr-only">{pick(lang, "Menu", "Menú")}</Dialog.Title>
                <div className="flex items-center justify-between">
                  <Logo src={brand.logo} />
                  <Dialog.Close className={`grid size-11 place-items-center rounded-full bg-white/10 ${PRESS}`} aria-label={pick(lang, "Close menu", "Cerrar menú")}>
                    <X className="size-5" />
                  </Dialog.Close>
                </div>
                <nav className="mt-14 flex flex-col">
                  {links.map((l, i) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={(e) => { setMenu(false); onJump(e); }}
                      style={{ animationDelay: `${120 + i * 60}ms` }}
                      className="tt-display tt-menu-in border-b border-white/10 py-4 text-4xl"
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-auto grid gap-3">
                  <button type="button" onClick={() => { setMenu(false); trip.openQuote(); }} className={`${BTN_SUN} w-full`}>
                    <Calculator className="size-5" /> {pick(lang, "Get my quote", "Cotizar mi tour")}
                  </button>
                  <a href={book} {...EXTERNAL} className={`${BTN_GHOST} w-full`}>
                    <MessageCircle className="size-5" /> {t.hero.cta1}
                  </a>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}

function LangSwitch({ lang, setLang, hidden }: { lang: Lang; setLang: (l: Lang) => void; hidden: boolean }) {
  if (hidden) return null;
  return (
    <div role="group" aria-label={pick(lang, "Language", "Idioma")} className="flex rounded-full bg-white/10 p-1 text-xs font-semibold backdrop-blur">
      {(["en", "es"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`h-8 rounded-full px-3 uppercase ${PRESS} ${lang === l ? "bg-white text-(--navy)" : "text-white/70 hover:text-white"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function Hero({ template, t, lang, trip }: Site) {
  const stats = template.facts?.stats ?? [];
  const ratings = stats.filter((s) => /google|tripadvisor/i.test(s.labelEn));
  return (
    <section id="top" data-hero className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-(--navy) text-white">
      {/* The photo's own edges fade to white: the frame overscales past them. */}
      <div aria-hidden className="absolute inset-0 -z-10 scale-[1.14] max-sm:scale-[1.32]">
        <img
          data-hero-img
          src={template.media?.hero}
          alt=""
          fetchPriority="high"
          className="size-full object-cover"
          style={{ objectPosition: template.media?.heroFocus }}
        />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(6,24,42,.6)_0%,rgba(6,24,42,0)_26%,rgba(6,24,42,0)_42%,rgba(6,24,42,.92)_100%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_60%_at_10%_95%,rgba(6,24,42,.75),transparent_70%)]" />

      <div data-hero-copy className="tt-wrap pb-14 pt-36 sm:pb-20">
        <p data-hero-in className="tt-eyebrow inline-flex rounded-full border border-white/15 bg-(--navy)/35 px-4 py-2 text-white/90 backdrop-blur-md max-sm:text-[10px] max-sm:tracking-[0.14em]">{t.hero.eyebrow}</p>
        <h1 className="tt-display mt-5 max-w-5xl text-[clamp(3.1rem,9vw,8.25rem)] leading-[0.9]">
          <Words text={t.hero.title1} />{" "}
          <em className="block text-(--sun)"><Words text={t.hero.title2} /></em>
        </h1>
        <p data-hero-in className="mt-7 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">{t.hero.subtitle}</p>
        <div data-hero-in className="mt-9 flex flex-col gap-3 sm:flex-row">
          <button type="button" data-magnetic onClick={() => trip.openQuote()} className={BTN_SUN}>
            <Calculator className="size-5" /> {pick(lang, "Get my quote", "Cotizar mi tour")}
          </button>
          <a href={wa(template, pick(lang, "Hi Willy! I'd like to book a private boat tour.", "¡Hola Willy! Quisiera reservar un tour privado en bote."))} {...EXTERNAL} className={BTN_GHOST}>
            <MessageCircle className="size-5" /> {t.hero.cta1}
          </a>
        </div>
        <ul data-hero-in className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/85">
          {t.hero.badges.map((b) => (
            <li key={b} className="flex items-center gap-2"><Check className="size-4 text-(--sun)" /> {b}</li>
          ))}
          {ratings.map((s) => (
            <li key={s.labelEn} className="flex items-center gap-2">
              <span className="text-(--sun)" aria-hidden>★</span>
              {lang === "es" ? s.valueEs ?? s.value : s.value} {lang === "es" ? s.labelEs : s.labelEn}
            </li>
          ))}
        </ul>
      </div>

      <div aria-hidden className="absolute bottom-8 right-[var(--pad)] hidden flex-col items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/60 sm:flex">
        <span className="[writing-mode:vertical-rl]">{pick(lang, "Scroll", "Deslice")}</span>
        <span className="relative h-14 w-px overflow-hidden bg-white/20"><span className="tt-cue absolute inset-x-0 top-0 h-1/3 bg-white" /></span>
      </div>
    </section>
  );
}

function Marquee({ template, lang }: Site) {
  const names = (template.tours ?? []).map((tour) => tour.title[lang]);
  if (names.length === 0) return null;
  const row = (
    <span className="flex shrink-0 items-center">
      {names.map((n) => (
        <Fragment key={n}>
          <span className="tt-display px-6 italic sm:px-10">{n}</span>
          <span className="text-[0.45em] text-(--sun)">✦</span>
        </Fragment>
      ))}
    </span>
  );
  // Decorative: the tour names are listed for real in the next sections.
  return (
    <div aria-hidden className="overflow-hidden border-y border-white/10 bg-(--navy) py-6 text-white/90 sm:py-8">
      <div data-marquee className="flex w-max text-[clamp(2.2rem,5.5vw,4.5rem)] leading-none">{row}{row}</div>
    </div>
  );
}

function Intro({ template, lang }: Site) {
  const stats = template.facts?.stats ?? [];
  return (
    <section id="about" className="bg-(--sand) pb-8 pt-28 text-(--ink) sm:pb-12 sm:pt-40">
      <div className="tt-wrap">
        <Eyebrow>{pick(lang, "Tamarindo, from the water", "Tamarindo, desde el mar")}</Eyebrow>
        <p data-lit className="tt-display mt-8 max-w-6xl text-[clamp(2rem,4.6vw,4.4rem)] leading-[1.06]">
          {pick(
            lang,
            "Tamarindo is best seen from the water. On a private boat with Captain Willy the day is yours: he plans it around the tide, the weather and what your group came to do.",
            "Tamarindo se disfruta más desde el mar. En un bote privado con el Capitán Willy el día es suyo: él lo planea según la marea, el clima y lo que su grupo vino a hacer.",
          ).split(" ").map((w, i) => <Fragment key={i}>{i > 0 && " "}<span className="lw">{w}</span></Fragment>)}
        </p>
        {stats.length > 0 && (
          <dl className="mt-20 grid gap-10 border-t border-(--ink)/10 pt-10 sm:grid-cols-3">
            {stats.map((s) => {
              const label = lang === "es" ? s.labelEs : s.labelEn;
              const value = lang === "es" ? s.valueEs ?? s.value : s.value;
              const link = /tripadvisor/i.test(s.labelEn) ? TRIPADVISOR : null;
              return (
                <div key={s.labelEn}>
                  <dt className="sr-only">{label}</dt>
                  <dd className="tt-display text-7xl leading-none sm:text-8xl"><Odometer value={value} /></dd>
                  <dd className="mt-3 text-[15px] text-(--ink)/65">
                    {link ? <a href={link} {...EXTERNAL} className="tt-link inline-flex items-center gap-1">{label} <ArrowUpRight className="size-3.5" /></a> : label}
                  </dd>
                </div>
              );
            })}
          </dl>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function TourCard({ lang, trip, tour, i, count }: Site & { tour: TourOffer; i: number; count: number }) {
  const title = tour.title[lang];
  return (
    <li className="w-[84vw] shrink-0 snap-start sm:w-[400px] lg:w-[min(440px,34vw)]">
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_1px_0_rgba(10,26,42,.05),0_40px_70px_-45px_rgba(10,26,42,.55)] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] hover:-translate-y-0.5">
        <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-[clamp(170px,25vh,290px)]">
          <Photo
            src={tour.image}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.04]"
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tabular-nums text-(--navy) backdrop-blur">
            {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <h3 className="tt-display text-[2rem] leading-[1.05]">
            <button type="button" onClick={() => trip.openQuote(i)} className="text-left outline-none after:absolute after:inset-0 after:rounded-3xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-(--sea)">
              {title}
            </button>
          </h3>
          <p className="mt-2.5 text-[15px] leading-relaxed text-(--ink)/70">{tour.blurb[lang]}</p>
          <ul className="mt-4 flex flex-wrap gap-2 [@media(max-height:800px)]:lg:hidden">
            {tour.includes[lang].map((x) => (
              <li key={x} className="rounded-full border border-(--ink)/10 px-3 py-1 text-xs text-(--ink)/75">{x}</li>
            ))}
          </ul>
          <div className="mt-auto flex items-end justify-between gap-4 border-t border-(--ink)/10 pt-5">
            <p>
              <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-(--ink)/50">{pick(lang, "Private boat from", "Bote privado desde")}</span>
              <span className="tt-display text-4xl leading-none">{usd(tour.priceUsd, lang)}</span>
              {tour.guests !== undefined && (
                <span className="ml-3 inline-flex items-center gap-1.5 text-sm text-(--ink)/65">
                  <Users className="size-4" /> {pick(lang, `Up to ${tour.guests}`, `Hasta ${tour.guests}`)}
                </span>
              )}
            </p>
            {/* What the card does, drawn as a button; the title's button carries the name. */}
            <span aria-hidden className="flex h-11 shrink-0 items-center gap-2 rounded-full bg-(--navy) pl-4 pr-3 text-sm font-semibold text-white transition-colors duration-300 group-hover:bg-(--sun) group-hover:text-(--navy)">
              {pick(lang, "Get a quote", "Cotizar")} <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </article>
    </li>
  );
}

function Tours(site: Site) {
  const { template, t } = site;
  const tours = template.tours ?? [];
  if (tours.length === 0) return null;
  return (
    <section id="tours" className="bg-(--sand) text-(--ink)">
      {/* The pin wraps [data-pin] in a spacer; this div keeps that out of React's way. */}
      <div>
        <div data-pin className="flex flex-col justify-center gap-10 overflow-hidden py-24 lg:min-h-[100svh] lg:gap-7 lg:pb-8 lg:pt-24">
          <div className="tt-wrap grid items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Eyebrow>{t.nav.services}</Eyebrow>
              <h2 className="tt-display mt-4 text-[clamp(2.6rem,4.4vw,4.25rem)] leading-[0.98]"><Words text={t.services.title} /></h2>
            </div>
            <div className="lg:col-span-5">
              {t.services.blurb && <p className="text-[15px] leading-relaxed text-(--ink)/70">{t.services.blurb}</p>}
              <div aria-hidden className="mt-6 hidden h-px w-full bg-(--ink)/12 lg:block">
                <div data-progress className="h-full origin-left bg-(--sea)" />
              </div>
            </div>
          </div>
          {/* Bottom padding inside the clip keeps the card shadows whole; the margin gives the space back. */}
          <div data-track-viewport className="tt-noscroll -mb-12 snap-x snap-mandatory overflow-x-auto overscroll-x-contain">
            <ol data-track className="tt-track flex w-max gap-5 pb-14">
              {tours.map((tour, i) => <TourCard key={i} {...site} tour={tour} i={i} count={tours.length} />)}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Captain({ template, t, lang }: Site) {
  const portrait = template.media?.teamPortrait;
  return (
    <section id="captain" className="overflow-hidden bg-(--navy) py-28 text-white sm:py-40">
      <div className="tt-wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        {portrait && (
          <div className="lg:col-span-6">
            <div data-clip className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Photo
                dark
                src={portrait}
                alt={pick(lang, "Captain Willy at the helm of his boat", "El Capitán Willy al timón de su bote")}
                loading="lazy"
                decoding="async"
                className="size-full object-cover"
                style={{ objectPosition: "58% 35%" }}
              />
            </div>
          </div>
        )}
        <div className={portrait ? "lg:col-span-6" : "lg:col-span-12"}>
          <Eyebrow tone="teal">{pick(lang, "Your captain", "Su capitán")}</Eyebrow>
          <h2 className="tt-display mt-4 text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.98]"><Words text={t.why.title} /></h2>
          <p data-rise className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
            {pick(
              lang,
              "Willy Vega owns and runs Tamarindo Tours Discovery from Playa Tamarindo. Tell him what your group wants and he plans the day with you.",
              "Willy Vega es dueño y operador de Tamarindo Tours Discovery, en Playa Tamarindo. Cuéntele qué quiere su grupo y él planea el día con usted.",
            )}
          </p>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2">
            {t.why.items.map((w, i) => (
              <li key={i} data-rise className="bg-(--navy) p-6 sm:p-7">
                <span className="tt-display text-2xl text-(--teal)">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-lg font-semibold">{w.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-white/65">{w.blurb}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Booking({ template, t, lang }: Site) {
  const steps = t.process.items;
  const promise = lang === "es" ? template.facts?.guaranteeEs : template.facts?.guaranteeEn;
  return (
    <section id="booking" className="bg-(--sand) py-28 text-(--ink) sm:py-40">
      <div className="tt-wrap">
        <Eyebrow>{t.nav.process}</Eyebrow>
        <h2 className="tt-display mt-4 max-w-3xl text-[clamp(2.6rem,5.4vw,4.75rem)] leading-[0.98]"><Words text={t.process.title} /></h2>
        <div className="relative mt-16">
          <svg aria-hidden viewBox="0 0 1200 56" preserveAspectRatio="none" className="absolute inset-x-0 top-0 hidden h-14 w-full lg:block">
            <path
              data-draw
              d="M0 28 C 100 2, 200 54, 300 28 S 500 2, 600 28 S 800 54, 900 28 S 1100 2, 1200 28"
              fill="none"
              stroke="var(--teal)"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <ol className="relative grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {steps.map((s, i) => (
              <li key={i} data-rise>
                <span className="tt-display grid size-14 place-items-center rounded-full bg-(--navy) text-2xl text-white ring-8 ring-(--sand)">{i + 1}</span>
                <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-(--ink)/70">{s.blurb}</p>
              </li>
            ))}
          </ol>
        </div>
        <div data-rise className="mt-20 grid gap-6 rounded-3xl bg-white p-7 sm:p-9 lg:grid-cols-2 lg:items-center">
          {promise && (
            <div className="flex gap-4">
              <ShieldCheck className="mt-0.5 size-6 shrink-0 text-(--sea)" />
              <div>
                <p className="font-semibold">{promise.title}</p>
                <p className="mt-1 text-[15px] text-(--ink)/70">{promise.blurb}</p>
              </div>
            </div>
          )}
          <p className="text-[15px] text-(--ink)/70 lg:text-right">
            <span className="font-semibold text-(--ink)">{pick(lang, "We accept", "Aceptamos")}</span>
            <br />
            {pick(lang, "Cash · PayPal · Visa · Mastercard · American Express", "Efectivo · PayPal · Visa · Mastercard · American Express")}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Gallery({ template, lang }: Site) {
  const photos = template.media?.gallery ?? [];
  const alts = template.galleryCaptions?.[lang] ?? [];
  const [open, setOpen] = useState<number | null>(null);
  const focus = useReturnFocus();
  useScrollPause(open !== null);
  if (photos.length === 0) return null;
  // Three columns that drift at different speeds on wide screens; on phones the
  // columns dissolve (display: contents) into a plain two-column grid.
  const columns = [0, 1, 2].map((c) => photos.map((src, i) => ({ src, i })).filter(({ i }) => i % 3 === c));
  const shapes = ["lg:aspect-[4/5]", "lg:aspect-square", "lg:aspect-[3/4]"];
  const step = (d: number) => setOpen((o) => (o === null ? o : (o + d + photos.length) % photos.length));
  const ig = template.brand.socials?.instagram;

  return (
    <section id="gallery" className="overflow-hidden bg-(--navy) py-28 text-white sm:py-40">
      <div className="tt-wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow tone="teal">{pick(lang, "Gallery", "Galería")}</Eyebrow>
            <h2 className="tt-display mt-4 text-[clamp(2.6rem,5.4vw,4.75rem)] leading-[0.98]"><Words text={pick(lang, "Days on the water", "Días en el mar")} /></h2>
          </div>
          {ig && (
            <a href={ig} {...EXTERNAL} className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white">
              <span className="tt-link">{pick(lang, "More on Instagram", "Más en Instagram")}</span> <ArrowUpRight className="size-4" />
            </a>
          )}
        </div>
        <div className="mt-14 grid grid-cols-2 items-start gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {columns.map((col, c) => (
            <div key={c} data-speed={[-6, 8, -12][c]} className="contents lg:grid lg:gap-5">
              {col.map(({ src, i }) => (
                <button
                  key={i}
                  onClick={() => setOpen(i)}
                  className="group relative block overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--sun)"
                  aria-label={alts[i] || pick(lang, `Open photo ${i + 1}`, `Abrir foto ${i + 1}`)}
                >
                  <Photo
                    dark
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className={`aspect-square w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.03] ${shapes[c]}`}
                  />
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Dialog.Root open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-[90] bg-[#020a12]/95 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
          <Dialog.Content
            {...focus}
            aria-describedby={undefined}
            onKeyDown={(e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}
            className="fixed inset-0 z-[95] flex items-center justify-center p-4 outline-none sm:p-12"
          >
            <Dialog.Title className="sr-only">{pick(lang, "Photo gallery", "Galería de fotos")}</Dialog.Title>
            {open !== null && (
              <div key={open} className="relative aspect-square w-[min(88vw,80dvh)] overflow-hidden rounded-2xl animate-in fade-in-0 zoom-in-95 duration-500">
                <Photo dark src={photos[open]} alt={alts[open] ?? ""} className="size-full object-contain" />
              </div>
            )}
            <Dialog.Close className={`absolute right-4 top-4 grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 ${PRESS}`} aria-label={pick(lang, "Close", "Cerrar")}>
              <X className="size-5" />
            </Dialog.Close>
            <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-4 text-sm tabular-nums text-white/70">
              <button onClick={() => step(-1)} className={`grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 ${PRESS}`} aria-label={pick(lang, "Previous photo", "Foto anterior")}>
                <ChevronLeft className="size-5" />
              </button>
              {open !== null && `${open + 1} / ${photos.length}`}
              <button onClick={() => step(1)} className={`grid size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 ${PRESS}`} aria-label={pick(lang, "Next photo", "Foto siguiente")}>
                <ChevronRight className="size-5" />
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}

/* ------------------------------------------------------------------ */

/**
 * SECRETARIA IA, as on the shared site (sites/business/secretaria.tsx): a draft's
 * preview link gets the live demo PLW runs (3 conversations per link); the
 * published site invites visitors to call or write; the editor and the gallery
 * say where to try it, to staff only.
 */
export function Secretaria({ template, lang, draftToken }: Site & { draftToken?: string | null }) {
  if (!template.secretaria) return null;
  const { brand } = template;
  const published = !!template.plwSiteId && !draftToken;
  const features = published
    ? [
      pick(lang, "Answers any time, with the business's own information", "Le atiende a cualquier hora, con la información del negocio"),
      SECRETARIA_LANGUAGES[lang],
      pick(lang, "Takes your tour request; Willy confirms the date with you", "Recibe su solicitud de tour; Willy le confirma la fecha"),
    ]
    : [
      pick(lang, "Answers questions about your tours, prices and policies", "Responde preguntas sobre sus tours, precios y políticas"),
      SECRETARIA_LANGUAGES[lang],
      pick(lang, "Takes tour requests after hours too; you confirm each date", "Toma solicitudes de tour, también fuera de horario; usted confirma cada fecha"),
    ];

  return (
    <section id="secretaria" className="relative isolate overflow-hidden bg-(--sea) py-28 text-white sm:py-40">
      <div aria-hidden className="absolute -right-40 -top-40 -z-10 size-[44rem] rounded-full bg-(--teal)/25 blur-3xl" />
      <div aria-hidden className="absolute -bottom-56 -left-40 -z-10 size-[40rem] rounded-full bg-(--sun)/15 blur-3xl" />
      <div className="tt-wrap grid items-center gap-14 lg:grid-cols-2 lg:gap-20 [&>*]:min-w-0">
        <div>
          <Eyebrow tone="sun">{pick(lang, "AI receptionist", "Secretaria IA")}</Eyebrow>
          <h2 className="tt-display mt-4 text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.98]">
            <Words
              key={String(published)}
              text={published
                ? pick(lang, "Ask about your trip, any hour", "Consulte por su viaje a cualquier hora")
                : pick(lang, "A receptionist who answers your guests, day and night", "Una recepcionista que atiende a sus clientes, de día y de noche")}
            />
          </h2>
          <p data-rise className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
            {published
              ? pick(lang, `${brand.name}'s AI receptionist answers your call or message.`, `La recepcionista con IA de ${brand.name} atiende su llamada o mensaje.`)
              : pick(lang, `Try her: talk to her the way a guest of ${brand.name} would.`, `Pruébela: háblele como lo haría un cliente de ${brand.name}.`)}
          </p>
          <ul className="mt-9 space-y-4">
            {features.map((f) => (
              <li key={f} data-rise className="flex items-start gap-3 text-white/90">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-(--sun) text-(--navy)"><Check className="size-3.5" /></span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div data-rise className="mx-auto w-full max-w-lg">
          {draftToken ? (
            <SecretariaCard
              previewToken={secretaryToken(draftToken)}
              businessName={brand.name}
              businessType={template.industryEs}
              standaloneLink={`/preview/${draftToken}/secretaria`}
            />
          ) : published ? (
            <div className="rounded-3xl border border-white/15 bg-white/10 p-7 backdrop-blur-xl sm:p-9">
              <div className="flex items-center gap-4">
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-(--sun) text-(--navy)"><Bot className="size-7" /></span>
                <div className="min-w-0">
                  <p className="text-lg font-semibold leading-tight">{pick(lang, "AI receptionist", "Recepcionista con IA")}</p>
                  <p className="truncate text-sm text-white/60">{brand.name}</p>
                </div>
              </div>
              <div className="mt-7 grid gap-3">
                {/* The number shows: on a computer a tel: link does nothing, so the visitor reads it. */}
                <a href={brand.phoneHref} className={`${BTN_SUN} w-full`}>
                  <Phone className="size-4" /> {pick(lang, "Call", "Llamar al")} {brand.phone}
                </a>
                <a href={wa(template, pick(lang, `Hi ${brand.name}! I have a question.`, `¡Hola ${brand.name}! Tengo una consulta.`))} {...EXTERNAL} className={`${BTN_GHOST} w-full`}>
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/30 bg-white/5 p-7 text-white/75 sm:p-9">
              <div className="flex items-center gap-3 text-white">
                <Bot className="size-6 shrink-0 text-(--sun)" />
                <p className="font-semibold">{pick(lang, "The AI Secretary goes here", "Aquí va la Secretaria IA")}</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed">
                {pick(
                  lang,
                  "Save the draft and open its preview link: your client talks to her there (3 conversations per link). Once published, this card invites visitors to call.",
                  "Guarde el borrador y abra su enlace de vista previa: ahí su cliente habla con ella (3 conversaciones por enlace). Ya publicado, esta tarjeta invita a llamar.",
                )}
              </p>
              <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/50">
                <Link2 className="size-3.5" /> {pick(lang, "Shown only to staff, never to visitors.", "Solo lo ve el personal, nunca los visitantes.")}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Faq({ template, t, lang }: Site) {
  const [open, setOpen] = useState<number | null>(0);
  if (t.faq.items.length === 0) return null;
  return (
    <section id="faq" className="bg-(--sand) py-28 text-(--ink) sm:py-40">
      <div className="tt-wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Eyebrow>{t.nav.faq}</Eyebrow>
          <h2 className="tt-display mt-4 text-[clamp(2.6rem,5vw,4.5rem)] leading-[0.98]"><Words text={t.faq.title} /></h2>
          <a
            href={wa(template, pick(lang, "Hi Willy! I have a question about the tours.", "¡Hola Willy! Tengo una pregunta sobre los tours."))}
            {...EXTERNAL}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-(--sea)"
          >
            <span className="tt-link">{pick(lang, "Another question? Ask on WhatsApp", "¿Otra pregunta? Escríbanos por WhatsApp")}</span> <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="border-y border-(--ink)/10 lg:col-span-8">
          {t.faq.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-(--ink)/10 last:border-b-0">
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium sm:text-xl"
                  >
                    {f.q}
                    <span className={`grid size-9 shrink-0 place-items-center rounded-full border border-(--ink)/15 transition-[rotate,background-color,color] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:bg-(--navy) group-hover:text-white ${isOpen ? "rotate-45 bg-(--navy) text-white" : ""}`}>
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <div id={`faq-${i}`} role="region" className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 text-[16px] leading-relaxed text-(--ink)/70">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact(site: Site) {
  const { template, t, lang } = site;
  const { brand } = template;
  const sunset = template.tours?.find((tour) => /sunset/i.test(tour.title.en))?.image ?? template.media?.hero;
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-(--navy) py-28 text-white sm:py-40">
      {sunset && (
        <div aria-hidden className="absolute inset-0 -z-10">
          <img src={sunset} alt="" loading="lazy" decoding="async" className="size-full scale-110 object-cover opacity-45" />
          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(6,24,42,.96)_25%,rgba(6,24,42,.55)_100%)]" />
        </div>
      )}
      <div className="tt-wrap grid items-start gap-14 lg:grid-cols-12 lg:gap-16 [&>*]:min-w-0">
        <div className="lg:col-span-6">
          <Eyebrow tone="sun">{t.nav.contact}</Eyebrow>
          <h2 className="tt-display mt-4 text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95]"><Words text={t.contact.title} /></h2>
          <p data-rise className="mt-6 max-w-md text-lg leading-relaxed text-white/75">{t.contact.blurb}</p>
          <div data-rise className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a data-magnetic href={wa(template, pick(lang, "Hi Willy! I'd like to book a private boat tour.", "¡Hola Willy! Quisiera reservar un tour privado en bote."))} {...EXTERNAL} className={BTN_SUN}>
              <MessageCircle className="size-5" /> {t.hero.cta1}
            </a>
            <a href={brand.phoneHref} className={BTN_GHOST}>
              <Phone className="size-4" /> {brand.phone}
            </a>
          </div>
          <dl data-rise className="mt-12 grid gap-6 text-[15px] sm:grid-cols-2">
            <div>
              <dt className="flex items-center gap-2 text-white/50"><MapPin className="size-4" /> {pick(lang, "Meeting point", "Punto de encuentro")}</dt>
              <dd className="mt-1.5">
                {pick(lang, "Playa Tamarindo, in front of Restaurante El Chiringuito", "Playa Tamarindo, frente al Restaurante El Chiringuito")}
                <a href={MAPS} {...EXTERNAL} className="mt-1 flex items-center gap-1 text-(--sun)"><span className="tt-link">{pick(lang, "Open in Google Maps", "Abrir en Google Maps")}</span> <ArrowUpRight className="size-3.5" /></a>
              </dd>
            </div>
            {t.footer.hours && (
              <div>
                <dt className="flex items-center gap-2 text-white/50"><Clock className="size-4" /> {t.footer.hoursLabel}</dt>
                <dd className="mt-1.5">{t.footer.hours}</dd>
              </div>
            )}
            {brand.email && (
              <div className="sm:col-span-2">
                <dt className="flex items-center gap-2 text-white/50"><Mail className="size-4" /> Email</dt>
                <dd className="mt-1.5"><a href={`mailto:${brand.email}`} className="tt-link break-all">{brand.email}</a></dd>
              </div>
            )}
          </dl>
        </div>
        <div data-rise className="lg:col-span-6">
          <QuoteBuilder template={template} lang={lang} inline />
        </div>
      </div>
    </section>
  );
}

function Footer({ template, t, lang, onJump }: Site & { onJump: (e: MouseEvent<HTMLAnchorElement>) => void }) {
  const { brand } = template;
  const follow = [
    brand.socials?.instagram && { href: brand.socials.instagram, label: "Instagram" },
    brand.socials?.facebook && { href: brand.socials.facebook, label: "Facebook" },
    { href: TRIPADVISOR, label: "Tripadvisor" },
    { href: YOUTUBE, label: "YouTube" },
  ].filter((x): x is { href: string; label: string } => !!x);
  return (
    <footer className="bg-[#04101C] pb-32 pt-20 text-white/70 md:pb-12">
      <div className="tt-wrap">
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a href="#top" onClick={onJump} className="flex items-center gap-3 text-white">
              <Logo src={brand.logo} size="size-14" />
              <span className="tt-display text-3xl">{brand.name}</span>
            </a>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed">{t.footer.tagline}</p>
          </div>
          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="tt-eyebrow text-white/40">{t.nav.services}</p>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {(template.tours ?? []).map((tour) => <li key={tour.title.en}><a href="#tours" onClick={onJump} className="tt-link hover:text-white">{tour.title[lang]}</a></li>)}
              </ul>
            </div>
            <div>
              <p className="tt-eyebrow text-white/40">{t.nav.contact}</p>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                <li><a href={brand.phoneHref} className="tt-link hover:text-white">{brand.phone}</a></li>
                <li><a href={wa(template, pick(lang, "Hi Willy!", "¡Hola Willy!"))} {...EXTERNAL} className="tt-link hover:text-white">WhatsApp</a></li>
                {brand.email && <li><a href={`mailto:${brand.email}`} className="tt-link break-all hover:text-white">{brand.email}</a></li>}
                <li>{brand.address}</li>
              </ul>
            </div>
            <div>
              <p className="tt-eyebrow text-white/40">{pick(lang, "Follow", "Síganos")}</p>
              <ul className="mt-4 space-y-2.5 text-[15px]">
                {follow.map((f) => <li key={f.label}><a href={f.href} {...EXTERNAL} className="tt-link hover:text-white">{f.label}</a></li>)}
              </ul>
            </div>
          </div>
        </div>
        <p className="pt-8 text-xs text-white/40">© {new Date().getFullYear()} {brand.name}. {t.footer.rights}</p>
      </div>
    </footer>
  );
}

/** Phones: the concierge's actions in one bar, once the hero's own buttons scroll off. */
function MobileBar({ template, lang, trip }: Site) {
  // Both hooks run every render; the contact section has these actions itself.
  const past = useScrolledPast(0.8);
  const atContact = useSectionInView("contact");
  const show = past && !atContact;
  const { brand } = template;
  const icon = `grid size-12 shrink-0 place-items-center rounded-full ${PRESS}`;
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex gap-2 bg-(--navy)/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl transition-[translate] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] md:hidden ${show ? "" : "translate-y-full"}`}
    >
      <button type="button" onClick={() => trip.openQuote()} className={`${BTN_SUN} h-12 min-w-0 flex-1 px-4`}>
        <Calculator className="size-5 shrink-0" /> <span className="truncate">{pick(lang, "Get my quote", "Cotizar mi tour")}</span>
      </button>
      <button type="button" onClick={trip.openChat} className={`${icon} bg-white/10 text-white`} aria-label={pick(lang, "Ask a question", "Haga una pregunta")}>
        <MessagesSquare className="size-5" />
      </button>
      <a href={wa(template, pick(lang, "Hi Willy! I'd like to ask about a private tour.", "¡Hola Willy! Quisiera consultar por un tour privado."))} {...EXTERNAL} className={`${icon} bg-[#25D366] text-white`} aria-label="WhatsApp">
        <MessageCircle className="size-5" />
      </a>
      <a href={brand.phoneHref} className={`${icon} bg-white/10 text-white`} aria-label={`${pick(lang, "Call", "Llamar al")} ${brand.phone}`}>
        <Phone className="size-5" />
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */

const CSS = `
.tt-site { --pad: 1.25rem; font-family: Inter, system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
/* No pure white: every white here (cards, dialogs, text on navy) is a warm off-white. */
.tt-site { --color-white: #FFFDF8; }
.tt-skel { overflow: hidden; }
.tt-skel::after { content: ""; position: absolute; inset: 0; translate: -100% 0; background: linear-gradient(90deg, transparent, color-mix(in oklab, var(--color-white) 55%, transparent), transparent); }
.tt-fade { animation: tt-fade .7s cubic-bezier(.2,.7,.2,1) both; }
@keyframes tt-fade { from { opacity: 0; } }
@keyframes tt-shimmer { to { translate: 100% 0; } }
@media (min-width: 640px) { .tt-site { --pad: 2rem; } }
@media (min-width: 1024px) { .tt-site { --pad: 3rem; } }
.tt-wrap { width: 100%; max-width: 80rem; margin-inline: auto; padding-inline: var(--pad); }
.tt-display { font-family: "Instrument Serif", Georgia, serif; font-weight: 400; letter-spacing: -0.015em; }
.tt-eyebrow { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; }
.tt-link { background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size .5s cubic-bezier(.2,.7,.2,1); }
.tt-link:hover, a:hover > .tt-link, button:hover > .tt-link { background-size: 100% 1px; }
/* The tours row starts and ends on the page's content edges. */
.tt-track { padding-inline: max(var(--pad), calc((100vw - 80rem) / 2 + var(--pad))); }
.tt-noscroll { scrollbar-width: none; } .tt-noscroll::-webkit-scrollbar { display: none; }
.tt-track > li { scroll-margin-inline: max(var(--pad), calc((100vw - 80rem) / 2 + var(--pad))); }
.tt-site ::selection { background: var(--sun); color: var(--navy); }
@media (prefers-reduced-motion: no-preference) {
  .tt-cue { animation: tt-cue 2.4s cubic-bezier(.6,0,.2,1) infinite; }
  .tt-menu-in { animation: tt-menu-in .7s cubic-bezier(.2,.7,.2,1) both; }
  /* Only a load slower than 1 s shows the shimmer. */
  .tt-skel::after { animation: tt-shimmer 1.6s ease-in-out 1s infinite; }
}
@keyframes tt-cue { from { translate: 0 -100%; } to { translate: 0 300%; } }
@keyframes tt-menu-in { from { opacity: 0; translate: 0 24px; } }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
@media (prefers-reduced-motion: no-preference) {
  .tt-check { stroke-dasharray: 24; stroke-dashoffset: 24; animation: tt-draw .7s .25s cubic-bezier(.2,.7,.2,1) forwards; }
}
@keyframes tt-draw { to { stroke-dashoffset: 0; } }
`;

export default function TamarindoSite({ template, draftToken }: { template: BusinessTemplate; draftToken?: string | null }) {
  const startLang: Lang = template.lockedLang ?? template.defaultLang ?? "es";
  const [lang, setLang] = useState<Lang>(startLang);
  useEffect(() => setLang(startLang), [template.slug, startLang]);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const root = useRef<HTMLDivElement>(null);
  useSiteMotion(root, `${lang}|${template.tours?.length ?? 0}|${template.media?.gallery.length ?? 0}|${!!template.secretaria}`);

  // The quote builder (with a tour already chosen, from a tour card or the chat) and the chat.
  const [quote, setQuote] = useState<{ open: boolean; tour: number | null }>({ open: false, tour: null });
  const [chat, setChat] = useState(false);
  const trip: Trip = {
    openQuote: (tour) => { setChat(false); setQuote({ open: true, tour: tour ?? null }); },
    openChat: () => setChat(true),
  };
  const site: Site = { template, t: template.content[lang], lang, trip };

  // In-page links glide with the page's scroller (CSS smooth scrolling would fight ScrollTrigger's measuring).
  const onJump = (e: MouseEvent<HTMLAnchorElement>) => {
    const id = e.currentTarget.getAttribute("href");
    const target = id?.startsWith("#") ? document.querySelector<HTMLElement>(id) : null;
    if (!target) return;
    e.preventDefault();
    scrollToEl(target);
  };

  return (
    <div ref={root} className="tt-site min-h-dvh bg-(--sand) text-(--ink)" style={siteVars(template)}>
      <link rel="stylesheet" href={FONT} precedence="default" />
      <style>{CSS}</style>
      <Nav {...site} setLang={setLang} onJump={onJump} />
      <main>
        <Hero {...site} />
        <Marquee {...site} />
        <Intro {...site} />
        <Tours {...site} />
        <Captain {...site} />
        <Booking {...site} />
        <Gallery {...site} />
        <Secretaria {...site} draftToken={draftToken} />
        <Contact {...site} />
        <Faq {...site} />
      </main>
      <Footer {...site} onJump={onJump} />
      <MobileBar {...site} />
      {template.tourPricing && (
        <>
          <ConciergeDock template={template} lang={lang} onChat={trip.openChat} onQuote={() => trip.openQuote()} />
          <QuoteDialog open={quote.open} onOpenChange={(open) => setQuote((q) => ({ ...q, open }))} template={template} lang={lang} startTour={quote.tour} />
        </>
      )}
      <ConciergeChat template={template} lang={lang} open={chat} onOpenChange={setChat} onQuote={trip.openQuote} />
    </div>
  );
}
