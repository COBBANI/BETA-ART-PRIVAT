import { useEffect, useState } from "react";
import { Menu, Moon, ShoppingBag, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SealMark } from "./SealMark";
import { useTheme } from "@/lib/theme";
import { usePage, type Page } from "@/lib/router";
import { useLang } from "@/lib/langContext";
import { LANGS } from "@/lib/i18n";
import { useCart } from "@/lib/cartContext";

// Two-tier navigation (01.09.2026, user request "insan psikolojisini düşün"):
// the previous single row carried 12 text links — well past the ~7-item
// span where menu scanning stays fast (choice-overload / Hick's law).
// PRIMARY is the buyer's journey in reading order (see the work → trust it
// → licence it → price it → questions → contact); SECONDARY is context and
// community (events, bio, directories, submissions, feedback) in a slim
// top bar next to the auth links. All labels and targets are unchanged —
// only grouping and placement moved. Nav parity with the real
// beta-art.com item set is preserved (Industries/Categories both live in
// the in-site directory since the root-domain decision).

type NavItem = { label: string; page: Page; hash?: string };

function useNavItems() {
  const { t } = useLang();
  const primary: NavItem[] = [
    { label: t("navCollection"), page: "home", hash: "collection" },
    { label: t("navVerification"), page: "home", hash: "verification" },
    { label: t("navLicensing"), page: "home", hash: "licensing" },
    { label: t("navPrices"), page: "prices" },
    { label: t("navFaq"), page: "faq" },
    { label: t("navContact"), page: "request-a-shoot" },
  ];
  const secondary: NavItem[] = [
    { label: t("navEvents"), page: "home", hash: "events" },
    { label: t("navPhotographer"), page: "home", hash: "photographer" },
    { label: t("navArtists"), page: "artists" },
    { label: t("navCategories"), page: "categories" },
    { label: t("navIndustries"), page: "categories" },
    { label: t("navSell"), page: "sell" },
    { label: t("navFeedback"), page: "feedback" },
  ];
  return { primary, secondary };
}

export function Masthead() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { page, go } = usePage();
  const { lang, setLang, t } = useLang();
  const { items } = useCart();
  const { primary, secondary } = useNavItems();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navigate = (item: NavItem) => {
    go(item.page as never, item.hash);
    setMobileOpen(false);
  };

  const isActive = (item: NavItem) => !item.hash && page === item.page;

  return (
    <header
      className={`sticky top-0 z-50 bg-background/93 backdrop-blur-sm transition-colors ${
        scrolled ? "border-b border-border" : "border-b border-transparent"
      }`}
    >
      {/* Secondary tier: quiet utility strip, desktop only. */}
      <div className="hidden border-b border-border xl:block">
        <div className="mx-auto flex w-[min(100%-3rem,1280px)] items-center justify-between gap-4 py-1.5">
          <nav className="flex items-center gap-4" aria-label="Secondary">
            {secondary.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item)}
                className={`font-record text-[0.64rem] uppercase tracking-[0.12em] transition-colors ${
                  isActive(item) ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2 whitespace-nowrap font-record text-[0.64rem] uppercase tracking-[0.1em] text-muted-foreground">
            <button onClick={() => go("auth")} className="hover:text-accent">
              {t("authLogIn")}
            </button>
            <span className="text-border">/</span>
            <button onClick={() => go("auth")} className="hover:text-accent">
              {t("authRegister")}
            </button>
          </div>
        </div>
      </div>

      {/* Primary tier: brand, the six buyer-journey links, tools. */}
      <div className="mx-auto flex min-h-[76px] w-[min(100%-3rem,1280px)] items-center gap-6">
        <button
          onClick={() => go("home")}
          className="flex items-center gap-3 text-foreground"
          aria-label="Beta Art"
        >
          <SealMark className="h-7 w-7 flex-none text-foreground" />
          <span className="hidden flex-col items-start leading-tight sm:flex">
            <span className="font-record text-xs font-semibold tracking-[0.22em]">BETA ART</span>
            <span className="font-record text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground">
              {t("tagline")}
            </span>
          </span>
        </button>

        <nav className="ml-auto hidden items-center gap-5 xl:flex" aria-label="Primary">
          {primary.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item)}
              className={`border-b pb-[3px] font-record text-xs uppercase tracking-[0.14em] transition-colors ${
                isActive(item)
                  ? "border-accent text-foreground"
                  : "border-transparent text-muted-foreground hover:border-accent hover:text-foreground"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 xl:ml-0">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as never)}
            aria-label="Language"
            className="h-9 appearance-none rounded-none border border-border bg-background px-2 font-record text-[0.68rem] uppercase tracking-[0.08em]"
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>
                {l.code.toUpperCase()} · {l.native}
              </option>
            ))}
          </select>

          <Button
            variant="outline"
            size="icon"
            className="relative rounded-full border-border"
            onClick={() => go("cart")}
            aria-label={t("cartLabel")}
          >
            <ShoppingBag className="h-4 w-4" />
            {items.length > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent font-record text-[0.6rem] text-accent-foreground">
                {items.length}
              </span>
            )}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-border"
            onClick={toggle}
            aria-label={theme === "dark" ? t("themeToLight") : t("themeToDark")}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="border-border xl:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? t("menuClose") : t("menuOpen")}
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border bg-background px-6 pb-6 xl:hidden" aria-label="Mobile">
          {primary.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item)}
              className="block w-full border-b border-border py-4 text-left font-record text-xs uppercase tracking-[0.14em] text-foreground"
            >
              {item.label}
            </button>
          ))}
          {secondary.map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item)}
              className="block w-full border-b border-border py-4 text-left font-record text-xs uppercase tracking-[0.14em] text-muted-foreground"
            >
              {item.label}
            </button>
          ))}
          <div className="flex gap-4 py-4 font-record text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <button onClick={() => { go("auth"); setMobileOpen(false); }} className="hover:text-accent">
              {t("authLogIn")}
            </button>
            <button onClick={() => { go("auth"); setMobileOpen(false); }} className="hover:text-accent">
              {t("authRegister")}
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
