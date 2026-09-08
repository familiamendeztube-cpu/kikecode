import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { LayoutTemplate, Loader2, Terminal } from "lucide-react";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
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

export function LoadingState({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="p-4 rounded-full mb-6 text-primary shadow-[0_0_30px_rgba(255,0,255,0.3)] animate-pulse border border-primary/20">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
      <h3 className="text-2xl font-display uppercase tracking-widest text-foreground">{message}</h3>
    </div>
  );
}

export function ErrorState({ error, retry }: { error: any; retry?: () => void }) {
  const message = error?.data?.message || error?.message || "Something went wrong.";
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-destructive/10 rounded-xl border border-destructive/30 backdrop-blur-sm">
      <div className="p-4 rounded-full mb-4 bg-destructive/20 border border-destructive/50">
        <Terminal className="w-10 h-10 text-destructive" />
      </div>
      <h3 className="text-2xl font-display uppercase tracking-widest text-destructive">Something Went Wrong</h3>
      <p className="text-destructive/80 mt-2 max-w-sm mb-6 font-medium">{message}</p>
      {retry && (
        <Button variant="outline" onClick={retry} className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground font-bold uppercase tracking-wider">
          Try again
        </Button>
      )}
    </div>
  );
}
