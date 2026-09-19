import { usePage } from "@/lib/router";
import { useLang } from "@/lib/langContext";
import { licenceTiers } from "@/lib/data";
import { SOCIAL_LINKS } from "@/lib/config";

export function Footer() {
  const { go } = usePage();
  const { t, lang } = useLang();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto w-[min(100%-3rem,1280px)] py-[clamp(2.5rem,6vw,4rem)]">
        <p className="max-w-[46ch] text-sm text-muted-foreground">{t("footerTagline")}</p>
        <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-3">
          <div>
            <p className="font-record text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">{t("footerArchive")}</p>
            {/* Order and membership here match the real beta-art.com footer
                exactly (verified against a fresh paste, 31.08.2026): Collection,
                Verification, Photographer, Categories, Industries — note Events
                is in the real header nav but NOT the real footer, so it's
                deliberately absent here even though it's above in Masthead.
                Sell/Feedback are this build's own additions, appended after the
                sourced list rather than interleaved into it. */}
            <ul className="mt-4 space-y-2 text-sm">
              <li><button onClick={() => go("home", "collection")} className="hover:text-accent">{t("navCollection")}</button></li>
              <li><button onClick={() => go("home", "verification")} className="hover:text-accent">{t("navVerification")}</button></li>
              <li><button onClick={() => go("home", "photographer")} className="hover:text-accent">{t("navPhotographer")}</button></li>
              <li><button onClick={() => go("categories")} className="hover:text-accent">{t("navCategories")}</button></li>
              <li><button onClick={() => go("categories")} className="hover:text-accent">{t("navIndustries")}</button></li>
              <li><button onClick={() => go("sell")} className="hover:text-accent">{t("navSell")}</button></li>
              <li><button onClick={() => go("feedback")} className="hover:text-accent">{t("navFeedback")}</button></li>
            </ul>
          </div>
          <div>
            <p className="font-record text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">{t("footerLicensing")}</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><button onClick={() => go("home", "licensing")} className="hover:text-accent">{licenceTiers[0].name[lang]}</button></li>
              <li><button onClick={() => go("home", "licensing")} className="hover:text-accent">{licenceTiers[1].name[lang]}</button></li>
              <li><button onClick={() => go("home", "licensing")} className="hover:text-accent">{licenceTiers[2].name[lang]}</button></li>
              <li><button onClick={() => go("home", "request")} className="hover:text-accent">{licenceTiers[3].name[lang]}</button></li>
            </ul>
          </div>
          <div>
            {/* Legal link labels stay Norwegian regardless of UI language — matching the
                real beta-art.com, which shows these same Norwegian labels on its English
                page too. Not a translation gap; see docs/beta-art/tasarim-sistemi.md.
                OPEN ITEM (01.09.2026): these hrefs point at the OLD site's legal
                pages. Once beta-art.com's DNS targets this build, they will land
                on this SPA (no such local pages exist). The legal texts cannot be
                invented here — the user must supply them (paste) before or right
                after the domain switch; then these become local pages. */}
            <p className="font-record text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">{t("footerLegal")}</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="https://beta-art.com/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-accent">Personvernerklæring</a></li>
              <li><a href="https://beta-art.com/cookie-settings" target="_blank" rel="noopener noreferrer" className="hover:text-accent">Cookie-innstillinger</a></li>
              <li><a href="https://beta-art.com/license-terms" target="_blank" rel="noopener noreferrer" className="hover:text-accent">Lisensbetingelser</a></li>
              <li><a href="https://beta-art.com/kontakt" target="_blank" rel="noopener noreferrer" className="hover:text-accent">Angrerett og refusjon</a></li>
              <li><a href="mailto:hallo@beta-art.com" className="hover:text-accent">{t("navContact")}</a></li>
            </ul>
          </div>
        </div>
        {/* Social channels (02.09.2026): rendered ONLY for entries whose URL
            is filled in config.ts — accounts don't exist yet, and a dead
            link would break the site's own evidence standard. Platform
            names are proper nouns, not translated. This block is a
            this-build addition, not part of the sourced beta-art.com
            footer (same convention as Sell/Feedback above). */}
        {SOCIAL_LINKS.some((s) => s.url) && (
          <div className="mt-10 flex flex-wrap items-center gap-4 border-t border-border pt-6 font-record text-[0.68rem] uppercase tracking-[0.14em]">
            <span className="text-muted-foreground">{t("footerFollow")}</span>
            {SOCIAL_LINKS.filter((s) => s.url).map((s) => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                {s.name}
              </a>
            ))}
          </div>
        )}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-6 font-record text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
          <span>{t("footerRights")}</span>
          <span>{t("footerNoAi")}</span>
        </div>
      </div>
    </footer>
  );
}
