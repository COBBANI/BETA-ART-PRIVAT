import { useEffect, useState } from "react";
import { usePage } from "@/lib/router";
import { useLang } from "@/lib/langContext";
import { BEHAVIOR_EVENT, clearBehavior, hasBehavior, recommend } from "@/lib/behavior";

// "Picked for you" strip — the visible half of the on-device behavior
// layer (see lib/behavior.ts). Renders NOTHING until the visitor has real
// activity on this device: an empty cold-start block with filler would
// break the site's own evidence standard. The basis line states exactly
// where the picks come from, and "forget my activity" wipes the store —
// transparency and control are part of the feature, not an afterthought.
export function ForYou({ excludePlateId }: { excludePlateId?: string }) {
  const { goToPlate } = usePage();
  const { t } = useLang();
  const [gone, setGone] = useState(false);
  // Re-render when activity is recorded (e.g. the current plate's view
  // effect fires after this first paints), so picks stay current in-visit.
  const [, setTick] = useState(0);
  useEffect(() => {
    const bump = () => setTick((n) => n + 1);
    window.addEventListener(BEHAVIOR_EVENT, bump);
    return () => window.removeEventListener(BEHAVIOR_EVENT, bump);
  }, []);
  if (gone || !hasBehavior()) return null;
  const picks = recommend(3, excludePlateId);
  if (picks.length === 0) return null;
  return (
    <section aria-label={t("recoTitle")} className="border-b border-border bg-secondary">
      <div className="mx-auto w-[min(100%-3rem,1280px)] py-[clamp(2.5rem,5vw,3.5rem)]">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl font-light">{t("recoTitle")}</h2>
          <button
            onClick={() => {
              clearBehavior();
              setGone(true);
            }}
            className="font-record text-[0.68rem] uppercase tracking-[0.12em] text-muted-foreground hover:text-accent"
          >
            {t("recoReset")}
          </button>
        </div>
        <p className="mt-1 font-record text-xs text-muted-foreground">{t("recoBasis")}</p>
        <div className="mt-6 grid grid-cols-1 gap-px border border-border bg-border sm:grid-cols-3">
          {picks.map((p) => (
            <button key={p.id} onClick={() => goToPlate(p.id)} className="group bg-background p-4 text-start">
              {p.image ? (
                <img src={p.image} alt={p.title} className="aspect-[3/2] w-full object-cover" />
              ) : (
                <div aria-hidden="true" className={`aspect-[3/2] w-full bg-gradient-to-br ${p.swatch}`} />
              )}
              <p className="mt-3 font-display text-base group-hover:text-accent">{p.title}</p>
              <p className="mt-0.5 font-record text-[0.66rem] uppercase tracking-[0.1em] text-muted-foreground">
                {p.accession} · {p.status === "available" ? t("statusAvailable") : t("statusPending")}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
