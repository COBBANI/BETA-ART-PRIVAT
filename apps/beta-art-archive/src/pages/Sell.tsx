import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLang } from "@/lib/langContext";

// New, user-directed feature (30.08.2026), settled after three rounds of
// clarification in the same request:
//  1. "people can upload and sell their photos here"
//  2. "they can get verified" — reuses the existing 3-method check
//  3. "I'll sell my own photos on my own page" — the owner uses it too
//  4. "professional photographers can also sell — we take a commission" —
//     so it's open to outside pros as well, Beta Art taking a cut
// Net result: one submission form, open to the site's own photographer AND
// other professional photographers. A submission is only listed for sale
// after the same verification already used for every plate. Commission
// terms are agreed individually, not fixed here — same "price on request"
// caution already established for the real licence tiers, so no % is
// invented. This is NOT part of the verified beta-art.com content pasted
// earlier this session — it's a new direction, kept clearly separate. See
// docs/proje-arsivi.md for the request record.
//
// 31.08.2026: "BU SAYFAYA FOTOGRAFCILAR KENDI BLOGG BOLUMDE KENDILERINI
// TANITABILIRLER" — photographers introduce themselves in their own
// section. Scoped down from a full blog system (rejected — no data model,
// no per-author URLs, would need a real backend) to a bio field here:
// once a submission is verified, this text is what appears next to the
// photographer's name on /artists (see artistsJoinBody's "with your own
// introduction, in your words"). Beta Art's own bio on /artists
// (artistsFoundingBio) already works this way; this just opens the same
// slot to other photographers as they're verified.

// 01.09.2026 — "diğer fotoğrafçıların yükleyip satacakları bir sistem kur":
// the honest v1 of that system on a static site is a real intake channel,
// not a fake account flow. Submit now composes a structured email to
// hallo@beta-art.com (the QBLOGG composeMail pattern); photos are attached
// by the sender. Review happens in the inbox — matching the page's own
// promise ("reviewed individually, personal reply"). Verified work is then
// listed through scripts/foto-kayit.py (auto number, name, capture record)
// under the agreed 30/70 split. Accounts/auto-listing need a backend and
// Stripe Connect — deliberately not simulated here.
export function Sell() {
  const [status, setStatus] = useState("");
  const { t } = useLang();
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const line = (k: string, v: FormDataEntryValue | null) => `${k}: ${String(v ?? "").trim()}`;
    const body = [
      line(t("fieldName"), f.get("ad")),
      line(t("fieldEmail"), f.get("eposta")),
      line(t("sellFieldPortfolio"), f.get("portfolyo")),
      line(t("sellFieldEquipment"), f.get("ekipman")),
      line(t("sellFieldBio"), f.get("bio")),
      line(t("sellFieldMessage"), f.get("mesaj")),
      "",
      t("sellMailAttach"),
    ].join("\n");
    const url = `mailto:hallo@beta-art.com?subject=${encodeURIComponent(
      `Submission — ${String(f.get("ad") ?? "").trim()}`
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setStatus(t("sellMailNotice"));
  };
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-[min(100%-3rem,1000px)] py-[clamp(3rem,7vw,4.5rem)]">
        <p className="font-record text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("sellEyebrow")}</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-light">{t("sellTitle")}</h1>
        <p className="mt-4 max-w-[62ch] text-[1.02rem] leading-relaxed text-foreground/80">{t("sellIntro")}</p>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {[
            ["01", t("sellStep1Title"), t("sellStep1Body")],
            ["02", t("sellStep2Title"), t("sellStep2Body")],
            ["03", t("sellStep3Title"), t("sellStep3Body")],
          ].map(([n, title, body]) => (
            <div key={n}>
              <p className="font-record text-2xl text-muted-foreground/50">{n}</p>
              <p className="mt-2 font-display text-base">{title}</p>
              <p className="mt-1 text-sm text-foreground/70">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 border border-border bg-secondary p-6">
          <p className="font-record text-[0.68rem] uppercase tracking-[0.12em] text-accent">{t("sellNotYetTitle")}</p>
          <p className="mt-2 text-sm text-foreground/75">{t("sellNotYetBody")}</p>
        </div>

        <form
          onSubmit={submit}
          className="mt-8 grid grid-cols-1 gap-5 border border-border bg-background p-[clamp(1.4rem,3vw,2rem)] md:grid-cols-2"
        >
          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldName")}</Label>
            <Input name="ad" className="rounded-none border-border" required />
          </div>
          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldEmail")}</Label>
            <Input name="eposta" type="email" className="rounded-none border-border" required />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("sellFieldPortfolio")}</Label>
            <Input name="portfolyo" className="rounded-none border-border" placeholder="https://" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("sellFieldEquipment")}</Label>
            <Input name="ekipman" className="rounded-none border-border" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("sellFieldBio")}</Label>
            <Textarea rows={3} className="rounded-none border-border" name="bio" placeholder={t("sellFieldBioPlaceholder")} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("sellFieldMessage")}</Label>
            <Textarea name="mesaj" rows={4} className="rounded-none border-border" />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="w-full rounded-none font-record text-xs uppercase tracking-[0.16em] md:w-auto">
              {t("sellSubmit")}
            </Button>
            <p role="status" aria-live="polite" className="mt-3 min-h-[1.1em] font-record text-xs text-accent">{status}</p>
          </div>
        </form>
      </div>
    </section>
  );
}
