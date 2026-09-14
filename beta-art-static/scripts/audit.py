#!/usr/bin/env python3
"""Beta Art site audit — run from anywhere:  python3 tools/audit.py

Checks every HTML page in the repository for:
  broken same-page and cross-page anchors, links to files that do not exist,
  duplicate ids, images without alt text, aria-* pointing at missing ids,
  unlabelled form fields, buttons with no accessible name, heading-level jumps,
  more or fewer than one h1, invalid JSON-LD, missing or duplicated robots meta,
  missing canonical, over-length titles and descriptions, truncated files,
  and getElementById calls in the scripts that no page satisfies.

Exits non-zero when anything is found, so it can gate a commit or a deploy.
"""
import re,os,json,collections
import sys as _s, os as _o
ROOT=_o.path.dirname(_o.path.dirname(_o.path.abspath(__file__)))
pages=[]
for dp,dn,fn in os.walk(ROOT):
    dn[:]=[d for d in dn if d!=".git"]
    for f in sorted(fn):
        if f.endswith(".html"): pages.append(os.path.relpath(os.path.join(dp,f),ROOT))
pages.sort()
issues=collections.defaultdict(list)
def add(p,c,m): issues[p].append((c,m))
src={p:open(os.path.join(ROOT,p),encoding="utf-8").read() for p in pages}

for p in pages:
    h=src[p]; d=os.path.dirname(p)
    ids=set(re.findall(r'\sid="([^"]+)"',h))
    # duplicate ids
    for k,v in collections.Counter(re.findall(r'\sid="([^"]+)"',h)).items():
        if v>1: add(p,"DUP-ID",f"{k} ×{v}")
    # same-page anchors
    for a in set(re.findall(r'href="#([^"]+)"',h)):
        if a not in ids: add(p,"ANCHOR",f"#{a}")
    # local files + cross-page anchors
    for href in set(re.findall(r'(?:href|src)="([^"#:?]+\.(?:html|css|js|xml|txt))(#[^"]*)?"',h)):
        f,frag=href
        t=os.path.normpath(os.path.join(d,f))
        if not os.path.exists(os.path.join(ROOT,t)): add(p,"MISSING",f"{f}")
        elif frag and f.endswith(".html"):
            tgt=open(os.path.join(ROOT,t),encoding="utf-8").read()
            if frag[1:] not in set(re.findall(r'\sid="([^"]+)"',tgt)): add(p,"ANCHOR",f"{f}{frag}")
    # query-string links (quote.html?service=x)
    for f,q in set(re.findall(r'href="([a-z0-9\-]+\.html)\?([^"]*)"',h)):
        if not os.path.exists(os.path.join(ROOT,d,f)): add(p,"MISSING",f"{f}?{q}")
        m=re.search(r'service=([a-z0-9-]+)',q)
        if m and not os.path.exists(os.path.join(ROOT,d,"s-%s.html"%m.group(1))):
            add(p,"BAD-PARAM",f"service={m.group(1)}")
    # a11y
    for tag in re.findall(r'<img\b[^>]*>',h):
        if 'alt=' not in tag: add(p,"A11Y",f"img without alt")
    for attr in ("aria-controls","aria-labelledby","aria-describedby"):
        for v in re.findall(attr+r'="([^"]+)"',h):
            for t in v.split():
                if t not in ids: add(p,"A11Y",f"{attr}={t}")
    labels=set(re.findall(r'<label[^>]*\bfor="([^"]+)"',h))
    for tag in re.findall(r'<(?:input|select|textarea)\b[^>]*>',h):
        if re.search(r'type="(hidden|submit|button|checkbox)"',tag): continue
        idm=re.search(r'\sid="([^"]+)"',tag)
        if 'aria-label' in tag or (idm and idm.group(1) in labels): continue
        add(p,"A11Y",f"unlabelled: {tag[:60]}")
    for m in re.finditer(r'<button\b([^>]*)>(.*?)</button>',h,re.S):
        if not re.sub(r'<[^>]+>','',m.group(2)).strip() and 'aria-label' not in m.group(1):
            add(p,"A11Y","button with no name")
    # headings
    hs=[int(x) for x in re.findall(r'<h([1-6])\b',h)]
    if hs.count(1)!=1: add(p,"SEO",f"{hs.count(1)} h1")
    prev=hs[0] if hs else 0
    for lv in hs[1:]:
        if lv>prev+1: add(p,"A11Y",f"h{prev}→h{lv}")
        prev=lv
    # json-ld
    for i,b in enumerate(re.findall(r'<script type="application/ld\+json">(.*?)</script>',h,re.S)):
        try: json.loads(b)
        except Exception as e: add(p,"JSONLD",str(e)[:50])
    # meta
    r=re.findall(r'<meta name="robots" content="([^"]+)"',h)
    if len(r)!=1: add(p,"SEO",f"{len(r)} robots meta")
    if not re.search(r'<link rel="canonical"',h): add(p,"SEO","no canonical")
    t=re.search(r'<title>(.*?)</title>',h,re.S)
    if not t: add(p,"SEO","no title")
    elif len(t.group(1))>68: add(p,"SEO",f"title {len(t.group(1))}")
    dsc=re.search(r'<meta name="description" content="([^"]*)"',h)
    if not dsc: add(p,"SEO","no description")
    elif not (50<=len(dsc.group(1))<=170): add(p,"SEO",f"description {len(dsc.group(1))}")
    if not h.rstrip().endswith("</html>"): add(p,"HTML","truncated")

# js id targets
for js,htmls in [("beta-art-business/quote.js",["beta-art-business/quote.html"]),
                 ("beta-art-business/script.js",[p for p in pages if p.startswith("beta-art-business/")]),
                 ("beta-art/script.js",["beta-art/index.html"]),
                 ("beta-art/tools.js",["beta-art/index.html"]),
                 ("beta-art-blog/script.js",["beta-art-blog/index.html",
                  "beta-art-blog/j-picture-is-not-the-proof.html"])]:
    j=open(os.path.join(ROOT,js),encoding="utf-8").read()
    ids=set()
    for h in htmls: ids|=set(re.findall(r'\sid="([^"]+)"',src[h]))
    for g in set(re.findall(r'getElementById\("([^"]+)"\)',j)):
        if g not in ids: add(js,"JS",f"getElementById('{g}')")

tot=0
for p in pages+[k for k in issues if k.endswith(".js")]:
    v=issues.get(p,[])
    if v:
        print(f"\n{p}")
        for c,m in sorted(set(v)): print(f"   [{c}] {m}")
    tot+=len(v)
print(f"\n{len(pages)} sayfa denetlendi · toplam bulgu: {tot}")
import sys
sys.exit(1 if tot else 0)
