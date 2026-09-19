import { plates } from "@/lib/data";
import { usePage } from "@/lib/router";
import { useLang } from "@/lib/langContext";

// New, user-directed addition (30.08.2026), built from the Artsy-style
// nav reference the user shared ("Artworks/Artists/Auctions/..."). Only
// one real photographer exists in the verified beta-art.com content — the
// site's own, unnamed in the source, credited here as "Beta Art" (see
// data.ts header note). This page is built to scale as verified
// contributors join via /sell, not populated with invented names.
//
// 31.08.2026: `artistsFoundingBio`'s second sentence (childhood-camera
// origin story) is real, user-provided biography — given directly by the
// user in this session in response to being asked for concrete evidence
// of founder background, after a "Kurucunun fotoğrafçılık geçmişi
// doğrulanabilir" prompt. Not invented. The founder stays unnamed here
// (matching the anonymity choice above) and ungendered in the English
// copy; the Romance/German translations continue the grammatical-masculine
// noun form ("il fondatore" / "le fondateur" / "el fundador" / "der
// Gründer") already set by this bio's first sentence, for agreement
// within one paragraph rather than as a new gender assumption.
export function Artists() {
  const { go, goToPlate } = usePage();
  const { t } = useLang();
  const count = plates.length;

  return (
    <section className="border-b border-border">
      <div className="mx-auto w-[min(100%-3rem,1000px)] py-[clamp(3rem,7vw,4.5rem)]">
        <p className="font-record text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("artistsEyebrow")}</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-light">{t("artistsTitle")}</h1>
        <p className="mt-4 max-w-[60ch] text-[1.02rem] leading-relaxed text-foreground/80">{t("artistsIntro")}</p>

        <div className="mt-10 flex flex-col gap-px border border-border bg-border sm:flex-row">
          <div className="flex flex-1 items-start gap-5 bg-background p-6">
            <div aria-hidden="true" className="h-16 w-16 flex-none border border-border bg-gradient-to-br from-stone-400 via-stone-200 to-neutral-500" />
            <div>
              {/* Evidence audit 02.09.2026 (F8): the "Identity verified"
                  badge was removed — the real beta-art.com never names its
                  photographer and no identity-verification procedure exists
                  yet, so the badge asserted something nothing backs. It
                  returns when a real procedure and a verified entry exist. */}
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display text-lg font-normal">Beta Art</h2>
              </div>
              <p className="mt-1 font-record text-[0.68rem] uppercase tracking-[0.08em] text-muted-foreground">
                {count} {t("artistsPlatesSuffix")}
              </p>
              <p className="mt-3 max-w-[46ch] text-sm text-foreground/75">{t("artistsFoundingBio")}</p>
              <button
                onClick={() => goToPlate(plates[0].id)}
                className="mt-4 font-record text-xs uppercase tracking-[0.12em] text-accent hover:underline"
              >
                {t("artistsViewWork")} →
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 border border-dashed border-border p-8 text-center">
          <p className="font-display text-lg font-normal">{t("artistsJoinTitle")}</p>
          <p className="mt-2 text-sm text-foreground/75">{t("artistsJoinBody")}</p>
          <button
            onClick={() => go("sell")}
            className="mt-5 border border-accent bg-accent px-5 py-2.5 font-record text-xs uppercase tracking-[0.14em] text-accent-foreground"
          >
            {t("navSell")}
          </button>
        </div>
      </div>
    </section>
  );
}
