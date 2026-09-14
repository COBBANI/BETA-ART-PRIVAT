import re, json, os
ROOT = "/home/user/BETA-ART"
CTA = {
 "en": ["See the twelve plates", "Read the licence terms"],
 "no": ["Se de tolv platene", "Les lisensvilkårene"],
 "tr": ["On iki plakayı görün", "Lisans koşullarını okuyun"],
 "es": ["Ver las doce láminas", "Leer las condiciones de licencia"],
 "fr": ["Voir les douze planches", "Lire les conditions de licence"],
 "de": ["Die zwölf Tafeln ansehen", "Lizenzbedingungen lesen"],
 "pt": ["Ver as doze pranchas", "Ler as condições de licença"],
 "ru": ["Посмотреть двенадцать работ", "Прочитать условия лицензии"],
 "ar": ["شاهد اللوحات الاثنتي عشرة", "اقرأ شروط الترخيص"],
 "zh": ["查看十二幅作品", "阅读授权条款"],
 "ja": ["12点の作品を見る", "ライセンス条件を読む"],
 "hi": ["बारह प्लेट देखें", "लाइसेंस शर्तें पढ़ें"],
}
p = os.path.join(ROOT, "i18n.js"); s = open(p, encoding="utf-8").read()
K = json.loads(re.search(r"var K=(\[.*?\]);", s, re.S).group(1))
if "guar.cta1" in K:
    print("already")
else:
    at = K.index("guar.note") + 1
    K[at:at] = ["guar.cta1", "guar.cta2"]
    s = re.sub(r"var K=\[.*?\];", "var K=" + json.dumps(K, ensure_ascii=False) + ";", s, flags=re.S)
    def fix(m):
        code, arr, tail = m.group(1), json.loads(m.group(2)), m.group(3)
        arr[at:at] = CTA[code]
        return '"%s":%s%s' % (code, json.dumps(arr, ensure_ascii=False), tail)
    s, n1 = re.subn(r'^"([a-z-]+)":(\[.*?\])(,?)$', fix, s, flags=re.M)
    s, n2 = re.subn(r'^"([a-z-]+)":(\[.*?\])(\};)$', fix, s, flags=re.M)
    open(p, "w", encoding="utf-8").write(s)
    print("languages patched:", n1 + n2)

p = os.path.join(ROOT, "index.html"); h = open(p, encoding="utf-8").read()
if "guar-actions" in h:
    print("buttons already there")
else:
    h = h.replace('    </section>\n  </div>\n</main>',
      '''      <p class="guar-actions">
        <a class="btn" href="https://beta-art.com/#collection" data-i18n="guar.cta1">See the twelve plates</a>
        <a class="btn btn-quiet" href="legal.html#licence" data-i18n="guar.cta2">Read the licence terms</a>
      </p>
    </section>\n  </div>\n</main>''', 1)
    h = h.replace("\n/* WCAG 2.2 AA, 2.5.8", """
  .guar-actions { display: flex; flex-wrap: wrap; gap: .7rem; margin: 2rem 0 0; }
  .btn { display: inline-block; padding: .8rem 1.4rem; background: var(--ink); color: var(--paper);
    border: 1px solid var(--ink); text-decoration: none; font-family: var(--f-mono);
    font-size: .66rem; letter-spacing: .16em; text-transform: uppercase; }
  .btn:hover { background: var(--seal); border-color: var(--seal); color: var(--on-seal); }
  .btn-quiet { background: transparent; color: var(--ink); border-color: var(--rule); }
  .btn-quiet:hover { background: transparent; color: var(--seal); border-color: var(--seal); }

/* WCAG 2.2 AA, 2.5.8""", 1)
    open(p, "w", encoding="utf-8").write(h)
    print("hub gained a next action")
