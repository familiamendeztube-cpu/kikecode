import { Button } from "@/components/ui/button";
import { ArrowRight, Eye } from "lucide-react";
import { TEMPLATES } from "@/lib/templates";
import { Layout } from "@/components/layout";

export default function Templates() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl tracking-tight mb-2">
          <span className="text-gradient">Website Templates</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Dozens of state-of-the-art bilingual templates built for the businesses Latino entrepreneurs actually run.
          Preview live, then click <strong className="text-foreground">Customize</strong> to fill in a client's
          details, tune the copy, and create a share link.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((t) => {
          const Icon = t.brand.heroIcon;
          const p = t.brand.palette;
          return (
            <div
              key={t.slug}
              className="group relative rounded-2xl border border-border/60 bg-card/40 backdrop-blur overflow-hidden flex flex-col transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(255,0,255,0.12)]"
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
                <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest bg-black/50 backdrop-blur text-white px-2 py-1 rounded-full">
                  Bilingual EN/ES
                </div>
                <div className="absolute top-3 right-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest bg-white/15 backdrop-blur border border-white/25 text-white px-2 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 24/7
                </div>
                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg grid place-items-center text-white shadow-lg" style={{ backgroundColor: p.primary }}>
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="text-white text-sm font-bold drop-shadow">{t.brand.name}</div>
                </div>
              </div>

              <a
                href={`${import.meta.env.BASE_URL}templates/${t.slug}/preview`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10"
                aria-label={`Preview ${t.brand.name}`}
              />

              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-display text-lg tracking-tight mb-1">{t.industry}</h3>
                <p className="text-xs text-muted-foreground/80 mb-3">
                  <span className="font-semibold text-foreground/70">Spanish:</span> {t.industryEs}
                </p>
                <p className="text-sm text-muted-foreground mb-5 line-clamp-2">{t.content.en.hero.subtitle}</p>

                <div className="mt-auto grid grid-cols-2 gap-2 relative z-20">
                  <Button asChild size="sm" className="w-full font-bold bg-primary hover:bg-primary/90">
                    <a href={`${import.meta.env.BASE_URL}templates/${t.slug}/preview`} target="_blank" rel="noopener noreferrer">
                      <Eye className="w-3.5 h-3.5 mr-1.5" /> View Live
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline" className="w-full font-medium">
                    <a href={`${import.meta.env.BASE_URL}templates/${t.slug}/preview?customize=1`} target="_blank" rel="noopener noreferrer">
                      Customize <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border border-border/40 bg-background/40 p-5 text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">How it works:</span>{" "}
        <strong>View Live</strong> opens the template with placeholder business data so you can see exactly what your customer will get.{" "}
        <strong>Customize</strong> opens the same live preview with the editor drawer already open — fill in the client's name, phone, photos, tune the copy with AI, then hit <em>Create share link</em> to get a URL you can text or email to the client.
      </div>
    </Layout>
  );
}
