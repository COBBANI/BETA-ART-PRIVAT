import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { record } from "./behavior";

export type Page = "home" | "categories" | "faq" | "request-a-shoot" | "cart" | "sell" | "plate" | "artists" | "prices" | "auth" | "feedback" | "admin";

const PageContext = createContext<{
  page: Page;
  plateId: string | null;
  go: (p: Page, hash?: string) => void;
  goToPlate: (id: string) => void;
}>({
  page: "home",
  plateId: null,
  go: () => {},
  goToPlate: () => {},
});

export function PageProvider({ children }: { children: ReactNode }) {
  // The owner's sales dashboard is unlinked but reachable at /#admin — a
  // deliberate hidden entry (no backend to gate it; see lib/sales.ts).
  const initial: Page = typeof window !== "undefined" && window.location.hash === "#admin" ? "admin" : "home";
  const [page, setPage] = useState<Page>(initial);
  const [plateId, setPlateId] = useState<string | null>(null);

  const go = (p: Page, hash?: string) => {
    // Behavior layer: every navigation is recorded on-device (never sent
    // anywhere) — see lib/behavior.ts.
    record({ t: "page", page: p });
    setPage(p);
    window.scrollTo({ top: 0 });
    if (p === "home" && hash) {
      // let the page mount, then scroll to the section
      requestAnimationFrame(() => {
        document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      });
    }
  };

  const goToPlate = (id: string) => {
    setPlateId(id);
    setPage("plate");
    window.scrollTo({ top: 0 });
  };

  // Let #admin be entered from the URL bar / a bookmark without a full
  // reload — the owner's hidden entry to the sales dashboard.
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === "#admin") setPage("admin");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return <PageContext.Provider value={{ page, plateId, go, goToPlate }}>{children}</PageContext.Provider>;
}

export function usePage() {
  return useContext(PageContext);
}
