import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLang } from "@/lib/langContext";

export function RequestShoot() {
  const [status, setStatus] = useState("");
  const { t } = useLang();
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-[min(100%-3rem,900px)] py-[clamp(3rem,7vw,4.5rem)]">
        <p className="font-record text-xs uppercase tracking-[0.22em] text-muted-foreground">{t("commissionEyebrow")}</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.2rem)] font-light">{t("requestShootTitle")}</h1>
        <p className="mt-4 max-w-[62ch] text-[1.02rem] leading-relaxed text-foreground/80">{t("requestShootIntro")}</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStatus(t("previewNotice"));
          }}
          className="mt-8 grid grid-cols-1 gap-5 border border-border bg-secondary p-[clamp(1.4rem,3vw,2rem)] md:grid-cols-2"
        >
          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldName")}</Label>
            <Input className="rounded-none border-border bg-background" required />
          </div>
          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldEmail")}</Label>
            <Input type="email" className="rounded-none border-border bg-background" required />
          </div>
          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldCompanyPlain")}</Label>
            <Input className="rounded-none border-border bg-background" />
          </div>
          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldProjectType")}</Label>
            <Input className="rounded-none border-border bg-background" />
          </div>
          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldLocation")}</Label>
            <Input className="rounded-none border-border bg-background" />
          </div>
          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldPreferredDate")}</Label>
            <Input className="rounded-none border-border bg-background" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldBudget")}</Label>
            <Input className="rounded-none border-border bg-background" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldBrief")}</Label>
            <Textarea rows={5} className="rounded-none border-border bg-background" required />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" className="w-full rounded-none font-record text-xs uppercase tracking-[0.16em] md:w-auto">
              {t("sendRequest")}
            </Button>
            <p role="status" aria-live="polite" className="mt-3 min-h-[1.1em] font-record text-xs text-accent">{status}</p>
          </div>
        </form>
      </div>
    </section>
  );
}
