# BETA ART

Three web properties plus a hub, built as static HTML, CSS and JavaScript.
No build step, no framework. The only external dependency is Google Fonts.

| Directory | Property | Live |
|---|---|---|
| `/` | Hub and the single legal notice | https://start.beta-art.com/ |
| `beta-art/` | The verified photography archive | https://beta-art.com/ |
| `beta-art-business/` | Beta Art Business, the digital studio | https://business.beta-art.com/ |
| `beta-art-blog/` | Field Notes, the journal | https://notater.beta-art.com/ |

## Structure of the Business property

Every service has its own page rather than a card on a list. Each one answers
the same six questions in the same order — who it is for, what usually goes
wrong, what we do instead, how the work runs, what you receive, what it costs.

```
index.html            home: hero, service finder, market map, packages, AI Studio
services.html         all 22 services, split into Private and Business
s-<slug>.html         one page per service (9 Private + 13 Business)
quote.html            six-step guided brief; quote.js drives it
about.html            why Beta Art exists, and what it is not
cases.html            four case notes: problem, work, result
resources.html        templates and checklists, no email wall
```

`quote.html?service=<slug>` preselects a service, which is how every service
page links into the brief.

## Languages

Each property ships a twelve-language switcher in its own `i18n.js`: English,
Norwegian, Turkish, Spanish, French, German, Portuguese, Russian, Arabic,
Chinese, Japanese and Hindi. The dictionary is a `K` key array plus a `V` map of
per-language value arrays indexed by `K`, so a missing translation is a length
mismatch rather than a silent gap. Arabic sets `dir="rtl"` on the document.

One legal notice at `/legal.html` governs all three sites. It is published in
English, and says so: translations are provided for understanding, and the
English text is the governing version.

## Audit

```
python3 tools/audit.py
```

Walks every HTML file and reports broken anchors and links, duplicate ids,
missing alt text, `aria-*` attributes pointing at ids that do not exist,
unlabelled fields, heading-level jumps, invalid JSON-LD, metadata problems and
`getElementById` calls no page satisfies. Exits non-zero on any finding, so it
can gate a commit or a deploy.

## Deploying

Each directory is its own Vercel project. A deployment replaces the entire file
tree, so every deploy must carry every file — a partial deploy deletes whatever
it omits. Put `robots.txt` last in the file list and fetch it afterwards: a 200
proves nothing was truncated.

The Business property is now past 450 KB, which is more than can be sent in a
single inline deployment. Connecting the repository to Vercel over git removes
that ceiling and makes every push deploy itself.

## Rights

© 2026 Beta Art — Betül Öner. All rights reserved worldwide. The name, mark,
concept, service structure, page design and every photographic work are
protected. No content here may be used as AI training data; the reservation is
machine-readable in each `robots.txt` and in the `noai, noimageai` directive on
every page.
