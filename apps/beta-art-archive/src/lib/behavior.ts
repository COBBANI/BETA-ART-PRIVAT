// Customer-behavior layer (user request 02.09.2026, "kunde-atferdssystem
// på alle sider: hva vil kunden se eller kjøpe neste gang").
//
// Design decision — ON-DEVICE ONLY. This is a static site with no backend,
// and the brand's whole promise is evidence and honesty, so the honest v1
// is a browser-local profile: what THIS visitor viewed, filtered and
// carted, kept in THEIR localStorage, never transmitted anywhere. The
// recommendations it powers ("Picked for you") are computed client-side
// from the real catalogue. No cookies, no third-party analytics, no
// fingerprinting; a visible "forget my activity" control wipes the store.
// Cross-visitor analytics ("most customers who viewed X bought Y") needs a
// backend and a consent flow — documented as a future step in
// docs/beta-art/davranis-sistemi.md, deliberately NOT simulated here.
import { plates, type Plate, type PlateCategory } from "./data";

const KEY = "ba_davranis_v1";
const MAX_EVENTS = 200;

// Event weights: carting a plate is a far stronger "I want this" signal
// than viewing it; an explicit category filter sits between the two.
const WEIGHT = { view: 1, filter: 2, cart: 4 } as const;

export interface BehaviorEvent {
  t: keyof typeof WEIGHT | "page";
  id?: string; // plate id for view/cart
  cat?: PlateCategory; // category for view/filter/cart
  page?: string; // page name for t: "page" (future signal, unused today)
  at: number;
}

function read(): BehaviorEvent[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as BehaviorEvent[]) : [];
  } catch {
    return []; // private mode / blocked storage: system degrades to off
  }
}

// Event name the "Picked for you" strip listens for, so a view/cart/filter
// recorded in a useEffect updates the recommendations live in the same
// visit rather than only on the next navigation.
export const BEHAVIOR_EVENT = "ba-behavior";

export function record(e: Omit<BehaviorEvent, "at">) {
  try {
    const events = read();
    events.push({ ...e, at: Date.now() });
    localStorage.setItem(KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
    if (typeof window !== "undefined") window.dispatchEvent(new Event(BEHAVIOR_EVENT));
  } catch {
    // storage unavailable — tracking silently off, site works unchanged
  }
}

export function clearBehavior() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // nothing to clear
  }
}

export function hasBehavior(): boolean {
  return read().some((e) => e.t !== "page");
}

export function recentlyViewedIds(n: number): string[] {
  const seen: string[] = [];
  for (const e of read().reverse()) {
    if (e.t === "view" && e.id && !seen.includes(e.id)) seen.push(e.id);
    if (seen.length >= n) break;
  }
  return seen;
}

// "What will this customer want to see or buy next": rank the catalogue by
// this device's category affinity, prefer plates not yet viewed, keep
// catalogue order as the tie-break so results are deterministic and
// explainable. `exclude` drops the plate currently on screen.
export function recommend(n: number, exclude?: string): Plate[] {
  const events = read();
  const affinity: Record<string, number> = {};
  const viewed = new Set<string>();
  for (const e of events) {
    if (e.cat) affinity[e.cat] = (affinity[e.cat] ?? 0) + (WEIGHT[e.t as keyof typeof WEIGHT] ?? 0);
    if (e.t === "view" && e.id) viewed.add(e.id);
  }
  if (Object.keys(affinity).length === 0) return [];
  return plates
    .filter((p) => p.id !== exclude)
    .map((p, i) => ({ p, score: (affinity[p.category] ?? 0) * 2 + (viewed.has(p.id) ? 0 : 1) - i * 0.001 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.p);
}
