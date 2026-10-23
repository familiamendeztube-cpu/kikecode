import { useState } from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, ExternalLink } from "lucide-react";
import { CLIENT_VIDEOS, videoShareUrl } from "@/lib/client-videos";

export default function Videos() {
  const [copied, setCopied] = useState<string | null>(null);

  async function copy(id: string) {
    try {
      await navigator.clipboard.writeText(videoShareUrl(id));
      setCopied(id);
      setTimeout(() => setCopied((c) => (c === id ? null : c)), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="font-display text-3xl sm:text-4xl tracking-tight mb-2">
          <span className="text-gradient">My Videos</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          The commercials you made for clients. Watch them here, then copy a shareable link for
          any video and send it straight to a client — each link opens a clean, branded page with
          a call button.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {CLIENT_VIDEOS.map((v) => (
          <div
            key={v.id}
            className="rounded-2xl border border-border/60 bg-card/40 backdrop-blur overflow-hidden flex flex-col"
          >
            <div className="grid place-items-center bg-black">
              <video
                className="w-full max-h-[60vh] aspect-[9/16] object-contain bg-black"
                src={v.src}
                poster={v.poster}
                controls
                playsInline
                preload="none"
              />
            </div>
            <div className="p-5 flex flex-col gap-3">
              <div>
                <h3 className="font-display text-lg tracking-tight">{v.label}</h3>
                <p className="text-xs text-muted-foreground/80 mt-0.5">
                  {v.title.en} · {v.title.es}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={videoShareUrl(v.id)}
                  className="h-9 text-xs font-mono"
                  data-testid={`input-video-link-${v.id}`}
                  onFocus={(e) => e.currentTarget.select()}
                />
                <Button
                  size="sm"
                  className="h-9 px-3 shrink-0 font-bold"
                  onClick={() => copy(v.id)}
                  data-testid={`button-copy-video-${v.id}`}
                >
                  {copied === v.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="ml-1.5 hidden sm:inline">{copied === v.id ? "Copied" : "Copy"}</span>
                </Button>
                <Button asChild size="sm" variant="outline" className="h-9 px-3 shrink-0">
                  <a
                    href={videoShareUrl(v.id)}
                    target="_blank"
                    rel="noreferrer"
                    title="Open share page"
                    data-testid={`link-open-video-${v.id}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
