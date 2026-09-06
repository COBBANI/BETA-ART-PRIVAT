import { ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePage } from "@/lib/router";
import { useLang } from "@/lib/langContext";
import { useCart } from "@/lib/cartContext";
import { licenceTiers } from "@/lib/data";
import { STRIPE_PAYMENT_LINK } from "@/lib/config";
import { ForYou } from "@/components/ForYou";

// This page's Norwegian copy is preserved verbatim from the live site —
// the rest of beta-art.com is in English, but the cart specifically was
// pasted in Norwegian ("Handlekurv"). See docs/beta-art/privat-icerik-analizi.md
// for this noted-not-fixed inconsistency. New, user-directed addition
// (30.08.2026): the cart is now wired to real state (cartContext) instead
// of always showing the empty-state preview — a service-design gap where
// the cart icon/page existed but nothing ever added to it.
export function Cart() {
  const { go } = usePage();
  const { t, lang } = useLang();
  const { items, remove } = useCart();
  const total = items.length * 190;

  if (items.length === 0) {
    return (
      <section className="border-b border-border">
        <div className="mx-auto w-[min(100%-3rem,720px)] py-[clamp(3.5rem,9vw,6rem)] text-center">
          <h1 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-light">{t("cartTitle")}</h1>
          <p className="mt-2 font-record text-xs uppercase tracking-[0.14em] text-muted-foreground">{t("cartItems")}</p>

          <div className="mt-10 flex flex-col items-center gap-4 border border-dashed border-border p-12">
            <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            <p className="font-display text-lg">{t("cartEmpty")}</p>
            <p className="text-sm text-foreground/70">{t("cartAddItems")}</p>
            <button
              onClick={() => go("home", "licensing")}
              className="mt-2 border border-accent bg-accent px-5 py-2.5 font-record text-xs uppercase tracking-[0.14em] text-accent-foreground"
            >
              {t("cartSeeLicenses")}
            </button>
          </div>

          <button onClick={() => go("home")} className="mt-8 font-record text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-accent">
            {t("cartContinue")}
          </button>
        </div>
        {/* Behavior layer: an empty cart is where "what might they want to
            buy next" helps most — shown only with real device activity. */}
        <ForYou />
      </section>
    );
  }

  return (
    <section className="border-b border-border">
      <div className="mx-auto w-[min(100%-3rem,720px)] py-[clamp(3rem,7vw,4.5rem)]">
        <h1 className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-light">{t("cartTitle")}</h1>
        <p className="mt-2 font-record text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {items.length} {items.length === 1 ? t("cartItemOne") : t("cartItemMany")}
        </p>

        <div className="mt-8 divide-y divide-border border-y border-border">
          {items.map((item) => (
            <div key={item.plateId} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="font-display text-base">{item.title}</p>
                <p className="font-record text-xs text-muted-foreground">{licenceTiers[0].name[lang]} · kr 190</p>
              </div>
              <button
                onClick={() => remove(item.plateId)}
                aria-label={t("cartRemove")}
                className="text-muted-foreground hover:text-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between font-record text-sm uppercase tracking-[0.1em]">
          <span>{t("cartTotal")}</span>
          <span>kr {total}</span>
        </div>

        {/* With a Stripe Payment Link configured, checkout goes straight to
            Stripe (new tab, noopener); without one, the original behaviour —
            the licence request form — remains. No simulated payment flow. */}
        <Button
          onClick={() => {
            if (STRIPE_PAYMENT_LINK) {
              window.open(STRIPE_PAYMENT_LINK, "_blank", "noopener,noreferrer");
            } else {
              go("home", "request");
            }
          }}
          className="mt-6 w-full rounded-none font-record text-xs uppercase tracking-[0.16em]"
        >
          {t("cartCheckout")}
        </Button>

        <button onClick={() => go("home")} className="mt-6 block w-full text-center font-record text-xs uppercase tracking-[0.12em] text-muted-foreground hover:text-accent">
          {t("cartContinue")}
        </button>
      </div>
      <ForYou />
    </section>
  );
}
