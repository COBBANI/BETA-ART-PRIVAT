import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { type Lang, translate } from "./i18n";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (key: string) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => k,
});

function detectInitialLang(): Lang {
  try {
    const stored = localStorage.getItem("beta-art-lang") as Lang | null;
    if (stored) return stored;
  } catch {
    /* ignore */
  }
  return "en";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  // A11y/SEO: keep <html lang> in sync on FIRST load too, not only on a
  // user switch. index.html hardcodes lang="en", so a returning visitor
  // whose stored language is e.g. Norwegian would otherwise get the wrong
  // lang attribute over correct-language content, which screen readers
  // announce incorrectly. (Daily improve tour, 03.09.2026.)
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem("beta-art-lang", l);
    } catch {
      /* ignore */
    }
    // <html lang> is kept in sync by the effect above.
  };

  const t = (key: string) => translate(lang, key as never);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
