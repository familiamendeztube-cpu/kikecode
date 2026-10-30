import { useState } from "react";
import {
  Send, Upload, X, Loader2, RotateCcw, Image as ImageIcon, ChevronRight,
  Share2, Copy, Check, ExternalLink, Paperclip, Rocket, Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ChatMsg } from "./ai";
import { MAX_GALLERY_PHOTOS, MAX_TOTAL_PHOTOS } from "./images";
import { BASIS_TEXT, BLOCKER_TEXT, OVERRIDE_REASON_MIN, STATUS_LABEL, type SiteLifecycle } from "./lifecycle";
import type { BrandFields } from "./save";

/* The customizer drawer's sections. They only render: the site's state and
   every action live in customizer.tsx and lifecycle.ts (a panel keeps only
   what is being typed into it). */

const sectionTitle = "text-xs uppercase tracking-wider text-slate-400 font-semibold";

export function ClientInfoPanel({ fields, onChange, onApply }: {
  fields: BrandFields;
  onChange: (fields: BrandFields) => void;
  onApply: () => void;
}) {
  const field = (key: keyof BrandFields) => (
    <Input value={fields[key]} onChange={(e) => onChange({ ...fields, [key]: e.target.value })} onBlur={onApply}
      className="bg-slate-900 border-slate-700 text-white" data-testid={`input-${key}`} />
  );
  return (
    <section className="space-y-3">
      <h3 className={sectionTitle}>Client info</h3>
      <div className="space-y-2">
        <div>
          <Label className="text-xs text-slate-300">Business name</Label>
          {field("name")}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs text-slate-300">Phone</Label>
            {field("phone")}
          </div>
          <div>
            <Label className="text-xs text-slate-300">City</Label>
            {field("city")}
          </div>
        </div>
        <div>
          <Label className="text-xs text-slate-300">Address</Label>
          {field("address")}
        </div>
        <div>
          <Label className="text-xs text-slate-300">Email</Label>
          {field("email")}
        </div>
        <Button size="sm" variant="secondary" className="w-full" onClick={onApply} data-testid="button-apply">
          <ChevronRight className="w-3.5 h-3.5 mr-1" /> Apply to preview
        </Button>
      </div>
    </section>
  );
}

export function PhotosPanel({ photoCount, notice, onHero, onGallery }: {
  photoCount: number;
  notice: string | null;
  onHero: (file: File) => void;
  onGallery: (files: FileList) => void;
}) {
  return (
    <section className="space-y-3">
      <h3 className={sectionTitle}>Client photos (quick)</h3>
      <div className="grid grid-cols-2 gap-2">
        <label className="flex flex-col items-center justify-center gap-1.5 px-3 py-4 rounded-lg border-2 border-dashed border-slate-700 hover:border-fuchsia-500 hover:bg-slate-900/60 cursor-pointer transition text-center">
          <ImageIcon className="w-5 h-5 text-fuchsia-400" />
          <span className="text-xs font-medium text-slate-300">Hero photo</span>
          <span className="text-[10px] text-slate-500">replaces main image</span>
          <input type="file" accept="image/*" className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) onHero(f); e.target.value = ""; }}
            data-testid="input-hero-photo" />
        </label>
        <label className="flex flex-col items-center justify-center gap-1.5 px-3 py-4 rounded-lg border-2 border-dashed border-slate-700 hover:border-fuchsia-500 hover:bg-slate-900/60 cursor-pointer transition text-center">
          <Upload className="w-5 h-5 text-fuchsia-400" />
          <span className="text-xs font-medium text-slate-300">Gallery photos</span>
          <span className="text-[10px] text-slate-500">up to {MAX_GALLERY_PHOTOS} at a time</span>
          <input type="file" accept="image/*" multiple className="hidden"
            onChange={(e) => { const fs = e.target.files; if (fs?.length) onGallery(fs); e.target.value = ""; }}
            data-testid="input-gallery-photos" />
        </label>
      </div>
      <p className="text-[10px] text-slate-500">Max 6 MB per photo, {MAX_TOTAL_PHOTOS} total. Photos are saved with the site when you save it.</p>
      {photoCount > 0 && (
        <p className="text-[11px] text-emerald-400">✓ {photoCount} photo(s) loaded into preview</p>
      )}
      {notice && (
        <p className="text-[11px] text-amber-400">{notice}</p>
      )}
    </section>
  );
}

export type ShareState = { url: string; copied: boolean } | null;

export function SharePanel({
  clients, clientId, onClientId, customDomain, onCustomDomain, saved, saving, error, share, onSave, onCopy,
}: {
  clients: { id: string; business_name: string }[];
  clientId: string;
  onClientId: (id: string) => void;
  customDomain: string;
  onCustomDomain: (domain: string) => void;
  /** Already saved once: the button updates the site instead of creating one. */
  saved: boolean;
  saving: boolean;
  error: string | null;
  share: ShareState;
  onSave: () => void;
  onCopy: () => void;
}) {
  return (
    <section className="space-y-2 rounded-lg border border-fuchsia-700/40 bg-gradient-to-br from-fuchsia-950/40 to-purple-950/30 p-3">
      <h3 className="text-xs uppercase tracking-wider text-fuchsia-300 font-semibold flex items-center gap-1.5">
        <Share2 className="w-3.5 h-3.5" /> Save &amp; share a preview
      </h3>
      <p className="text-[11px] text-slate-400">
        Saving keeps a private draft and gives you a preview link for the client. Nothing goes public until you publish below.
      </p>
      <div className="space-y-2">
        <div>
          <Label className="text-xs text-slate-300">PLW client (optional)</Label>
          <select
            value={clientId}
            onChange={(e) => onClientId(e.target.value)}
            className="w-full h-9 rounded-md bg-slate-900 border border-slate-700 text-white text-sm px-2"
            data-testid="select-plw-client"
          >
            <option value="">Demo — sin cliente</option>
            {clients.map((c) => <option key={c.id} value={c.id}>{c.business_name}</option>)}
          </select>
          <p className="text-[10px] text-slate-500 mt-1">
            Only a linked site can be published. It shows the client's PLW number and sends its form leads to them.
          </p>
        </div>
        <div>
          <Label className="text-xs text-slate-300">Client domain (optional)</Label>
          <Input
            value={customDomain}
            onChange={(e) => onCustomDomain(e.target.value)}
            placeholder="negocio.com"
            className="bg-slate-900 border-slate-700 text-white"
            data-testid="input-custom-domain"
          />
        </div>
      </div>
      <Button onClick={onSave} disabled={saving} size="sm"
        className="w-full bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white border-0"
        data-testid="button-share-client">
        {saving ? (
          <><Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> Saving…</>
        ) : (
          <><Share2 className="w-3.5 h-3.5 mr-1.5" /> {saved ? "Save draft" : "Save draft & get preview link"}</>
        )}
      </Button>
      {error && <p className="text-[11px] text-red-400">{error}</p>}
      {share && (
        <div className="space-y-1.5 pt-1">
          <div className="flex items-stretch gap-1.5">
            <Input readOnly value={share.url}
              className="bg-slate-950 border-slate-700 text-white text-[11px] h-8 px-2"
              onFocus={(e) => e.currentTarget.select()}
              data-testid="input-share-url" />
            <Button size="sm" variant="secondary" onClick={onCopy}
              className="h-8 px-2.5 shrink-0" data-testid="button-copy-share">
              {share.copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            </Button>
            <a href={share.url} target="_blank" rel="noreferrer"
              className="h-8 px-2.5 shrink-0 inline-flex items-center justify-center rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200"
              title="Open in new tab" data-testid="link-open-share">
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <p className="text-[10px] text-emerald-400">
            ✓ Draft saved. This preview link shows it to your client on any phone; its forms send nothing.
          </p>
        </div>
      )}
    </section>
  );
}

function LinkRow({ url, label }: { url: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[10px] text-slate-400 w-14 shrink-0">{label}</span>
      <a href={url} target="_blank" rel="noreferrer" className="min-w-0 flex-1 truncate text-[11px] text-sky-300 hover:underline">{url}</a>
      <ExternalLink className="w-3 h-3 text-slate-500 shrink-0" />
    </div>
  );
}

const smallButton = "h-7 px-2.5 text-[11px]";

/** Publishing, approval, rollback, status and the domain check of a saved site. */
export function PublishPanel({ lifecycle, previewLink, publicLink, templateNotice }: {
  lifecycle: SiteLifecycle;
  previewLink: string | null;
  publicLink: string | null;
  /** Set when the template changed since this site was saved. */
  templateNotice: string | null;
}) {
  const [note, setNote] = useState("");
  const [how, setHow] = useState("");
  const [reason, setReason] = useState("");
  const { site, history, busy, held, error, domainCheck } = lifecycle;
  if (!site) {
    return error ? <p className="text-[11px] text-red-400">{error}</p> : null;
  }
  const live = history?.published_revision_id ?? null;
  const pending = held?.blockers.includes("approval_required") ? held.revision : null;

  return (
    <section className="space-y-3 rounded-lg border border-emerald-700/40 bg-emerald-950/20 p-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs uppercase tracking-wider text-emerald-300 font-semibold flex items-center gap-1.5">
          <Rocket className="w-3.5 h-3.5" /> Publish
        </h3>
        <span className="text-[10px] font-semibold rounded-full px-2 py-0.5 bg-slate-800 text-slate-200" data-testid="site-status">
          {STATUS_LABEL[site.status]}
        </span>
      </div>

      {previewLink && <LinkRow url={previewLink} label="Preview" />}
      {publicLink && site.status === "published" && <LinkRow url={publicLink} label="Public" />}
      {site.published_basis && (
        <p className="text-[10px] text-slate-400" data-testid="published-basis">
          Live version published on: {BASIS_TEXT[site.published_basis]}{site.published_basis_note ? ` (${site.published_basis_note})` : ""}
        </p>
      )}
      {templateNotice && <p className="text-[11px] text-amber-300">{templateNotice}</p>}

      {site.status !== "archived" && (
        <div className="space-y-1.5">
          <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="What changed? (optional)"
            className="bg-slate-900 border-slate-700 text-white h-8 text-xs" />
          <Button size="sm" disabled={!!busy} onClick={() => lifecycle.publish(note)}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white border-0" data-testid="button-publish">
            {busy === "publish" ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Rocket className="w-3.5 h-3.5 mr-1.5" />}
            Publish the saved draft
          </Button>
          <p className="text-[10px] text-slate-500">Save first: publishing uses the last saved draft, not unsaved edits.</p>
        </div>
      )}

      {held && (
        <div className="space-y-2 rounded-md border border-amber-600/40 bg-amber-950/30 p-2">
          {held.blockers.map((b) => <p key={b} className="text-[11px] text-amber-200">{BLOCKER_TEXT[b]}</p>)}
          {pending && (
            <div className="space-y-1.5">
              <p className="text-[10px] text-slate-300">Only if the client really approved version {pending.number}:</p>
              <Input value={how} onChange={(e) => setHow(e.target.value)} placeholder="How did the client approve? (WhatsApp 30 Oct, call…)"
                className="bg-slate-900 border-slate-700 text-white h-8 text-xs" />
              <Button size="sm" disabled={!!busy || !how.trim()} onClick={() => lifecycle.approveAndPublish(pending.id, how)}
                className={`${smallButton} w-full bg-amber-600 hover:bg-amber-500 text-white border-0`} data-testid="button-approve-publish">
                {busy === "approve" && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                Record the client's approval and publish
              </Button>
            </div>
          )}
          {pending && held.canOverride && (
            <div className="space-y-1.5 border-t border-amber-600/30 pt-2">
              <p className="text-[10px] text-slate-300">
                Admin: publish without the client's approval. It is recorded as an override with your reason, never as the client's approval.
              </p>
              <Input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason (required)"
                className="bg-slate-900 border-slate-700 text-white h-8 text-xs" />
              <Button size="sm" variant="secondary" disabled={!!busy || reason.trim().length < OVERRIDE_REASON_MIN}
                onClick={() => lifecycle.overrideAndPublish(pending.id, reason)} className={`${smallButton} w-full`} data-testid="button-override-publish">
                {busy === "override" && <Loader2 className="w-3 h-3 mr-1 animate-spin" />}
                Publish as admin override
              </Button>
            </div>
          )}
        </div>
      )}
      {error && <p className="text-[11px] text-red-400">{error}</p>}

      <div className="flex flex-wrap gap-1.5">
        {site.status === "published" && (
          <Button size="sm" variant="secondary" disabled={!!busy} className={smallButton} onClick={() => lifecycle.setStatus("suspended")}>Suspend</Button>
        )}
        {site.status === "suspended" && (
          <Button size="sm" variant="secondary" disabled={!!busy} className={smallButton} onClick={() => lifecycle.setStatus("published")}>Resume</Button>
        )}
        {site.status === "archived" ? (
          <Button size="sm" variant="secondary" disabled={!!busy} className={smallButton} onClick={() => lifecycle.setStatus("draft")}>Restore as draft</Button>
        ) : (
          <Button size="sm" variant="secondary" disabled={!!busy} className={smallButton}
            onClick={() => { if (window.confirm("Archive this site? It stops being public and its preview link stops working.")) lifecycle.setStatus("archived"); }}>
            Archive
          </Button>
        )}
        <Button size="sm" variant="secondary" disabled={!!busy} className={smallButton} onClick={lifecycle.rotatePreview}
          title="The old preview link stops working">
          New preview link
        </Button>
      </div>

      {site.custom_domain && (
        <div className="space-y-1.5 rounded-md border border-slate-700 p-2">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] text-slate-200 flex items-center gap-1"><Globe className="w-3 h-3" /> {site.custom_domain}</span>
            <span className="text-[10px] text-slate-400">{site.domain_status}</span>
          </div>
          {site.domain_status !== "active" && site.domain_token && (
            <p className="text-[10px] text-slate-400 leading-relaxed">
              1. Add a DNS TXT record: <code className="text-slate-200">_kikecode.{site.custom_domain}</code> ={" "}
              <code className="text-slate-200 break-all">kikecode-verify={site.domain_token}</code>.
              {" "}2. Add the domain to Kike Code's hosting and point its DNS there (see the domain guide). 3. Check it:
            </p>
          )}
          {domainCheck && (
            <p className="text-[10px] text-slate-300">
              {domainCheck.domain_error === "txt_not_found" ? "TXT record not found yet (DNS can take a while)."
                : domainCheck.domain_error === "not_serving" ? "Ownership verified. The domain does not show the site yet."
                  : "The domain serves the site."}
            </p>
          )}
          <Button size="sm" variant="secondary" disabled={!!busy} className={smallButton} onClick={lifecycle.verifyDomain}>
            {busy === "domain" && <Loader2 className="w-3 h-3 mr-1 animate-spin" />} Check domain
          </Button>
        </div>
      )}

      {history && history.revisions.length > 0 && (
        <div className="space-y-1">
          <div className="text-[10px] uppercase tracking-wider text-slate-500">Versions</div>
          {history.revisions.slice(0, 8).map((rev) => (
            <div key={rev.id} className="flex items-center gap-2 text-[11px] text-slate-300">
              <span className="w-6 shrink-0 font-semibold">#{rev.number}</span>
              <span className="min-w-0 flex-1 truncate" title={rev.note ?? undefined}>
                {new Date(rev.created_at).toLocaleDateString()} {rev.note ? `· ${rev.note}` : ""}
                {rev.approved_at ? " · ✓ approved" : ""}
              </span>
              {rev.id === live ? (
                <span className="text-emerald-400 text-[10px]">live</span>
              ) : site.status !== "archived" && (
                <button type="button" disabled={!!busy} onClick={() => lifecycle.publishRevision(rev.id)}
                  className="text-[10px] text-sky-300 hover:underline disabled:opacity-50">
                  Publish this
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function AiChatLog({ chat, sending, error }: { chat: ChatMsg[]; sending: boolean; error: string | null }) {
  return (
    <section className="space-y-2">
      <h3 className={sectionTitle}>AI assistant</h3>
      <p className="text-[11px] text-slate-500">
        Tell the AI what to change in plain language: "make it sound more elegant", "add their 25 years of experience to the hero", "translate this for a Cuban audience in Miami"…
      </p>

      <div className="space-y-2 max-h-64 overflow-y-auto">
        {chat.length === 0 && (
          <div className="rounded-lg bg-slate-900/50 border border-slate-800 px-3 py-2.5 text-xs text-slate-400">
            👋 Try: <em>"This is for Tomas, owner of Tomas Plumbing in Phoenix. He's been in business 20 years and offers 24-hour emergency service."</em>
          </div>
        )}
        {chat.map((m, i) => (
          <div key={i} className={`rounded-lg px-3 py-2 text-xs whitespace-pre-wrap ${
            m.role === "user"
              ? "bg-fuchsia-600/15 border border-fuchsia-700/30 text-fuchsia-50 ml-4"
              : "bg-slate-900 border border-slate-800 text-slate-200 mr-4"
          }`} data-testid={`chat-msg-${i}`}>
            {m.content}
          </div>
        ))}
        {sending && (
          <div className="flex items-center gap-2 text-xs text-slate-500 px-3 py-2">
            <Loader2 className="w-3.5 h-3.5 animate-spin" /> AI is rewriting your template…
          </div>
        )}
      </div>
      {error && <div className="text-[11px] text-red-400 px-1">{error}</div>}
    </section>
  );
}

export function AiComposer({
  input, onInput, pendingImages, onRemoveImage, onAttach, onSend, sending, onReset, onClose,
}: {
  input: string;
  onInput: (text: string) => void;
  /** Photos attached to the next message. */
  pendingImages: string[];
  onRemoveImage: (index: number) => void;
  onAttach: (files: File[]) => void;
  onSend: () => void;
  sending: boolean;
  onReset: () => void;
  onClose: () => void;
}) {
  return (
    <div className="border-t border-slate-800 px-4 py-3 bg-slate-900/60 space-y-2">
      {pendingImages.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {pendingImages.map((src, i) => (
            <div key={i} className="relative">
              <img src={src} alt="" className="w-12 h-12 rounded object-cover border border-slate-700" />
              <button
                type="button"
                onClick={() => onRemoveImage(i)}
                className="absolute -top-1.5 -right-1.5 bg-slate-800 border border-slate-600 rounded-full p-0.5 text-slate-300 hover:text-white"
                aria-label="Remove photo"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
      <Textarea
        value={input}
        onChange={(e) => onInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        placeholder="Message the AI… (Enter to send)"
        rows={2}
        maxLength={4000}
        className="resize-none bg-slate-950 border-slate-700 text-white text-sm placeholder:text-slate-600"
        data-testid="textarea-chat-input"
      />
      <div className="flex items-center gap-2">
        <label
          className="shrink-0 h-9 w-9 inline-flex items-center justify-center rounded-md bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white cursor-pointer"
          title="Attach client photos"
          data-testid="label-attach-photos"
        >
          <Paperclip className="w-4 h-4" />
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              const fs = e.target.files;
              if (fs?.length) onAttach(Array.from(fs));
              e.target.value = "";
            }}
            data-testid="input-chat-photos"
          />
        </label>
        <Button onClick={onSend} disabled={sending || (!input.trim() && pendingImages.length === 0)}
          className="flex-1 bg-gradient-to-r from-fuchsia-600 to-purple-600 hover:from-fuchsia-500 hover:to-purple-500 text-white border-0"
          data-testid="button-send-chat">
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4 mr-1.5" /> Send</>}
        </Button>
        <Button variant="outline" size="icon" onClick={onReset}
          className="bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
          title="Reset everything" data-testid="button-reset">
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onClose}
          className="text-slate-400 hover:text-white hover:bg-slate-800" title="Close">
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
