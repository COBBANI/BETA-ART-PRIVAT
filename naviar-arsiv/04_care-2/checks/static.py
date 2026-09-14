from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
import json,re
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'dist'
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.ids=[];self.refs=[];self.scripts=[];self.demo=False;self.locale='';self.raw=text;self.feed(text)
 def handle_starttag(self,tag,attrs):
  d=dict(attrs)
  if 'id' in d:self.ids.append(d['id'])
  if tag=='html':self.locale=d.get('lang')
  for key in ('href','src'):
   if key in d:self.refs.append(d[key])
  if tag=='script' and 'src' in d:self.scripts.append(d['src'])
  if 'notice' in d.get('class','').split():self.demo=True
  if tag in ('input','textarea'):
   assert tag=='input' and d.get('type') in ('search','radio','checkbox'),f'Unexpected data collection: {d}'
  assert tag!='form','Unexpected submitting form'
pages={p:Page(p.read_text()) for p in OUT.rglob('*.html') if '/server/' not in str(p)}
localized=0
for path,p in pages.items():
 assert len(p.ids)==len(set(p.ids)),f'duplicate IDs: {path}'
 assert p.locale in ('nb','en','tr'),f'missing locale: {path}'
 if 'data-page=' in p.raw:
  localized+=1
  assert p.demo,f'missing demo banner: {path}'
  assert 'ui-config' in p.ids and 'main' in p.ids
  assert p.scripts==['/model.js','/site.js','/operations.js'],f'script dependency order: {path}'
  ui=json.loads(re.search(r'<script id="ui-config"[^>]*>(.*?)</script>',p.raw).group(1))
  assert ui['demoBooking'] in ('Demo — ingen bestilling','Demo — booking unavailable','Demo — randevu alınmaz')
  assert len(re.findall(r'data-locale-link',p.raw))==3
  assert not any(x in p.raw.lower() for x in ['in about two minutes','available now','3–5 working days','% success','nothing is sent anywhere until'])
 else:
  assert 'DEMO' in p.raw,f'missing compatibility/404 demo status: {path}'
 for ref in p.refs:
  u=urlsplit(ref)
  if u.scheme or u.netloc:continue
  dest=OUT/unquote(u.path).lstrip('/') if u.path.startswith('/') else path.parent/unquote(u.path) if u.path else path
  if dest.is_dir():dest=dest/'index.html'
  assert dest.exists(),f'broken {path.relative_to(OUT)} -> {ref}'
  if u.fragment and '=' not in u.fragment:
   assert dest in pages and unquote(u.fragment) in pages[dest].ids,f'bad anchor: {path} -> {ref}'
assert localized==27,localized
js=(OUT/'site.js').read_text()+(OUT/'model.js').read_text()
assert not re.search(r'\b(fetch|XMLHttpRequest|WebSocket|localStorage|sessionStorage)\b|document\.cookie',js)
assert 'innerHTML' not in js and 'eval(' not in js
assert len(re.findall(r'<h1\b',pages[OUT/'tr/index.html'].raw))==1
for code in ('nb','en','tr'):
 sub='' if code=='nb' else code+'/'
 assert f'href="/studio-demo/?lang={code}"' in pages[OUT/sub/'index.html'].raw
 assert f'href="/studio-demo/?lang={code}"' in pages[OUT/sub/'booking/index.html'].raw
 p=pages[OUT/sub/'professionals/index.html']
 assert 'data-privacy-panel="private"' in p.raw
 assert all(x in p.raw for x in {'nb':['E-post','referansenes kontaktopplysninger','dokumenter'],'en':['Email, referee contact details and documents must remain private'],'tr':['E-posta, referans iletişim bilgileri ve belgeler özel kalmalı']}[code])
assert {'site-home','back-to-site','saved-booking'}.issubset(pages[OUT/'studio-demo/index.html'].ids)
assert 'sample-date-note' in pages[OUT/'studio-demo/index.html'].ids
assert pages[OUT/'studio-demo/index.html'].scripts==['sample-calendar.js','studio.js']
for sub in ('','en/','tr/'):
 assert 'service-scope-title' in pages[OUT/sub/'about/index.html'].ids
print(f'PASS: {localized} localized pages + {len(pages)-localized} compatibility/error pages; local paths, assets, anchors, IDs, privacy copy, demo labels, script wiring and preserved local-only preparation filters.')
