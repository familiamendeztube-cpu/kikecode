import { createContext, useContext, useState, type ReactNode } from "react";
import type { Lang } from "@/templates/types";

/*
  The staff editor's language: Spanish unless the staff member switched to
  English, remembered in this browser. Screens read it with useOperatorLang()
  and word their copy with pick(lang, "English", "Español").
*/

const KEY = "kike-operator-lang";

function storedLang(): Lang {
  try {
    return localStorage.getItem(KEY) === "en" ? "en" : "es";
  } catch {
    return "es";
  }
}

const OperatorLang = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({ lang: "es", setLang: () => {} });

export function OperatorLangProvider({ children }: { children: ReactNode }) {
  const [lang, setState] = useState<Lang>(storedLang);
  function setLang(next: Lang) {
    setState(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      // Private mode: the choice lasts until the tab closes.
    }
  }
  return <OperatorLang.Provider value={{ lang, setLang }}>{children}</OperatorLang.Provider>;
}

export function useOperatorLang() {
  return useContext(OperatorLang);
}
