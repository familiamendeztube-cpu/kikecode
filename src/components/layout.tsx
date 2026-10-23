import { Link } from "wouter";
import { LayoutTemplate } from "lucide-react";
import type { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-6xl">
          <Link href="/" className="flex items-center gap-3 text-2xl font-display uppercase tracking-widest text-primary hover:text-primary/80 transition-colors">
            <span className="bg-primary text-primary-foreground p-1.5 rounded-sm skew-x-[-10deg]">
              <LayoutTemplate className="w-5 h-5 skew-x-[10deg]" />
            </span>
            Kike Code
          </Link>
          <nav className="flex items-center gap-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors hidden sm:block">
              Templates
            </Link>
            <Link href="/videos" className="hover:text-primary transition-colors">
              My Videos
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
        {children}
      </main>
    </div>
  );
}
