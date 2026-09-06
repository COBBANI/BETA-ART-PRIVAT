// Sales-tracking ledger for the site's owner/admin (user request
// 02.09.2026, "satış takip sistemi kur — web sayfasını yöneten kişi için").
//
// HONEST v1 on a static site. There is no backend and no live payment
// capture, so sales cannot be recorded automatically. What the owner CAN
// have today is a private ledger they fill in from the real sources
// (Stripe dashboard once live, and licence-request / Sell emails). This
// module stores that ledger in the OWNER'S OWN browser (localStorage) and
// computes the money split from the single source of truth in
// docs/beta-art/komisyon-ve-mva.md:
//   - commission 30% Beta Art / 70% photographer
//   - Beta Art's own plates: no commission, the whole net stays with the business
//   - business NOT MVA-registered → no VAT line anywhere
//   - default Stripe fee taken off the top before the split
//
// SECURITY NOTE (documented for the owner): a static SPA has no server
// auth. The /#admin page is simply unlinked; it is NOT access-controlled.
// Its data lives only in whatever browser the owner types it into — private
// to that device, never transmitted. Do not enter card numbers or anything
// beyond what a plain sales log needs. Real multi-device, access-controlled
// sales tracking needs a backend — see docs/beta-art/satis-takip.md.
export const OWNER_COMMISSION = 0.3; // Beta Art's share of the net
export const OWN_BRAND = "Beta Art"; // photographer value that means "no commission"

// Stripe Norway (CLAUDE.md; verify against current tariff before relying on
// it — stripe.com is blocked in this environment). Domestic card only here;
// foreign/currency surcharges are entered manually via the fee field.
const STRIPE_PCT = 0.015;
const STRIPE_FIXED = 1.8;

export interface Sale {
  id: string;
  date: string; // YYYY-MM-DD
  plate: string; // plate title (free text — a sale may predate a plate id)
  tier: string; // licence tier, e.g. "Personal"
  gross: number; // amount paid by the buyer, kr
  fee: number; // payment-processor fee, kr (auto-estimated, editable)
  photographer: string; // OWN_BRAND for the studio's own plates
  buyer: string; // buyer email (owner reference only, never published)
  source: "stripe" | "email"; // where the sale came from
  note: string;
}

export interface SaleSplit {
  net: number; // gross - fee
  ownerShare: number; // Beta Art's share
  photographerPayout: number; // what to pay the photographer
}

const KEY = "ba_satis_v1";

export function estimateFee(gross: number): number {
  if (gross <= 0) return 0;
  return Math.round((gross * STRIPE_PCT + STRIPE_FIXED) * 100) / 100;
}

// The money split for one sale. Own-brand plates carry no commission — the
// whole net stays with the business (komisyon-ve-mva.md).
export function splitOf(s: Sale): SaleSplit {
  const net = Math.round((s.gross - s.fee) * 100) / 100;
  if (s.photographer.trim().toLowerCase() === OWN_BRAND.toLowerCase()) {
    return { net, ownerShare: net, photographerPayout: 0 };
  }
  const ownerShare = Math.round(net * OWNER_COMMISSION * 100) / 100;
  return { net, ownerShare, photographerPayout: Math.round((net - ownerShare) * 100) / 100 };
}

export function readSales(): Sale[] {
  try {
    const raw = localStorage.getItem(KEY);
    const list = raw ? (JSON.parse(raw) as Sale[]) : [];
    return list.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  } catch {
    return [];
  }
}

function write(list: Sale[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // storage unavailable — surfaced by the page's own catch/notice
    throw new Error("storage");
  }
}

export function addSale(s: Omit<Sale, "id">): Sale {
  const sale: Sale = { ...s, id: `${Date.now()}-${Math.round(Math.random() * 1e6)}` };
  write([sale, ...readSales()]);
  return sale;
}

export function deleteSale(id: string) {
  write(readSales().filter((s) => s.id !== id));
}

export interface Totals {
  count: number;
  gross: number;
  fee: number;
  net: number;
  ownerShare: number;
  payouts: number;
  byPhotographer: { name: string; payout: number; count: number }[];
}

export function totalsOf(sales: Sale[]): Totals {
  const t: Totals = { count: sales.length, gross: 0, fee: 0, net: 0, ownerShare: 0, payouts: 0, byPhotographer: [] };
  const map = new Map<string, { payout: number; count: number }>();
  for (const s of sales) {
    const sp = splitOf(s);
    t.gross += s.gross;
    t.fee += s.fee;
    t.net += sp.net;
    t.ownerShare += sp.ownerShare;
    t.payouts += sp.photographerPayout;
    if (sp.photographerPayout > 0) {
      const cur = map.get(s.photographer) ?? { payout: 0, count: 0 };
      map.set(s.photographer, { payout: cur.payout + sp.photographerPayout, count: cur.count + 1 });
    }
  }
  const round = (n: number) => Math.round(n * 100) / 100;
  t.gross = round(t.gross);
  t.fee = round(t.fee);
  t.net = round(t.net);
  t.ownerShare = round(t.ownerShare);
  t.payouts = round(t.payouts);
  t.byPhotographer = [...map.entries()]
    .map(([name, v]) => ({ name, payout: round(v.payout), count: v.count }))
    .sort((a, b) => b.payout - a.payout);
  return t;
}

export interface MonthPoint {
  month: string; // YYYY-MM
  label: string; // e.g. "2026-09"
  gross: number;
  net: number;
  ownerShare: number;
  count: number;
}

// Gross/net per calendar month, oldest→newest, only months that have sales.
// Feeds the admin revenue chart (magnitude over time → bars).
export function monthlyTotals(sales: Sale[]): MonthPoint[] {
  const map = new Map<string, MonthPoint>();
  for (const s of sales) {
    const month = s.date.slice(0, 7);
    if (!/^\d{4}-\d{2}$/.test(month)) continue;
    const sp = splitOf(s);
    const cur = map.get(month) ?? { month, label: month, gross: 0, net: 0, ownerShare: 0, count: 0 };
    cur.gross += s.gross;
    cur.net += sp.net;
    cur.ownerShare += sp.ownerShare;
    cur.count += 1;
    map.set(month, cur);
  }
  const round = (n: number) => Math.round(n * 100) / 100;
  return [...map.values()]
    .map((m) => ({ ...m, gross: round(m.gross), net: round(m.net), ownerShare: round(m.ownerShare) }))
    .sort((a, b) => (a.month < b.month ? -1 : a.month > b.month ? 1 : 0));
}

// CSV for the owner's own bookkeeping / accountant. Fields quoted so commas
// in notes don't break columns.
export function salesToCsv(sales: Sale[]): string {
  const head = ["date", "plate", "tier", "gross_kr", "fee_kr", "net_kr", "photographer", "owner_share_kr", "photographer_payout_kr", "buyer", "source", "note"];
  const rows = sales.map((s) => {
    const sp = splitOf(s);
    return [s.date, s.plate, s.tier, s.gross, s.fee, sp.net, s.photographer, sp.ownerShare, sp.photographerPayout, s.buyer, s.source, s.note]
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(",");
  });
  return [head.join(","), ...rows].join("\n");
}
