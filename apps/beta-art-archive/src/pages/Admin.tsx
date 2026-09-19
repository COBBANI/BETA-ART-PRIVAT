import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  addSale,
  deleteSale,
  estimateFee,
  monthlyTotals,
  OWN_BRAND,
  readSales,
  salesToCsv,
  totalsOf,
  type MonthPoint,
  type Sale,
} from "@/lib/sales";

// Owner-only sales dashboard (see lib/sales.ts). This is an INTERNAL tool,
// not part of the public 8-language site, so its labels are plain
// English/Norwegian text rather than i18n keys — a deliberate exception
// documented in docs/beta-art/satis-takip.md. Reached via /#admin, unlinked
// from nav/footer. Not access-controlled (no backend); data is private to
// this browser only.

const kr = (n: number) => `kr ${n.toLocaleString("nb-NO", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const today = () => new Date().toISOString().slice(0, 10);

export function Admin() {
  const [sales, setSales] = useState<Sale[]>(() => readSales());
  const [gross, setGross] = useState("190");
  const [fee, setFee] = useState("4.65");
  const [feeTouched, setFeeTouched] = useState(false);
  const [plate, setPlate] = useState("");
  const [tier, setTier] = useState("Personal");
  const [photographer, setPhotographer] = useState(OWN_BRAND);
  const [buyer, setBuyer] = useState("");
  const [source, setSource] = useState<"stripe" | "email">("email");
  const [date, setDate] = useState(today());
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");

  const totals = useMemo(() => totalsOf(sales), [sales]);
  const months = useMemo(() => monthlyTotals(sales), [sales]);

  const onGross = (v: string) => {
    setGross(v);
    if (!feeTouched) {
      const g = parseFloat(v);
      setFee(Number.isFinite(g) ? String(estimateFee(g)) : "0");
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const g = parseFloat(gross);
    const f = parseFloat(fee);
    if (!Number.isFinite(g) || g <= 0) return setErr("Enter a valid gross amount / Oppgi gyldig beløp.");
    if (!plate.trim()) return setErr("Enter the plate / Oppgi platen.");
    try {
      addSale({
        date: date || today(),
        plate: plate.trim(),
        tier: tier.trim() || "Personal",
        gross: g,
        fee: Number.isFinite(f) ? f : 0,
        photographer: photographer.trim() || OWN_BRAND,
        buyer: buyer.trim(),
        source,
        note: note.trim(),
      });
      setSales(readSales());
      setErr("");
      setPlate("");
      setBuyer("");
      setNote("");
      setGross("190");
      setFee("4.65");
      setFeeTouched(false);
    } catch {
      setErr("Storage is blocked in this browser — the ledger cannot be saved here.");
    }
  };

  const remove = (id: string) => {
    deleteSale(id);
    setSales(readSales());
  };

  const exportCsv = () => {
    const blob = new Blob([salesToCsv(sales)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `beta-art-salg-${today()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="border-b border-border">
      <div className="mx-auto w-[min(100%-3rem,1100px)] py-[clamp(2.5rem,6vw,4rem)]">
        <p className="font-record text-xs uppercase tracking-[0.22em] text-muted-foreground">Beta Art · Admin</p>
        <h1 className="mt-2 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-light">Sales tracking · Salgsoversikt</h1>
        <p className="mt-3 max-w-[70ch] text-sm text-foreground/70">
          A private ledger for the site owner. Log each sale from Stripe or from a licence-request email; the split
          (30% Beta Art / 70% photographer, no VAT) is computed automatically. Data stays in this browser only — it is
          never sent anywhere. This page is unlinked but not password-protected; don't store anything beyond a plain
          sales log.
        </p>

        {/* Totals */}
        <div className="mt-8 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4 lg:grid-cols-6">
          <Stat label="Sales" value={String(totals.count)} />
          <Stat label="Gross" value={kr(totals.gross)} />
          <Stat label="Fees" value={kr(totals.fee)} />
          <Stat label="Net" value={kr(totals.net)} />
          <Stat label="Beta Art (30%)" value={kr(totals.ownerShare)} accent />
          <Stat label="Payouts owed" value={kr(totals.payouts)} />
        </div>

        {/* Revenue chart — gross per month (magnitude over time → bars) */}
        {months.length > 0 && <RevenueChart months={months} />}

        {/* Add sale */}
        <form onSubmit={submit} className="mt-8 grid grid-cols-1 gap-4 border border-border bg-background p-[clamp(1.2rem,3vw,1.8rem)] md:grid-cols-3">
          <Field label="Date"><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="rounded-none" /></Field>
          <Field label="Plate"><Input value={plate} onChange={(e) => setPlate(e.target.value)} placeholder="Golden Hour" className="rounded-none" /></Field>
          <Field label="Licence tier"><Input value={tier} onChange={(e) => setTier(e.target.value)} className="rounded-none" /></Field>
          <Field label="Gross (kr)"><Input inputMode="decimal" value={gross} onChange={(e) => onGross(e.target.value)} className="rounded-none" /></Field>
          <Field label="Fee (kr) — auto, editable">
            <Input inputMode="decimal" value={fee} onChange={(e) => { setFee(e.target.value); setFeeTouched(true); }} className="rounded-none" />
          </Field>
          <Field label={`Photographer (${OWN_BRAND} = no commission)`}>
            <Input value={photographer} onChange={(e) => setPhotographer(e.target.value)} className="rounded-none" />
          </Field>
          <Field label="Buyer email"><Input value={buyer} onChange={(e) => setBuyer(e.target.value)} placeholder="reference only" className="rounded-none" /></Field>
          <Field label="Source">
            <select value={source} onChange={(e) => setSource(e.target.value as "stripe" | "email")} className="h-9 w-full rounded-none border border-input bg-background px-3 text-sm">
              <option value="email">Licence-request email</option>
              <option value="stripe">Stripe</option>
            </select>
          </Field>
          <Field label="Note"><Input value={note} onChange={(e) => setNote(e.target.value)} className="rounded-none" /></Field>
          <div className="md:col-span-3">
            <Button type="submit" className="rounded-none font-record text-xs uppercase tracking-[0.16em]">Add sale</Button>
            {err && <span className="ms-4 font-record text-xs text-destructive">{err}</span>}
          </div>
        </form>

        {/* Per-photographer payouts */}
        {totals.byPhotographer.length > 0 && (
          <div className="mt-8">
            <p className="font-record text-xs uppercase tracking-[0.2em] text-muted-foreground">Payouts owed by photographer</p>
            <ul className="mt-3 divide-y divide-border border-y border-border">
              {totals.byPhotographer.map((p) => (
                <li key={p.name} className="flex items-center justify-between py-2 text-sm">
                  <span>{p.name} <span className="text-muted-foreground">· {p.count}</span></span>
                  <span className="font-record">{kr(p.payout)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Sales list */}
        <div className="mt-8 flex items-center justify-between">
          <p className="font-record text-xs uppercase tracking-[0.2em] text-muted-foreground">Recorded sales</p>
          {sales.length > 0 && (
            <button onClick={exportCsv} className="font-record text-[0.68rem] uppercase tracking-[0.12em] text-accent hover:underline">
              Export CSV
            </button>
          )}
        </div>
        {sales.length === 0 ? (
          <p className="mt-4 border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
            No sales logged on this device yet.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border text-start font-record text-[0.66rem] uppercase tracking-[0.1em] text-muted-foreground">
                  {["Date", "Plate", "Tier", "Gross", "Fee", "Photographer", "Payout", "Src", ""].map((h) => (
                    <th key={h} className="py-2 pe-3 text-start font-normal">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sales.map((s) => {
                  const own = s.photographer.trim().toLowerCase() === OWN_BRAND.toLowerCase();
                  const payout = own ? 0 : Math.round((s.gross - s.fee) * 0.7 * 100) / 100;
                  return (
                    <tr key={s.id} className="border-b border-border/60">
                      <td className="py-2 pe-3 whitespace-nowrap">{s.date}</td>
                      <td className="py-2 pe-3">{s.plate}</td>
                      <td className="py-2 pe-3">{s.tier}</td>
                      <td className="py-2 pe-3 whitespace-nowrap">{kr(s.gross)}</td>
                      <td className="py-2 pe-3 whitespace-nowrap text-muted-foreground">{kr(s.fee)}</td>
                      <td className="py-2 pe-3">{s.photographer}</td>
                      <td className="py-2 pe-3 whitespace-nowrap">{own ? "—" : kr(payout)}</td>
                      <td className="py-2 pe-3 text-muted-foreground">{s.source === "stripe" ? "S" : "@"}</td>
                      <td className="py-2 text-end">
                        <button onClick={() => remove(s.id)} className="font-record text-[0.66rem] uppercase tracking-[0.1em] text-muted-foreground hover:text-destructive">
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

// Gross revenue per month. One series → one hue (the theme accent, already
// validated site-wide for both light and dark), so no legend and no
// categorical-palette check needed. Thin bars, 4px rounded tops anchored to
// the baseline, recessive axis, direct labels, per-bar hover tooltip. The
// sales table below is the "table view" this chart's data also lives in.
function RevenueChart({ months }: { months: MonthPoint[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 720;
  const H = 240;
  const padX = 16;
  const padTop = 28; // room for the direct value label
  const padBottom = 26; // room for month labels
  const max = Math.max(...months.map((m) => m.gross), 1);
  const n = months.length;
  const slot = (W - padX * 2) / n;
  const barW = Math.min(48, slot * 0.6);
  const plotH = H - padTop - padBottom;
  const y = (v: number) => padTop + plotH * (1 - v / max);
  const shortKr = (v: number) => `kr ${Math.round(v).toLocaleString("nb-NO")}`;

  return (
    <div className="mt-8">
      <p className="font-record text-xs uppercase tracking-[0.2em] text-muted-foreground">Gross revenue by month</p>
      <div className="mt-3 overflow-x-auto border border-border bg-background p-4">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Gross revenue by month" style={{ minWidth: 480 }}>
          {/* baseline (recessive) */}
          <line x1={padX} y1={y(0)} x2={W - padX} y2={y(0)} stroke="hsl(var(--border))" strokeWidth={1} />
          {months.map((m, i) => {
            const cx = padX + slot * i + slot / 2;
            const x = cx - barW / 2;
            const h = Math.max(2, plotH * (m.gross / max));
            const active = hover === i;
            return (
              <g key={m.month} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
                {/* invisible full-height hit target, larger than the bar */}
                <rect x={cx - slot / 2} y={padTop} width={slot} height={plotH} fill="transparent" />
                <rect
                  x={x}
                  y={y(m.gross)}
                  width={barW}
                  height={h}
                  rx={4}
                  fill="hsl(var(--accent))"
                  opacity={hover === null || active ? 1 : 0.55}
                />
                {/* direct value label above each bar */}
                <text x={cx} y={y(m.gross) - 8} textAnchor="middle" fontSize={11} fill="hsl(var(--foreground))" className="font-record">
                  {shortKr(m.gross)}
                </text>
                {/* month label */}
                <text x={cx} y={H - 8} textAnchor="middle" fontSize={10} fill="hsl(var(--muted-foreground))" className="font-record">
                  {m.label.slice(2)}
                </text>
                {active && (
                  <text x={cx} y={padTop - 14} textAnchor="middle" fontSize={11} fill="hsl(var(--muted-foreground))">
                    {m.count} {m.count === 1 ? "sale" : "sales"} · net {shortKr(m.net)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="bg-background p-4">
      <p className="font-record text-[0.62rem] uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
      <p className={`mt-1 font-display text-lg ${accent ? "text-accent" : ""}`}>{value}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="font-record text-[0.66rem] uppercase tracking-[0.1em] text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
