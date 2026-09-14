import re, json, os
import hub_guarantee as G

ROOT = "/home/user/BETA-ART"
p = os.path.join(ROOT, "i18n.js")
s = open(p, encoding="utf-8").read()
K = json.loads(re.search(r"var K=(\[.*?\]);", s, re.S).group(1))
if "guar.title" in K:
    print("i18n already carries the guarantee keys")
else:
    at = K.index("p3.go") + 1
    K[at:at] = G.KEYS
    s = re.sub(r"var K=\[.*?\];", "var K=" + json.dumps(K, ensure_ascii=False) + ";", s, flags=re.S)
    def fix(m):
        code, arr, tail = m.group(1), json.loads(m.group(2)), m.group(3)
        arr[at:at] = G.T[code]
        return '"%s":%s%s' % (code, json.dumps(arr, ensure_ascii=False), tail)
    s, n1 = re.subn(r'^"([a-z-]+)":(\[.*?\])(,?)$', fix, s, flags=re.M)
    s, n2 = re.subn(r'^"([a-z-]+)":(\[.*?\])(\};)$', fix, s, flags=re.M)
    open(p, "w", encoding="utf-8").write(s)
    print("languages patched:", n1 + n2)

# ---- the section itself -------------------------------------------------
p = os.path.join(ROOT, "index.html")
h = open(p, encoding="utf-8").read()
e = G.T["en"]
SECTION = """
    <section class="guarantee" aria-labelledby="guarantee-title">
      <h2 id="guarantee-title" data-i18n="guar.title">%s</h2>
      <p class="guar-lead" data-i18n="guar.lead">%s</p>
      <ol class="guar-list">
        <li>
          <h3 data-i18n="guar.1t">%s</h3>
          <p data-i18n="guar.1b">%s</p>
        </li>
        <li>
          <h3 data-i18n="guar.2t">%s</h3>
          <p data-i18n="guar.2b">%s</p>
        </li>
        <li>
          <h3 data-i18n="guar.3t">%s</h3>
          <p data-i18n="guar.3b">%s</p>
        </li>
      </ol>
      <p class="guar-note" data-i18n="guar.note">%s</p>
    </section>
""" % (e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8])

if "guarantee-title" in h:
    print("section already present")
else:
    h = h.replace("    </nav>\n  </div>\n</main>", "    </nav>\n" + SECTION + "  </div>\n</main>", 1)
    h = h.replace('<a href="report.html">Report content</a>',
                  '<a href="report.html" data-i18n="nav.report">Report content</a>', 1)
    CSS = """
  .guarantee { margin-top: 3.5rem; }
  .guarantee h2 { font-family: var(--f-display); font-weight: 300; font-size: clamp(1.7rem, 4vw, 2.6rem); margin: 0 0 .8rem; letter-spacing: -.01em; }
  .guar-lead { max-width: 64ch; margin: 0; color: var(--ink-2); }
  .guar-list { list-style: none; counter-reset: g; padding: 0; margin: 2.2rem 0 0;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.8rem; }
  .guar-list li { counter-increment: g; border-top: 2px solid var(--ink); padding-top: .9rem; }
  .guar-list li::before { content: counter(g, upper-roman); display: block;
    font-family: var(--f-mono); font-size: .62rem; letter-spacing: .2em; color: var(--seal); margin-bottom: .5rem; }
  .guar-list h3 { font-family: var(--f-display); font-weight: 400; font-size: 1.16rem; margin: 0 0 .45rem; }
  .guar-list p { margin: 0; font-size: .9rem; color: var(--ink-2); }
  .guar-note { max-width: 64ch; margin: 2.2rem 0 0; padding-left: 1rem;
    border-left: 3px solid var(--seal); font-size: .92rem; color: var(--ink-2); }
"""
    h = h.replace("/* WCAG 2.2 AA, 2.5.8", CSS + "\n/* WCAG 2.2 AA, 2.5.8", 1)
    open(p, "w", encoding="utf-8").write(h)
    print("hub index gained the guarantee section")
