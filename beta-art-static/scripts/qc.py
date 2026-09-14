#!/usr/bin/env python3
"""Beta Art — quality control beyond the HTML audit.

tools/audit.py checks the HTML: links, anchors, headings, metadata, JSON-LD.
This checks everything around it — the JavaScript, the stylesheets, the
twelve translations, the prices, the encoding, and whether anything has
landed in a published folder that was never meant to ship.

Run both. Either one exiting non-zero means something needs fixing before
the site goes out.

    python3 tools/audit.py && python3 tools/qc.py
"""

import ast
import json
import os
import re
import subprocess
import sys
import unicodedata
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROPS = {
    "hub": "",
    "archive": "beta-art",
    "business": "beta-art-business",
    "journal": "beta-art-blog",
}
# a single inline deploy call tops out around here — kept for the reference
# figure only; the site deploys git-backed (docs/05)
DEPLOY_CEILING = 100 * 1024

# nothing this big belongs in a published folder. A photography archive's
# realistic deploy accident is an original RAW or a full-resolution export
# landing in a property directory instead of staying in the archive.
OVERSIZE = 10 * 1024 * 1024

findings = defaultdict(list)


def note(section, msg):
    findings[section].append(msg)


def rel(path):
    return os.path.relpath(path, ROOT)


def walk(ext):
    out = []
    for base, dirs, files in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in (".git", "tools", "docs", "__pycache__")]
        for f in sorted(files):
            if f.endswith(ext):
                out.append(os.path.join(base, f))
    return sorted(out)


def read(path):
    with open(path, "rb") as fh:
        return fh.read()


def text(path):
    return read(path).decode("utf-8")


# ---------------------------------------------------------------- encoding
def check_encoding():
    for path in walk(".html") + walk(".js") + walk(".css") + walk(".xml") + walk(".txt"):
        raw = read(path)
        try:
            src = raw.decode("utf-8")
        except UnicodeDecodeError as exc:
            note("encoding", "%s is not valid UTF-8 (%s)" % (rel(path), exc))
            continue
        if "�" in src:
            note("encoding", "%s contains a replacement character U+FFFD — text was lost" % rel(path))
        if "Ã¥" in src or "Ã¸" in src or "Â " in src:
            note("encoding", "%s contains mojibake (UTF-8 read as Latin-1)" % rel(path))
        for ch in set(src):
            if unicodedata.category(ch) == "Cc" and ch not in "\t\n\r":
                note("encoding", "%s contains control character U+%04X" % (rel(path), ord(ch)))
        if raw.startswith(b"\xef\xbb\xbf"):
            note("encoding", "%s starts with a byte-order mark" % rel(path))


# -------------------------------------------------------------- javascript
def check_js():
    node = None
    for cand in ("node", "/opt/node22/bin/node"):
        try:
            subprocess.run([cand, "--version"], capture_output=True, check=True)
            node = cand
            break
        except (OSError, subprocess.CalledProcessError):
            continue
    if node is None:
        note("javascript", "node not available — syntax not checked")
        return
    for path in walk(".js"):
        r = subprocess.run([node, "--check", path], capture_output=True, text=True)
        if r.returncode != 0:
            first = (r.stderr.strip().splitlines() or ["unknown error"])[0]
            note("javascript", "%s fails to parse: %s" % (rel(path), first))
        src = text(path)
        if "console.log" in src:
            note("javascript", "%s leaves a console.log in shipped code" % rel(path))
        if re.search(r"\bdebugger\b", src):
            note("javascript", "%s leaves a debugger statement in shipped code" % rel(path))
        if not re.search(r'["\']use strict["\']', src):
            note("javascript", "%s is not in strict mode" % rel(path))


# ------------------------------------------------------------------- i18n
def parse_i18n(path):
    src = text(path)
    out = {}
    for name in ("L", "K"):
        m = re.search(r"var\s+%s\s*=\s*(\[.*?\]);" % name, src, re.S)
        if not m:
            return None, "cannot find var %s" % name
        try:
            out[name] = json.loads(m.group(1))
        except ValueError as exc:
            return None, "var %s is not parseable (%s)" % (name, exc)
    start = src.find("var V=")
    if start < 0:
        start = src.find("var V =")
    if start < 0:
        return None, "cannot find var V"
    start = src.index("{", start)
    depth, end, in_str, esc = 0, None, False, False
    for i in range(start, len(src)):
        ch = src[i]
        if in_str:
            if esc:
                esc = False
            elif ch == "\\":
                esc = True
            elif ch == '"':
                in_str = False
            continue
        if ch == '"':
            in_str = True
        elif ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                end = i + 1
                break
    if end is None:
        return None, "var V is never closed"
    try:
        out["V"] = json.loads(src[start:end])
    except ValueError as exc:
        return None, "var V is not parseable (%s)" % exc
    return out, None


# a language is expected to be written in these scripts; anything else is a slip
SCRIPT_OF = {
    "ru": "CYRILLIC", "ar": "ARABIC", "zh": "CJK", "ja": "CJK",
    "hi": "DEVANAGARI",
}
# characters that belong to no language's own script but are fine anywhere
NEUTRAL = re.compile(r"[\s\d\W]", re.U)


def script_name(ch):
    try:
        n = unicodedata.name(ch)
    except ValueError:
        return "UNKNOWN"
    for s in ("LATIN", "CYRILLIC", "ARABIC", "HANGUL", "DEVANAGARI", "HEBREW",
              "THAI", "GREEK", "ARMENIAN", "GEORGIAN"):
        if n.startswith(s):
            return s
    if n.startswith("CJK") or n.startswith("HIRAGANA") or n.startswith("KATAKANA"):
        return "CJK"
    return "OTHER"


# Latin words that belong in every language: names, marks, file formats
LATIN_OK = {
    "beta", "art", "business", "private", "studio", "field", "notes", "betül",
    "öner", "html", "css", "javascript", "json", "svg", "pdf", "webp", "ai",
    "seo", "cv", "gdpr", "ehf", "wcag", "eu", "eea", "kr", "nok", "no", "com",
    "vercel", "google", "instagram", "linkedin", "iso", "exif", "raw", "jpeg",
    "png", "xmp", "c2pa", "api", "crm", "b2b", "atsr", "ats", "utf", "www",
}


def stray_script(value, want):
    """Report runs of text written in a script the language does not use.

    A brand name or an acronym in Latin letters is normal inside Japanese or
    Arabic copy and is not reported. An English sentence is. Any other script
    — Hangul inside Japanese, say — is always reported, because it can only
    be a slip.
    """
    out = []
    for run in re.findall(r"[^\W\d_]+", value, re.U):
        got = script_name(run[0])
        if got == want:
            continue
        if got != "LATIN":
            out.append((run, got))
            continue
        if run.lower() in LATIN_OK or len(run) <= 2:
            continue
        if run[0].isupper() or run.isupper():
            continue  # a proper noun or an acronym, not stray prose
        out.append((run, got))
    return out


def check_i18n():
    used_keys = defaultdict(set)
    for path in walk(".html"):
        prop = os.path.dirname(rel(path))
        for m in re.finditer(r'data-i18n(?:-[a-z]+)?="([^"]+)"', text(path)):
            # data-i18n-attr takes "attribute:key"; data-i18n takes the key alone
            used_keys[prop].add(m.group(1).split(":")[-1])

    for label, sub in PROPS.items():
        path = os.path.join(ROOT, sub, "i18n.js")
        if not os.path.exists(path):
            note("i18n", "%s has no i18n.js" % label)
            continue
        data, err = parse_i18n(path)
        if data is None:
            note("i18n", "%s: %s" % (rel(path), err))
            continue
        L, K, V = data["L"], data["K"], data["V"]
        codes = [row[0] for row in L]

        if len(set(codes)) != len(codes):
            note("i18n", "%s lists a language code twice" % rel(path))
        if len(set(K)) != len(K):
            dupes = sorted({k for k in K if K.count(k) > 1})
            note("i18n", "%s repeats key(s): %s" % (rel(path), ", ".join(dupes)))

        for code in codes:
            if code not in V:
                note("i18n", "%s: language %s is offered but has no translations" % (rel(path), code))
                continue
            if len(V[code]) != len(K):
                note("i18n", "%s: %s has %d values for %d keys — every string after "
                     "the gap renders under the wrong key"
                     % (rel(path), code, len(V[code]), len(K)))
        for code in V:
            if code not in codes:
                note("i18n", "%s: %s is translated but not offered in the switcher" % (rel(path), code))

        for code in codes:
            if code not in V or len(V[code]) != len(K):
                continue
            for i, value in enumerate(V[code]):
                if not str(value).strip():
                    note("i18n", "%s: %s.%s is empty" % (rel(path), code, K[i]))
                if code != "en" and value == V.get("en", [None] * len(K))[i] and len(str(value)) > 24:
                    note("i18n", "%s: %s.%s is still the English string" % (rel(path), code, K[i]))
                want = SCRIPT_OF.get(code)
                if not want:
                    continue
                for stray, got in stray_script(str(value), want):
                    note("i18n", "%s: %s.%s is in the wrong script — %s where the text "
                         "should be %s: %s" % (rel(path), code, K[i], got, want, stray))

        # keys the HTML asks for that the dictionary does not have
        for prop_dir, keys in used_keys.items():
            if prop_dir != sub:
                continue
            for key in sorted(keys):
                if key not in K:
                    note("i18n", "%s asks for key %s, which i18n.js does not define" % (prop_dir or ".", key))

        # switcher present but nothing on the page to translate
        for html in walk(".html"):
            if os.path.dirname(rel(html)) != sub:
                continue
            src = text(html)
            if "i18n.js" not in src:
                continue
            if not re.search(r'data-i18n[-=]', src):
                note("i18n", "%s loads the language switcher but carries no data-i18n "
                     "attributes — clicking a language does nothing visible" % rel(html))


# -------------------------------------------------------------------- css
def check_css():
    for path in walk(".css"):
        src = text(path)
        body = re.sub(r"/\*.*?\*/", "", src, flags=re.S)

        if body.count("{") != body.count("}"):
            note("css", "%s has unbalanced braces (%d open, %d close)"
                 % (rel(path), body.count("{"), body.count("}")))

        defined = set(re.findall(r"(--[a-zA-Z0-9-]+)\s*:", body))
        for m in re.finditer(r"var\(\s*(--[a-zA-Z0-9-]+)\s*(,)?", body):
            if m.group(1) not in defined and not m.group(2):
                note("css", "%s uses var(%s) which is never defined and has no fallback"
                     % (rel(path), m.group(1)))

        # every class the stylesheet styles, and every class the HTML uses
        styled = set(re.findall(r"\.([a-zA-Z][a-zA-Z0-9_-]*)", body))
        prop = os.path.dirname(rel(path))
        used = set()
        for html in walk(".html"):
            if os.path.dirname(rel(html)) != prop:
                continue
            for m in re.finditer(r'class="([^"]+)"', text(html)):
                used.update(m.group(1).split())
        # a class the JavaScript adds or removes counts as styled, not as used
        for js in walk(".js"):
            if os.path.dirname(rel(js)) != prop:
                continue
            jsrc = text(js)
            for m in re.finditer(r'classList\.\w+\(\s*"([^"]+)"', jsrc):
                styled.update(m.group(1).split())
        # `class="post"` on the article wrapper is a naming hook, not a defect,
        # as long as the stylesheet styles the family (.post-body, .post-foot)
        family = {c.split("-")[0] for c in styled if "-" in c}
        orphan = sorted(c for c in used - styled
                        if not c.startswith("is-") and c not in family)
        if orphan:
            note("css", "%s: %d class(es) used in the HTML with no rule anywhere: %s"
                 % (prop or ".", len(orphan), ", ".join(orphan[:8])))

        # A selector repeated inside media queries is a responsive override,
        # which is the point of media queries. Only count the top level, where
        # a repeat really does mean one rule silently beating another.
        top = re.sub(r"@media[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}", "", body, flags=re.S)
        sels = [x.strip() for x in re.findall(r"([^{}]+)\{", top)]
        for sel in sorted(set(sels)):
            n = sels.count(sel)
            if n > 2 and not sel.startswith("@") and "," not in sel and len(sel) < 40:
                note("css", "%s defines %s %d times outside any media query — "
                     "later rules silently win" % (rel(path), sel, n))


# ---------------------------------------------------------------- content
PRICE = re.compile(r"kr\s?([\d  ]{3,10})(?:\s*[–-]\s*([\d  ]{3,10}))?")


def numbers(s):
    return tuple(x.replace(" ", "").replace(" ", "") for x in s if x)


def check_prices():
    biz = os.path.join(ROOT, PROPS["business"])
    if not os.path.isdir(biz):
        return
    home = text(os.path.join(biz, "index.html"))
    # each card links to s-<slug>.html and quotes a price in the same block
    cards = re.findall(r'href="s-([a-z0-9-]+)\.html".{0,900}?(kr[^<]{3,40})', home, re.S)
    for slug, quoted in cards:
        page = os.path.join(biz, "s-%s.html" % slug)
        if not os.path.exists(page):
            continue
        src = text(page)
        m = PRICE.search(quoted)
        if not m:
            continue
        want = numbers(m.groups())
        found = {numbers(x.groups()) for x in PRICE.finditer(src)}
        if want not in found:
            note("prices", "s-%s.html never states the price the home page advertises (%s)"
                 % (slug, quoted.strip()))
    # JSON-LD offers must agree with the page they sit on
    for path in walk(".html"):
        src = text(path)
        for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', src, re.S):
            try:
                data = json.loads(block)
            except ValueError:
                continue
            for obj in (data if isinstance(data, list) else [data]):
                offer = obj.get("offers") if isinstance(obj, dict) else None
                if not isinstance(offer, dict):
                    continue
                low = str(offer.get("lowPrice", offer.get("price", "")))
                if low and low not in src.replace(" ", " ").replace(" ", ""):
                    if low not in re.sub(r"[\s ]", "", src):
                        note("prices", "%s: JSON-LD offers %s, which appears nowhere in the visible page"
                             % (rel(path), low))


def check_counts():
    """Claims about how many of a thing there are must match how many there are."""
    biz = os.path.join(ROOT, PROPS["business"])
    if os.path.isdir(biz):
        services = len([f for f in os.listdir(biz) if re.match(r"s-[a-z0-9-]+\.html$", f)])
        posts = len([f for f in os.listdir(biz) if re.match(r"b-[a-z0-9-]+\.html$", f)])
        for path in walk(".html"):
            if os.path.dirname(rel(path)) != PROPS["business"]:
                continue
            src = text(path)
            # a count inside a <section> describes that section; anywhere else
            # it describes the whole site
            for chunk in re.split(r"(?=<section)", src):
                local_s = len(set(re.findall(r'href="s-([a-z0-9-]+)\.html"', chunk)))
                local_b = len(set(re.findall(r'href="b-([a-z0-9-]+)\.html"', chunk)))
                inside = chunk.lstrip().startswith("<section")
                for m in re.finditer(r"\b(\d{1,2})\s+(services|service pages|articles)\b",
                                     chunk, re.I):
                    n, what = int(m.group(1)), m.group(2).lower()
                    if what.startswith("service"):
                        real, local = services, local_s
                    else:
                        real, local = posts, local_b
                    if n == real or (inside and n == local):
                        continue
                    note("counts", "%s claims %d %s; the site has %d and this section "
                         "links to %d" % (rel(path), n, what, real, local))
        # every service page must be reachable from the index of services
        hub = os.path.join(biz, "services.html")
        if os.path.exists(hub):
            listed = set(re.findall(r'href="(s-[a-z0-9-]+\.html)"', text(hub)))
            for f in sorted(os.listdir(biz)):
                if re.match(r"s-[a-z0-9-]+\.html$", f) and f not in listed:
                    note("counts", "services.html does not link to %s — the page is an orphan" % f)
        # every ?service= must resolve, and match an option in the quote form
        quote = os.path.join(biz, "quote.html")
        options = set()
        if os.path.exists(quote):
            options = set(re.findall(r'<option value="([a-z0-9-]+)"', text(quote)))
        for path in walk(".html"):
            src = text(path)
            for slug in set(re.findall(r"quote\.html\?service=([a-z0-9-]+)", src)):
                if not os.path.exists(os.path.join(biz, "s-%s.html" % slug)):
                    note("counts", "%s links to ?service=%s, which is not a service" % (rel(path), slug))
                elif options and slug not in options:
                    note("counts", "%s links to ?service=%s, but the quote form has no such option"
                         % (rel(path), slug))


def check_links():
    for path in walk(".html"):
        src = text(path)
        for m in re.finditer(r"<a\b([^>]*?)href=\"(https?://[^\"]+)\"([^>]*)>", src):
            attrs = m.group(1) + m.group(3)
            host = re.sub(r"^https?://([^/]+).*", r"\1", m.group(2))
            if "beta-art" in host or "betaart" in host:
                continue
            if 'target="_blank"' in attrs and "noopener" not in attrs:
                note("links", "%s opens %s in a new tab without rel=\"noopener\"" % (rel(path), host))
        for m in re.finditer(r'href="(http://[^"]+)"', src):
            note("links", "%s links over plain http: %s" % (rel(path), m.group(1)))
        for m in re.finditer(r'(href|src)="([^"#?:]+\.(?:css|js|png|jpg|svg|webp))"', src):
            target = os.path.join(os.path.dirname(path), m.group(2))
            if not os.path.exists(target):
                note("links", "%s references %s, which does not exist" % (rel(path), m.group(2)))


def check_head():
    for path in walk(".html"):
        src = text(path)
        r = rel(path)
        if not re.search(r'<html[^>]+lang="[a-z]{2}"', src):
            note("head", "%s has no lang attribute on <html>" % r)
        if not re.search(r'<meta charset="utf-8"', src, re.I):
            note("head", "%s does not declare a charset" % r)
        if 'name="viewport"' not in src:
            note("head", "%s has no viewport meta — it will not scale on a phone" % r)
        # a 404 is never shared on purpose and is noindex; a share card on it
        # would be a card for a page that does not exist
        if os.path.basename(path) != "404.html":
            if 'property="og:title"' not in src:
                note("head", "%s has no og:title — shared links show a bare URL" % r)
            if 'property="og:image"' not in src:
                note("head", "%s has no og:image — shared links show no picture" % r)
        if not re.search(r'name="theme-color"', src):
            note("head", "%s sets no theme-color" % r)


def check_sitemaps():
    for label, sub in PROPS.items():
        base = os.path.join(ROOT, sub)
        sm = os.path.join(base, "sitemap.xml")
        if not os.path.exists(sm):
            note("sitemap", "%s has no sitemap.xml" % (label))
            continue
        src = text(sm)
        listed = set()
        for loc in re.findall(r"<loc>([^<]+)</loc>", src):
            path_part = re.sub(r"^https?://[^/]+", "", loc)
            name = path_part.strip("/").rsplit("/", 1)[-1]
            if not name.endswith(".html"):
                name = "index.html"
            listed.add(name)
            if not os.path.exists(os.path.join(base, name)):
                note("sitemap", "%s/sitemap.xml lists %s, which does not exist" % (label, name))
        for f in sorted(os.listdir(base)):
            if f == "404.html":
                continue        # deliberately not advertised
            if f.endswith(".html") and f not in listed:
                note("sitemap", "%s/sitemap.xml omits %s — it may never be crawled" % (label, f))
        rb = os.path.join(base, "robots.txt")
        if not os.path.exists(rb):
            note("sitemap", "%s has no robots.txt" % label)
        elif "Sitemap:" not in text(rb):
            note("sitemap", "%s/robots.txt does not point at the sitemap" % label)


BINARY = (".png", ".jpg", ".jpeg", ".webp", ".gif", ".ico", ".woff", ".woff2")


def check_deployability():
    """Whether each property can actually be deployed, by the method chosen.

    This used to fail whenever a property could not go out through a single
    inline deploy. That check could never pass, and never will: `blocked` was
    true if a property held any binary file at all, and every property holds
    its og.png. A gate that cannot go green is not a gate — it is noise that
    teaches everyone to skip the whole run.

    It was also measuring the wrong thing. `docs/05` records the decision:
    the four websites stay on Vercel, which is git-backed. Inline capacity is
    a fact about a route this project does not take, so it is reported here
    as information rather than as a fault.

    What can still go wrong on a git-backed deploy of a photography site is a
    file nobody meant to publish — an original RAW, a full-resolution TIFF, a
    video dropped into a property folder. That is worth failing on, because
    the archive's own rule is that originals are kept and not shipped."""
    print("  deploy size (git-backed, per docs/05; inline capacity shown for reference)")
    for label, sub in PROPS.items():
        base = os.path.join(ROOT, sub)
        text_bytes = bin_bytes = 0
        text_n = bin_n = 0
        for f in sorted(os.listdir(base)):
            p = os.path.join(base, f)
            if not os.path.isfile(p) or f.startswith("."):
                continue
            size = os.path.getsize(p)
            if f.lower().endswith(BINARY):
                bin_bytes += size; bin_n += 1
            else:
                text_bytes += size; text_n += 1
            if size > OVERSIZE:
                note("deploy", "%s/%s is %.1f MB. Nothing that large belongs in a "
                     "published folder — an original stays in the archive, not on the "
                     "site." % (sub.rstrip("/") or ".", f, size / 1048576.0))
        fits = text_bytes <= DEPLOY_CEILING and bin_n == 0
        print("    %-9s %2d text %6.1f KB · %d binary %5.1f KB   %s"
              % (label, text_n, text_bytes / 1024.0, bin_n, bin_bytes / 1024.0,
                 "fits inline too" if fits else "git deploy"))


def check_translated_meta():
    """A Norwegian page must not describe itself in English.

    The Norwegian URLs exist for one reason: a search engine sees one English
    page per address otherwise, and the market this sells to cannot find it in
    the language it reads. Two of those pages shipped with the English `<title>`
    and the English description — the only two strings a search result shows.

    The cause is worth stating, because it will recur: the generators swap the
    text of elements carrying `data-i18n`, and `<title>` and `<meta>` carry no
    such key, so the swap silently never reached them. Nothing failed. The pages
    were valid, indexable, and wrong.

    The check is on the description rather than the title. A description is a
    sentence, and a sentence identical in two languages is always an
    untranslated string. A title can legitimately match — `s-chatbot.html`
    is "Chatbot" in both, because that is the Norwegian word too, and hreflang
    already tells a search engine those are language variants of one page."""
    desc = re.compile(r'<meta name="description" content="([^"]*)"')
    for path in walk(".html"):
        src = text(path)
        if not re.search(r'<html[^>]+lang="no"', src):
            continue
        m = desc.search(src)
        # every Norwegian page lives in a /no/ directory beside its English
        # counterpart, so the counterpart is the same filename one level up
        d, fn = os.path.split(path)
        if not m or os.path.basename(d) != "no":
            continue
        cand = os.path.join(os.path.dirname(d), fn)
        if not os.path.exists(cand):
            continue
        me = desc.search(text(cand))
        if me and me.group(1).strip() == m.group(1).strip():
            note("i18n", "%s is a Norwegian page carrying the English description "
                 "from %s. The generators only swap elements with a data-i18n key, "
                 "and <meta> has none." % (rel(path), rel(cand)))


def emitted_strings(src, filename):
    """(line, text) for everything a file could actually put on a page.

    For Python that is its string literals and nothing else, read with `ast`
    so a comment cannot be mistaken for output. A file that will not parse
    falls back to whole lines — a broken builder should still be checked, and
    noisily.
    """
    if filename.endswith(".py"):
        try:
            tree = ast.parse(src)
        except SyntaxError:
            return list(enumerate(src.splitlines(), 1))
        # a docstring is the file talking about itself, not output
        docs = set()
        for node in ast.walk(tree):
            if isinstance(node, (ast.Module, ast.ClassDef,
                                 ast.FunctionDef, ast.AsyncFunctionDef)):
                body = getattr(node, "body", None)
                if (body and isinstance(body[0], ast.Expr)
                        and isinstance(body[0].value, ast.Constant)
                        and isinstance(body[0].value.value, str)):
                    docs.add(id(body[0].value))
        return [(n.lineno, n.value) for n in ast.walk(tree)
                if isinstance(n, ast.Constant) and isinstance(n.value, str)
                and id(n) not in docs]
    return list(enumerate(src.splitlines(), 1))


def check_generator_hosts():
    """A generator must not hold a host the shipped pages have moved off.

    The four properties were once on Vercel preview addresses and were later
    given their real subdomains. Every shipped page was updated. None of the
    generators were — and most pages here are generated, so eleven builders
    sat holding `*-bet-art.vercel.app` in canonicals, hreflang, og:url and
    cross-property links, waiting.

    Running two of them put five hundred preview URLs back into the site in
    one command. It was silent, and it was the correct output of the builder:
    the data table said so. `launch.py` already reports preview hosts on
    shipped pages, but only after the damage is committed, and it is a
    readiness report rather than a gate.

    The rule is simply that a generator's hosts must be the hosts the site
    actually uses. If a property moves again, this fails until the builder
    moves with it — which is the whole point of keeping the source of truth
    in a data table.

    Only what a builder can actually emit counts, so Python files are read as
    string literals rather than as lines. The first version scanned lines and
    failed a comment recording where a property used to live — a note about
    history is not a URL anybody ships, and a gate that fails on one teaches
    people to stop reading it."""
    live = set()
    for sub in PROPS.values():
        p = os.path.join(ROOT, sub, "index.html")
        if not os.path.exists(p):
            continue
        m = re.search(r'<link rel="canonical" href="https?://([^/"]+)', text(p))
        if m:
            live.add(m.group(1))
    if not live:
        note("hosts", "no canonical host found on any property home page")
        return
    gen = os.path.join(ROOT, "tools")
    for d, dirs, files in os.walk(gen):
        dirs[:] = [x for x in dirs if x != "__pycache__"]
        for fn in sorted(files):
            if not fn.endswith((".py", ".js")):
                continue
            p = os.path.join(d, fn)
            if os.path.samefile(p, os.path.abspath(__file__)):
                continue
            for line_no, line in emitted_strings(text(p), fn):
                for host in re.findall(r'https?://([a-z0-9.-]+\.beta-art\.com|'
                                       r'[a-z0-9-]+\.vercel\.app)', line):
                    if host not in live:
                        note("hosts", "%s:%d writes %s, which is not a host this "
                             "site serves. The live hosts are %s."
                             % (rel(p), line_no, host, ", ".join(sorted(live))))


def check_copyright():
    """The standing requirement: every page must assert Beta Art's rights."""
    for path in walk(".html"):
        src = text(path)
        if "©" not in src and "&copy;" not in src.lower():
            note("rights", "%s carries no copyright line" % rel(path))
        if not re.search(r"noai", src, re.I):
            note("rights", "%s does not tell AI crawlers to stay out" % rel(path))
        if "legal.html" not in src and rel(path) != "legal.html":
            note("rights", "%s does not link to the legal notice" % rel(path))


def main():
    print("Beta Art — quality control\n")
    check_encoding()
    check_js()
    check_i18n()
    check_css()
    check_prices()
    check_counts()
    check_links()
    check_head()
    check_sitemaps()
    check_generator_hosts()
    check_translated_meta()
    check_copyright()
    check_deployability()

    print()
    total = 0
    for section in sorted(findings):
        items = findings[section]
        total += len(items)
        print("%s — %d" % (section, len(items)))
        for msg in items[:40]:
            print("   · %s" % msg)
        if len(items) > 40:
            print("   · … and %d more" % (len(items) - 40))
        print()
    print("total findings: %d" % total)
    return 1 if total else 0


if __name__ == "__main__":
    sys.exit(main())
