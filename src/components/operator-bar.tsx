import { Link } from "wouter";
import { Plus, LayoutGrid, Radio, LogOut } from "lucide-react";
import { supabase } from "@/lib/plw";
import { pick } from "@/lib/i18n";
import { useOperatorLang } from "@/lib/operator-lang";

const LINK =
  "inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-foreground/5";

export function OperatorBar() {
  const { lang, setLang } = useOperatorLang();
  return (
    <div className="w-full border-b border-border/50 bg-background/80 backdrop-blur">
      <div className="container mx-auto max-w-6xl px-4 h-10 flex items-center justify-end">
        <div className="flex items-center gap-1.5">
          <Link href="/" className={LINK} data-testid="link-gallery">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{pick(lang, "Templates", "Plantillas")}</span>
          </Link>
          <Link href="/demos" className={LINK} data-testid="link-demos">
            <Radio className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{pick(lang, "Live demos", "Demos en vivo")}</span>
          </Link>
          <Link
            href="/create"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest bg-fuchsia-600 hover:bg-fuchsia-500 text-white transition-colors px-2.5 py-1 rounded-md"
            data-testid="link-create-site"
          >
            <Plus className="w-3.5 h-3.5" />
            {pick(lang, "New site", "Nuevo sitio")}
          </Link>
          <button
            type="button"
            onClick={() => setLang(lang === "es" ? "en" : "es")}
            className={LINK}
            aria-label={pick(lang, "Cambiar a español", "Switch to English")}
            data-testid="button-operator-lang"
          >
            {lang === "es" ? "EN" : "ES"}
          </button>
          <button type="button" onClick={() => void supabase.auth.signOut()} className={LINK} data-testid="button-sign-out">
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{pick(lang, "Sign out", "Salir")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
