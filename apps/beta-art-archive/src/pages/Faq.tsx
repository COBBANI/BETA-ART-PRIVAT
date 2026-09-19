import { useState } from "react";
import { faqCategories, faqCategoryLabels, faqItems, type FaqCategory } from "@/lib/data";
import { useLang } from "@/lib/langContext";

export function Faq() {
  const [active, setActive] = useState<FaqCategory | "All">("All");
  const { t, lang } = useLang();
  const visible = active === "All" ? faqItems : faqItems.filter((f) => f.category === active);

  return (
    <section className="border-b border-border">
      <div className="mx-auto w-[min(100%-3rem,1280px)] py-[clamp(3rem,7vw,4.5rem)]">
        <p className="font-record text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("faqEyebrow")}</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-light">{t("faqTitle")}</h1>
        <p className="mt-3 text-sm text-foreground/75">
          {t("faqCantFind")}{" "}
          <a href="mailto:hallo@beta-art.com" className="text-accent underline">hallo@beta-art.com</a>
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {(["All", ...faqCategories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`border px-4 py-2 font-record text-[0.68rem] uppercase tracking-[0.1em] transition-colors ${
                active === c ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
              }`}
            >
              {c === "All" ? t("faqAll") : faqCategoryLabels[c][lang]}
            </button>
          ))}
        </div>

        <div className="mt-8 divide-y divide-border border-t border-border">
          {visible.map((f) => (
            <details key={f.q.en} className="group py-4">
              <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4">
                <span className="font-display text-base">{f.q[lang]}</span>
                <span className="shrink-0 font-record text-[0.6rem] uppercase tracking-[0.1em] text-muted-foreground">
                  {faqCategoryLabels[f.category][lang]}
                </span>
              </summary>
              <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-foreground/75">{f.a[lang]}</p>
            </details>
          ))}
        </div>

        <div className="mt-14 border border-border bg-secondary p-8 text-center">
          <p className="font-display text-xl font-normal">{t("faqStillQuestions")}</p>
          <p className="mt-2 text-sm text-foreground/75">{t("faqHappyToHelp")}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-4 font-record text-xs uppercase tracking-[0.12em]">
            <a href="mailto:hallo@beta-art.com" className="border border-accent bg-accent px-5 py-2.5 text-accent-foreground">
              hallo@beta-art.com
            </a>
            <a
              href="https://beta-art.com/lisensbetingelser"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border px-5 py-2.5 text-foreground hover:border-accent"
            >
              {t("faqLicenseTerms")}
            </a>
          </div>
        </div>

        <p className="mt-8 font-record text-[0.66rem] uppercase tracking-[0.12em] text-muted-foreground">
          ■ BETA ART · {t("faqRefDoc")} · {faqItems.length} {t("faqEntries")}
        </p>
      </div>
    </section>
  );
}
