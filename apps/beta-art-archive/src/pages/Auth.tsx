import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLang } from "@/lib/langContext";
import { usePage } from "@/lib/router";

// New, user-directed addition (30.08.2026) — a photographer account is now
// implied by the /sell flow (submissions, commission payouts). Not part of
// the verified beta-art.com content pasted earlier this session.
export function Auth() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [status, setStatus] = useState("");
  const { t } = useLang();
  const { go } = usePage();

  return (
    <section className="border-b border-border">
      <div className="mx-auto w-[min(100%-3rem,480px)] py-[clamp(3.5rem,9vw,6rem)]">
        <div className="mb-8 flex border border-border">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-3 font-record text-xs uppercase tracking-[0.14em] transition-colors ${
              mode === "login" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("authLogIn")}
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-3 font-record text-xs uppercase tracking-[0.14em] transition-colors ${
              mode === "register" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t("authRegister")}
          </button>
        </div>

        <h1 className="font-display text-[clamp(1.6rem,3.4vw,2.2rem)] font-light">
          {mode === "login" ? t("authLogInTitle") : t("authRegisterTitle")}
        </h1>
        <p className="mt-2 text-sm text-foreground/70">
          {mode === "login" ? t("authLogInBody") : t("authRegisterBody")}
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStatus(t("previewNotice"));
          }}
          className="mt-8 space-y-4"
        >
          {mode === "register" && (
            <div className="space-y-2">
              <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldName")}</Label>
              <Input className="rounded-none border-border" required />
            </div>
          )}
          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("fieldEmail")}</Label>
            <Input type="email" className="rounded-none border-border" required />
          </div>
          <div className="space-y-2">
            <Label className="font-record text-[0.7rem] uppercase tracking-[0.12em] text-muted-foreground">{t("authPassword")}</Label>
            <Input type="password" className="rounded-none border-border" required />
          </div>
          <Button type="submit" className="w-full rounded-none font-record text-xs uppercase tracking-[0.16em]">
            {mode === "login" ? t("authLogIn") : t("authRegister")}
          </Button>
          <p role="status" aria-live="polite" className="min-h-[1.1em] font-record text-xs text-accent">{status}</p>
        </form>

        <p className="mt-8 text-center text-sm text-foreground/70">
          {t("authSellPrompt")}{" "}
          <button onClick={() => go("sell")} className="text-accent underline">
            {t("navSell")}
          </button>
        </p>
      </div>
    </section>
  );
}
