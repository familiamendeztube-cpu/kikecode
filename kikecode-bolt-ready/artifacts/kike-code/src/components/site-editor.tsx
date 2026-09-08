import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ImagePlus, Plus, Trash2 } from "lucide-react";
import type { BusinessTemplate, Lang } from "@/lib/templates/types";

export type EditPath = (string | number)[];

type Props = {
  tpl: BusinessTemplate;
  lang: Lang;
  onLangChange: (l: Lang) => void;
  onChange: (path: EditPath, value: unknown) => void;
  onUpload: (path: EditPath, file: File) => void;
  onAddItem: (path: EditPath) => void;
  onRemoveItem: (path: EditPath, index: number) => void;
};

/** Keys we never expose in the editor (icons/components, derived hrefs, ids,
 *  palette colors, structural flags). */
const SKIP_KEYS = new Set([
  "heroIcon", "serviceIcons", "whyIcons", "icon", "palette", "lockedLang",
  "websiteType", "defaultServicesField", "slug", "id", "phoneHref", "phoneAltHref",
]);
const IMG_KEYS = new Set(["hero", "heroPoster", "teamPortrait", "logo", "src", "poster"]);
const VIDEO_KEYS = new Set(["heroVideo", "video"]);
const IMG_ARRAY_PARENTS = new Set(["gallery", "images"]);

const LABELS: Record<string, string> = {
  brand: "Business info", content: "Website text", media: "Photos & video",
  offers: "Highlights / badges", galleryCaptions: "Gallery captions",
  assistant: "Voice greeting", availability: "Availability",
  videoGallery: "Video gallery", transformation: "Before / after",
  clientTrust: "Client trust", projectSelector: "Project selector",
  inventory: "Inventory", heritage: "Heritage",
  nav: "Navigation", hero: "Hero", services: "Services", why: "Why choose us",
  process: "Process", testimonials: "Testimonials", faq: "FAQ",
  contact: "Contact form", footer: "Footer",
  name: "Name", title: "Title", title1: "Title line 1", title2: "Title line 2",
  subtitle: "Subtitle", eyebrow: "Eyebrow", blurb: "Description", quote: "Quote",
  role: "Role", q: "Question", a: "Answer", caption: "Caption", phase: "Phase",
  label: "Label", text: "Text", year: "Year", price: "Price", mileage: "Mileage",
  email: "Email", phone: "Phone", phoneAlt: "Second phone", city: "City",
  address: "Address", tagline: "Tagline", hours: "Hours", rights: "Copyright",
  en: "English", es: "Spanish", roleEn: "Role (EN)", roleEs: "Role (ES)",
};

function humanize(key: string): string {
  if (LABELS[key]) return LABELS[key];
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase())
    .trim();
}

function looksLikeImage(v: string): boolean {
  return v.startsWith("data:image/") || /\.(png|jpe?g|webp|gif|svg|avif)(\?|$)/i.test(v) ||
    v.startsWith("http") && /(images|photo|img|unsplash|cdn)/i.test(v);
}

function ImageField({
  value, onPick, onUrl, testid,
}: {
  value: string; onPick: (f: File) => void; onUrl: (v: string) => void; testid: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div className="flex items-center gap-2">
      <div className="w-14 h-14 rounded-md overflow-hidden bg-slate-800 border border-slate-700 shrink-0 grid place-items-center">
        {value ? (
          <img src={value} alt="" className="w-full h-full object-cover" />
        ) : (
          <ImagePlus className="w-5 h-5 text-slate-500" />
        )}
      </div>
      <div className="flex-1 space-y-1.5">
        <Input
          value={value}
          onChange={(e) => onUrl(e.target.value)}
          placeholder="Image URL or upload →"
          className="bg-slate-900 border-slate-700 text-white h-8 text-xs"
          data-testid={`${testid}-url`}
        />
        <Button
          type="button" size="sm" variant="secondary" className="h-7 text-xs w-full"
          onClick={() => ref.current?.click()} data-testid={`${testid}-upload`}
        >
          <ImagePlus className="w-3.5 h-3.5 mr-1" /> Upload photo
        </Button>
        <input
          ref={ref} type="file" accept="image/*" className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) onPick(f); e.target.value = ""; }}
        />
      </div>
    </div>
  );
}

export function SiteEditor(props: Props) {
  const { tpl, lang, onLangChange } = props;

  // Top-level groups, in a sensible order. Content + lang-keyed fields use the
  // active editor language so EN/ES stay un-cluttered.
  const groups: { key: string; path: EditPath; value: unknown }[] = [];
  const push = (key: string, path: EditPath, value: unknown) => {
    if (value === undefined || value === null) return;
    groups.push({ key, path, value });
  };

  push("brand", ["brand"], tpl.brand);
  push("content", ["content", lang], tpl.content[lang]);
  push("media", ["media"], tpl.media);
  if (tpl.offers) push("offers", ["offers", lang], tpl.offers[lang]);
  if (tpl.galleryCaptions) push("galleryCaptions", ["galleryCaptions", lang], tpl.galleryCaptions[lang]);
  push("assistant", ["assistant"], tpl.assistant);
  push("availability", ["availability"], tpl.availability);
  push("videoGallery", ["videoGallery"], tpl.videoGallery);
  push("transformation", ["transformation"], tpl.transformation);
  push("clientTrust", ["clientTrust"], tpl.clientTrust);
  push("projectSelector", ["projectSelector"], tpl.projectSelector);
  push("inventory", ["inventory"], tpl.inventory);
  push("heritage", ["heritage"], tpl.heritage);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Editing language</span>
        <div className="ml-auto inline-flex rounded-md overflow-hidden border border-slate-700">
          {(["en", "es"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => onLangChange(l)}
              className={`px-3 py-1 text-xs font-bold ${lang === l ? "bg-fuchsia-600 text-white" : "bg-slate-900 text-slate-300"}`}
              data-testid={`editor-lang-${l}`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {groups.map((g) => (
        <details key={g.key} className="rounded-lg border border-slate-800 bg-slate-900/40 overflow-hidden group">
          <summary className="px-3 py-2.5 cursor-pointer select-none text-sm font-semibold text-white flex items-center justify-between hover:bg-slate-800/50">
            {humanize(g.key)}
            <span className="text-slate-500 text-xs group-open:rotate-90 transition-transform">▸</span>
          </summary>
          <div className="px-3 py-3 border-t border-slate-800 space-y-3">
            <Node value={g.value} path={g.path} parentKey={g.key} {...props} />
          </div>
        </details>
      ))}
    </div>
  );
}

function Node({
  value, path, parentKey, onChange, onUpload, onAddItem, onRemoveItem,
}: { value: unknown; path: EditPath; parentKey: string } & Omit<Props, "tpl" | "lang" | "onLangChange">) {
  const common = { onChange, onUpload, onAddItem, onRemoveItem };
  const key = String(path[path.length - 1] ?? parentKey);
  const testid = `field-${path.join("-")}`;

  if (typeof value === "string") {
    const isImage = IMG_KEYS.has(key) || IMG_ARRAY_PARENTS.has(parentKey) || (typeof key === "string" && looksLikeImage(value) && !VIDEO_KEYS.has(key));
    if (isImage) {
      return (
        <ImageField
          value={value}
          onPick={(f) => onUpload(path, f)}
          onUrl={(v) => onChange(path, v)}
          testid={testid}
        />
      );
    }
    const long = value.length > 60 || VIDEO_KEYS.has(key);
    return long ? (
      <Textarea
        value={value}
        onChange={(e) => onChange(path, e.target.value)}
        rows={VIDEO_KEYS.has(key) ? 1 : 2}
        className="bg-slate-900 border-slate-700 text-white text-sm"
        data-testid={testid}
      />
    ) : (
      <Input
        value={value}
        onChange={(e) => onChange(path, e.target.value)}
        className="bg-slate-900 border-slate-700 text-white h-8 text-sm"
        data-testid={testid}
      />
    );
  }

  if (typeof value === "number") {
    return (
      <Input
        type="number"
        value={value}
        onChange={(e) => onChange(path, e.target.value === "" ? undefined : Number(e.target.value))}
        className="bg-slate-900 border-slate-700 text-white h-8 text-sm"
        data-testid={testid}
      />
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="inline-flex items-center gap-2 text-sm text-slate-300">
        <input
          type="checkbox" checked={value}
          onChange={(e) => onChange(path, e.target.checked)}
          data-testid={testid}
        />
        {humanize(key)}
      </label>
    );
  }

  if (Array.isArray(value)) {
    const stringArray = value.every((x) => typeof x === "string");
    return (
      <div className="space-y-2">
        {value.map((item, i) => (
          <div key={i} className="relative rounded-md border border-slate-800 bg-slate-900/40 p-2 pr-7">
            {!stringArray && (
              <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-1.5">
                {humanize(parentKey)} #{i + 1}
              </div>
            )}
            <Node value={item} path={[...path, i]} parentKey={parentKey} {...common} />
            <button
              type="button"
              onClick={() => onRemoveItem(path, i)}
              className="absolute top-1.5 right-1.5 text-slate-500 hover:text-red-400"
              title="Remove" data-testid={`${testid}-remove-${i}`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        <Button
          type="button" size="sm" variant="secondary" className="h-7 text-xs"
          onClick={() => onAddItem(path)} data-testid={`${testid}-add`}
        >
          <Plus className="w-3.5 h-3.5 mr-1" /> Add {humanize(parentKey).toLowerCase()}
        </Button>
      </div>
    );
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([k, v]) => !SKIP_KEYS.has(k) && v !== undefined && typeof v !== "function");
    return (
      <div className="space-y-3">
        {entries.map(([k, v]) => {
          const childPath = [...path, k];
          const isPrimitive = typeof v === "string" || typeof v === "number" || typeof v === "boolean";
          return (
            <div key={k} className="space-y-1">
              {isPrimitive && typeof v !== "boolean" && (
                <label className="text-[11px] font-medium text-slate-400">{humanize(k)}</label>
              )}
              <Node value={v} path={childPath} parentKey={k} {...common} />
            </div>
          );
        })}
      </div>
    );
  }

  return null;
}
