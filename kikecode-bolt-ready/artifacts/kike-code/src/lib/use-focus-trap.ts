import { useEffect, useRef } from "react";

export function useFocusTrap(isOpen: boolean, ref: React.RefObject<HTMLElement | null>, onClose: () => void) {
  const previousFocus = useRef<HTMLElement | null>(null);
  
  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
      const timer = setTimeout(() => {
        if (ref.current) {
          const focusables = Array.from(ref.current.querySelectorAll<HTMLElement>('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled'));
          if (focusables.length > 0) {
            focusables[0].focus();
          } else {
            ref.current.focus();
          }
        }
      }, 10);
      return () => clearTimeout(timer);
    } else if (previousFocus.current) {
      previousFocus.current.focus();
      previousFocus.current = null;
    }
    return undefined;
  }, [isOpen, ref]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !ref.current) return;
      const focusables = Array.from(ref.current.querySelectorAll<HTMLElement>('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(el => !el.hasAttribute('disabled'));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { 
        e.preventDefault(); 
        last.focus(); 
      } else if (!e.shiftKey && document.activeElement === last) { 
        e.preventDefault(); 
        first.focus(); 
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, ref, onClose]);
}
