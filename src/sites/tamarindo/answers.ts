import type { BusinessTemplate, Lang } from "@/templates/types";
import { durationsFor, hoursLabel, quoteMath, usd } from "./quote";

/*
  The concierge's answers. It is not an AI: it finds the topic and the tour a
  question is about (English or Spanish, accents ignored) and answers only from
  the template: tours, pricing, FAQ, hours, contact. Anything else gets an
  honest hand-off — on an unpublished site, that the full version answers any
  question (owner decision 2026-11-24); once published, Willy on WhatsApp.
  Nothing here may invent a price, a policy or an opening.
*/

export type Action = "quote" | "whatsapp" | "call";
export type Reply = { text: string; actions: Action[]; tour?: number };

/** Lowercase, no accents, only letters, digits, "$" and single spaces. */
function normalize(s: string): string {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9$]+/g, " ").trim();
}

/** A keyword matches a word starting with it; "=word" only that exact word; one with a space, that phrase. */
function hits(text: string, keywords: string[]): number {
  const words = text.split(" ");
  const padded = ` ${text} `;
  return keywords.filter((k) =>
    k.includes(" ") ? padded.includes(` ${k} `) : k.startsWith("=") ? words.includes(k.slice(1)) : words.some((w) => w.startsWith(k)),
  ).length;
}

/** First match wins, so the narrow topics come before the broad ones ("how much is the deposit",
 *  "opening hours" before "how many hours"). */
const TOPICS: { id: string; kw: string[] }[] = [
  { id: "cancel", kw: ["cancel", "refund", "reembols", "reschedul", "reprogram", "change the date", "cambiar la fecha"] },
  { id: "deposit", kw: ["deposit", "paypal", "deposito", "adelanto"] },
  { id: "pay", kw: ["=pay", "paying", "payment", "=card", "=cash", "=visa", "mastercard", "=amex", "american express", "=pago", "pagar", "tarjeta", "efectivo"] },
  { id: "kids", kw: ["=kid", "=kids", "child", "=baby", "babies", "=nino", "=ninos", "=nina", "=ninas", "=bebe", "=hijos"] },
  { id: "bathroom", kw: ["bathroom", "toilet", "restroom", "=bano", "sanitario"] },
  { id: "availability", kw: ["availab", "calendar", "=today", "tomorrow", "this week", "next week", "disponib", "calendario", "=hoy", "=manana", "=fecha", "=date", "=dates"] },
  { id: "book", kw: ["=book", "booking", "reserv", "agendar", "apartar"] },
  { id: "meet", kw: ["meet", "=where", "location", "pickup", "pick up", "address", "=donde", "ubicacion", "encuentro", "direccion", "chiringuito", "salida", "=salen"] },
  { id: "bring", kw: ["bring", "=wear", "=pack", "llevar", "ropa", "sunscreen", "bloqueador", "protector"] },
  { id: "hours", kw: ["=open", "opening", "what time", "horario", "=abren", "que hora"] },
  { id: "guests", kw: ["how many people", "how many guests", "=people", "=guests", "=group", "capacity", "maximum", "=personas", "=grupo", "capacidad", "=caben", "cuantas personas", "cuantos somos"] },
  { id: "duration", kw: ["how long", "=hours", "duration", "half day", "full day", "cuanto dura", "=horas", "duracion", "medio dia", "dia completo"] },
  { id: "included", kw: ["include", "comes with", "come with", "=drinks", "=food", "=beer", "=lunch", "=snacks", "=gear", "=equipment", "incluye", "incluido", "bebida", "comida", "almuerzo", "cerveza", "equipo"] },
  { id: "price", kw: ["price", "=cost", "=costs", "how much", "=rate", "=rates", "=usd", "dollar", "$", "precio", "=cuanto", "cuesta", "=vale", "tarifa", "cobran", "cotiz", "quote"] },
  { id: "contact", kw: ["whatsapp", "=phone", "=call", "=email", "=mail", "contact", "human", "=person", "=talk", "=speak", "llamar", "telefono", "correo", "contacto", "hablar", "persona"] },
  // Last: "hi, how much is fishing?" is a price question.
  { id: "greet", kw: ["=hi", "=hello", "=hey", "=hola", "=buenas", "=buenos", "good morning", "good afternoon"] },
  { id: "thanks", kw: ["thank", "=thx", "gracias"] },
];

/** Words that point at a tour, keyed by a word of its English title. The specific groups come first. */
const TOUR_WORDS: [titleWord: string, kw: string[]][] = [
  ["offshore", ["offshore", "altamar", "alta mar", "marlin", "sailfish", "=vela", "tuna", "=atun", "deep sea", "mahi", "dorado"]],
  ["inshore", ["inshore", "costera", "rooster", "=gallo", "snapper", "pargo", "=jack", "jurel"]],
  ["fishing", ["fish", "pesca", "pescar"]],
  ["snorkel", ["snorkel", "tubing", "=tube", "turtle", "tortuga", "reef", "arrecife"]],
  ["sunset", ["sunset", "atardecer", "puesta del sol"]],
  ["coastal", ["coastal", "coastline", "=beach", "beaches", "secluded", "cliffs", "acantilad", "playas escondidas"]],
  ["custom", ["custom", "tailor", "combin", "a la medida", "personaliz", "=mix"]],
];

function toursIn(text: string, template: BusinessTemplate): number[] {
  const tours = template.tours ?? [];
  for (const [word, kw] of TOUR_WORDS) {
    if (hits(text, kw) === 0) continue;
    const found = tours.flatMap((t, i) => (t.title.en.toLowerCase().includes(word) ? [i] : []));
    if (found.length > 0) return found;
  }
  return [];
}

/** The FAQ entry a topic is about: its keywords in the question count double, in the answer once. */
function faqFor(topic: string, template: BusinessTemplate, lang: Lang): string | null {
  const kw = TOPICS.find((t) => t.id === topic)?.kw ?? [];
  let best: { score: number; a: string } | null = null;
  for (const f of template.content[lang].faq.items) {
    const score = 2 * hits(normalize(f.q), kw) + hits(normalize(f.a), kw);
    if (score > 0 && (!best || score > best.score)) best = { score, a: f.a };
  }
  return best?.a ?? null;
}

export function answer(question: string, template: BusinessTemplate, lang: Lang): Reply {
  const L = (en: string, es: string) => (lang === "en" ? en : es);
  const text = normalize(question);
  const found = toursIn(text, template);
  let topic = TOPICS.find((t) => hits(text, t.kw) > 0)?.id;
  // "Hi! Tell me about the sunset tour" is about the tour.
  if ((topic === "greet" || topic === "thanks") && found.length > 0) topic = undefined;
  const tours = template.tours ?? [];
  const tour = found.length === 1 ? tours[found[0]] : undefined;
  const pricing = template.tourPricing;
  const { brand } = template;
  const demo = !template.plwSiteId;
  const lengths = (list: ReturnType<typeof durationsFor>) =>
    list.map((d) => `${d.name[lang]} (${hoursLabel(d.hours, lang)}${d.lunch ? L(", lunch included", ", con almuerzo") : ""}): ${usd(d.priceUsd, lang)}`).join(" · ");
  const withTour = (r: Omit<Reply, "tour">): Reply => (found.length > 0 ? { ...r, tour: found[0] } : r);

  switch (topic) {
    case "greet":
      return { text: L(`Hi! I'm the ${brand.name} concierge. Ask me about the tours, prices or how booking works, or build your quote in a minute.`, `¡Hola! Soy el concierge de ${brand.name}. Pregúnteme por los tours, los precios o cómo reservar, o arme su cotización en un minuto.`), actions: ["quote"] };
    case "thanks":
      return { text: L("You're welcome! Anything else about your day on the water?", "¡Con gusto! ¿Algo más sobre su día en el mar?"), actions: [] };
    case "price":
    case "duration":
      if (tour && pricing) {
        const guests = tour.guests ? L(`, up to ${tour.guests} guests`, `, hasta ${tour.guests} personas`) : "";
        return withTour({ text: `${tour.title[lang]}: ${L("whole boat", "bote completo")}${guests}. ${lengths(durationsFor(tour, pricing))}.`, actions: ["quote"] });
      }
      if (found.length > 1) {
        return withTour({ text: found.map((i) => `${tours[i].title[lang]}: ${L("from", "desde")} ${usd(tours[i].priceUsd, lang)}`).join(" · ") + L(". Prices are for the whole boat.", ". Los precios son por el bote completo."), actions: ["quote"] });
      }
      if (pricing) {
        const deposit = usd(quoteMath(pricing.durations[0]?.priceUsd ?? 0, pricing).deposit, lang);
        return { text: `${L("Prices are for the whole boat, not per person", "Los precios son por el bote completo, no por persona")}: ${lengths(pricing.durations)}. ${L(`A ${deposit} deposit holds your date.`, `Un depósito de ${deposit} aparta su fecha.`)}`, actions: ["quote"] };
      }
      break;
    case "included":
      if (tour) return withTour({ text: `${tour.title[lang]} ${L("includes", "incluye")}: ${tour.includes[lang].join(", ")}.`, actions: ["quote"] });
      break;
    case "guests":
      if (tour?.guests) return withTour({ text: L(`${tour.title[lang]}: up to ${tour.guests} guests, and the whole boat is yours.`, `${tour.title[lang]}: hasta ${tour.guests} personas, y el bote es solo para ustedes.`), actions: ["quote"] });
      break;
    case "availability":
      return withTour({
        text: demo
          ? L("Checking Willy's calendar live comes with the full version: this is a demo. For now, send your date in a quote and Willy confirms it.", "Consultar el calendario de Willy en vivo viene con la versión completa: esto es una demostración. Por ahora, envíe su fecha en una cotización y Willy se la confirma.")
          : L("I can't see Willy's calendar from here. Send your date in a quote and he confirms availability on WhatsApp.", "Desde aquí no veo el calendario de Willy. Envíe su fecha en una cotización y él le confirma la disponibilidad por WhatsApp."),
        actions: ["quote", "whatsapp"],
      });
    case "hours": {
      const t = template.content[lang].footer;
      if (t.hours) return { text: `${t.hoursLabel}: ${t.hours}.`, actions: ["whatsapp"] };
      break;
    }
    case "contact":
      return { text: L(`Write to Willy on WhatsApp or call ${brand.phone}`, `Escríbale a Willy por WhatsApp o llame al ${brand.phone}`) + (brand.email ? ` · ${brand.email}` : "") + ".", actions: ["whatsapp", "call"] };
  }

  // The rest are answered by the business's own FAQ, word for word.
  const faq = topic ? faqFor(topic, template, lang) : null;
  if (faq) return withTour({ text: faq, actions: topic === "book" || topic === "deposit" ? ["quote", "whatsapp"] : [] });

  if (tour) {
    const guests = tour.guests ? L(`, up to ${tour.guests} guests`, `, hasta ${tour.guests} personas`) : "";
    return withTour({ text: `${tour.title[lang]}: ${tour.blurb[lang]} ${L("From", "Desde")} ${usd(tour.priceUsd, lang)} ${L("for the whole boat", "por el bote completo")}${guests}.`, actions: ["quote"] });
  }

  return {
    text: demo
      ? L("Good question! In this demo I answer from Willy's tours, prices and policies; the full version answers any question. For now, Willy can answer this one on WhatsApp.", "¡Buena pregunta! En esta demostración respondo con los tours, precios y políticas de Willy; la versión completa responde cualquier pregunta. Por ahora, Willy se la puede responder por WhatsApp.")
      : L("I don't have that answer here, but Willy does: ask him on WhatsApp and I'll have your question written for him.", "No tengo esa respuesta aquí, pero Willy sí: pregúntele por WhatsApp y le dejo su pregunta escrita."),
    actions: ["whatsapp"],
  };
}

/** The questions the chat suggests, in the site's language. */
export function suggestions(lang: Lang): string[] {
  return lang === "en"
    ? ["How much is a private tour?", "What's included?", "Where do we meet?", "How do I book?", "Can we bring kids?", "What if I cancel?"]
    : ["¿Cuánto cuesta un tour privado?", "¿Qué incluye?", "¿Dónde nos encontramos?", "¿Cómo reservo?", "¿Pueden venir niños?", "¿Y si cancelo?"];
}
