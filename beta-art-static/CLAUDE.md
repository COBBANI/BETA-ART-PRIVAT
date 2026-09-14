# CLAUDE.md

Two parts. The first is a general set of behavioural guidelines, taken as-is from
[forrestchang/andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)
(MIT), which derives them from Andrej Karpathy's observations on where LLMs go
wrong in code. The second is what this project specifically requires, including
the two places where it overrides the first.

---

# Part one — general guidelines

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

# Part two — this project

## Where part one is overridden

**Guideline 1 says "if something is unclear, stop, ask."** The owner has said the
opposite, repeatedly and in writing: *research it yourself and decide*, and *work
without waiting for me*. So the rule here is **state the assumption and continue**,
and reserve stopping for the small number of things a machine genuinely cannot
settle — a price nobody has tested, a legal position, a name on a review, a
company registration. Those live in `tools/launch.py` under PERSON, and that list
is where a question belongs instead of a halted turn.

**Guideline 4 says "write a test."** There is no test suite here and one would be
the wrong shape. Verification is the gates below. "Make it pass" means *the
gates exit zero*, and a new class of mistake means *a new gate*, not a new test
file.

Everything else in part one applies as written, and guideline 3 applies with extra
force — see "Generated pages" below.

## What this is

Four static properties, one repository, no build step and no framework:

| Folder | Property |
|---|---|
| `/` | The hub — the front door |
| `beta-art/` | Beta Art — the verified-human photography archive |
| `beta-art-business/` | Beta Art Business — the studio |
| `beta-art-blog/` | Field Notes — the journal |

The only external dependency on any page is Google Fonts. No bundler, no npm
install to view a page, no server needed to read one. Keep it that way: a
dependency added here is a dependency in perpetuity on a site meant to outlive
its tooling.

## Generated pages — the rule that matters most

Most pages are **not written by hand**. They are written once as data in
`tools/generators/` and generated, so that a change to a price or a service name
lands on every page that mentions it rather than on the pages somebody remembered.

**Never hand-edit a generated page.** Edit the data table, re-run the builder,
re-run the gates. A hand edit is lost the next time the builder runs, and worse,
it is lost silently. `tools/generators/README.md` says which builder writes what.

## The gates

Two lists, and the difference matters. Mixing them makes "the gates pass"
sound impossible when it is not.

One command runs the correctness set and exits on it:

    python3 tools/check.py        # all of the below, plus the readiness summary

**Correctness — these must all exit zero.** A non-zero here is a defect, and
nothing ships past it:

    python3 tools/sitemap.py      # URLs follow the pages, and no two share one
    python3 tools/feed.py         # the two feeds follow the articles
    python3 tools/enrich.py       # breadcrumb and FAQ structured data
    python3 tools/audit.py        # HTML
    python3 tools/qc.py           # JS, CSS, i18n, prices, hosts, nothing oversized shipped
    python3 tools/tokens.py       # a custom property is defined once, and resolves
    python3 tools/classes.py      # a class on a page has a rule behind it
    python3 tools/copy.py         # conversion copy
    python3 tools/claims.py       # a promise on a page is a promise in the notice
    python3 tools/klarsprak.py    # Norwegian against Språkrådet's klarspråk rules
    python3 tools/languages.py    # the notice says what languages.json records
    python3 tools/plates.py       # catalogue integrity
    node  tools/render-check.js   # a real browser, four widths

**Readiness — these report what is not finished.** They answer "is this
finished?", not "is this correct?". They exit **0**, because having something
to report is not a failure — the same reason `git status` exits 0 on a dirty
tree. Add `--strict` to either one to gate on it, which is what a deploy
pipeline should use. What may never happen is quieting the *report*: the
outstanding items stay printed, and `launch.py` still exits non-zero when a
real gate underneath it breaks.

    python3 tools/gaps.py         # what is still missing
    python3 tools/launch.py       # ready? machine answers vs. person answers
    python3 tools/launch.py --slow    # the same, with the browser gate included

`launch.py` says it of itself: the person list is *"never marked done here."*
Registering a company, buying a domain, photographing a plate and reading law
are not things a tool can settle, and a tool that claimed otherwise would be
lying about whether the site is ready. The same is true of the last item in
`gaps.py` — see `skill-observations/log.md`, observation 5, for why the
archive's Norwegian page waits on a lawyer rather than on somebody's time.

`render-check.js` blocks font requests — Chromium cannot reach
fonts.googleapis.com from this environment — so its text measurements are taken
in fallback stacks and it says so. Treat a near-miss there as a near-miss, not a
pass.

## The discipline the gates enforce

These are the project's actual convictions, and they are why the gates exist:

- **A claim on a page must be an undertaking in the legal notice.** Not mentioned
  there — undertaken. `claims.py` fails a page that promises what the notice only
  describes.
- **A review nobody signed is not a review.** `languages.json` will not accept
  `"status": "reviewed"` without a named reviewer and a date, and eleven of the
  twelve languages are still `machine`. The human-approved mark on every page
  says what it covers *and what it does not*, generated from that file.
- **Machine-written is not a warning, it is not-yet-done.** Say so as progress
  remaining, never as a caution badge.
- **Nothing unlawful is published, by us or by a visitor.** Model releases,
  worldwide policy on what may never appear, and the forms that collect consent.
- **Blanks stay blank.** Organisation number, registered address, the archive's
  real size, the photographer's city. Nothing invents them.

## Norwegian

Norwegian is not a translation of the English, it is written. `data_no.py` holds
its own copy. `klarsprak.py` splits its findings: kansellistil, abbreviations,
substantivsjuke and «man» are **feil** and fail the gate; passive voice, long
sentences and long words are advisory and do not.

## Noticing what should have been a gate

At the start of any task-oriented session — any interaction where you will use
tools and produce deliverables — invoke the **task-observer** skill before
beginning work, so that what is learned during the session is captured rather
than lost at the end of it.

When loading any skill, check the observation log for OPEN observations tagged to
that skill and apply their insights to the current work, even if the skill file
has not been updated yet.

This is not bookkeeping, and it is the same conviction as the gates. Every gate
in the list above exists because something went wrong once and nobody wanted it
to go wrong silently a second time. `claims.py` exists because a page promised
what the notice only described. The 1024px width was added to `render-check.js`
because every business page scrolled sideways in a band no one was measuring.
The observation log is where a mistake waits between being made and becoming a
gate.

The log lives at `skill-observations/log.md`. Note that a session container here
is ephemeral: an observation that is not committed does not survive the session,
which is the same reason the generators live in this repository rather than in a
temporary directory.

## Committing

Clear messages, on the designated branch. **Never put a model identifier in a
commit message, a code comment, or anything else that lands in the repository** —
that belongs in conversation only.
