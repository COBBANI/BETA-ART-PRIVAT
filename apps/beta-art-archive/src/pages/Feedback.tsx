import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLang } from "@/lib/langContext";

// New, user-directed feature (31.08.2026). Direct trigger: in a scored
// review of the Beta Art concept against the user's own 100-point rubric,
// "Hedef kitlenin talebi" (target audience demand) had to be marked
// BİLİNMİYOR — no real user research exists. The user's response, quoted
// back at that exact row: "Hiç gerçek kullanıcı görüşmesi VE GERI BILDIRIM
// ALANI ACALIM WEB SAYFASINDA" — open a real feedback area on the page.
// This is that area. It does not manufacture research: it collects real
// visitor input (this session has no backend, so submissions are preview-
// only — same previewNotice pattern as every other form in this build) and
// frames the questions around the exact gap identified — would you use
// this, would you pay for it — rather than as a generic contact form.
// Not sourced from beta-art.com; a new, clearly-marked addition.
export function Feedback() {
  const [status, setStatus] = useState("");
  const { t } = useLang();
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-[min(100%-3rem,720px)] py-[clamp(3rem,7vw,4.5rem)]">
        <p className="font-record text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("feedbackEyebrow")}</p>
        <h1 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.8rem)] font-light">{t("feedbackTitle")}</h1>
        <p className="mt-4 text-[1.02rem] leading-relaxed text-foreground/80">{t("feedbackIntro")}</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStatus(t("previewNotice"));
          }}
          className="mt-10 grid grid-cols-1 gap-6 border border-border bg-secondary p-[clamp(1.4rem,3vw,2rem)]"
        >
          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("feedbackRatingLabel")}</Label>
            <div className="flex items-center gap-3">
              <span className="font-record text-[0.66rem] uppercase tracking-[0.08em] text-muted-foreground">{t("feedbackRatingUnlikely")}</span>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <label key={n} className="flex h-9 w-9 cursor-pointer items-center justify-center border border-border font-record text-xs has-[:checked]:border-accent has-[:checked]:bg-accent has-[:checked]:text-accent-foreground">
                    <input type="radio" name="likelihood" value={n} required className="sr-only" />
                    {n}
                  </label>
                ))}
              </div>
              <span className="font-record text-[0.66rem] uppercase tracking-[0.08em] text-muted-foreground">{t("feedbackRatingLikely")}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("feedbackPayLabel")}</Label>
            <select
              required
              defaultValue=""
              className="h-11 w-full rounded-none border border-border bg-background px-3 font-record text-xs uppercase tracking-[0.08em]"
            >
              <option value="" disabled>—</option>
              <option value="yes">{t("feedbackPayYes")}</option>
              <option value="no">{t("feedbackPayNo")}</option>
              <option value="maybe">{t("feedbackPayMaybe")}</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("feedbackCommentLabel")}</Label>
            <Textarea rows={4} className="rounded-none border-border" />
          </div>

          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldEmail")}</Label>
            <Input type="email" className="rounded-none border-border" placeholder={t("feedbackEmailOptional")} />
          </div>

          <div>
            <Button type="submit" className="w-full rounded-none font-record text-xs uppercase tracking-[0.16em] sm:w-auto">
              {t("feedbackSubmit")}
            </Button>
            <p role="status" aria-live="polite" className="mt-3 min-h-[1.1em] font-record text-xs text-accent">{status}</p>
          </div>
        </form>
      </div>
    </section>
  );
}
