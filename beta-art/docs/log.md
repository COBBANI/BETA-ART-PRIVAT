# Skill Observation Log

Observations captured during task-oriented work.

**Status key:** OPEN = not yet actioned | ACTIONED (YYYY-MM-DD) = skill
updated/created | DECLINED (YYYY-MM-DD) = user decided not to pursue —
resolved statuses always carry their resolution date

---

## 2026-08-21

### Observation 1: A legibility floor and a fixed-width header are in direct tension

**Status:** OPEN
**Date:** 2026-08-21
**Session context:** Raising 114 small font sizes onto a three-step scale with a
12px floor, across four static properties.
**Skill:** New gate candidate: type-floor regression check
**Type:** internal
**Phase/Area:** Type scale changes / responsive header layout

**Issue:** The narrow breakpoints had been making the header fit 360px by
setting navigation and buttons at `.58rem` (9.28px). Applying a 12px floor
therefore reopened a header-overflow bug that had already been found and fixed
once before. `render-check.js` went from 0 findings to 83, then 57, then 5
across three attempted fixes, before returning to 0. Nothing in the CSS recorded
that those small sizes were load-bearing for layout rather than stylistic.

**Suggested improvement:** When a declaration exists only to make something fit,
say so in a comment at the declaration — this stylesheet already does that well
in places ("At 360px it is the 19px that pushes the bar past the edge"), and
those comments were the fastest route to the fix. Extend the practice to every
size below the floor.

**Principle:** A value tuned to solve a layout problem is not a style choice, and
changing it globally will silently reopen the problem it solved. Before a
sweeping change to any dimension, check whether the old values were load-bearing
— and prefer reclaiming space from tracking, padding and gaps over shrinking
text below a legibility threshold.

---

### Observation 2: Adding tokens to an existing `:root` can silently redefine one

**Status:** ACTIONED (2026-08-21) — became `tools/tokens.py`, which fails on a
custom property defined twice in one block. Verified against the original bug:
reintroducing the duplicate `--ease` is caught at the line.
**Date:** 2026-08-21
**Session context:** Appending a spacing/type/motion token block to the `:root`
of three stylesheets that already had their own tokens.
**Skill:** brandkit / design-tokens / any token-authoring workflow
**Type:** open-source
**Phase/Area:** Token emission into an existing codebase

**Issue:** The added block included `--ease`, which all three stylesheets already
defined with a different curve. The duplicate sat later in `:root` and therefore
won, changing the easing of every existing transition in each property. Nothing
failed — no gate covers it, and the visual difference is subtle enough to pass a
screenshot review. It was caught only by reading the diff.

**Suggested improvement:** Any workflow that emits a token block into an existing
file should first collect the custom properties already defined there and either
skip or rename collisions, and report them. A one-line check is enough:
compare the emitted names against `re.findall(r"(--[a-z0-9-]+)\s*:", src)`.

**Principle:** Adding to a namespace is a silent overwrite when the namespace is
last-wins. Generated additions must diff against what already exists, because
the failure mode is not an error — it is a change nobody asked for and no test
covers.

---

### Observation 3: Media queries add no specificity, so "later" beats "narrower"

**Status:** OPEN
**Date:** 2026-08-21
**Session context:** Fixing header overflow at 360px in a stylesheet with
several overlapping breakpoint blocks.
**Skill:** New skill candidate: css-cascade-debugging
**Type:** open-source
**Phase/Area:** Responsive fixes in long hand-written stylesheets

**Issue:** Two consecutive fix attempts failed with no visible effect, because
the rules were added to a `max-width: 400px` block that sat earlier in the file
than a `max-width: 460px` block touching the same properties. A more specific
breakpoint does not win; a later rule does. Both attempts looked correct in the
diff and were only disproved by measuring computed styles in a browser.

**Suggested improvement:** When a CSS fix has no effect, measure the computed
value before editing again — a second edit in the same place costs a full gate
run (~90s here) to disprove. For a stylesheet with overlapping breakpoints,
place override blocks at the end of the file and say why in a comment.

**Principle:** When an edit appears to do nothing, the hypothesis to test first
is that it is being overridden, not that it was wrong. Measure the computed
result rather than re-reading the source.

---

### Observation 4: A wrong option name in a test harness produces confident wrong numbers

**Status:** OPEN
**Date:** 2026-08-21
**Session context:** Measuring rendered font sizes at 360px and 1280px with
Playwright to audit a type scale.
**Skill:** Any browser-measurement or screenshot workflow
**Type:** open-source
**Phase/Area:** Harness setup before measurement

**Issue:** `browser.newPage({ viewportSize: {...} })` was used instead of
`viewport`. Playwright silently ignored the unknown key and used its default
1280px viewport for both runs. The script reported identical results at "360px"
and "1280px" — which was itself the clue — but had the two widths differed only
slightly, the wrong numbers would have been indistinguishable from right ones and
would have gone into a written audit.

**Suggested improvement:** Include at least one value in measurement output that
must change between configurations (here, the `h1` size under a `clamp()`, or the
viewport width itself echoed back). A run whose invariant did not vary is a
broken harness, not a finding.

**Principle:** A measurement harness fails silently when given an unknown option.
Always print something that proves the configuration actually took effect,
before trusting anything else the harness reports.

---

### Observation 5: A gate can be blocked by a person even when the work looks mechanical

**Status:** OPEN
**Date:** 2026-08-21
**Session context:** Driving every gate to zero. `gaps` wanted per-language
URLs for the hub, the journal and the archive.
**Skill:** Any "make the checks pass" workflow
**Type:** internal
**Phase/Area:** Deciding what is machine-doable

**Issue:** Two of the three were mechanical and got done — the hub from
Norwegian already written in `i18n.js`, the journal from a new written copy
table. The archive looked like the same job, one size larger. It is not.
Measured by section, **96% of the archive index's 1,743 words are
legal-bearing**: the verification guarantee, licence tiers, refund terms,
model releases, the FAQ. Writing those in Norwegian would author a Norwegian
statement of the archive's legal position, unreviewed, while `docs/09` and the
licence terms are still waiting on a Norwegian lawyer — and Norwegian is
queue 1 in `languages.json` precisely because nobody has checked it yet.

The first instinct was right, but it was only an instinct until the sections
were counted. Counting turned a hunch into a number that can be handed to
somebody else.

**Suggested improvement:** Before deciding a content task is mechanical,
measure how much of it carries a commitment rather than a description. A
page that is 96% commitments is a legal document with pictures, whatever the
gate calls it.

**Principle:** "Can a machine do this?" and "should a machine do this
unreviewed?" are different questions, and the second one is answered by what
the words commit to, not by how hard they are to write. A gate that stays red
for a documented reason is worth more than a gate turned green by authoring
promises nobody has approved.


---

## 2026-08-23

### Observation 6: A class name travels between properties; the rule behind it does not

**Status:** ACTIONED (2026-08-23) — became `tools/classes.py`, which fails on a
class used by a page with no rule reachable from that page.
**Date:** 2026-08-23
**Session context:** Screenshotting all four properties to show the owner the
finished site.
**Skill:** Any "copy this component to the other property" workflow
**Type:** internal
**Phase/Area:** Four properties sharing a vocabulary but not a stylesheet

**Issue:** The hub's Norwegian page shipped with `EnglishNorsk` — two words, no
separator, default browser blue, underlined, on a site with no blue and no
underlined links. The markup was copied from the desk's Norwegian pages, where
`.lang-pair` is styled. The hub keeps its CSS inline and had no such rule.

It passed every gate. It is valid HTML referencing a class, and nothing had an
opinion about whether the class meant anything. It was caught by looking at a
screenshot — which is not a method, because there are 102 pages.

Looking for the same shape found four more, one of them five months old: the
hub's 404 restated `.btn` but not `h1`, so the page most likely to be reached
by accident had its headline in Inter while the whole rest of the site is
Fraunces; the journal's 404 used `.lead`, which the archive and desk define and
the journal calls `.standfirst`; 25 Norwegian service pages wrapped their pager
in `.pager-inner`, an archive class, collapsing a three-column grid into one;
and the journal's Norwegian page had the same unstyled language pair as the hub.

**Suggested improvement:** When moving markup between properties, move the rule
with it or rename to the class the destination already has. Never assume a
shared vocabulary means a shared stylesheet.

**Principle:** Four properties that share class names but not stylesheets will
leak markup between themselves, and the leak is invisible to HTML validation.
The check is per-page and cheap: collect the classes a page uses and the rules
it can actually reach.

### Observation 7: A generator kept a host the site had already left

**Status:** ACTIONED (2026-08-23) — became `check_generator_hosts` in
`tools/qc.py`, which fails when a builder writes a host no property serves.
**Date:** 2026-08-23
**Session context:** Re-running two builders to fix the class defects above.
**Skill:** Any "single source of truth" / code-generation workflow
**Type:** internal
**Phase/Area:** Generated pages, host migration

**Issue:** The four properties moved from Vercel preview addresses to their real
subdomains. Every shipped page was updated. **None of the eleven generators
were.** Running two of them put 500 preview URLs back into canonicals, hreflang,
`og:url` and cross-property links — in one command, silently, and correctly, in
the sense that the builder faithfully emitted what its data table said.

HEAD had zero preview hosts in shipped files. Two builder runs made it 500. The
regression was found only because the diff was read afterwards.

`launch.py` already detects preview hosts on shipped pages, but it is a
readiness report that exits 0, and it only speaks after the damage is committed.

**Suggested improvement:** When a value is changed in generated output, change
it in the generator in the same commit, or the output is not generated — it is
hand-maintained with extra steps. Where a project claims a single source of
truth, add a gate that asserts the source still agrees with what shipped.

**Principle:** "Never hand-edit a generated page" has a mirror image nobody
writes down: never hand-edit generated *output* without editing the generator.
A builder that has drifted from the site is a landmine that goes off the next
time anyone runs it, and it goes off silently because the builder is working
exactly as written.
