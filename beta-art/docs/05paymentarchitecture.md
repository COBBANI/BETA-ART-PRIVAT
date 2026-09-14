# Payment architecture

One payment layer for every Beta Art product: the archive's licences, the
studio's projects, the journal's Pro tier, the courses and reports, and the
Curiosity Engine as SaaS. Not a "Pay" button bolted onto each site.

The rule this whole document exists to enforce: **access is granted by a
webhook, never by a redirect.**

---

## 0. Decisions taken

Two open questions in this document are now closed. Both were the owner's to
decide; the consequences below are not opinions about the decisions but the
obligations that come with them.

### Merchant of record — Stripe for everything

**Decided 2026-08-20: Beta Art is the merchant of record for every product, on
Stripe. No Lemon Squeezy, no Paddle, no split between the archive and the desk.**

That is position A in section 6, and it is now the position rather than the
starting point. One processor, one contract with the customer, one set of
books, one place to look when a payment is queried. For a business whose
revenue is Norwegian and whose first customers will be Norwegian, that
simplicity is worth more than what a merchant of record would absorb.

What it means Beta Art now owns, and cannot delegate:

- **The VAT liability, everywhere.** Stripe Tax can calculate and report; it is
  not the seller. Registration, filing and remittance stay with the company —
  Norwegian MVA above kr 50 000 rolling turnover, and, for digital sales to
  consumers in the EU, the non-Union OSS scheme, where there is no small-seller
  threshold for a supplier established outside the EU. Confirm the exact
  treatment with the accountant before the first invoice.
- **Chargebacks and disputes**, in Beta Art's name.
- **Customer contracts.** The buyer's counterparty is Beta Art, which is what
  the licence terms already say.

This decision is worth reopening on exactly one trigger: the Curiosity Engine
selling to consumers across many countries outside the EEA. At that point the
filing load, not the fee, is what makes a merchant of record cheaper.

### Vipps is one-off only, and that is a Stripe limitation, not a choice

Checked against Stripe's own documentation rather than assumed: **Stripe's Vipps
support is in private preview** — API calls carry a `vipps_preview=v1` header —
**and it does not support recurring payments.** MobilePay through Stripe covers
Denmark and Finland; it is not a Norwegian method.

So, under "all Stripe":

- One-off purchases in Norway — archive licences, courses, reports, a fixed
  project fee — can offer Vipps, once preview access is granted.
- **Every subscription is card-only.** Retainers, the three AI staff roles, the
  monthly social and content services, the journal's Pro tier. Vipps cannot
  carry them through Stripe.

The only way to take Vipps for subscriptions is Vipps' own Recurring API, which
is a second integration and would end "all Stripe". Do not do it because it
would be tidy; do it if and when Norwegian subscribers actually refuse to enter
a card.

### Where it runs — Render, Frankfurt

**Decided: the payment service runs on Render in the EU (Frankfurt) region. The
four websites stay on Vercel.**

Vercel Functions were the other candidate, and the argument for them is that the
sites are already there. It does not survive contact with the schema. `06-payment
-schema.sql` is eighteen tables with a ledger, webhook idempotency and an audit
log; it wants a real Postgres with transactions, a worker that drains a queue,
and cron for renewals, credit expiry and invoice runs. Render has web services,
background workers, cron and managed Postgres on one private network. Choosing
Vercel would have meant a database somewhere else anyway, so "fewer moving
parts" was never true.

Three things settle it beyond convenience:

- **Frankfurt keeps personal and payment-adjacent data inside the EEA**, so the
  privacy section does not have to answer a transfer question it would rather
  not have.
- **A website deploy can never take the payment service down.** They are
  separate systems with separate release cycles, which is the correct
  relationship between a brochure and a till.
- **A smaller attack surface for the thing that touches money** — section 5's
  PCI posture is easier to hold on a service that does one job.

---

## 1. Shape

```
                    SITE (any of the four)
                            │
                    product or service
                            │
                     SMART CHECKOUT
                     (routes by country + buyer type)
        ┌───────────────────┼───────────────────┐
        │                   │                   │
      VIPPS            CARD / WALLET         INVOICE
    MobilePay             Stripe            B2B, EHF 3.0
        │                   │                   │
       NOK            NOK / EUR / USD       NOK, net 14
        └───────────────────┼───────────────────┘
                            │
                     PAYMENT ENGINE
              (webhook in, ledger out, idempotent)
        ┌───────────────────┼───────────────────┐
        │                   │                   │
    one-time           subscription        usage / credits
        │                   │                   │
   e-book, report      Pro, SaaS tier      AI credits, API
   course, licence     membership          agent runs
        └───────────────────┼───────────────────┘
                            │
                      ENTITLEMENTS
                  (what this account may open)
                            │
                       ONE ACCOUNT
      plan · invoices · payment method · credits · usage
      upgrade · downgrade · cancel · purchases · receipts
```

The core is provider-agnostic. Vipps and Stripe are **adapters** that
normalise into the same `payment`, `subscription` and `webhook_event` tables.
Adding Klarna later means writing a third adapter, not a third system.

---

## 2. Two corrections to the plan, from the primary sources

**a. Do not build the credit system by hand. Stripe has one.**

Stripe Billing has native **credit grants** and **meters**. The documented
pattern is exactly the model wanted here: grant N credits monthly on
`invoice.paid`, report usage as meter events, let credits burn down, sell
top-up packs as additional grants, and use the `priority` parameter to decide
which pool is consumed first (monthly allowance before purchased top-ups, so
the customer never loses paid credits at a period boundary).

Also native: **Entitlements**. Map each feature to a Stripe product, and
Stripe fires `entitlements.active_entitlement_summary.updated` when a customer
subscribes, upgrades, downgrades or cancels. That removes the most error-prone
code in any SaaS — the "did we remember to revoke this" logic.

We still keep our own `credit_ledger` and `entitlement` tables. Not as a
second source of truth, but because a ledger you can read without an API call
is what makes support, refunds and disputes answerable. Stripe decides;
we record.

**b. Stripe now points usage-based billing at Metronome, not at Billing Meters.**

Stripe's own documentation says to use Metronome for usage-based billing
"unless you're maintaining an existing Billing Meters integration". That is a
real fork:

| | Billing Meters | Metronome |
|---|---|---|
| Complexity | Low | High |
| Works with Checkout | Yes | **No — custom integration required** |
| Credit wallets, auto-recharge | Manual | Built in |
| Right for | Curiosity Engine at launch | Curiosity Engine at scale |

The Checkout incompatibility settles it for now. **Start on Billing Meters +
credit grants**, because the whole point of hosted checkout is that we never
touch a card number. Revisit Metronome when usage revenue is large enough to
justify a custom payment surface — not before.

**c. One number in the brief could not be verified.**

The brief states Stripe's Norwegian card fee as 2.4% + 2 NOK. Third-party
calculators say 1.5% + 1.80 NOK, and `stripe.com` is unreachable from this
environment, so neither is confirmed here. It does not change any architectural
decision, but check the official Norway pricing page before it goes into a
margin calculation or onto a public page.

**d. Vipps Recurring is a separate product order.**

The Recurring API exists and does what the brief says — an agreement the
customer accepts once, then charges drawn against it. It is not automatic with
the eCom access: "Vipps MobilePay Faste Betalinger/Recurring" has to be ordered
on `portal.vipps.no`. Plan the lead time; do not discover it in launch week.

---

## 3. Method routing

The customer sees the fewest methods that can plausibly work for them.

| Buyer | Shown, in order |
|---|---|
| Norway, consumer | Vipps · card · Apple/Google Pay |
| Nordics ex-NO | MobilePay · card · wallet |
| EEA | card · wallet · Klarna above kr 3 000 |
| Rest of world | card · wallet |
| Any, business (org number given) | card · invoice, net 14 |

**Subscriptions are card-only, in every row of that table.** Vipps through
Stripe does not do recurring (section 0), so a customer choosing a monthly
product is shown cards and wallets and no Vipps button. Showing one and failing
at the last step is worse than not showing it.

Routing input is the billing country and whether an organisation number was
entered — never the IP address alone, which is wrong often enough to matter
for people travelling.

Klarna is reserved for higher-value consumer items (courses, reports). It is
not offered on a kr 99 subscription, where the fee would eat the margin.

---

## 4. The one flow that must not be got wrong

```
  BUY
   ↓
  our server creates a checkout session, records it as `pending`
   ↓
  redirect to Stripe Checkout / Vipps  ← card details never reach us
   ↓
  customer pays
   ↓
  provider sends webhook          provider redirects customer back
   ↓                                        ↓
  verify signature                  show "we are confirming…"
   ↓                                        ↓
  idempotency check on              poll our own API for state
  provider_event_id                         ↓
   ↓                                 render the purchase when
  write payment + entitlement        our database says so
  + credit grant, in ONE                    ↑
  transaction                               │
   ↓                                        │
  state = active ───────────────────────────┘
```

Non-negotiables:

1. **The redirect grants nothing.** A customer can pay and lose their
   connection before the success page loads; equally, a success URL can be
   opened by hand. Stripe's own documentation states you cannot rely on the
   landing page for fulfilment.
2. **Every webhook is verified by signature** before it is parsed.
3. **Every handler is idempotent.** `webhook_event.provider_event_id` is
   unique; a replayed event is recorded and skipped. Fulfilment is keyed on
   the checkout session, so calling it three times concurrently grants once.
4. **Delayed methods are handled.** Invoice and some bank methods complete
   later — `checkout.session.completed` means authorised, not paid. Access
   waits for `checkout.session.async_payment_succeeded` or `invoice.paid`.
5. **The success page never lies.** It says "confirming your payment" until
   our own database says otherwise.

### Events we act on

| Event | Action |
|---|---|
| `checkout.session.completed` | Record. Fulfil only if `payment_status = paid` |
| `checkout.session.async_payment_succeeded` | Fulfil |
| `checkout.session.async_payment_failed` | Notify, do not fulfil |
| `invoice.paid` | Extend period, grant the month's credits |
| `invoice.payment_failed` | Flag, start dunning, keep access until grace ends |
| `entitlements.active_entitlement_summary.updated` | Rewrite this account's entitlements to match |
| `customer.subscription.deleted` | Revoke at period end, not immediately |
| `charge.refunded` / `charge.dispute.created` | Revoke, and write the reason into the ledger |

---

## 5. PCI and data

Hosted checkout only. No card number, expiry or CVC ever reaches a Beta Art
server, log, or database — which is what keeps the PCI obligation at the
simplest tier. Stripe Checkout is built for that.

We store: the provider's customer id, the payment id, the last four digits and
brand **as returned by the provider for display only**, amounts in minor units,
and the address needed for tax and invoicing. Nothing else.

---

## 6. Tax

**Decided: position A.** Position B is kept below because the day it becomes
the right answer, the reasoning should already be written down.

**A — we are the merchant. This is the decision.** Beta Art sells; Beta Art owes the
VAT. Stripe Tax can calculate and Stripe can produce the data, but the
liability and the filing stay with the company. Norwegian VAT registration
starts at kr 50 000 of taxable turnover in any rolling twelve months. B2B
inside the EEA with a valid VAT number is generally reverse charge; B2C
digital sales are taxed where the customer is. Get the exact treatment
confirmed by the accountant before the first invoice, not after the first
quarter.

**B — merchant of record (not chosen; revisit only on the trigger in section 0).** Paddle or
Lemon Squeezy become the seller and take on collecting and remitting sales
tax and VAT across jurisdictions. That is a real reduction in administrative
load and a real cost, and it changes who the customer's contract is with.
Worth evaluating when the Engine has customers outside the EEA — not while
the revenue is Norwegian.

Whichever is chosen, the schema records the tax decision **on the payment**:
country, rate, basis, whether reverse charge applied, and whether the VAT
number was validated. A rate that lives only in Stripe cannot be defended
three years later.

---

## 7. The ladder

Free is the top of the funnel, not a demo.

| Level | Product | Indicative price |
|---|---|---|
| Free | Blog, Field Notes | 0 |
| Free | Newsletter | 0 |
| Pro | Premium articles | kr 99–199 / month |
| Report | AI or business report | kr 299–999 |
| Course | Training | kr 999–4 999 |
| Consulting | Advisory | kr 2 500–15 000 |
| Business | AI setup, the three AI employees | kr 10 000–50 000+ |
| SaaS | Curiosity Engine | kr 499–4 999+ / month |

Curiosity Engine tiers, with a monthly credit allowance:

| Tier | Price | Credits / month |
|---|---|---|
| Starter | kr 499 | 100 |
| Creator | kr 1 499 | 1 000 |
| Business | kr 4 999 | 5 000 |
| Agency | kr 14 999 | 20 000 |

Credit costs are data, not code — one row per action in `credit_price`, so a
change in AI cost is a row update and a dated audit trail, not a deploy:

| Action | Credits |
|---|---|
| Trend scan | 1 |
| Keyword analysis | 2 |
| Research | 5 |
| Blog article | 20 |
| Deep report | 50 |

Top-ups are sold as one-time purchases that grant credits which never expire
before the monthly allowance is spent — allowance first, purchased second.
Anything else quietly takes money from the customer at every period boundary.

---

## 8. Build order

1. Schema (`06-payment-schema.sql`), webhook table, idempotency, ledger.
2. Stripe Checkout for one-time products. One product end to end.
3. Stripe Billing for subscriptions, plus the customer portal, plus
   Entitlements.
4. Vipps through Stripe for one-off products only — request preview access
   early, because it gates the step rather than the step gating it.
5. B2B invoice with EHF 3.0, ahead of the 1 January 2027 mandate.
6. Credits: meters, grants, the ledger, the top-up product.
7. Klarna, on high-value consumer items only.
8. Vipps Recurring, direct, **only if** Norwegian subscribers actually refuse
   cards. It ends "all Stripe" and buys one payment method.
9. Re-evaluate merchant of record only on the section 0 trigger.

Step 0, before any of it: the company has to exist on paper. An organisation
number from Brønnøysund and a registered address are prerequisites for a Stripe
account and for issuing a legal invoice, and nothing in this repository can
create them.

Nothing here needs the whole ladder to exist first. It needs the ledger and
the webhook discipline to exist first — which is the entire argument for
writing the schema before the first product.
