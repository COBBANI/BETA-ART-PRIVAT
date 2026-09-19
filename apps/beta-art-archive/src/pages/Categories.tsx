import { categorySections } from "@/lib/data";
import { usePage } from "@/lib/router";
import { useLang } from "@/lib/langContext";

export function Categories() {
  const { go } = usePage();
  const { t, lang } = useLang();
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-[min(100%-3rem,1280px)] py-[clamp(3rem,7vw,4.5rem)]">
        <p className="font-record text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("categoriesEyebrow")}</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-light">{t("categoriesTitle")}</h1>
        <p className="mt-4 font-record text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {t("categoriesMeta")}
        </p>

        {categorySections.map((section) => (
          <div key={section.title.en} className="mt-14 first:mt-10">
            <p className="font-record text-xs uppercase tracking-[0.18em] text-accent">{section.meta[lang]}</p>
            <h2 className="mt-2 font-display text-2xl font-light">{section.title[lang]}</h2>
            <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-foreground/75">{section.intro[lang]}</p>
            <div className="mt-6 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
              {section.entries.map((c) => (
                <div key={c.n} className="flex flex-col bg-background p-5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-record text-xl text-muted-foreground/50">
                      {String(c.n).padStart(2, "0")}
                    </span>
                    <span className="font-record text-[0.6rem] uppercase tracking-[0.1em] text-accent">{c.tag[lang]}</span>
                  </div>
                  <h3 className="mt-2 font-display text-base font-normal">{c.name[lang]}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/70">{c.body[lang]}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-16 border border-border bg-secondary p-8 text-center">
          <p className="font-display text-xl font-normal">{t("categoriesDontSee")}</p>
          <p className="mt-2 text-sm text-foreground/75">{t("categoriesBriefMe")}</p>
          <div className="mt-5 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => go("request-a-shoot")}
              className="border border-accent bg-accent px-5 py-2.5 font-record text-xs uppercase tracking-[0.14em] text-accent-foreground"
            >
              {t("requestShoot")}
            </button>
            <button
              onClick={() => go("home", "collection")}
              className="border border-border px-5 py-2.5 font-record text-xs uppercase tracking-[0.14em] text-foreground hover:border-accent"
            >
              {t("browseArchive")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
