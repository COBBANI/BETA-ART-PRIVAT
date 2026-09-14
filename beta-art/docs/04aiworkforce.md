# Beta Art's AI workforce

Two groups of agents work for Beta Art. They are not the same thing and they
are not held to the same rules, so they are written down separately.

**Front of house** — the three roles that talk to people. These are the same
three sold on the business site, run here first. Their operating document is
published at `beta-art-business/ai-staff.html`, because a supplier who cannot
show you their own is not worth buying from.

**Back of house** — the review agents that check the sites before anything
goes out. These never talk to a client and never touch the live site.

---

## 1. Front of house — the three published roles

Status: **in setup — none of the three is answering yet.** The rules are
written and the access boundaries are in place; the two-week supervised period
begins when each one is switched on.

This was a decision, not an oversight. The concept is *verified at the source*,
and the page argues that a buyer should ask any supplier for exactly this
document. Writing *in operation* would have gone unchallenged and would have
made the whole argument worthless. The status line changes on the day it
changes, with the date, and the note explaining why stays on the page so the
difference between a status and a slogan stays visible.

Nothing on the page is a claim about volume or results either. When there are
figures worth publishing they go up with the date they were measured, and not
before.

| Role | Scope at Beta Art | Page |
|---|---|---|
| AI receptionist | First contact on `hallo@beta-art.com` and site chat. Prices, timescales, what we do not sell, booking the first call. | `s-ai-receptionist.html` |
| AI sales assistant | The quote form. Reads the brief, routes it to the service that fits, says when we are the wrong studio. | `s-ai-sales-assistant.html` |
| AI office assistant | The studio's own administration. Inbox triage, invoice drafts, EHF 3.0 field checks, scheduled chases. | `s-ai-office-assistant.html` |

### The four standing rules

1. **It says what it is.** In the greeting, not in a footnote.
2. **It never invents a price or a date.** Published starting prices and
   published delivery windows only. Project pricing is written by a person.
3. **Nothing reaches a client unread.** Drafts stay drafts.
4. **Two supervised weeks, then a monthly read** of what it could not answer.
   That list is the most useful output either way — it names what the business
   has stopped explaining properly.

### Access boundaries

None of the three can reach client source files, delivery folders, or archive
originals. That access is scoped away, not discouraged. Conversation text is
stored under Beta Art's control; retention and deletion are set out in the
privacy section of the legal notice.

---

## 2. Back of house — the review agents

These run against the repository, never against the live site, and they never
commit. Their findings are verified before anything is changed — two of the
findings in the first round were wrong, and one was wrong in the safe
direction, which is the whole argument for verifying.

### The standing review

Run these together. Each is given the four `styles.css` files, the four
`index.html` files, and told not to edit anything.

**Visual and accessibility review.** Computes the contrast ratio of every
declared colour pair, checks the type scale for a real ratio, checks the
spacing rhythm, reads the breakpoints for what breaks between them, and looks
at focus states, hit-target sizes and reduced-motion handling. Reports file,
selector, what is wrong, and the exact change.

**Design-system review.** Extracts every CSS custom property into one table
across the four properties, counts the hard-coded values that bypass the
tokens, and judges whether the four read as one brand family or as separate
sites that share a red.

### What to do with the output

Verify before acting. In the first round:

- `--muted` failing AA at 3.71:1 — **confirmed by measurement, fixed.**
- The mobile quote button removed by `display: none` — **confirmed in the
  file, fixed.** The costliest defect on the site and neither automated gate
  would ever have caught it.
- Business `--muted` reported as failing — **wrong.** It is 5.23:1 on the void
  ground and passes.
- Journal dark `--muted` reported as failing — **wrong.** 6.32:1.

Both errors were in the same direction: the agent applied the light-ground
value to a dark-ground token. Recompute every ratio before changing a colour.

---

## 3. The automated gates

The agents are a review. These are the gate, and they run every time:

```
python3 tools/audit.py         # HTML: links, headings, metadata, JSON-LD
python3 tools/qc.py            # JS, CSS, i18n, prices, sitemaps, deployability
node    tools/render-check.js  # every page in Chromium at three widths
```

All three exit non-zero on any finding. `tools/sitemap.py` rebuilds the four
sitemaps from the pages that exist; `tools/og-image.js` re-renders the four
share cards. Run both after adding or removing a page.

---

## 4. What is deliberately not automated

Pricing. Client communication that has not been approved. Anything that would
put a claim on a public page that nobody has verified — including a case study
figure, a testimonial, or a statement that a role has been running longer than
it has.
