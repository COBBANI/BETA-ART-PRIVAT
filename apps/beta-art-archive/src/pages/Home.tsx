import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { plates, verificationMethods, exhibitions, licenceTiers, faqItems, type PlateCategory } from "@/lib/data";
import { usePage } from "@/lib/router";
import { useLang } from "@/lib/langContext";
import { record } from "@/lib/behavior";
import { ForYou } from "@/components/ForYou";

// Plain native <select> throughout this file — the Radix-based shadcn
// Select/Accordion/Checkbox/Sheet primitives failed to bundle under this
// skill's pinned Parcel version in an earlier build of this same site
// (see docs/beta-art/privat-icerik-analizi.md build notes); native form
// controls sidestep that instead of re-fighting it.
const selectCls =
  "h-9 w-full appearance-none rounded-none border border-border bg-background px-3 text-sm";

// Content note (docs/beta-art/tasarim-sistemi.md): the long-form English
// content originates verbatim from beta-art.com (verified source layer).
// Translation pass 1 (01.09.2026, user request): hero copy, photographer
// bio and the Life Flower manifesto now come from the i18n dictionary in
// all 8 languages. Still English-only pending pass 2: verification bodies,
// exhibition bodies, licence bullets, FAQ answers (all in data.ts).

// New, user-directed addition (30.08.2026) — a BD-style credibility pass:
// pull the already-real numbers (84,000+ frames, 2012, 3 methods, 12
// plates — all sourced from Home.tsx/data.ts elsewhere on this page) into
// one scannable strip instead of leaving them buried in prose. No new
// numbers invented.
function StatStrip() {
  const { t } = useLang();
  const stats = [
    [t("statFrames"), t("statFramesLabel")],
    [t("statSince"), t("statSinceLabel")],
    [t("statMethods"), t("statMethodsLabel")],
    [t("statPlates"), t("statPlatesLabel")],
  ];
  return (
    <div className="border-b border-border bg-secondary">
      <div className="mx-auto grid w-[min(100%-3rem,1280px)] grid-cols-2 divide-x divide-y divide-border sm:grid-cols-4 sm:divide-y-0">
        {stats.map(([value, label]) => (
          <div key={label} className="px-4 py-5 text-center">
            <p className="font-display text-2xl font-normal text-accent sm:text-3xl">{value}</p>
            <p className="mt-1 font-record text-[0.62rem] uppercase tracking-[0.1em] text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  const { go } = usePage();
  const { t } = useLang();
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid w-[min(100%-3rem,1280px)] grid-cols-1 items-center gap-12 py-[clamp(3rem,8vw,5.5rem)] lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="mb-5 font-record text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {t("heroEyebrow")}
          </p>
          <h1 className="font-display text-[clamp(2.4rem,5.5vw,4.2rem)] font-light leading-[1.05]">
            {t("tagline")}.
          </h1>
          <p className="mt-6 max-w-[58ch] text-[1.05rem] leading-relaxed text-foreground/80">
            {t("heroP1")}
          </p>
          <p className="mt-4 max-w-[58ch] text-[1.05rem] leading-relaxed text-foreground/80">
            {t("heroP2")}
          </p>
          <p className="mt-4 max-w-[58ch] text-[1.05rem] leading-relaxed text-foreground/80">
            {t("heroP3")}
          </p>
          {/* User-supplied signature line ("TRUST THE EVIDENCE BEHIND EVERY
              IMAGE.", 01.09.2026) — the archive's promise in one sentence,
              placed as the bridge between the claim above and the CTAs. */}
          <p className="mt-6 font-display text-lg font-light italic text-accent">
            {t("heroTrustLine")}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button className="rounded-none font-record text-xs uppercase tracking-[0.16em]" onClick={() => go("home", "collection")}>
              {t("heroCtaCollection")}
            </Button>
            <Button variant="outline" className="rounded-none border-border font-record text-xs uppercase tracking-[0.16em]" onClick={() => go("home", "verification")}>
              {t("heroCtaVerification")}
            </Button>
          </div>
        </div>
        <div className="border border-border bg-secondary p-1">
          <div aria-hidden="true" className="aspect-[4/5] w-full bg-gradient-to-br from-slate-300 via-stone-300 to-neutral-700" />
          <p className="px-3 py-3 font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">
            {/* Artwork title marked lang="en" so CSS uppercasing follows
                English casing rules — Turkish locale turned the i into İ
                ("FİRST LİGHT"). */}
            {/* Evidence audit 02.09.2026 (F4): the hero used to append a
                capture date ("March 2026") that the catalogue itself does
                not have — First Light's detail reads "Capture details to be
                supplied". No date is shown until a verified one exists. */}
            {t("platePrefix")} 01 · <span lang="en">First Light</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Verification() {
  const { t, lang } = useLang();
  return (
    <section id="verification" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto w-[min(100%-3rem,1280px)] py-[clamp(3rem,7vw,4.5rem)]">
        <p className="font-record text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("verificationEyebrow")}</p>
        <h2 className="mt-3 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-light">{t("verificationTitle")}</h2>
        <div className="mt-10 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
          {verificationMethods.map((m) => (
            <div key={m.numeral} className="bg-background p-7">
              <p className="font-display text-sm italic text-accent">{t("method")} {m.numeral}</p>
              <h3 className="mt-3 font-display text-lg font-normal leading-snug">{m.title[lang]}</h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground/75">{m.body[lang]}</p>
            </div>
          ))}
        </div>

        {/* New, user-directed addition (30.08.2026) — BD-style pass. */}
        <div className="mt-10 border border-border bg-secondary p-6">
          <p className="font-record text-[0.68rem] uppercase tracking-[0.12em] text-accent">{t("vsStockTitle")}</p>
          <p className="mt-2 max-w-[64ch] text-sm leading-relaxed text-foreground/75">{t("vsStockBody")}</p>
        </div>
      </div>
    </section>
  );
}

function Collection() {
  const [filter, setFilter] = useState<PlateCategory | "all">("all");
  const { t, lang } = useLang();
  const { goToPlate } = usePage();
  const FILTERS: { label: string; value: PlateCategory | "all" }[] = [
    { label: t("filterAll"), value: "all" },
    { label: t("filterLandscape"), value: "landscape" },
    { label: t("filterCity"), value: "city" },
    { label: t("filterPortrait"), value: "portrait" },
  ];
  const visible = filter === "all" ? plates : plates.filter((p) => p.category === filter);

  return (
    <section id="collection" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto w-[min(100%-3rem,1280px)] py-[clamp(3rem,7vw,4.5rem)]">
        <p className="font-record text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("collectionEyebrow")}</p>
        <h2 className="mt-3 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-light">{t("collectionTitle")}</h2>
        {/* New, user-directed addition (30.08.2026) — BD-style pass: explain
            why most plates read "awaiting" instead of just showing it. */}
        <p className="mt-3 max-w-[62ch] text-sm leading-relaxed text-foreground/70">{t("collectionReleaseNote")}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => {
                setFilter(f.value);
                // Behavior layer: an explicit category choice is an
                // interest signal (on-device only, lib/behavior.ts).
                if (f.value !== "all") record({ t: "filter", cat: f.value });
              }}
              className={`border px-4 py-2 font-record text-[0.7rem] uppercase tracking-[0.12em] transition-colors ${
                filter === f.value ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((plate) => (
            <button
              key={plate.id}
              onClick={() => goToPlate(plate.id)}
              className="flex flex-col bg-background text-start transition-colors hover:bg-secondary"
            >
              {plate.image ? (
                <img
                  src={plate.image}
                  alt={plate.title}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              ) : (
                <div aria-hidden="true" className={`aspect-square w-full bg-gradient-to-br ${plate.swatch}`} />
              )}
              <div className="flex flex-1 flex-col p-5">
                <span
                  className={`font-record text-[0.62rem] uppercase tracking-[0.1em] ${
                    plate.status === "available" ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  {plate.status === "available" ? t("statusAvailable") : t("statusPending")}
                </span>
                <h3 className="mt-2 font-display text-lg font-normal">{plate.title}</h3>
                <p className="font-record text-[0.68rem] text-muted-foreground">{plate.accession}</p>
                <p className="mt-1 text-xs text-foreground/70">{plate.detail[lang]}</p>
                <p className="mt-1 font-record text-[0.66rem] uppercase tracking-[0.08em] text-muted-foreground">{t("byPrefix")} {plate.photographer}</p>
                <p className="mt-auto pt-4 font-record text-xs">{t("fromPrice")} kr 190</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Exhibitions() {
  const { go } = usePage();
  const { t, lang } = useLang();
  return (
    <section id="events" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto w-[min(100%-3rem,1280px)] py-[clamp(3rem,7vw,4.5rem)]">
        <p className="font-record text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("eventsEyebrow")}</p>
        <h2 className="mt-3 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-light">{t("eventsTitle")}</h2>
        <p className="mt-4 max-w-[62ch] text-[1.02rem] leading-relaxed text-foreground/80">{t("eventsIntro")}</p>
        <div className="mt-10 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-3">
          {exhibitions.map((ex) => (
            <div key={ex.title.en} className="flex flex-col bg-background p-7">
              <span className="font-record text-[0.64rem] uppercase tracking-[0.12em] text-accent">{ex.tag[lang]}</span>
              <p className="mt-2 font-record text-[0.7rem] text-muted-foreground">{ex.when[lang]} · {ex.where[lang]}</p>
              <h3 className="mt-3 font-display text-lg font-normal leading-snug">{ex.title[lang]}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/75">{ex.body[lang]}</p>
              <button
                onClick={() => go("request-a-shoot")}
                className="mt-5 self-start font-record text-xs uppercase tracking-[0.12em] text-accent hover:underline"
              >
                {t("registerInterest")}
              </button>
            </div>
          ))}
        </div>

        {/* New, user-directed addition (30.08.2026) — see Sell.tsx header
            note for the request record. Not part of the verbatim
            beta-art.com card copy above; kept as a clearly separate note. */}
        <div className="mt-8 border border-border bg-secondary p-6">
          <p className="font-display text-base font-normal italic text-accent">{t("eventsRitualTitle")}</p>
          <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-foreground/75">{t("eventsRitualBody")}</p>
        </div>
      </div>
    </section>
  );
}

function Photographer() {
  const { t } = useLang();
  return (
    <section id="photographer" className="scroll-mt-20 border-b border-border bg-secondary">
      <div className="mx-auto grid w-[min(100%-3rem,1280px)] grid-cols-1 gap-12 py-[clamp(3rem,7vw,4.5rem)] lg:grid-cols-[0.8fr_1.2fr]">
        <div aria-hidden="true" className="aspect-[4/5] w-full max-w-sm border border-border bg-gradient-to-br from-stone-400 via-stone-200 to-neutral-500" />
        <div>
          {/* Evidence audit 02.09.2026 (F8): the "Identity verified" badge
              was removed here and on /artists — no identity-verification
              procedure exists and the photographer is unnamed, so nothing
              backed the claim. */}
          <div className="flex flex-wrap items-center gap-3">
            <p className="font-record text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("photographerEyebrow")}</p>
          </div>
          <h2 className="mt-3 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-snug">
            {t("photographerTitle")}
          </h2>
          <p className="mt-5 max-w-[58ch] text-[1.02rem] leading-relaxed text-foreground/80">
            {t("photographerP1")}
          </p>
          <p className="mt-4 max-w-[58ch] text-[1.02rem] leading-relaxed text-foreground/80">
            {t("photographerP2")}
          </p>
          <p className="mt-4 max-w-[58ch] text-[1.02rem] leading-relaxed text-foreground/80">
            {t("photographerP3")}
          </p>
        </div>
      </div>
    </section>
  );
}

// New, user-supplied addition (01.09.2026, "BUNU EKLEYELIM"): the LIFE
// FLOWER statement — the user's own words, pasted verbatim, placed as a
// quiet manifesto interlude. Not sourced from beta-art.com; kept in
// English like the rest of the content layer.
function LifeFlower() {
  const { t } = useLang();
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-[min(100%-3rem,760px)] py-[clamp(3.5rem,9vw,6rem)] text-center">
        {/* "Life Flower" is the manifesto's name, not a label — stays
            untranslated like plate titles. */}
        <p className="font-record text-xs uppercase tracking-[0.3em] text-accent">Life Flower</p>
        <p className="mt-6 font-display text-[clamp(1.5rem,3.2vw,2.2rem)] font-light italic leading-snug">
          {t("lifeFlowerQuote")}
        </p>
        <p className="mt-5 max-w-[48ch] mx-auto text-[1.02rem] leading-relaxed text-foreground/70">
          {t("lifeFlowerBody")}
        </p>
        {/* User-supplied follow-up in the same request ("REAL PEOPLE REAM
            MOMENT REAL PLACE") — obvious REAM→REAL typo fixed, natural
            English plurals applied. */}
        <p className="mt-8 font-record text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground">
          {t("lifeFlowerTagline")}
        </p>
      </div>
    </section>
  );
}

function Licensing() {
  const { go } = usePage();
  const { t, lang } = useLang();
  const steps = [
    ["01", t("step1Title"), t("step1Body")],
    ["02", t("step2Title"), t("step2Body")],
    ["03", t("step3Title"), t("step3Body")],
  ];
  return (
    <section id="licensing" className="scroll-mt-20 border-b border-border">
      <div className="mx-auto w-[min(100%-3rem,1280px)] py-[clamp(3rem,7vw,4.5rem)]">
        <p className="font-record text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("licensingEyebrow")}</p>
        <h2 className="mt-3 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-light">{t("licensingTitle")}</h2>
        <div className="mt-10 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {licenceTiers.map((tier) => (
            <div key={tier.name.en} className="flex flex-col bg-background p-7">
              <h3 className="font-display text-xl font-normal">{tier.name[lang]}</h3>
              <p className="mt-1 font-record text-sm text-accent">{tier.price[lang]}</p>
              <p className="mt-3 text-sm text-foreground/75">{tier.desc[lang]}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-foreground/70">
                {tier.bullets.map((b) => (
                  <li key={b.en} className="flex items-baseline gap-2">
                    <span className="text-accent">·</span>
                    {b[lang]}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => go("home", "request")}
                className="mt-6 self-start font-record text-xs uppercase tracking-[0.12em] text-accent hover:underline"
              >
                {tier.cta[lang]}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map(([n, title, body]) => (
            <div key={n}>
              <p className="font-record text-2xl text-muted-foreground/50">{n}</p>
              <p className="mt-2 font-display text-base">{title}</p>
              <p className="mt-1 text-sm text-foreground/70">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RequestSection() {
  const [status, setStatus] = useState("");
  const { t, lang } = useLang();
  return (
    <section id="request" className="scroll-mt-20 border-b border-border bg-secondary">
      <div className="mx-auto w-[min(100%-3rem,1280px)] py-[clamp(3rem,7vw,4.5rem)]">
        <p className="font-record text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("requestEyebrow")}</p>
        <h2 className="mt-3 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-light">{t("requestTitle")}</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStatus(t("previewNotice"));
          }}
          className="mt-8 grid grid-cols-1 gap-5 border border-border bg-background p-[clamp(1.4rem,3vw,2rem)] md:grid-cols-2"
        >
          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldPlate")}</Label>
            <select className={selectCls} defaultValue="">
              <option value="" disabled>{t("fieldPlatePlaceholder")}</option>
              {plates.map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldLicence")}</Label>
            <select className={selectCls} defaultValue="">
              <option value="" disabled>{t("fieldLicencePlaceholder")}</option>
              <option value="personal">{licenceTiers[0].name[lang]}</option>
              <option value="commercial">{licenceTiers[1].name[lang]}</option>
              <option value="extended">{licenceTiers[2].name[lang]}</option>
              <option value="custom">{licenceTiers[3].name[lang]}</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldName")}</Label>
            <Input className="rounded-none border-border" required />
          </div>
          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldEmail")}</Label>
            <Input type="email" className="rounded-none border-border" required />
          </div>
          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldCompany")}</Label>
            <Input className="rounded-none border-border" />
          </div>
          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldTerritory")}</Label>
            <Input className="rounded-none border-border" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldUse")}</Label>
            <Textarea rows={3} className="rounded-none border-border" />
          </div>
          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldDuration")}</Label>
            <Input className="rounded-none border-border" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldNotes")}</Label>
            <Textarea rows={2} className="rounded-none border-border" />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="w-full rounded-none font-record text-xs uppercase tracking-[0.16em] md:w-auto">
              {t("submitRequest")}
            </Button>
            <p role="status" aria-live="polite" className="mt-3 min-h-[1.1em] font-record text-xs text-accent">{status}</p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Faq() {
  const { t, lang } = useLang();
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-[min(100%-3rem,1280px)] py-[clamp(3rem,7vw,4.5rem)]">
        <p className="font-record text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("faqIntro")}</p>
        <h2 className="mt-3 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-light">{t("faqIntro")}</h2>
        <div className="mt-8 divide-y divide-border border-t border-border">
          {faqItems.map((f) => (
            <details key={f.q.en} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base">
                {f.q[lang]}
                <span className="font-record text-muted-foreground group-open:hidden">+</span>
                <span className="hidden font-record text-muted-foreground group-open:inline">−</span>
              </summary>
              <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-foreground/75">{f.a[lang]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <StatStrip />
      <Verification />
      <Collection />
      {/* Behavior layer (02.09.2026): renders only when this device has
          real activity — returning visitors see what they're likely to
          want next; first-time visitors see nothing extra. */}
      <ForYou />
      <Exhibitions />
      <Photographer />
      <LifeFlower />
      <Licensing />
      <RequestSection />
      <Faq />
    </>
  );
}
