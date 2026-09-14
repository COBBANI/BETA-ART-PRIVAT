"""Produce readable, script-free Turkish concept and exact localized copy handoffs."""
from pathlib import Path
from html import escape
from html.parser import HTMLParser
import re, json, sys

ROOT=Path(__file__).resolve().parents[1]
OUT=Path(sys.argv[1]); OUT.mkdir(parents=True,exist_ok=True)
CSS='''*{box-sizing:border-box}body{margin:0;background:#f5f8f7;color:#173f39;font:17px/1.7 Arial,sans-serif}main{max-width:1100px;margin:auto;padding:54px 30px 90px}h1,h2{font-family:Georgia,serif;font-weight:400;line-height:1.2}h1{font-size:48px;margin:12px 0 24px}h2{font-size:31px;margin-top:44px;border-top:1px solid #bdcfc7;padding-top:28px}h3{font-size:21px;line-height:1.4}p{max-width:85ch}a{color:#155245;text-underline-offset:4px}li{margin-block:8px}table{width:100%;border-collapse:collapse;font-size:15px;margin:20px 0}td,th{padding:13px 12px;text-align:left;vertical-align:top;border-bottom:1px solid #c6d6ce;overflow-wrap:anywhere}th{background:#e4ede8}.table-scroll{overflow-x:auto}code{font-size:.85em;overflow-wrap:anywhere}.kicker{letter-spacing:.1em;font-size:13px;font-weight:bold}.banner{padding:18px 22px;background:#173f39;color:white;border-radius:6px}.banner a{color:white}.toc{padding:20px;background:#e4ede8;columns:2}.toc a{display:block;margin:8px 0}.page-copy{padding:6px 0 20px}.page-copy h1{font-size:36px}.route{font-size:14px;overflow-wrap:anywhere}.copy-text{white-space:pre-wrap;font:16px/1.65 Arial,sans-serif;overflow-wrap:anywhere}details{margin:18px 0}summary{cursor:pointer;font-weight:bold;padding:12px;background:#e4ede8}:focus-visible{outline:3px solid #ad551b;outline-offset:3px}@media(max-width:650px){main{padding:28px 18px}h1{font-size:34px}h2{font-size:27px}.toc{columns:1}table{font-size:14px}td,th{padding:10px 8px}}@media print{body{background:white}main{padding:0}h2,h3{break-after:avoid}tr{break-inside:avoid}.toc{columns:1}.banner{background:white;color:#173f39;border:1px solid #173f39}.banner a{color:#173f39}a{overflow-wrap:anywhere}}'''

def inline(s):
    s=escape(s)
    s=re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)',r'<a href="\2">\1</a>',s)
    s=re.sub(r'`([^`]+)`',r'<code>\1</code>',s)
    return re.sub(r'\*\*([^*]+)\*\*',r'<strong>\1</strong>',s)

def markdown(text):
    result=[]; lines=text.splitlines();i=0
    while i<len(lines):
        line=lines[i].strip()
        if not line:i+=1;continue
        if line.startswith('|'):
            rows=[]
            while i<len(lines) and lines[i].strip().startswith('|'):
                row=[v.strip() for v in lines[i].strip().strip('|').split('|')]
                if not all(re.fullmatch(r':?-+:?',v) for v in row):rows.append(row)
                i+=1
            result.append('<div class="table-scroll"><table><thead><tr>'+''.join('<th scope="col">'+inline(v)+'</th>' for v in rows[0])+'</tr></thead><tbody>'+''.join('<tr>'+''.join('<td>'+inline(v)+'</td>' for v in row)+'</tr>' for row in rows[1:])+'</tbody></table></div>');continue
        if re.match(r'^#{1,3} ',line):
            n=len(line.split(' ',1)[0]);label=line[n+1:];ident='section-'+str(len(result))
            result.append(f'<h{n} id="{ident}">{inline(label)}</h{n}>');i+=1;continue
        if re.match(r'^\d+\. ',line):
            group=[]
            while i<len(lines) and re.match(r'^\d+\. ',lines[i]):
                group.append('<li>'+inline(re.sub(r'^\d+\. ','',lines[i]))+'</li>');i+=1
            result.append('<ol>'+''.join(group)+'</ol>');continue
        group=[]
        while i<len(lines) and lines[i].strip() and not re.match(r'^(#{1,3} |\||\d+\. )',lines[i]):
            group.append(inline(lines[i].strip()));i+=1
        result.append('<p>'+'<br>'.join(group)+'</p>')
    return '\n'.join(result)

def shell(title,body,lang='tr'):
    return '<!doctype html><html lang="'+lang+'"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>'+escape(title)+'</title><style>'+CSS+'</style></head><body><main><p class="kicker">NAVIAR-CARE-002 · 6.0 · 5 EYLÜL 2026</p>'+body+'</main></body></html>'

concept=(ROOT/'design/CONCEPT-v6-tr.md').read_text()
(OUT/'NAVIAR-CARE-002_Konsept-ve-Web-Teslimi_v6.md').write_text(concept)
(OUT/'NAVIAR-CARE-002_Konsept-ve-Web-Teslimi_v6.html').write_text(shell('NAVIAR CARE 2 — Konsept ve web teslimi',markdown(concept)))

class Extract(HTMLParser):
    def __init__(self,source):
        super().__init__();self.active=False;self.skip=0;self.lines=[];self.feed(source)
    def handle_starttag(self,tag,attrs):
        if tag=='main':self.active=True
        if self.active:
            if tag in ('svg','script','style'):self.skip+=1
            if not self.skip and tag in ('h1','h2','h3','p','li','summary','label','button','dt','dd','legend','figcaption','option','br'):self.lines.append('\n')
    def handle_endtag(self,tag):
        if tag=='main':self.active=False
        if self.active:
            if tag in ('svg','script','style'):self.skip=max(0,self.skip-1)
            if not self.skip and tag in ('h1','h2','h3','p','li','summary','label','button','dt','dd','legend','figcaption','option'):self.lines.append('\n')
    def handle_data(self,data):
        if self.active and not self.skip and data.strip():self.lines.append(data)
    def text(self):return re.sub(r'\n\s*\n+', '\n\n', ''.join(self.lines)).strip()

routes=['','journey/','clinicians/','languages/','professionals/','about/','privacy.html','booking/','insights/']
labels=['Ana sayfa','Hazırlık','Örnek profiller','Diller','Profesyoneller','Hizmet hakkında','Gizlilik','Test rezervasyonu','Yönetim']
toc=[];sections=[]
for lang,prefix,name in [('tr','tr/','Türkçe'),('nb','','Norsk bokmål'),('en','en/','English')]:
    for idx,(route,title) in enumerate(zip(routes,labels)):
        relative=prefix+route;target=ROOT/'dist'/relative
        if target.is_dir():target=target/'index.html'
        raw=target.read_text();anchor=f'{lang}-{idx}';url='https://naviar-care-2.andersen-betul.chatgpt.site/'+relative
        toc.append(f'<a href="#{anchor}">{name} · {title}</a>')
        texts=escape(Extract(raw).text())
        sections.append(f'<section class="page-copy" id="{anchor}" lang="{lang}"><h2>{name} · {title}</h2><p class="route"><a href="{url}">Web sayfasını aç</a> · /{relative}</p><div class="copy-text">{texts}</div></section>')
    raw=(ROOT/'dist'/prefix/'booking/index.html').read_text()
    config=json.loads(re.search(r'<script id="operations-config"[^>]*>(.*?)</script>',raw,re.S).group(1))
    sections.append('<details><summary>'+name+' · Dinamik işlem ve hata metinleri</summary><div class="copy-text">'+escape(json.dumps(config,ensure_ascii=False,indent=2))+'</div></details>')
intro='''<h1>Web sitesinin metinleri</h1><p>Üç dilde 27 ana sayfanın güncel ana içerikleri. Metinler yayıma hazırlanan HTML dosyalarından doğrudan alınmıştır. Menü ve altbilgi tekrarları çıkarılmış; işlem ve hata metinleri dil başına ekte korunmuştur. Bu belge çalışan rezervasyon ekranı değildir.</p><p class="banner">Hizmet demosu: gerçek doktor randevusu, klinik değerlendirme veya tahsilat yapılmaz. Katalogdaki 42 profil ve 113 dil kaydı örnektir.</p><p>Profil ve dil listelerinin seçime bağlı sonuçları ortak katalogdan üretilir; burada 42 örnek profil ayrı ayrı yeniden basılmaz. Kısa üç dilli demo <a href="https://naviar-care-2.andersen-betul.chatgpt.site/studio-demo/?lang=tr">web sitesinde denenebilir</a>. Güncel kaynak kodu proje deposunda tutulur.</p>'''
(OUT/'NAVIAR-CARE-002_Web-Sitesi-Metinleri_NO-EN-TR_v6.html').write_text(shell('NAVIAR CARE 2 — Web sitesi metinleri',intro+'<nav class="toc" aria-label="Sayfalar">'+''.join(toc)+'</nav>'+''.join(sections)))
print('Created concept Markdown, readable concept HTML, and 27-page localized copy handoff.')
