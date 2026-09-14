# The concept, reviewed as a business

Not a design review. The question here is only: where does the money come from,
how much of it, and what has to be true for that to happen.

Everything below is measured against the prices and the market map actually in
this repository, not against a general opinion about photography or studios.

---

## 1. This is three businesses, and only one can pay a salary next year

| | What it sells | Price band | Revenue model |
|---|---|---|---|
| **Beta Art** — archive | Image licences | kr 190 · 890 · 2 900 | Transactional, commoditised |
| **Beta Art Business** — studio | 25 services | kr 490 – 39 000, six recurring | Project + retainer |
| **Field Notes** — journal | Nothing | — | Cost centre, by design |

They are presented as one company with three faces. Commercially they are three
companies with three different rhythms, three different buyers and three
different cost structures.

**The archive does not work as a standalone P&L.** Take the most optimistic
plausible average, kr 890, and a modest target of kr 500 000 a year:

> kr 500 000 ÷ kr 890 = **562 licences a year — 1.5 every single day, all year**

From a catalogue of twelve plates, none of which exist yet as photographs, in a
market where global stock is commoditised and the price per image has fallen for
a decade. The number does not become plausible with better design or a better
website. It becomes plausible only with volume this archive is not built for, or
with prices this market does not pay.

**The studio does work.** Median one-off is kr 9 500, the top of the range is
kr 39 000, and six products bill monthly. Twenty-five to thirty projects a year
covers a salary and overhead in Norway. That is an ordinary, achievable number
for one person with a referral network.

**So: the archive is the brand. The studio is the business.**

And that is the single biggest finding in this review, because the effort has
gone the other way. The deepest work in this repository — accession records,
RAW custody, C2PA content credentials, model releases, a worldwide policy on
what may never be published, a catalogue gate that refuses a plate without a
signature — is all on the property that cannot pay for itself. The studio, which
can, got 25 well-written pages and no delivery system.

That is not wasted work. It is misfiled. See the next section.

---

## 2. The differentiator is aimed at the wrong buyer

The promise is: made by a human, verified at the source, nothing generated, we
will tell you which parts of your delivery were machine-assisted, your material
never trains a model, a person approves everything before it leaves.

**As a stock-photography pitch, that is weak.** A marketing coordinator buying a
kr 890 image does not audit provenance. They audit budget and deadline. The
guarantee is real and it is largely invisible at that price point.

**As a services-procurement pitch, that is strong and it is topical.** A
Norwegian company — and far more so a kommune — buying design, content or
automation in 2026 has an internal question it often cannot answer: *what in
this deliverable was machine-made, and did our material end up training
somebody's model?* Beta Art Business can answer it in writing. Very few of its
competitors can.

**The reframe, which costs nothing:** the archive stops being the shop window
and becomes the proof. It is the thing that demonstrates the studio is not
bluffing about provenance, because the studio applies the same discipline to a
photograph that nobody is forcing it to apply. The archive earns its place as
the most expensive credential in the portfolio rather than as a revenue line
that has to carry itself.

Practically, that changes what the front door leads with and what a sales
conversation opens with. It does not require rebuilding anything.

---

## 3. The ladder in `docs/05` is a fourth company

| Level | Price | What it actually is |
|---|---|---|
| Pro articles | kr 99–199 / month | Media subscription |
| Reports | kr 299–999 | Info product |
| Courses | kr 999–4 999 | Education |
| Curiosity Engine | kr 499–14 999 / month | SaaS |

Selling **attention** — blog to newsletter to Pro to course — and selling
**labour** — the studio — are different companies. Different acquisition costs,
different margins, different support loads, different day shapes. Plenty of
people run both. Almost nobody starts both.

The Engine's Agency tier is priced at kr 14 999 a month before one customer
exists. There is nothing wrong with modelling it; there is something wrong with
it sitting in the same document, in the same table format, at the same
confidence, as the service prices that are ready to quote.

**Recommendation:** mark the ladder as a hypothesis with a date, or cut it from
the operating plan and keep it in a separate file. A plan that mixes what is
sellable on Monday with what might be sellable in three years makes both harder
to act on.

---

## 4. The AI staff are the best commercial idea here — and the setup fee is a risk

| Product | Setup | Monthly |
|---|---|---|
| AI receptionist | kr 14 000 | kr 2 900 |
| AI office assistant | kr 16 000 | kr 3 400 |
| AI sales assistant | kr 19 000 | kr 3 900 |

Why this is the strongest offer in the portfolio:

- **It recurs.** Three customers at kr 3 400 average is kr 122 400 a year of
  predictable revenue. Thirty projects a year is not predictable; three
  retainers are.
- **It is demonstrable.** The site already says Beta Art runs these three for
  itself. That is the cheapest and most convincing sales asset available — and
  it is the one part of the concept where being your own first customer is
  genuinely honest rather than a trick.
- **It fits the buyer.** A Norwegian small business losing a third of its calls
  is a specific, expensive, admitted problem.

**The risk is the setup fee.** The site's own implied rate is kr 1 200 an hour
(career advice: two hours, kr 2 400). At that rate a kr 14 000 receptionist
setup buys about **11.7 hours** — call it a day and a half — to cover discovery,
phone and calendar integration, tone of voice, escalation rules, a GDPR basis,
testing against real calls, and two weeks of supervision. If the first real one
takes four days, the product loses money on every sale, and it loses it
invisibly because the monthly fee makes the account look healthy.

**Do not publish a setup price you have not delivered once.** Build one, for a
real business, measured, and set the number afterwards. This is the single
highest-value experiment available.

---

## 5. Twenty-five services is a menu, not a position

The Private tier — CV kr 1 200, LinkedIn kr 1 500, career kr 2 400, photo
editing kr 490 — is a different business from the Business tier, and it works
against it in three ways: it is low-value and high-touch, it fills the calendar
with work that cannot be delegated, and it puts a kr 490 price on the same site
that asks a company to trust it with a kr 39 000 e-commerce build.

The counter-argument is real: private work is cash flow and lead generation
while company deals are slow, and a CV client today can be a hiring manager in
two years.

Both are defensible. What is not defensible is leaving it undecided, because the
homepage currently has to speak to a job-seeker and a managing director in the
same breath. Pick one to lead with. My recommendation is **lead with Business,
keep Private as an unadvertised referral service** — the revenue survives, the
positioning stops fighting itself.

---

## 6. What is structurally blocking revenue right now

Not opinions. Facts about the current build.

1. **Nothing can take money.** No checkout, no backend, six forms that store
   nothing. Conversion is zero by construction, whatever the traffic.
2. **"Within 48 hours" is promised on 31 pages** with no inbox behind it. The
   first enquiry that arrives and is not answered costs more than the page
   earned.
3. **No organisation number.** Blocks the Stripe account and the first legal
   invoice. Nothing in the repository can create it.
4. **No customer has been spoken to.** Every price above is a hypothesis written
   carefully. Careful is not tested.
5. **Single point of failure.** One person delivers everything. Illness equals
   zero revenue. The retainers and the productised offers are the only partial
   answer.

---

## 7. What I would do in the next ninety days

In this order, and not in parallel.

| # | Action | Why it is first |
|---|---|---|
| 1 | Register the company. Organisation number, address, bank, accountant. | Blocks Stripe, invoicing, and every claim in the legal notice |
| 2 | Ten conversations with real Norwegian buyers — an agency, a kommune, a shop, a clinic | The only thing that can invalidate the other eighty-nine days |
| 3 | One backend that stores an enquiry and takes payment for **one** product | Not the ladder. One product, end to end, webhook-granted |
| 4 | Deliver one AI receptionist for a real business, measured to the hour | Then set the setup price with evidence |
| 5 | Twelve real photographs, or publish the archive without a catalogue | A catalogue of placeholders is worse than no catalogue |
| 6 | Norwegian and Turkish language reviews | Turkish is 893 words and the reviewer is the owner |

Everything else — Klarna, the Engine, courses, the Pro tier, the other nine
languages — waits. None of it fails if it is late. All of it fails if it is
early.

---

## 8. The honest summary

The craft here is unusually good and the commercial sequencing is unusually
inverted. Almost all of the rigour went into the property with the weakest
economics, and almost none of the delivery machinery exists for the property
that pays.

That is a fixable problem, and it is fixable without discarding anything: the
archive's discipline becomes the studio's proof, the studio's services become
the revenue, and the journal keeps doing the one job it is already good at.

The thing that would worry me if I were investing is not the plan. It is that
none of it has met a customer yet.
