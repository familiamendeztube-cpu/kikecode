import { createContext, useContext, useRef, type ReactNode, type ElementType, type CSSProperties } from "react";
import type { EditPath } from "@/components/site-editor";

type EditCtx = {
  editing: boolean;
  onText: (path: EditPath, value: string) => void;
  onImage: (path: EditPath, file: File) => void;
};

const Ctx = createContext<EditCtx>({
  editing: false,
  onText: () => {},
  onImage: () => {},
});

export function EditProvider({
  editing, onText, onImage, children,
}: {
  editing: boolean;
  onText: (path: EditPath, value: string) => void;
  onImage: (path: EditPath, file: File) => void;
  children: ReactNode;
}) {
  return <Ctx.Provider value={{ editing, onText, onImage }}>{children}</Ctx.Provider>;
}

export function useEditing(): boolean {
  return useContext(Ctx).editing;
}

/** Inline click-to-edit text. When not in editor context it renders a plain
 *  element, so the client/share view is completely unaffected. */
export function EditableText({
  path, value, as, className, style, multiline,
}: {
  path: EditPath;
  value: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  multiline?: boolean;
}) {
  const { editing, onText } = useContext(Ctx);
  const As = (as ?? "span") as any;
  if (!editing) {
    return <As className={className} style={style}>{value}</As>;
  }
  return (
    <As
      className={`${className ?? ""} outline-dashed outline-1 outline-fuchsia-400/40 hover:outline-fuchsia-400 focus:outline-fuchsia-500 focus:outline-2 rounded-[3px] transition-[outline] cursor-text`}
      style={style}
      contentEditable
      suppressContentEditableWarning
      data-testid={`inline-${path.join("-")}`}
      onKeyDown={(e: React.KeyboardEvent) => {
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          (e.currentTarget as HTMLElement).blur();
        }
      }}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const next = e.currentTarget.textContent ?? "";
        if (next !== value) onText(path, next);
      }}
    >
      {value}
    </As>
  );
}

/** Standalone "change photo" button for full-bleed images (e.g. hero) where a
 *  full overlay would block other editable content. Position it via className. */
export function ChangePhotoButton({
  path, className,
}: {
  path: EditPath;
  className?: string;
}) {
  const { editing, onImage } = useContext(Ctx);
  const ref = useRef<HTMLInputElement>(null);
  if (!editing) return null;
  return (
    <>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className={`z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-fuchsia-600/90 hover:bg-fuchsia-500 backdrop-blur text-white text-[11px] font-bold uppercase tracking-widest shadow-lg ${className ?? ""}`}
        data-testid={`inline-img-${path.join("-")}`}
      >
        Change photo
      </button>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onImage(path, f);
          e.target.value = "";
        }}
      />
    </>
  );
}

/** Overlay that turns any image container into a "change photo" target while
 *  in editor context. Wrap it around the element holding the <img>. */
export function EditableImage({
  path, children, className,
}: {
  path: EditPath;
  children: ReactNode;
  className?: string;
}) {
  const { editing, onImage } = useContext(Ctx);
  const ref = useRef<HTMLInputElement>(null);
  if (!editing) return <>{children}</>;
  return (
    <div className={`relative group/edit ${className ?? ""}`}>
      {children}
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="absolute inset-0 z-30 grid place-items-center bg-black/0 group-hover/edit:bg-black/40 opacity-0 group-hover/edit:opacity-100 transition text-white text-xs font-bold uppercase tracking-widest"
        data-testid={`inline-img-${path.join("-")}`}
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-fuchsia-600/90 backdrop-blur">
          Change photo
        </span>
      </button>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onImage(path, f);
          e.target.value = "";
        }}
      />
    </div>
  );
}
