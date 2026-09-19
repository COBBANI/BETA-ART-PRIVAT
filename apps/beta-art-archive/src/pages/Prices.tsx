import { licenceTiers } from "@/lib/data";
import { usePage } from "@/lib/router";
import { useLang } from "@/lib/langContext";

// New, user-directed addition (30.08.2026), built from the Artsy-style
// nav reference ("Price Database"). The user chose this option
// explicitly: "Kategori bazlı fiyat aralığı rehberi" — a guide to how
// each tier is priced, NOT real sales records. Every number here is the
// same real Personal price (kr 190) already on the collection, plus
// plain-language reasoning for why the other three tiers say "Price on
// request" instead of a number — nothing invented, no example numbers
// added for tiers that are genuinely open-ended on the real site.
export function Prices() {
  const { go } = usePage();
  const { t, lang } = useLang();

  return (
    <section className="border-b border-border">
      <div className="mx-auto w-[min(100%-3rem,1000px)] py-[clamp(3rem,7vw,4.5rem)]">
        <p className="font-record text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("pricesEyebrow")}</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-light">{t("pricesTitle")}</h1>
        <p className="mt-4 max-w-[62ch] text-[1.02rem] leading-relaxed text-foreground/80">{t("pricesIntro")}</p>

        <div className="mt-4 inline-block border border-border bg-secondary px-3 py-1.5 font-record text-[0.66rem] uppercase tracking-[0.1em] text-muted-foreground">
          {t("pricesGuideTag")}
        </div>

        <div className="mt-8 divide-y divide-border border-y border-border">
          {licenceTiers.map((tier) => (
            <div key={tier.name.en} className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-[1fr_1fr_1.4fr]">
              <div>
                <h2 className="font-display text-lg font-normal">{tier.name[lang]}</h2>
                <p className="mt-1 font-record text-sm text-accent">{tier.price[lang]}</p>
              </div>
              <p className="text-sm text-foreground/75">{tier.desc[lang]}</p>
              <p className="text-sm text-foreground/70">
                {tier.fixed ? t("pricesFixedNote") : t("pricesRequestNote")}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 border border-border bg-secondary p-6">
          <p className="font-record text-[0.68rem] uppercase tracking-[0.12em] text-accent">{t("pricesWhyTitle")}</p>
          <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-foreground/75">{t("pricesWhyBody")}</p>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => go("home", "request")}
            className="border border-accent bg-accent px-5 py-2.5 font-record text-xs uppercase tracking-[0.14em] text-accent-foreground"
          >
            {licenceTiers[0].cta[lang]}
          </button>
        </div>
      </div>
    </section>
  );
}
