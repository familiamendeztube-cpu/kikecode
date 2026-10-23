import { useRef } from "react";

/** Radix Dialog hands focus back to its Trigger on close. These dialogs open
 *  from many plain buttons, so spread this on Dialog.Content to return focus
 *  to whichever element opened it. */
export function useReturnFocus() {
  const opener = useRef<HTMLElement | null>(null);
  return {
    onOpenAutoFocus: () => {
      opener.current = document.activeElement as HTMLElement | null;
    },
    onCloseAutoFocus: (e: Event) => {
      e.preventDefault();
      opener.current?.focus();
    },
  };
}
