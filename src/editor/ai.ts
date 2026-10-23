import { callFn } from "@/lib/plw";
import { mergeReplaceArrays } from "@/lib/saved-site";
import type { BusinessTemplate } from "@/templates/types";
import { sanitizePhoneHref } from "./save";

export type ChatMsg = { role: "user" | "assistant"; content: string };

export type AiEdit = {
  reply: string;
  brand?: Partial<BusinessTemplate["brand"]>;
  content?: Partial<BusinessTemplate["content"]>;
  galleryCaptions?: { en?: string[]; es?: string[] };
};

/** Ask `kike-ai` to rewrite the draft's copy for the operator's message. */
export function askAi(tpl: BusinessTemplate, chatHistory: ChatMsg[], userMessage: string, photoCount: number, images: string[]): Promise<AiEdit> {
  return callFn<AiEdit>("kike-ai", {
    action: "customize",
    slug: tpl.slug,
    industry: tpl.industry,
    currentBrand: {
      name: tpl.brand.name,
      city: tpl.brand.city,
      phone: tpl.brand.phone,
      phoneHref: tpl.brand.phoneHref,
      email: tpl.brand.email,
      address: tpl.brand.address,
    },
    currentContent: tpl.content,
    chatHistory,
    userMessage,
    photoCount,
    images: images.length ? images : undefined,
  });
}

/** The draft with the AI's edits merged in (it sends complete arrays, so arrays replace). */
export function applyAiEdit(cur: BusinessTemplate, data: AiEdit): BusinessTemplate {
  const next: BusinessTemplate = { ...cur };
  if (data.brand) {
    const incoming = { ...data.brand };
    // Always rebuild phoneHref from the phone we'll actually display.
    if (incoming.phone) {
      incoming.phoneHref = sanitizePhoneHref(incoming.phone);
    }
    next.brand = { ...cur.brand, ...incoming };
  }
  if (data.content) {
    next.content = mergeReplaceArrays(cur.content, data.content);
  }
  if (data.galleryCaptions) {
    next.galleryCaptions = mergeReplaceArrays(
      cur.galleryCaptions ?? { en: [], es: [] },
      data.galleryCaptions,
    );
  }
  return next;
}
