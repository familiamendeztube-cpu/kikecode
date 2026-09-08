import { useLocation, Link } from "wouter";
import { Plus, LayoutGrid, Radio } from "lucide-react";

export function OperatorBar() {
  const [location] = useLocation();

  // Keep client-facing pages completely public/clean.
  const isClientView = location.startsWith("/share") || location.startsWith("/video");
  if (isClientView) return null;

  return (
    <div className="w-full border-b border-border/50 bg-background/80 backdrop-blur">
      <div className="container mx-auto max-w-6xl px-4 h-10 flex items-center justify-end">
        <div className="flex items-center gap-1.5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-foreground/5"
            data-testid="link-gallery"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Templates</span>
          </Link>
          <Link
            href="/demos"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-foreground/5"
            data-testid="link-demos"
          >
            <Radio className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Live demos</span>
          </Link>
          <Link
            href="/create"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest bg-fuchsia-600 hover:bg-fuchsia-500 text-white transition-colors px-2.5 py-1 rounded-md"
            data-testid="link-create-site"
          >
            <Plus className="w-3.5 h-3.5" />
            New site
          </Link>
        </div>
      </div>
    </div>
  );
}
