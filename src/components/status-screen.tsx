import type { ReactNode } from "react";
import { AlertCircle, Loader2 } from "lucide-react";

/** Full-page notice where a client site would be: loading, gone, not found, failed. */
export function StatusScreen({ title, detail, kind = "info" }: {
  title: string;
  detail?: ReactNode;
  kind?: "loading" | "info" | "error";
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      {kind === "loading" ? (
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm">{title}</span>
        </div>
      ) : (
        <div className="max-w-md text-center space-y-3">
          <AlertCircle className={`w-10 h-10 mx-auto ${kind === "error" ? "text-red-500" : "text-slate-400"}`} />
          <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
          {detail && <p className="text-sm text-slate-600">{detail}</p>}
        </div>
      )}
    </div>
  );
}
