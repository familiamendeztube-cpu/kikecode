import { Fragment, useEffect, useLayoutEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ArrowRight, ArrowUpRight, Bot, Calculator, Check, Link2, Menu, MessageCircle, MessagesSquare, Phone, Plane, Plus, Sailboat, X,
} from "lucide-react";
import type { BusinessTemplate, Lang, LocalizedContent, TourOffer } from "@/templates/types";
import { pick } from "@/lib/i18n";
import { whatsappLink } from "@/sites/shared/whatsapp";
import { useReturnFocus } from "@/sites/shared/return-focus";
import { leadOutcomeMessage, previewNotice, useLeadForm } from "@/sites/shared/lead-form";
import { SECRETARIA_LANGUAGES, SecretariaCard } from "@/sites/shared/secretaria-card";
import { secretaryToken } from "@/sites/shared/secretary-converse";
import { scrollToEl, useScrollPause, useSiteMotion } from "./motion";
import { usd } from "./quote";
import { QuoteDialog } from "./quote-builder";
import { ConciergeChat, ConciergeDock } from "./concierge";
import { Clouds, Engraving, GATEWAYS, Globe, PassMap } from "./canvas";
import { SCENERY, scenery, scenerySet, tourScenery, type Scenery } from "./scenery";
import { BTN_GHOST, BTN_SUN, EXTERNAL, PRESS, siteVars, useScrolledPast, useSectionInView } from "./ui";

/*
  Tamarindo Tours Discovery: a one-page site for a private boat tour operator,
  told as one flight from top to bottom (the owner asked for the scroll and
  layout of a travel-agency concept site, with this business's content and
  Costa Rica photos).

  On a laptop or bigger the page above the FAQ is one pinned stage
  (motion.ts, "the journey"), played by the scroll:

    open   three airplane windows over Guanacaste; the camera flies into the
           middle one
    fly    over Tamarindo's bay, then down through the clouds to the coast
    tours  the coast becomes the first tour card; the other five slide up
           over it, one per scroll
    world  the cards fly into a dotted globe that turns to Costa Rica while
           routes draw in to Tamarindo
    pass   the boat pass: how a request works, then its stub tears away
    night  back to the windows at night, with the request form

  Phones and reduced motion get the same scenes as ordinary sections. The
  drawings (clouds, globe, maps, the footer's engraving) are canvases in
  canvas.tsx; the photos are Unsplash's (scenery.ts) beside the business's own.

  Honesty rules this page keeps:
  - Every fact, price and policy comes from the template, which comes from the
    business. Ratings link to where they can be checked; no quotes are shown.
  - The request form and the Secretaria say "request": Willy confirms each
    date. Nothing here claims a booking (the site cannot see his calendar).
  - Unpublished (no plwSiteId) the form says it is a preview and sends nothing.
  - The globe's routes are a picture of travel, not a list of flights.
*/

const FONT = "https://fonts.googleapis.com/css2?family=Archivo:wght@400..800&family=Manrope:wght@400..800&display=swap";
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

const bookText = (lang: Lang) => pick(lang, "Hi Willy! I'd like to book a private boat tour.", "¡Hola Willy! Quisiera reservar un tour privado en bote.");

/** A heading whose words rise from behind their masks (motion.ts, data-words). */
function Words({ text }: { text: string }) {
  return (
    <span data-words>
      {text.split(" ").map((w, i) => (
        <Fragment key={i}>
          {i > 0 && " "}
          <span className="w inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top">
            <span className="inline-block">{w}</span>
          </span>
        </Fragment>
      ))}
    </span>
  );
}

/** The logo is an off-centre round badge on a square: frame just the badge. */
function Logo({ src, size = "size-10" }: { src?: string; size?: string }) {
  if (!src) return null;
  return (
    <span className={`relative block shrink-0 overflow-hidden rounded-full bg-white ${size}`}>
      <img src={src} alt="" className="size-full translate-y-[6%] scale-[1.36] object-cover" />
    </span>
  );
}

/** A full-bleed Costa Rica photo: an Unsplash scene, or the business's own photo when `src` is given. */
function Shot({ s, src, alt = "", j, className = "", eager, sizes = "100vw" }: { s: Scenery; src?: string; alt?: string; j?: string; className?: string; eager?: boolean; sizes?: string }) {
  if (src) {
    return <img data-j={j} src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" className={`absolute inset-0 size-full object-cover ${className}`} />;
  }
  return (
    <img
      data-j={j}
      src={scenery(s, 1600)}
      srcSet={scenerySet(s)}
      sizes={sizes}
      alt=""
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      className={`absolute inset-0 size-full object-cover ${className}`}
    />
  );
}

/** The cream pill: its label rolls up to a copy of itself on hover. */
function Pill({ children, onClick, href, type = "button", className = "", ...rest }: {
  children: string; onClick?: () => void; href?: string; type?: "button" | "submit"; className?: string; disabled?: boolean; "data-magnetic"?: boolean;
}) {
  const inner = (
    <span className="tw-roll">
      <span>{children}</span>
      <span aria-hidden>{children}</span>
    </span>
  );
  const cls = `tw-pill ${className}`;
  return href
    ? <a href={href} {...EXTERNAL} className={cls} {...rest}>{inner}</a>
    : <button type={type} onClick={onClick} className={cls} {...rest}>{inner}</button>;
}

/** The pill's round partner: WhatsApp, drawn as a boat. */
function BoatButton({ template, lang }: { template: BusinessTemplate; lang: Lang }) {
  return (
    <a href={wa(template, bookText(lang))} {...EXTERNAL} className="tw-round" aria-label={template.content[lang].hero.cta1}>
      <Sailboat className="size-5" />
    </a>
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
  const [menu, setMenu] = useState(false);
  const focus = useReturnFocus();
  useScrollPause(menu);
  const top = usePreviewBannerHeight();
  const { brand } = template;
  const links = [
    { href: "#tours", label: t.nav.services },
    { href: "#captain", label: t.nav.why },
    { href: "#world", label: pick(lang, "Getting here", "Cómo llegar") },
    { href: "#booking", label: t.nav.process },
    { href: "#contact", label: t.nav.contact },
  ];
  return (
    <header style={{ top }} className="tw-nav fixed inset-x-0 z-50 text-(--claro)">
      <div className="tw-gutter flex h-(--nav-h) items-center justify-between gap-6">
        <a href="#top" onClick={onJump} className="flex min-w-0 items-center gap-3">
          <Logo src={brand.logo} />
          <span className="tw-title truncate text-[19px] max-[440px]:sr-only">{brand.name}</span>
        </a>
        <nav className="hidden items-center gap-8 text-[15px] lg:flex">
          {links.map((l) => <a key={l.href} href={l.href} onClick={onJump} className="tw-link">{l.label}</a>)}
        </nav>
        <div className="flex items-center gap-5 text-[15px]">
          {t.footer.hours && <span className="hidden text-(--claro)/80 xl:inline">{t.footer.hours}</span>}
          <a href={brand.phoneHref} className="tw-link hidden md:inline">{brand.phone}</a>
          <LangSwitch lang={lang} setLang={setLang} hidden={!!template.lockedLang} />
          <Dialog.Root open={menu} onOpenChange={setMenu}>
            <Dialog.Trigger className={`grid size-11 place-items-center rounded-full bg-(--claro)/10 lg:hidden ${PRESS}`} aria-label={pick(lang, "Open menu", "Abrir menú")}>
              <Menu className="size-5" />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Content {...focus} aria-describedby={undefined} className="tt-site fixed inset-0 z-[80] flex flex-col bg-(--parede) px-6 pb-10 pt-6 text-(--claro) data-[state=open]:animate-in data-[state=open]:fade-in-0" style={siteVars(template)}>
                <Dialog.Title className="sr-only">{pick(lang, "Menu", "Menú")}</Dialog.Title>
                <div className="flex items-center justify-between">
                  <Logo src={brand.logo} />
                  <Dialog.Close className={`grid size-11 place-items-center rounded-full bg-(--claro)/10 ${PRESS}`} aria-label={pick(lang, "Close menu", "Cerrar menú")}><X className="size-5" /></Dialog.Close>
                </div>
                <nav className="mt-14 flex flex-col">
                  {links.map((l) => (
                    <a key={l.href} href={l.href} onClick={(e) => { setMenu(false); onJump(e); }} className="tw-title border-b border-(--claro)/10 py-4 text-4xl">{l.label}</a>
                  ))}
                </nav>
                <div className="mt-auto grid gap-3">
                  <button type="button" onClick={() => { setMenu(false); trip.openQuote(); }} className={`${BTN_SUN} w-full`}><Calculator className="size-5" /> {pick(lang, "Get my quote", "Cotizar mi tour")}</button>
                  <a href={wa(template, bookText(lang))} {...EXTERNAL} className={`${BTN_GHOST} w-full`}><MessageCircle className="size-5" /> {t.hero.cta1}</a>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        </div>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* The journey.                                                        */

/** One airplane window: a cream bezel, the glass, a half-drawn blind and a glare. */
function Window({ s, src, clouds, seed = 1, night }: { s: Scenery; src?: string; clouds?: boolean; seed?: number; night?: boolean }) {
  return (
    <div className={`tw-win ${night ? "is-night" : ""}`}>
      <div className="tw-glass">
        <Shot s={s} src={src} sizes="(min-width: 768px) 30vw, 70vw" className={night ? "tw-night-img" : ""} eager={!night} />
        {clouds && <Clouds seed={seed} top={0.72} density={0.45} tint={night ? "150,165,195" : undefined} shade={night ? "40,52,80" : undefined} className="absolute inset-x-0 bottom-0 h-2/5 w-full" />}
        {night && <span aria-hidden className="tw-moon" />}
        <span aria-hidden className="tw-blind" />
        <span aria-hidden className="tw-glare" />
      </div>
    </div>
  );
}

function OpenScene({ template, t, lang, trip }: Site) {
  return (
    <div data-scene="open" className="tw-scene tw-open">
      <div data-j="windows" className="tw-windows">
        <Window s={SCENERY.shore} clouds seed={3} />
        <Window s={SCENERY.bay} src={template.media?.hero} />
        <Window s={SCENERY.beach} clouds seed={9} />
      </div>
      <div data-j="head" className="tw-open-head">
        <h1 className="tw-title tw-hero"><Words text={`${t.hero.title1} ${t.hero.title2}`} /></h1>
        <p data-rise className="tw-lead text-(--claro-2)">{pick(lang, "Only your group on board", "Solo su grupo a bordo")}</p>
      </div>
      <div data-j="foot" className="tw-open-foot tw-gutter">
        <p data-rise className="tw-lead">{pick(lang, "Sport fishing, snorkeling and sunset cruises.", "Pesca deportiva, snorkel y atardeceres.")}</p>
        <div data-rise className="flex items-center gap-3">
          <Pill onClick={() => trip.openQuote()} data-magnetic>{pick(lang, "Get my quote", "Cotizar mi tour")}</Pill>
          <BoatButton template={template} lang={lang} />
        </div>
        <p data-rise className="tw-lead md:text-right">{pick(lang, "With Captain Willy, 26 years on these waters.", "Con el Capitán Willy, 26 años en estas aguas.")}</p>
      </div>
    </div>
  );
}

function FlyScene({ template, t }: Site) {
  return (
    <div data-scene="fly" className="tw-scene tw-fly">
      <div data-j="bay" className="tw-layer"><Shot s={SCENERY.bay} src={template.media?.hero} /></div>
      <div data-j="above" className="tw-layer tw-above"><Shot s={SCENERY.above} /></div>
      <div data-j="cloud-back" className="tw-cloud-back" aria-hidden><Clouds seed={21} top={0.5} className="size-full" /></div>
      <div data-j="fly-copy" className="tw-fly-copy tw-gutter">
        <h2 className="tw-title tw-h2"><Words text={t.services.title} /></h2>
        {t.services.blurb && <p data-rise className="tw-lead mx-auto mt-4 max-w-xl text-(--claro)/85">{t.services.blurb}</p>}
      </div>
      <div data-j="cloud-front" className="tw-cloud-front" aria-hidden>
        <Clouds seed={5} top={0.2} density={1.4} className="size-full" />
      </div>
    </div>
  );
}

function TourCard({ lang, trip, tour, i }: Site & { tour: TourOffer; i: number }) {
  return (
    <article data-card className="tw-card">
      <div className="tw-card-photo"><Shot s={tourScenery(tour.title.en, i)} src={tour.image} alt={pick(lang, `${tour.title.en}: a photo from the tour`, `${tour.title.es}: una foto del tour`)} /></div>
      <div aria-hidden className="tw-card-shade" />
      <div aria-hidden className="tw-card-dim" />
      <div className="tw-card-text">
        <h3 className="tw-title tw-card-title">{tour.title[lang]}</h3>
        <p className="tw-lead mt-3 max-w-md">{tour.blurb[lang]}</p>
      </div>
      <div className="tw-card-glass">
        <div className="flex items-start justify-between gap-3">
          <p className="tw-title text-[clamp(1.5rem,2.3vw,2.25rem)] leading-none">
            {tour.guests !== undefined ? pick(lang, `Up to ${tour.guests}`, `Hasta ${tour.guests}`) : pick(lang, "Your plan", "A su medida")}
          </p>
        </div>
        <p className="mt-2 text-[14px] text-(--claro)/80">{pick(lang, `from ${usd(tour.priceUsd, lang)}, the whole boat`, `desde ${usd(tour.priceUsd, lang)}, el bote completo`)}</p>
        <button type="button" onClick={() => trip.openQuote(i)} className="tw-card-go">
          {pick(lang, "Get a quote", "Cotizar")} <ArrowRight className="size-4" />
          <span className="sr-only">: {tour.title[lang]}</span>
        </button>
      </div>
    </article>
  );
}

function ToursScene(site: Site) {
  const tours = site.template.tours ?? [];
  if (tours.length === 0) return null;
  return (
    <div id="tours" data-scene="tours" className="tw-scene tw-tours">
      <h2 className="sr-only">{site.t.services.title}</h2>
      <div data-j="deck" className="tw-deck">
        {tours.map((tour, i) => <TourCard key={i} {...site} tour={tour} i={i} />)}
      </div>
    </div>
  );
}

function WorldScene({ template, lang, trip }: Site) {
  const stats = template.facts?.stats ?? [];
  const years = stats.find((s) => /years/i.test(s.labelEn));
  const ratings = stats.filter((s) => /google|tripadvisor/i.test(s.labelEn));
  return (
    <div id="world" data-scene="world" className="tw-scene tw-world">
      <p data-j="giant" aria-hidden className="tw-giant">Tamarindo</p>
      <div data-j="globe" className="tw-globe">
        <Globe className="size-full" />
        <span data-pin="home" className="tw-pin is-home">Tamarindo</span>
        {GATEWAYS.map((g) => <span key={g.name} data-pin={g.name} className="tw-pin">{g.name}</span>)}
      </div>
      <h2 className="sr-only">{pick(lang, "Wherever you fly in from", "Venga de donde venga")}</h2>
      <div className="tw-world-foot tw-gutter">
        {years && <p data-rise className="tw-small">{pick(lang, `${years.value} years on Guanacaste's waters, wherever you fly in from.`, `${years.value} años en las aguas de Guanacaste, venga de donde venga.`)}</p>}
        <div data-rise className="flex items-center justify-center gap-3">
          <Pill onClick={() => trip.openQuote()}>{pick(lang, "Get my quote", "Cotizar mi tour")}</Pill>
          <BoatButton template={template} lang={lang} />
        </div>
        <p data-rise className="tw-small md:text-right">
          {ratings.map((s, i) => (
            <Fragment key={s.labelEn}>
              {i > 0 && <br />}
              {/tripadvisor/i.test(s.labelEn)
                ? <a href={TRIPADVISOR} {...EXTERNAL} className="tw-link">{lang === "es" ? s.valueEs ?? s.value : s.value} {lang === "es" ? s.labelEs : s.labelEn}</a>
                : <>{lang === "es" ? s.valueEs ?? s.value : s.value} {lang === "es" ? s.labelEs : s.labelEn}</>}
            </Fragment>
          ))}
        </p>
      </div>
    </div>
  );
}

/** Captain Willy: his portrait, his years on these waters, and a strip of real days on his boat (all the business's own photos). */
function CaptainScene({ template, lang, trip }: Site) {
  const portrait = template.media?.teamPortrait;
  if (!portrait) return null;
  const years = template.facts?.stats?.find((s) => /years/i.test(s.labelEn))?.value ?? "26";
  const gallery = template.media?.gallery ?? [];
  const captions = template.galleryCaptions?.[lang] ?? [];
  const points = lang === "es"
    ? ["Pesca y actividades en el agua", "Bote privado para su grupo", "Planes a la medida, confirmados por Willy", "Tripulación a bordo para ayudarle"]
    : ["Fishing and water activities", "A private boat for your group", "Custom plans confirmed by Willy", "Crew on board to help you"];
  return (
    <div id="captain" data-scene="captain" className="tw-scene tw-captain">
      <div data-j="cap-frame" className="tw-cap-frame">
        <img src={portrait} alt={pick(lang, "Captain Willy Vega on his boat in Tamarindo", "El Capitán Willy Vega en su bote en Tamarindo")} loading="lazy" decoding="async" />
        <span className="tw-cap-tag">🇨🇷 Willy Vega</span>
      </div>
      <div className="tw-cap-text">
        <p data-rise className="tw-label text-(--acento)">{pick(lang, "Your captain", "Su capitán")}</p>
        <h2 className="tw-title tw-h2 mt-3"><Words text={pick(lang, "Captain Willy", "Capitán Willy")} /></h2>
        <p data-rise className="tw-cap-years mt-5"><span>{years}</span> {pick(lang, "years on the water in Guanacaste", "años en el agua en Guanacaste")}</p>
        <p data-rise className="tw-lead mt-5 max-w-xl text-(--claro)/80">{pick(lang,
          "Willy leads private fishing, snorkeling, tubing and beach tours from Tamarindo. Tell him what you'd like to do and who is coming; he confirms the plan and the logistics for your group.",
          "Willy dirige tours privados de pesca, snorkel, tubo y playas desde Tamarindo. Cuéntele qué quieren hacer y quiénes vienen; él confirma el plan y la logística para su grupo.")}</p>
        <ul data-rise className="tw-cap-list mt-6">
          {points.map((x) => <li key={x}><Check className="size-4 shrink-0 text-(--acento)" /> {x}</li>)}
        </ul>
        <div data-rise className="mt-7 flex items-center gap-3">
          <Pill onClick={() => trip.openQuote()}>{pick(lang, "Plan a day with Willy", "Planee un día con Willy")}</Pill>
          <BoatButton template={template} lang={lang} />
        </div>
      </div>
      {gallery.length > 0 && (
        <ul data-j="cap-strip" className="tw-cap-strip" aria-label={pick(lang, "Days on Willy's boat", "Días en el bote de Willy")}>
          {gallery.map((src, i) => <li key={src}><img src={src} alt={captions[i] ?? ""} loading="lazy" decoding="async" /></li>)}
        </ul>
      )}
    </div>
  );
}

function PassScene({ template, t, lang, trip }: Site) {
  const steps = t.process.items;
  const pricing = template.tourPricing;
  const deposit = pricing ? usd(pricing.depositUsd, lang) : null;
  const hours = pricing?.durations.map((d) => d.hours) ?? [];
  const span = hours.length ? `${Math.min(...hours)}–${Math.max(...hours)} h`.replace(".", lang === "es" ? "," : ".") : null;
  // Three fields, as on a boarding pass: the message, the deposit, the day itself.
  const fields = [
    { label: steps[0]?.title, value: pick(lang, "1 message", "1 mensaje"), text: steps[0]?.blurb },
    { label: steps[1]?.title, value: deposit ?? "—", text: steps[1]?.blurb },
    { label: steps[2]?.title, value: span ?? "—", text: [steps[2]?.blurb, steps[3]?.blurb].filter(Boolean).join(" ") },
  ];
  const promise = lang === "es" ? template.facts?.guaranteeEs : template.facts?.guaranteeEn;
  return (
    <div id="booking" data-scene="pass" className="tw-scene tw-pass">
      <div data-j="ticket-wrap" className="tw-ticket-wrap">
        <article data-j="ticket" className="tw-ticket">
          <PassMap className="tw-ticket-map" />
          <div className="tw-ticket-body">
            <header className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="tw-title text-[22px]">{template.brand.name.split(" ")[0]}</span>
              <h2 className="tw-title text-[22px] text-(--tinta)/60">{t.process.title}</h2>
              <span className="tw-label ml-auto">{pick(lang, "Boat pass", "Pase a bordo")}</span>
            </header>
            <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-3 border-b border-(--tinta)/15 pb-5">
              <div><p className="tw-label">{pick(lang, "From", "De")}</p><p className="tw-title text-[clamp(1.6rem,2.4vw,2.4rem)] leading-tight">{pick(lang, "Your idea", "Su idea")}</p></div>
              <Plane className="mb-2 size-6 rotate-45" />
              <div><p className="tw-label">{pick(lang, "To", "A")}</p><p className="tw-title text-[clamp(1.6rem,2.4vw,2.4rem)] leading-tight">{pick(lang, "A day at sea", "Un día en el mar")}</p></div>
            </div>
            <ol className="mt-5 grid gap-6 sm:grid-cols-3">
              {fields.map((f, i) => (
                <li key={i} data-step>
                  <p className="tw-label">{String(i + 1).padStart(2, "0")} · {f.label}</p>
                  <p data-type className="tw-title mt-1 text-[clamp(2rem,3.6vw,3.6rem)] leading-none">{f.value}</p>
                  <p className="mt-3 text-[14px] leading-snug text-(--tinta)/70">{f.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <aside data-j="stub" className="tw-stub">
            <p className="tw-title text-[22px]">{template.brand.name.split(" ")[0]}</p>
            <dl className="mt-8 grid gap-5">
              <div><dt className="tw-label">{pick(lang, "Guests", "Pasajeros")}</dt><dd className="tw-title text-2xl">{pick(lang, "Your group", "Su grupo")}</dd></div>
              <div><dt className="tw-label">{pick(lang, "Boat", "Bote")}</dt><dd className="tw-title text-2xl">{pick(lang, "Private", "Privado")}</dd></div>
              <div><dt className="tw-label">{pick(lang, "Departure", "Salida")}</dt><dd className="tw-title text-2xl">{pick(lang, "El Chiringuito", "El Chiringuito")}</dd></div>
            </dl>
            <span aria-hidden className="tw-barcode" />
          </aside>
        </article>
        <div data-j="pass-cta" className="tw-pass-cta">
          <Pill onClick={() => trip.openQuote()}>{pick(lang, "Get my quote", "Cotizar mi tour")}</Pill>
          {promise && <p className="mt-3 max-w-[15rem] text-center text-[13px] text-(--claro-2)">{promise.blurb}</p>}
        </div>
      </div>
    </div>
  );
}

function RequestForm({ template, t, lang }: Site) {
  const lead = useLeadForm(template.plwSiteId, lang);
  const tours = template.tours ?? [];
  const [tour, setTour] = useState<string>("");
  const sent = lead.state.status === "sent";
  const outcome = leadOutcomeMessage(lead.state, lang, template.brand.phone);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const guests = String(f.get("guests") ?? "");
    void lead.submit({
      form: "contact",
      name: String(f.get("name") ?? "").trim(),
      phone: String(f.get("phone") ?? "").trim(),
      service: tour || undefined,
      preferredTime: String(f.get("date") ?? "") || undefined,
      message: pick(lang, `Group of ${guests}.`, `Grupo de ${guests}.`),
    });
  };
  return (
    <form data-rise onSubmit={submit} className="tw-form">
      {lead.isPreview && <p className="mb-4 rounded-xl bg-(--luz)/15 px-4 py-2.5 text-[13px] text-(--luz)">{previewNotice(lang)}</p>}
      <div className="tw-form-row">
        <label className="tw-field"><span>{t.contact.name}</span><input name="name" required autoComplete="name" placeholder={pick(lang, "Your name", "Su nombre")} /></label>
        <label className="tw-field"><span>WhatsApp</span><input name="phone" required type="tel" autoComplete="tel" placeholder="+1 555 000 0000" /></label>
        <label className="tw-field"><span>{pick(lang, "Date", "Fecha")}</span><input name="date" type="date" /></label>
        <label className="tw-field tw-field-s"><span>{pick(lang, "Guests", "Personas")}</span>
          <select name="guests" defaultValue="2">{["1", "2", "3", "4", "5", "6"].map((n) => <option key={n}>{n}</option>)}</select>
        </label>
        <Pill type="submit" className="tw-form-send" disabled={lead.sending}>{t.contact.submit}</Pill>
      </div>
      <fieldset className="tw-chips">
        <legend className="tw-label text-(--claro-2)">{t.contact.service}</legend>
        {tours.map((x) => (
          <label key={x.title.en}>
            <input type="radio" name="tour" value={x.title[lang]} checked={tour === x.title[lang]} onChange={() => setTour(x.title[lang])} className="sr-only" />
            <span>{x.title[lang]}</span>
          </label>
        ))}
      </fieldset>
      <p role="status" className="mt-3 min-h-5 text-[14px] text-(--luz)">{sent ? t.contact.success : outcome}</p>
    </form>
  );
}

function NightScene(site: Site) {
  const { t } = site;
  return (
    <div data-scene="night" className="tw-scene tw-night">
      <div data-j="night-full" className="tw-layer"><Shot s={SCENERY.night} className="tw-night-img" /><span aria-hidden className="tw-moon" /></div>
      <div data-j="night-windows" className="tw-windows">
        <Window s={SCENERY.bay} clouds seed={13} night />
        <Window s={SCENERY.night} night />
        <Window s={SCENERY.headland} clouds seed={17} night />
      </div>
      <div className="tw-night-head">
        <h2 className="tw-title tw-hero"><Words text={t.contact.title} /></h2>
        <p data-rise className="tw-lead text-(--claro-2)">{t.contact.blurb}</p>
      </div>
      <div className="tw-night-form tw-gutter"><RequestForm {...site} /></div>
      <div data-j="land" aria-hidden className="tw-layer tw-land">
        <Shot s={SCENERY.bay} src={site.template.media?.hero} />
        <div data-j="land-clouds" className="tw-land-clouds"><Clouds seed={29} top={0.05} density={1.6} className="size-full" /></div>
      </div>
    </div>
  );
}

function Journey(site: Site) {
  return (
    <section id="top" data-journey aria-label={site.template.brand.name} className="tw-stage">
      <OpenScene {...site} />
      <FlyScene {...site} />
      <ToursScene {...site} />
      <WorldScene {...site} />
      <CaptainScene {...site} />
      <PassScene {...site} />
      <NightScene {...site} />
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
    <section id="secretaria" className="relative isolate overflow-hidden bg-(--parede) py-28 text-(--claro) sm:py-40">
      <div aria-hidden className="absolute -right-40 -top-40 -z-10 size-[44rem] rounded-full bg-(--acento)/10 blur-3xl" />
      <div aria-hidden className="absolute -bottom-56 -left-40 -z-10 size-[40rem] rounded-full bg-(--luz)/10 blur-3xl" />
      <div className="tw-gutter mx-auto max-w-[84rem] grid items-center gap-14 lg:grid-cols-2 lg:gap-20 [&>*]:min-w-0">
        <div>
          <p className="tw-label text-(--luz)">{pick(lang, "AI receptionist", "Secretaria IA")}</p>
          <h2 className="tw-title tw-h2 mt-4">
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
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-(--sun) text-(--tinta)"><Check className="size-3.5" /></span>
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
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-(--sun) text-(--tinta)"><Bot className="size-7" /></span>
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
    <section id="faq" className="bg-(--parede-funda) py-28 text-(--claro) sm:py-40">
      <div className="tw-gutter mx-auto max-w-[84rem] grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="tw-label text-(--luz)">{t.nav.faq}</p>
          <h2 className="tw-title tw-h2 mt-4"><Words text={t.faq.title} /></h2>
          <a
            href={wa(template, pick(lang, "Hi Willy! I have a question about the tours.", "¡Hola Willy! Tengo una pregunta sobre los tours."))}
            {...EXTERNAL}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-(--acento)"
          >
            <span className="tw-link">{pick(lang, "Another question? Ask on WhatsApp", "¿Otra pregunta? Escríbanos por WhatsApp")}</span> <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="border-y border-(--claro)/12 lg:col-span-8">
          {t.faq.items.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-(--claro)/12 last:border-b-0">
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-medium sm:text-xl"
                  >
                    {f.q}
                    <span className={`grid size-9 shrink-0 place-items-center rounded-full border border-(--claro)/20 transition-[rotate,background-color,color] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:bg-(--claro) group-hover:text-(--tinta) ${isOpen ? "rotate-45 bg-(--claro) text-(--tinta)" : ""}`}>
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                <div id={`faq-${i}`} role="region" className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="max-w-2xl pb-7 text-[16px] leading-relaxed text-(--claro)/70">{f.a}</p>
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


function LangSwitch({ lang, setLang, hidden }: { lang: Lang; setLang: (l: Lang) => void; hidden: boolean }) {
  if (hidden) return null;
  return (
    <div role="group" aria-label={pick(lang, "Language", "Idioma")} className="flex rounded-full bg-(--claro)/10 p-1 text-xs font-semibold backdrop-blur">
      {(["en", "es"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`h-8 rounded-full px-3 uppercase ${PRESS} ${lang === l ? "bg-(--claro) text-(--tinta)" : "text-white/70 hover:text-white"}`}
        >
          {l}
        </button>
      ))}
    </div>
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
      className={`tw-mbar fixed inset-x-0 bottom-0 z-40 flex gap-2 bg-(--parede)/90 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl transition-[translate] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] md:hidden ${show ? "" : "translate-y-full"}`}
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


function Footer({ template, t, lang, onJump }: Site & { onJump: (e: MouseEvent<HTMLAnchorElement>) => void }) {
  const { brand } = template;
  const follow = [
    brand.socials?.instagram && { href: brand.socials.instagram, label: "Instagram" },
    brand.socials?.facebook && { href: brand.socials.facebook, label: "Facebook" },
    { href: TRIPADVISOR, label: "Tripadvisor" },
    { href: YOUTUBE, label: "YouTube" },
  ].filter((x): x is { href: string; label: string } => !!x);
  const credits = Object.values(SCENERY).filter((s, i, all) => all.findIndex((x) => x.by === s.by) === i);
  return (
    <footer className="relative overflow-hidden bg-(--parede) pt-24 text-(--claro)">
      <div className="tw-gutter relative z-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <a href="#top" onClick={onJump} className="flex items-center gap-5">
            <Logo src={brand.logo} size="size-[clamp(64px,8vw,120px)]" />
            <span className="tw-title max-w-[12ch] text-[clamp(44px,7vw,120px)] leading-[0.9]">{brand.name}</span>
          </a>
          <p className="tw-lead max-w-sm text-(--claro-2) md:text-right">{t.footer.tagline}</p>
        </div>
        <div className="mt-16 grid gap-10 text-[15px] sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="tw-label text-(--claro-2)">{t.nav.services}</p>
            <ul className="mt-4 space-y-2">
              {(template.tours ?? []).map((tour) => <li key={tour.title.en}><a href="#tours" onClick={onJump} className="tw-link">{tour.title[lang]}</a></li>)}
            </ul>
          </div>
          <div>
            <p className="tw-label text-(--claro-2)">{t.nav.contact}</p>
            <ul className="mt-4 space-y-2">
              <li><a href={wa(template, pick(lang, "Hi Willy!", "¡Hola Willy!"))} {...EXTERNAL} className="tw-link">WhatsApp</a></li>
              <li><a href={brand.phoneHref} className="tw-link">{brand.phone}</a></li>
              {brand.email && <li><a href={`mailto:${brand.email}`} className="tw-link break-all">{brand.email}</a></li>}
              {t.footer.hours && <li className="text-(--claro-2)">{t.footer.hours}</li>}
            </ul>
          </div>
          <div>
            <p className="tw-label text-(--claro-2)">{pick(lang, "Meeting point", "Punto de encuentro")}</p>
            <p className="mt-4">{pick(lang, "Playa Tamarindo, in front of Restaurante El Chiringuito", "Playa Tamarindo, frente al Restaurante El Chiringuito")}</p>
            <a href={MAPS} {...EXTERNAL} className="mt-2 inline-flex items-center gap-1 text-(--acento)"><span className="tw-link">{pick(lang, "Open in Google Maps", "Abrir en Google Maps")}</span> <ArrowUpRight className="size-3.5" /></a>
          </div>
          <div>
            <p className="tw-label text-(--claro-2)">{pick(lang, "Follow", "Síganos")}</p>
            <ul className="mt-4 space-y-2">
              {follow.map((f) => <li key={f.label}><a href={f.href} {...EXTERNAL} className="tw-link">{f.label}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap justify-between gap-3 text-xs text-(--claro-2)">
          <p>© {new Date().getFullYear()} {brand.name}. {t.footer.rights}</p>
          <p className="max-w-2xl md:text-right">
            {pick(lang, "Costa Rica photos on Unsplash by ", "Fotos de Costa Rica en Unsplash por ")}
            {credits.map((c, i) => (
              <Fragment key={c.by}>
                <a href={c.page} {...EXTERNAL} className="tw-link">{c.by}</a>{i < credits.length - 1 ? ", " : "."}
              </Fragment>
            ))}
          </p>
        </div>
      </div>
      <p aria-hidden className="tw-footer-giant">{brand.name.split(" ")[0]}</p>
      <Engraving className="mt-6 block h-[clamp(160px,22vw,320px)] w-full" />
    </footer>
  );
}

/* ------------------------------------------------------------------ */

const CSS = `
.tt-site {
  --parede: #12161e; --parede-funda: #0b0e14; --claro: #f3f0ea; --claro-2: #9aa3b0; --papel: #f2ede4; --tinta: #151a22;
  --luz: #f6cf98; --acento: #FF6B3D; --noite: #0b1322;
  --nav-h: 88px; --gutter: clamp(16px, 3.2vw, 48px); --raio: clamp(20px, 2.2vw, 32px);
  --t-hero: clamp(38px, 5.6vw, 92px); --t-titulo: clamp(30px, 3.9vw, 64px); --t-card: clamp(44px, 7vw, 120px);
  --t-lead: clamp(17px, 1.55vw, 25px); --ease: cubic-bezier(.16, 1, .3, 1);
  font-family: "Manrope", system-ui, sans-serif; font-weight: 500; -webkit-font-smoothing: antialiased;
  --color-white: #FFFDF8;
}
.tt-site ::selection { background: var(--acento); color: var(--parede); }
.tw-gutter { padding-inline: max(var(--gutter), env(safe-area-inset-left, 0px)); }
.tw-title, .tt-display { font-family: "Archivo", "Manrope", system-ui, sans-serif; font-weight: 560; letter-spacing: -0.025em; }
.tw-hero { font-size: var(--t-hero); line-height: 1; text-wrap: balance; }
.tw-h2 { font-size: var(--t-titulo); line-height: 1.04; text-wrap: balance; }
.tw-lead { font-size: var(--t-lead); line-height: 1.3; font-weight: 560; letter-spacing: -0.005em; }
.tw-small { font-size: clamp(15px, 1.2vw, 19px); line-height: 1.35; }
.tw-label, .tt-eyebrow { font-size: 11.5px; font-weight: 650; letter-spacing: .16em; text-transform: uppercase; color: rgba(21,26,34,.55); }
.tw-link { background: linear-gradient(currentColor, currentColor) 0 100% / 0 1px no-repeat; transition: background-size .5s var(--ease); }
.tw-link:hover, a:hover > .tw-link { background-size: 100% 1px; }
.tt-noscroll { scrollbar-width: none; } .tt-noscroll::-webkit-scrollbar { display: none; }
.tt-skel { overflow: hidden; } .tt-fade { animation: tt-fade .7s var(--ease) both; } @keyframes tt-fade { from { opacity: 0; } }

/* Buttons: the cream pill whose label rolls, and its round partner. */
.tw-pill { display: inline-flex; height: 58px; align-items: center; border-radius: 999px; padding-inline: 34px; background: var(--claro); color: var(--tinta); font-size: 17px; font-weight: 650; transition: scale .18s, background-color .3s; }
.tw-pill:active { scale: .97; } .tw-pill:disabled { opacity: .6; }
.tw-roll { position: relative; display: inline-grid; overflow: hidden; height: 1.5em; line-height: 1.5em; }
.tw-roll > span { grid-area: 1 / 1; transition: translate .5s var(--ease); }
.tw-roll > span + span { translate: 0 110%; }
.tw-pill:hover .tw-roll > span:first-child { translate: 0 -110%; }
.tw-pill:hover .tw-roll > span + span { translate: 0 0; }
.tw-round { display: grid; place-items: center; width: 58px; height: 58px; border-radius: 999px; background: var(--claro); color: var(--tinta); transition: rotate .5s var(--ease), scale .18s; }
.tw-round:hover { rotate: -12deg; } .tw-round:active { scale: .95; }

/* The stage and its scenes, stacked (phones, reduced motion). */
.tw-stage { position: relative; background: var(--parede); color: var(--claro); }
.tw-scene { position: relative; overflow: hidden; min-height: 100svh; }
.tw-layer { position: absolute; inset: 0; overflow: hidden; }
.tw-open { background: radial-gradient(120% 90% at 50% 55%, #4a4038 0%, #2c2722 45%, #15130f 100%); display: flex; flex-direction: column; justify-content: space-between; padding-top: calc(var(--nav-h) + 8px); padding-bottom: 28px; }
.tw-open-head, .tw-night-head { text-align: center; padding-inline: var(--gutter); }
.tw-open-head .tw-lead, .tw-night-head .tw-lead { margin-top: 10px; }
.tw-windows { display: flex; justify-content: center; align-items: center; gap: clamp(14px, 2.6vw, 44px); padding-block: 28px; }
.tw-open-foot { display: grid; gap: 18px; align-items: end; justify-items: center; text-align: center; }
@media (min-width: 768px) { .tw-open-foot { grid-template-columns: 1fr auto 1fr; justify-items: stretch; text-align: left; } }

/* Airplane windows. */
.tw-win { position: relative; flex-shrink: 0; width: clamp(150px, 21vw, 330px); aspect-ratio: 33 / 42; border-radius: 44% / 34%;
  background: radial-gradient(120% 90% at 30% 20%, #fbf8f2 0%, #ebe7df 40%, #c9c1b4 85%, #a69c8c 100%);
  box-shadow: inset 0 2px 1px rgba(255,255,255,.7), inset 0 -14px 30px rgba(70,58,44,.35), inset 0 0 0 1px rgba(0,0,0,.08), 0 40px 70px -30px rgba(0,0,0,.85), 0 0 0 10px rgba(0,0,0,.12); }
.tw-win:first-child, .tw-win:last-child { max-width: 30vw; }
@media (max-width: 767px) { .tw-win:first-child, .tw-win:last-child { display: none; } .tw-win { width: min(70vw, 300px); } }
.tw-glass { position: absolute; inset: 12% 14%; border-radius: 42% / 31%; overflow: hidden; background: #8fb5d6;
  box-shadow: inset 0 0 0 3px rgba(60,52,44,.45), inset 0 10px 24px rgba(0,0,0,.35); isolation: isolate; }
.tw-blind { position: absolute; inset: 0 0 auto; height: 17%; background: linear-gradient(180deg, #d8cfc2, #cdc3b4 85%, #b3a898); box-shadow: 0 3px 6px rgba(0,0,0,.25); z-index: 2; }
.tw-glare { position: absolute; inset: 0; background: linear-gradient(125deg, rgba(255,255,255,.28) 0%, rgba(255,255,255,0) 32%, rgba(255,255,255,0) 70%, rgba(255,255,255,.12) 100%); z-index: 3; pointer-events: none; }
.tw-win.is-night { background: radial-gradient(120% 90% at 30% 20%, #8f8a85 0%, #5d5853 45%, #3a3632 85%, #2a2724 100%); box-shadow: inset 0 2px 1px rgba(255,255,255,.25), inset 0 -14px 30px rgba(0,0,0,.45), 0 40px 70px -30px rgba(0,0,0,.9); }
.tw-win.is-night .tw-blind { background: linear-gradient(180deg, #4b4741, #3e3a35); }
.tw-night-img { filter: brightness(.38) saturate(.55) contrast(1.1); }
.tw-moon { position: absolute; inset: 0; background: radial-gradient(60% 40% at 50% 0%, rgba(169,189,220,.35), transparent 70%), linear-gradient(180deg, rgba(11,19,34,.55), rgba(11,19,34,.15) 45%, rgba(11,19,34,.6)); mix-blend-mode: screen; pointer-events: none; }
.tw-night-img + .tw-moon { mix-blend-mode: normal; background: radial-gradient(55% 35% at 50% 0%, rgba(169,189,220,.28), transparent 70%), linear-gradient(180deg, rgba(11,19,34,.35), rgba(11,19,34,.1) 45%, rgba(11,19,34,.55)); }

/* The flight. */
.tw-fly { display: flex; align-items: flex-start; justify-content: center; }
.tw-fly .tw-layer img { object-position: 50% 40%; }
.tw-above { display: none; }
.tw-cloud-back { position: absolute; inset: auto 0 0; height: 45%; opacity: .9; -webkit-mask-image: linear-gradient(180deg, #000 55%, transparent 100%); mask-image: linear-gradient(180deg, #000 55%, transparent 100%); pointer-events: none; }
.tw-cloud-front { position: absolute; inset: auto -10% -28%; height: 92%; background: linear-gradient(180deg, transparent 62%, #e9eff6 82%); pointer-events: none; display: none; }
.tw-fly-copy { position: relative; z-index: 2; text-align: center; padding-top: calc(var(--nav-h) + 8vh); text-shadow: 0 2px 30px rgba(10,30,60,.45); }

/* The tour cards. */
.tw-tours { background: var(--parede); padding: calc(var(--nav-h)) var(--gutter) var(--gutter); min-height: 0; }
.tw-deck { display: grid; gap: 18px; }
.tw-card { position: relative; overflow: hidden; border-radius: var(--raio); min-height: 78svh; color: var(--claro); background: #20262f; isolation: isolate; }
.tw-card-photo { position: absolute; inset: 0; z-index: -2; }
.tw-card-dim { position: absolute; inset: 0; z-index: 4; background: #07131F; opacity: 0; pointer-events: none; }
/* The window rows are left off this list on purpose: they zoom to several times the screen, and a layer that big runs out of GPU tiles in Chrome and paints in pieces. */
.is-staged [data-card], .is-staged [data-j] > img, .is-staged [data-j^='cloud'] { will-change: transform, opacity; }
.tw-card-shade { position: absolute; inset: 0; z-index: -1; background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(8,10,14,.72) 100%), linear-gradient(90deg, rgba(8,10,14,.45) 0%, rgba(8,10,14,0) 50%); }
.tw-card-text { position: absolute; left: clamp(20px, 3vw, 48px); bottom: clamp(20px, 4vw, 56px); right: 340px; }
.tw-card-title { font-size: var(--t-card); line-height: .92; letter-spacing: -0.035em; }
.tw-card-glass { position: absolute; right: clamp(16px, 2.2vw, 36px); bottom: clamp(16px, 2.2vw, 36px); width: 302px; padding: 22px; border-radius: 22px;
  background: rgba(244,239,231,.14); border: 1px solid rgba(244,239,231,.14); backdrop-filter: blur(18px) saturate(1.2); -webkit-backdrop-filter: blur(18px) saturate(1.2); }
.tw-card-go { margin-top: 16px; display: inline-flex; align-items: center; gap: 8px; height: 44px; padding-inline: 18px; border-radius: 999px; background: var(--claro); color: var(--tinta); font-size: 14px; font-weight: 650; transition: gap .4s var(--ease); }
.tw-card-go:hover { gap: 12px; }
.tw-card-go::after { content: ""; position: absolute; inset: 0; }
@media (max-width: 767px) {
  .tw-card { min-height: 0; display: flex; flex-direction: column; justify-content: flex-end; padding: 46vw 18px 18px; }
  .tw-card-text { position: static; } .tw-card-glass { position: static; width: auto; margin-top: 18px; }
}

/* The globe. */
.tw-world { background: var(--parede-funda); display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 28px; }
.tw-giant { position: absolute; left: 50%; top: calc(var(--nav-h) - 1vw); translate: -50% 0; font-family: "Archivo", system-ui, sans-serif; font-weight: 700; font-size: clamp(90px, 21vw, 360px); line-height: .85; letter-spacing: -0.05em; color: #1b2130; white-space: nowrap; pointer-events: none; }
.tw-globe { position: relative; margin: 6vh auto 2vh; width: min(68vh, 80vw); aspect-ratio: 1; }
.tw-pin { position: absolute; left: 0; top: 0; padding: 6px 11px; border-radius: 999px; font-size: 12px; font-weight: 650; white-space: nowrap; background: rgba(18,22,30,.82); color: var(--claro); border: 1px solid rgba(244,239,231,.16); pointer-events: none; }
.tw-pin.is-home { background: var(--claro); color: var(--tinta); }
.tw-world-foot { position: relative; display: grid; gap: 16px; align-items: end; justify-items: center; text-align: center; }
@media (min-width: 768px) { .tw-world-foot { grid-template-columns: 1fr auto 1fr; justify-items: stretch; text-align: left; } }

/* The boat pass. */
.tw-pass { background: var(--parede-funda); display: flex; align-items: center; justify-content: center; padding: calc(var(--nav-h) + 20px) var(--gutter) 40px; }
.tw-ticket-wrap { position: relative; width: min(1180px, 100%); }
.tw-ticket { position: relative; display: grid; color: var(--tinta); }
@media (min-width: 900px) { .tw-ticket { grid-template-columns: 1fr 300px; } }
.tw-ticket-body, .tw-stub { position: relative; background: var(--papel); padding: clamp(22px, 3vw, 44px); }
.tw-ticket-body { border-radius: 26px 6px 6px 26px; overflow: hidden; isolation: isolate; }
.tw-ticket-map { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; }
.tw-stub { border-radius: 6px 26px 26px 6px; border-left: 2px dashed rgba(21,26,34,.25); display: flex; flex-direction: column; transform-origin: 0% 0%; }
@media (max-width: 899px) { .tw-ticket-body, .tw-stub { border-radius: 26px; } .tw-stub { border-left: 0; margin-top: 10px; } }
.tw-barcode { margin-top: auto; padding-top: 24px; height: 70px; background: repeating-linear-gradient(90deg, var(--tinta) 0 2px, transparent 2px 4px, var(--tinta) 4px 7px, transparent 7px 9px, var(--tinta) 9px 10px, transparent 10px 13px); background-clip: content-box; }
.tw-pass-cta { display: flex; flex-direction: column; align-items: center; margin-top: 26px; }

/* Night and the request form. */
.tw-night { background: var(--noite); display: flex; flex-direction: column; justify-content: space-between; padding-top: calc(var(--nav-h) + 8px); padding-bottom: 28px; }
.tw-night .tw-layer { display: none; }
@media (max-width: 767px), (max-height: 599px) { .tw-nav { background: linear-gradient(180deg, rgba(7,19,31,.92), rgba(7,19,31,.72)); backdrop-filter: blur(10px); } }
.tw-night-form { position: relative; z-index: 2; }
.tw-form { margin-inline: auto; max-width: 1340px; padding: 22px; border-radius: 24px; background: rgba(16,20,28,.62); border: 1px solid rgba(244,239,231,.14); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
.tw-form-row { display: grid; gap: 12px; align-items: end; }
@media (min-width: 900px) { .tw-form-row { grid-template-columns: 1.2fr 1fr 1fr .5fr auto; } }
.tw-field { display: grid; gap: 6px; font-size: 11.5px; font-weight: 650; letter-spacing: .16em; text-transform: uppercase; color: var(--claro-2); }
.tw-field input, .tw-field select { height: 52px; border-radius: 14px; padding-inline: 16px; background: rgba(244,239,231,.08); border: 1px solid rgba(244,239,231,.14); color: var(--claro); font: 500 16px "Manrope", system-ui, sans-serif; letter-spacing: 0; text-transform: none; color-scheme: dark; }
.tw-field input:focus-visible, .tw-field select:focus-visible { outline: 2px solid var(--acento); outline-offset: 2px; }
.tw-form-send { height: 52px; justify-content: center; }
.tw-chips { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-top: 16px; }
.tw-chips legend { float: left; margin-right: 10px; }
.tw-chips label span { display: inline-flex; height: 40px; align-items: center; padding-inline: 16px; border-radius: 999px; border: 1px solid rgba(244,239,231,.18); font-size: 14px; cursor: pointer; transition: background-color .3s, color .3s; }
.tw-chips input:checked + span { background: var(--claro); color: var(--tinta); }
.tw-chips input:focus-visible + span { outline: 2px solid var(--acento); outline-offset: 2px; }

/* ---- Staged: motion.ts adds .is-staged; every scene is one layer of one screen. ---- */
.is-staged { height: 100vh; overflow: hidden; }
.is-staged .tw-scene { position: absolute; inset: 0; min-height: 0; height: 100%; }
.is-staged .tw-open-head { position: absolute; inset: calc(var(--nav-h) - 4px) 0 auto; z-index: 3; }
.is-staged .tw-open .tw-windows, .is-staged .tw-night .tw-windows { position: absolute; inset: 0; padding: 0; align-items: center; transform-origin: 50% 50%; }
.is-staged .tw-open .tw-windows { top: 9vh; }
.is-staged .tw-win { width: min(21vw, 46vh * 33 / 42); }
.is-staged .tw-open-foot { position: absolute; inset: auto 0 28px; z-index: 3; }
.is-staged .tw-above { display: block; }
.is-staged .tw-cloud-front { display: block; }
.is-staged .tw-tours { padding: 0; background: transparent; }
.is-staged .tw-deck { position: absolute; inset: var(--nav-h) var(--gutter) 3vh; display: block; }
.is-staged .tw-card { position: absolute; inset: 0; min-height: 0; transform-origin: 50% 0%; }
.is-staged .tw-world { padding-bottom: 28px; }
.is-staged .tw-globe { position: absolute; left: 50%; top: 54%; translate: -50% -50%; margin: 0; width: min(66vh, 60vw); }
.is-staged .tw-world-foot { position: absolute; inset: auto 0 28px; }
.is-staged .tw-pass { padding-top: var(--nav-h); }
.is-staged .tw-ticket-wrap { width: min(1180px, 100%); }
.is-staged .tw-pass-cta { position: absolute; right: 30px; top: 50%; translate: 0 -50%; margin: 0; }
.is-staged .tw-night .tw-layer { display: block; }
.is-staged .tw-night-head { position: absolute; inset: calc(var(--nav-h) + 1.5vh) 0 auto; z-index: 3; }
.is-staged .tw-night-head .tw-hero { font-size: clamp(36px, min(4.6vw, 7.4vh), 76px); }
.is-staged .tw-night .tw-windows { inset: calc(var(--nav-h) + 4vh + 70px) 0 0; align-items: flex-start; }
.is-staged .tw-night .tw-win { width: min(29vw, 62vh * 33 / 42); }
.is-staged .tw-night-form { position: absolute; inset: auto 0 20px; }
/* Captain Willy. */
.tw-captain { background: var(--parede); display: grid; gap: 28px; padding: calc(var(--nav-h) + 24px) var(--gutter) 40px; align-content: start; }
@media (min-width: 900px) { .tw-captain { grid-template-columns: minmax(0, .95fr) minmax(0, 1fr); align-items: center; column-gap: clamp(28px, 4vw, 72px); } }
.tw-cap-frame { position: relative; overflow: hidden; border-radius: 28px; aspect-ratio: 3 / 2; background: #20262f; }
.tw-cap-frame img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% 35%; }
.tw-cap-tag { position: absolute; left: 16px; bottom: 16px; padding: 8px 14px; border-radius: 999px; background: rgba(16,20,28,.7); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); font-size: 13px; font-weight: 650; letter-spacing: .04em; }
.tw-cap-years { font-size: clamp(16px, 1.3vw, 20px); color: var(--claro-2); }
.tw-cap-years span { display: block; font-family: "Archivo", system-ui, sans-serif; font-weight: 700; font-size: clamp(72px, min(9vw, 15vh), 160px); line-height: .82; letter-spacing: -0.05em; color: var(--acento); }
.tw-cap-list { display: grid; gap: 10px; font-size: 15px; }
.tw-cap-list li { display: flex; align-items: center; gap: 10px; }
@media (min-width: 640px) { .tw-cap-list { grid-template-columns: 1fr 1fr; column-gap: 24px; } }
.tw-cap-strip { grid-column: 1 / -1; display: flex; gap: 14px; overflow-x: auto; scrollbar-width: none; }
.tw-cap-strip li { flex-shrink: 0; }
.tw-cap-strip img { display: block; height: clamp(120px, 18vh, 200px); aspect-ratio: 1; border-radius: 18px; object-fit: cover; }
.is-staged .tw-captain { padding: calc(var(--nav-h) + 2vh) var(--gutter) 0; align-content: start; align-items: start; }
.is-staged .tw-cap-frame { aspect-ratio: auto; height: calc(100vh - var(--nav-h) - 2vh - 16vh - 84px); }
.is-staged .tw-cap-text { align-self: center; margin-top: -8vh; }
.is-staged .tw-cap-strip { position: absolute; left: 0; bottom: 28px; padding-left: var(--gutter); overflow: visible; width: max-content; }
.is-staged .tw-cap-strip img { height: 16vh; }
/* The landing after the boat pass: the bay from above, through a last bank of cloud. */
.tw-land { z-index: 4; }
.tw-land-clouds { position: absolute; inset: -10% -10% -30%; background: radial-gradient(70% 60% at 50% 55%, rgba(236,241,247,.9), rgba(236,241,247,0) 75%); }
/* Like rumo: the menu and the chat button step aside during the film's quiet scenes. */
.tw-nav { transition: translate .6s cubic-bezier(.2,.7,.2,1), opacity .6s; }
.tw-nav-off .tw-nav { translate: 0 -110%; opacity: 0; pointer-events: none; }
.tw-in-journey .tw-dock { opacity: 0 !important; translate: 0 24px !important; pointer-events: none !important; }
.tw-footer-giant { position: relative; margin: 48px 0 -0.12em; padding-inline: var(--gutter); font-family: "Archivo", system-ui, sans-serif; font-weight: 700; font-size: clamp(88px, 24vw, 420px); line-height: .8; letter-spacing: -0.06em; color: var(--claro); white-space: nowrap; overflow: hidden; }
/* Phones get the same film, fitted to a tall narrow screen. */
.tw-in-journey .tw-mbar { translate: 0 100% !important; }
@media (max-width: 767px) {
  .is-staged .tw-open-head { inset: calc(var(--nav-h) + 2vh) 0 auto; }
  .is-staged .tw-open .tw-windows { top: 4vh; gap: 10px; }
  .is-staged .tw-win, .is-staged .tw-win:first-child, .is-staged .tw-win:last-child { display: block; width: 27vw; max-width: none; }
  .is-staged .tw-win:nth-child(2) { width: 33vw; }
  .is-staged .tw-open-foot { bottom: max(22px, env(safe-area-inset-bottom)); gap: 12px; }
  .is-staged .tw-deck { inset: calc(var(--nav-h) + 4px) var(--gutter) max(16px, env(safe-area-inset-bottom)); }
  .is-staged .tw-card { padding: 18px; }
  .is-staged .tw-giant { top: calc(var(--nav-h) + 4vh); }
  .is-staged .tw-globe { top: 50%; width: min(88vw, 52vh); }
  .is-staged .tw-world-foot { bottom: max(22px, env(safe-area-inset-bottom)); }
  .is-staged .tw-pass { align-items: flex-start; padding: calc(var(--nav-h) + 6px) var(--gutter) 0; }
  .is-staged .tw-stub { display: none; }
  .is-staged .tw-ticket-body { padding: 18px; }
  .is-staged .tw-ticket-body > div { margin-top: 12px; padding-bottom: 12px; }
  .is-staged .tw-ticket-body ol { margin-top: 12px; gap: 12px; }
  .is-staged [data-step] [data-type] { font-size: 1.9rem; }
  .is-staged [data-step] p:last-child { margin-top: 4px; font-size: 12.5px; }
  .is-staged .tw-ticket-body > div:first-of-type { display: none; }
  .is-staged .tw-ticket-body ol { margin-top: 14px; }
  .is-staged .tw-pass-cta { position: relative; right: auto; top: auto; translate: none; margin-top: 16px; }
  .is-staged .tw-pass-cta > p { margin-top: 6px; font-size: 12px; max-width: 18rem; }
  .is-staged .tw-night { padding: 0; }
  .is-staged .tw-night-head { inset: calc(var(--nav-h) + 2px) 0 auto; }
  .is-staged .tw-night-head .tw-hero { font-size: clamp(28px, 8.4vw, 40px); }
  .is-staged .tw-night-head .tw-lead { font-size: 14px; margin-top: 6px; }
  .is-staged .tw-night .tw-windows { inset: calc(var(--nav-h) + 112px) 0 auto; height: 14vh; gap: 10px; }
  .is-staged .tw-night .tw-win { width: min(20vw, 11vh); }
  .is-staged .tw-night-form { bottom: max(10px, env(safe-area-inset-bottom)); }
  .is-staged .tw-form { padding: 14px; border-radius: 20px; }
  .is-staged .tw-form > p:first-child { margin-bottom: 10px; padding: 6px 10px; font-size: 12px; }
  .is-staged .tw-form-row { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 8px; }
  .is-staged .tw-field input, .is-staged .tw-field select { width: 100%; min-width: 0; }
  .is-staged .tw-field { gap: 4px; font-size: 10px; }
  .is-staged .tw-field input, .is-staged .tw-field select { height: 42px; border-radius: 12px; padding-inline: 12px; }
  .is-staged .tw-form-send { grid-column: 1 / -1; height: 46px; }
  .is-staged .tw-chips { flex-wrap: nowrap; overflow-x: auto; margin-top: 10px; scrollbar-width: none; }
  .is-staged .tw-chips legend { display: none; }
  .is-staged .tw-chips label span { height: 34px; white-space: nowrap; font-size: 13px; padding-inline: 12px; }
  .is-staged .tw-form [role=status] { margin-top: 6px; min-height: 0; }
  .is-staged .tw-captain { grid-template-columns: minmax(0, 1fr); gap: 14px; padding-top: calc(var(--nav-h) + 4px); }
  .is-staged .tw-cap-frame { height: 22vh; }
  .is-staged .tw-cap-text { margin-top: 0; }
  .is-staged .tw-cap-text .tw-h2 { font-size: 34px; margin-top: 4px; }
  .is-staged .tw-cap-years { margin-top: 8px; font-size: 14px; }
  .is-staged .tw-cap-years span { font-size: 52px; }
  .is-staged .tw-cap-text .tw-lead { margin-top: 8px; font-size: 13.5px; line-height: 1.4; }
  .is-staged .tw-cap-list { display: none; }
  .is-staged .tw-cap-text > div { margin-top: 12px; }
  .is-staged .tw-cap-strip { bottom: max(16px, env(safe-area-inset-bottom)); gap: 10px; }
  .is-staged .tw-cap-strip img { height: 11vh; border-radius: 14px; }
  .is-staged .tw-cap-text .tw-pill { padding-inline: 22px; font-size: 15.5px; white-space: nowrap; }
}
/* Short phones (iPhone SE and the like): trim the extras so each frame still fits. */
@media (max-width: 767px) and (max-height: 620px) {
  .is-staged .tw-open-head .tw-hero { font-size: 34px; }
  .is-staged .tw-open-head .tw-lead { display: none; }
  .is-staged .tw-ticket-body > header h2 { font-size: 18px; }
  .is-staged [data-step] [data-type] { font-size: 1.5rem; }
  .is-staged [data-step] p:last-child { font-size: 11.5px; line-height: 1.3; }
  .is-staged .tw-ticket-body ol { gap: 8px; margin-top: 8px; }
  .is-staged .tw-pass-cta { margin-top: 10px; }
  .is-staged .tw-pass-cta > p { display: none; }
  .is-staged .tw-night-head .tw-lead { display: none; }
  .is-staged .tw-night .tw-windows { inset: calc(var(--nav-h) + 72px) 0 auto; height: 11vh; }
  .is-staged .tw-night .tw-win { width: min(16vw, 9vh); }
  .is-staged .tw-form > p:first-child { margin-bottom: 8px; padding: 5px 9px; font-size: 11px; }
  .is-staged .tw-field input, .is-staged .tw-field select { height: 38px; }
  .is-staged .tw-form-send { height: 42px; }
  .is-staged .tw-cap-text .tw-lead { display: none; }
  .is-staged .tw-cap-frame { height: 20vh; }
}

@media (prefers-reduced-motion: no-preference) {
  .tt-menu-in { animation: tt-menu-in .7s var(--ease) both; }
  .tt-check { stroke-dasharray: 24; stroke-dashoffset: 24; animation: tt-draw .7s .25s var(--ease) forwards; }
}
@keyframes tt-menu-in { from { opacity: 0; translate: 0 24px; } }
@keyframes tt-draw { to { stroke-dashoffset: 0; } }
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }
`;

export default function TamarindoSite({ template, draftToken }: { template: BusinessTemplate; draftToken?: string | null }) {
  const startLang: Lang = template.lockedLang ?? template.defaultLang ?? "es";
  const [lang, setLang] = useState<Lang>(startLang);
  useEffect(() => setLang(startLang), [template.slug, startLang]);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const root = useRef<HTMLDivElement>(null);
  useSiteMotion(root, `${lang}|${template.tours?.length ?? 0}|${!!template.secretaria}`);

  // The quote builder (with a tour already chosen, from a tour card or the chat) and the chat.
  const [quote, setQuote] = useState<{ open: boolean; tour: number | null }>({ open: false, tour: null });
  const [chat, setChat] = useState(false);
  const trip: Trip = {
    openQuote: (tour) => { setChat(false); setQuote({ open: true, tour: tour ?? null }); },
    openChat: () => setChat(true),
  };
  const site: Site = { template, t: template.content[lang], lang, trip };

  // In-page links glide with the page's scroller; a scene inside the pinned journey
  // has its own landing spot (motion.ts).
  const onJump = (e: MouseEvent<HTMLAnchorElement>) => {
    const id = e.currentTarget.getAttribute("href");
    const target = id?.startsWith("#") ? document.querySelector<HTMLElement>(id) : null;
    if (!target) return;
    e.preventDefault();
    scrollToEl(target);
  };

  return (
    <div ref={root} className="tt-site min-h-dvh bg-(--parede) text-(--claro)" style={siteVars(template)}>
      <link rel="stylesheet" href={FONT} precedence="default" />
      <style>{CSS}</style>
      <Nav {...site} setLang={setLang} onJump={onJump} />
      <main>
        <Journey {...site} />
        {/* The request form is the journey's last scene; this marks where it ends on the page. */}
        <span id="contact" aria-hidden className="block h-px" />
        <Secretaria {...site} draftToken={draftToken} />
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
