import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Sparkles, Eye, Wand2, Loader2, ChevronLeft } from "lucide-react";
import { TEMPLATES, getTemplate } from "@/lib/templates";
import { Layout } from "@/components/layout";
import CustomizerWrapper from "@/components/customizer-wrapper";
import type { BusinessTemplate } from "@/lib/templates/types";

type GenerateResult = { baseSlug: string; reply: string };

const EXAMPLE_PROMPTS = [
  "A taquería in Houston called El Fuego — birria, tacos al pastor, catering. Phone (713) 555-0142.",
  "Maria's House Cleaning in Phoenix — homes and offices, eco-friendly products, free estimates.",
  "A barber shop named Corte Real in Miami — fades, beard trims, hot towel shaves, walk-ins welcome.",
];

/** "Create a new site" — describe a business and AI picks the closest template
 *  (reusing its photos + layout), then the editor opens seeded and AI rewrites
 *  the copy for the described business. You can also pick a layout manually.
 *  Open to everyone. */
export default function CreateSite() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generated, setGenerated] = useState<BusinessTemplate | null>(null);
  const [seedMessage, setSeedMessage] = useState("");

  async function generate() {
    const p = prompt.trim();
    if (!p || loading) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.BASE_URL}api/generate-template`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: p,
          // Keep AI drafts always bilingual: exclude language-locked templates
          // (e.g. the Spanish-only dealership) from the candidate pool.
          templates: TEMPLATES.filter((t) => !t.lockedLang).map((t) => ({
            slug: t.slug,
            industry: t.industry,
            industryEs: t.industryEs,
          })),
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Server returned ${res.status}`);
      }
      const data = (await res.json()) as GenerateResult;
      const base = getTemplate(data.baseSlug) ?? getTemplate(TEMPLATES[0].slug);
      if (!base) throw new Error("Could not load a starting template — try again.");
      setSeedMessage(p);
      setGenerated(base);
      window.scrollTo({ top: 0 });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  // Once AI has chosen a base, hand off to the full customizer (edit every
  // field/photo, tune with AI, create a share link). It auto-sends the user's
  // description so the AI writes the copy for their business on arrival.
  if (generated) {
    return (
      <div>
        {/* Floated top-left and above the editor's overlay (z-50) so it stays
            clickable while the drawer is open, and clear of the right-side drawer. */}
        <div className="fixed top-2 left-2 z-[60] flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="font-medium shadow-lg bg-background/90 backdrop-blur border border-border/60"
            onClick={() => {
              setGenerated(null);
              setSeedMessage("");
            }}
            data-testid="button-back-to-create"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Start over
          </Button>
          <div className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-primary bg-background/90 backdrop-blur border border-border/60 rounded-md px-2.5 py-1.5 shadow-lg">
            <Wand2 className="w-3.5 h-3.5" /> AI-generated draft
          </div>
        </div>
        <CustomizerWrapper original={generated} startOpen initialMessage={seedMessage} />
      </div>
    );
  }

  return (
    <Layout>
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest bg-primary/15 text-primary px-2.5 py-1 rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5" /> New site
        </div>
        <h1 className="font-display text-3xl sm:text-4xl tracking-tight mb-2">
          <span className="text-gradient">Create a new site</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Describe the business and AI builds a starting site for you — it picks the closest template (reusing
          its photos and layout) and writes the copy for your business in English and Spanish. The editor opens
          seeded with it, so you can change every word and photo and create a share link.
        </p>
      </div>

      {/* AI create box */}
      <div className="rounded-2xl border border-primary/40 bg-primary/[0.06] backdrop-blur p-5 sm:p-6 mb-10 shadow-[0_0_40px_rgba(255,0,255,0.08)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg grid place-items-center bg-primary text-primary-foreground shadow-lg">
            <Wand2 className="w-4 h-4" />
          </div>
          <div className="font-display text-lg">Build a site with AI</div>
        </div>
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "Enter") generate();
          }}
          placeholder="Describe the business: name, what they do, city, key services, phone… e.g. “A family-run painting company in Dallas called Colores Pro — interior & exterior, cabinet refinishing, free quotes.”"
          rows={4}
          className="resize-none bg-background/60 mb-3"
          data-testid="input-ai-prompt"
          disabled={loading}
        />
        <div className="flex flex-wrap gap-1.5 mb-4">
          {EXAMPLE_PROMPTS.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPrompt(ex)}
              disabled={loading}
              className="text-[11px] leading-tight text-left text-muted-foreground hover:text-foreground border border-border/60 hover:border-primary/50 rounded-full px-2.5 py-1 transition-colors max-w-full truncate"
              data-testid={`chip-example-${i}`}
            >
              {ex}
            </button>
          ))}
        </div>
        {error && (
          <div className="text-sm text-red-400 mb-3" data-testid="text-generate-error">
            ⚠️ {error}
          </div>
        )}
        <div className="flex items-center gap-3">
          <Button
            onClick={generate}
            disabled={loading || !prompt.trim()}
            className="font-bold bg-primary hover:bg-primary/90"
            data-testid="button-generate"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Building your site…
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" /> Generate site
              </>
            )}
          </Button>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            Reuses a matching template's photos &amp; layout. You can edit everything after.
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-border/60" />
        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Or start from a layout
        </span>
        <div className="h-px flex-1 bg-border/60" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((t) => {
          const Icon = t.brand.heroIcon;
          const p = t.brand.palette;
          return (
            <div
              key={t.slug}
              className="group relative rounded-2xl border border-border/60 bg-card/40 backdrop-blur overflow-hidden flex flex-col transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,0,255,0.12)]"
              data-testid={`layout-card-${t.slug}`}
            >
              <div className="aspect-[5/3] relative overflow-hidden bg-slate-900">
                {t.media?.hero ? (
                  <img src={t.media.hero} alt={t.industry} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                ) : (
                  <div className="absolute inset-0 grid place-items-center" style={{ background: `linear-gradient(135deg, ${p.heroIconFrom}, ${p.heroIconTo})` }}>
                    <Icon className="w-16 h-16 text-white/95 drop-shadow-2xl" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg grid place-items-center text-white shadow-lg" style={{ backgroundColor: p.primary }}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-white text-sm font-bold drop-shadow">{t.industry}</div>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground mb-5 line-clamp-2">{t.content.en.hero.subtitle}</p>
                <div className="mt-auto grid grid-cols-2 gap-2">
                  <Button asChild size="sm" variant="outline" className="w-full font-medium">
                    <a href={`${import.meta.env.BASE_URL}templates/${t.slug}/preview`} target="_blank" rel="noopener noreferrer">
                      <Eye className="w-3.5 h-3.5 mr-1.5" /> Preview
                    </a>
                  </Button>
                  <Button asChild size="sm" className="w-full font-bold bg-primary hover:bg-primary/90">
                    <a href={`${import.meta.env.BASE_URL}templates/${t.slug}/preview?customize=1`} target="_blank" rel="noopener noreferrer" data-testid={`button-start-${t.slug}`}>
                      Start <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
