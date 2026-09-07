/* ---------- geometry, shared ---------- */
const BLADES = [0,60,120,180,240,300]
  .map(a => `<path d="M50 30 L75.81 11.92" transform="rotate(${a} 50 50)"/>`).join('');
const HEX = '<path d="M50 30 L32.68 40 L32.68 60 L50 70 L67.32 60 L67.32 40 Z"/>';

function markSVG({stroke='#0F0F0F', dot='#8B1A1A', w=3.4, size=256, simplified=false, dieMode=false} = {}){
  const body = simplified
    ? `<circle cx="50" cy="50" r="46"/>${BLADES}`
    : `<circle cx="50" cy="50" r="46"/>${BLADES}${HEX}`;
  const dotEl = dieMode ? '' : `<circle cx="50" cy="50" r="5.4" fill="${dot}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="${size}" height="${size}">
  <g fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="round">
    ${body}
  </g>
  ${dotEl}
</svg>`;
}

/* ---------- scale strip ---------- */
(function(){
  const sizes = [128, 64, 40, 24, 16];
  const strip = document.getElementById('scaleStrip');
  strip.innerHTML = sizes.map(s => {
    const simplified = s <= 24;
    const w = s <= 24 ? 7 : (s <= 40 ? 4.6 : 3.4);
    return `<div class="scale-item">
      <div style="width:${s}px;height:${s}px">${markSVG({size:s, w, simplified})}</div>
      <div class="px">${s} px</div>
    </div>`;
  }).join('');
})();

/* ---------- downloads ---------- */
function saveSVG(str, name){
  const blob = new Blob([str], {type:'image/svg+xml;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name + '.svg';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href), 1000);
}
function dl(id, name){
  const el = document.getElementById(id);
  if(!el) return;
  const clone = el.cloneNode(true);
  clone.setAttribute('xmlns','http://www.w3.org/2000/svg');
  clone.setAttribute('width','256'); clone.setAttribute('height','256');
  saveSVG(new XMLSerializer().serializeToString(clone), name);
}
function dlVariant(kind, name){
  const map = {
    reverse:  {stroke:'#FBFAF7', dot:'#8B1A1A'},
    mono:     {stroke:'#0F0F0F', dot:'#0F0F0F'},
    favicon:  {stroke:'#0F0F0F', dot:'#8B1A1A', w:7, size:64, simplified:true},
    die:      {stroke:'#000000', w:2, size:512, dieMode:true}
  };
  saveSVG(markSVG(map[kind] || {}), name);
}
function dlLockup(){
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 420 100" width="840" height="200">
  <g fill="none" stroke="#0F0F0F" stroke-width="3.4" stroke-linecap="round">
    <circle cx="50" cy="50" r="46"/>${BLADES}${HEX}
  </g>
  <circle cx="50" cy="50" r="5.4" fill="#8B1A1A"/>
  <text x="126" y="62" font-family="Fraunces, Georgia, serif" font-size="34" font-weight="300"
        letter-spacing="4.8" fill="#0F0F0F">BETA ART</text>
</svg>`;
  saveSVG(svg, 'betaart-lockup-horizontal');
}

/* ---------- i18n ---------- */
const LANG_KEY = "betaart:lang:v1";
const DEFAULT_LANG = "en";
let currentLang = DEFAULT_LANG;

const T = {
  en: {
    "nav.series":"Series","nav.faq":"FAQ","nav.contact":"Contact",
    "hero.eyebrow":"Identity · The mark",
    "hero.title":"An aperture<br>that is also<br>a <em>seal</em>.",
    "hero.sub":"Designed to be pressed into paper, not just placed on screens.",
    "hero.cap":"Blind emboss · certificate of authenticity",

    "c1.h":"The primary mark",
    "c1.p1":"Six blades close around a hexagonal opening — the geometry of a real iris diaphragm, the one mechanism no generated image has ever passed through. Drawn as a closed circle, it reads simultaneously as a wax seal: the instrument archives have used to certify a document for eight hundred years.",
    "c1.p2":"At the exact centre sits a single point in archival wax red. It is the only ink in the mark. It marks the moment of capture — and doubles as a coordinate pin, because every plate in this archive carries the coordinates of where it was made.",
    "c1.s1.t":"Construction","c1.s1.d":"Circle r=46 · hexagon r=20 · six blades at 55°",
    "c1.s2.t":"Stroke","c1.s2.d":"3 units at 100 × 100 · scales proportionally",
    "c1.s3.t":"Ink","c1.s4.t":"Seal point",
    "c1.s5.t":"Minimum size","c1.s5.d":"16 px screen · 8 mm print",

    "c2.h":"How it is built",
    "c2.p":"Nothing in the mark is drawn by eye. Every line is derived from two radii and one angle, so the mark can be rebuilt exactly at any size, by anyone, on any medium — including a physical embossing die.",
    "c2.a.h":"Two radii","c2.a.p":"The housing at r=46. The opening at r=20. Their ratio, 2.3, sets every other measure.",
    "c2.b.h":"Six vertices","c2.b.p":"A pointy-top hexagon on the inner radius. Six blades, the count used in most fast prime lenses.",
    "c2.c.h":"One angle","c2.c.p":"Each blade leaves its vertex at 55° from the radius and runs to the housing. Rotate five times. Done.",

    "c3.h":"Two routes not taken",
    "c3.p":"Both were developed to the same finish. Both are usable. Neither carries the double meaning the aperture-seal does, and a mark that says one thing is a weaker asset than a mark that says two true things at once.",
    "c3.a.v":"Considered · not selected","c3.a.h":"The registration mark",
    "c3.a.p":"A printer's crosshair, which is also a focus point and a map coordinate. Precise, technical, and instantly legible at any size. Rejected because it belongs to printing rather than to photography, and because the form is close to public domain — it would be hard to defend as a trademark.",
    "c3.b.v":"Considered · not selected","c3.b.h":"The accession number",
    "c3.b.p":"The catalogue system as the identity: no symbol at all, just the number every plate already carries, with the separator in seal red. Confident and genuinely museum. Rejected because it cannot function at favicon size, cannot be embossed, and offers nothing to a viewer who has not yet learned what the numbering means.",

    "c4.h":"Wordmark and lockups",
    "c4.p":"The wordmark is Fraunces at light weight with the WONK axis engaged, which keeps a trace of hand-cut serif in an otherwise disciplined setting. Wide tracking gives it the pace of an engraved plate rather than a logotype.",
    "lock.a":"Horizontal · default","lock.b":"Stacked · certificates, prints, exhibition",
    "lock.rule":"Verified Human Photography",

    "c5.h":"Behaviour at size",
    "c5.note":"Below 24 px the blades merge and stop reading. The favicon build therefore drops the hexagon outline and thickens the stroke — the ring and the seal point survive, which is all that is needed to be recognised in a browser tab.",

    "c6.h":"Colour variants",
    "v.a":"Primary\nInk on paper","v.b":"Reversed\nPaper on ink","v.c":"Seal\nStamps, wax, foil","v.d":"Single colour\nFax, engraving, die",

    "c7.h":"Clear space",
    "c7.p1":"Keep clear on all sides by half the mark's radius. Nothing enters that field — no type, no rule, no photograph edge, no other logo.",
    "c7.p2":"The mark is never placed over a photograph. This is not a style preference. The archive licenses photographs to other people, and a mark sitting on top of an image looks like a watermark on someone else's picture — which is the one thing this brand must never appear to be doing.",

    "c8.h":"Never do this",
    "mis.a":"Do not rotate. The mark is a seal; seals sit level.",
    "mis.b":"Do not recolour. Ink, paper and seal red only.",
    "mis.c":"Do not stretch. Scale both axes together.",
    "mis.d":"Do not place on a photograph. It reads as a watermark.",

    "c9.h":"Files",
    "c9.p":"Vector only. Every file is a plain SVG with no dependencies, editable in Illustrator, Figma, Affinity or a text editor. Send the die file to the embosser as-is.",
    "dl.a":"Primary mark<small>SVG · ink + seal point</small>",
    "dl.b":"Reversed mark<small>SVG · for dark grounds</small>",
    "dl.c":"Single colour<small>SVG · engraving, die, fax</small>",
    "dl.d":"Favicon build<small>SVG · simplified for 16–24 px</small>",
    "dl.e":"Horizontal lockup<small>SVG · mark + wordmark</small>",
    "dl.f":"Emboss die<small>SVG · outline only, 25 mm</small>",

    "foot.a":"BETA ART · Mark system v1.0 · 2026",
    "foot.b":"Register as trademark before public launch"
  },
  no: {
    "nav.series":"Serier","nav.faq":"Spørsmål","nav.contact":"Kontakt",
    "hero.eyebrow":"Identitet · Merket",
    "hero.title":"En blender<br>som også er<br>et <em>segl</em>.",
    "hero.sub":"Laget for å presses ned i papir, ikke bare plasseres på skjermer.",
    "hero.cap":"Blindpreg · ekthetssertifikat",

    "c1.h":"Hovedmerket",
    "c1.p1":"Seks blader lukker seg rundt en sekskantet åpning — geometrien til en ekte irisblender, den ene mekanismen intet generert bilde noensinne har passert gjennom. Tegnet som en lukket sirkel leses det samtidig som et voksegl: instrumentet arkiver har brukt til å bekrefte et dokument i åtte hundre år.",
    "c1.p2":"I nøyaktig sentrum sitter ett enkelt punkt i arkivrød voks. Det er det eneste blekket i merket. Det markerer opptaksøyeblikket — og fungerer samtidig som en koordinatnål, fordi hver plate i dette arkivet bærer koordinatene for hvor den ble laget.",
    "c1.s1.t":"Konstruksjon","c1.s1.d":"Sirkel r=46 · sekskant r=20 · seks blader ved 55°",
    "c1.s2.t":"Strek","c1.s2.d":"3 enheter ved 100 × 100 · skalerer proporsjonalt",
    "c1.s3.t":"Blekk","c1.s4.t":"Seglpunkt",
    "c1.s5.t":"Minstestørrelse","c1.s5.d":"16 px skjerm · 8 mm trykk",

    "c2.h":"Slik er det bygget",
    "c2.p":"Ingenting i merket er tegnet på øyemål. Hver linje er utledet av to radier og én vinkel, slik at merket kan gjenskapes nøyaktig i enhver størrelse, av hvem som helst, i ethvert medium — inkludert en fysisk pregestans.",
    "c2.a.h":"To radier","c2.a.p":"Huset ved r=46. Åpningen ved r=20. Forholdet, 2,3, bestemmer alle andre mål.",
    "c2.b.h":"Seks hjørner","c2.b.p":"En spisstoppet sekskant på indre radius. Seks blader — antallet i de fleste lyssterke fastobjektiver.",
    "c2.c.h":"Én vinkel","c2.c.p":"Hvert blad forlater hjørnet sitt i 55° fra radien og løper til huset. Roter fem ganger. Ferdig.",

    "c3.h":"To veier som ikke ble valgt",
    "c3.p":"Begge ble utviklet til samme ferdighetsnivå. Begge er brukbare. Ingen av dem bærer den doble betydningen blender-seglet har, og et merke som sier én ting er en svakere eiendel enn et merke som sier to sanne ting samtidig.",
    "c3.a.v":"Vurdert · ikke valgt","c3.a.h":"Passermerket",
    "c3.a.p":"Et trykkerkors, som også er et fokuspunkt og en kartkoordinat. Presist, teknisk og umiddelbart lesbart i enhver størrelse. Forkastet fordi det tilhører trykkeriet snarere enn fotografiet, og fordi formen ligger nær public domain — den ville vært vanskelig å forsvare som varemerke.",
    "c3.b.v":"Vurdert · ikke valgt","c3.b.h":"Tilvekstnummeret",
    "c3.b.p":"Katalogsystemet som identitet: ingen symbol i det hele tatt, bare nummeret hver plate allerede bærer, med skilletegnet i seglrødt. Selvsikkert og ekte museum. Forkastet fordi det ikke fungerer i favicon-størrelse, ikke kan preges, og ikke gir noe til en betrakter som ennå ikke har lært hva nummereringen betyr.",

    "c4.h":"Ordmerke og oppsett",
    "c4.p":"Ordmerket er Fraunces i lett vekt med WONK-aksen aktivert, som beholder et spor av håndskåret antikva i en ellers disiplinert setting. Bred sperring gir det takten til en gravert plate snarere enn en logotype.",
    "lock.a":"Horisontal · standard","lock.b":"Stablet · sertifikater, trykk, utstilling",
    "lock.rule":"Verified Human Photography",

    "c5.h":"Oppførsel i størrelse",
    "c5.note":"Under 24 px smelter bladene sammen og slutter å lese. Favicon-versjonen dropper derfor sekskanten og tykner streken — ringen og seglpunktet overlever, og det er alt som trengs for å bli gjenkjent i en nettleserfane.",

    "c6.h":"Fargevarianter",
    "v.a":"Primær\nBlekk på papir","v.b":"Negativ\nPapir på blekk","v.c":"Segl\nStempel, voks, folie","v.d":"Én farge\nFaks, gravering, stans",

    "c7.h":"Frisone",
    "c7.p1":"Hold fritt på alle sider med halvparten av merkets radius. Ingenting kommer inn i det feltet — ingen skrift, ingen linje, ingen bildekant, ingen annen logo.",
    "c7.p2":"Merket plasseres aldri oppå et fotografi. Dette er ikke en stilpreferanse. Arkivet lisensierer fotografier til andre mennesker, og et merke som ligger oppå et bilde ser ut som et vannmerke på noen andres bilde — det ene denne merkevaren aldri må se ut til å gjøre.",

    "c8.h":"Aldri gjør dette",
    "mis.a":"Ikke roter. Merket er et segl; segl står rett.",
    "mis.b":"Ikke fargelegg om. Kun blekk, papir og seglrødt.",
    "mis.c":"Ikke strekk. Skaler begge akser likt.",
    "mis.d":"Ikke legg det på et fotografi. Det leses som vannmerke.",

    "c9.h":"Filer",
    "c9.p":"Kun vektor. Hver fil er en ren SVG uten avhengigheter, redigerbar i Illustrator, Figma, Affinity eller en teksteditor. Send stansefilen til pregeriet som den er.",
    "dl.a":"Hovedmerke<small>SVG · blekk + seglpunkt</small>",
    "dl.b":"Negativt merke<small>SVG · for mørk bunn</small>",
    "dl.c":"Én farge<small>SVG · gravering, stans, faks</small>",
    "dl.d":"Favicon-versjon<small>SVG · forenklet for 16–24 px</small>",
    "dl.e":"Horisontalt oppsett<small>SVG · merke + ordmerke</small>",
    "dl.f":"Pregestans<small>SVG · kun kontur, 25 mm</small>",

    "foot.a":"BETA ART · Merkesystem v1.0 · 2026",
    "foot.b":"Registrer som varemerke før offentlig lansering"
  }
};

function t(k){ return (T[currentLang] && T[currentLang][k]) ?? (T[DEFAULT_LANG] && T[DEFAULT_LANG][k]) ?? k; }
function applyLang(){
  document.documentElement.lang = currentLang;
  document.title = currentLang === "no" ? "Merket — BETA ART" : "The Mark — BETA ART";
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t(el.getAttribute("data-i18n")));
  document.querySelectorAll("[data-i18n-html]").forEach(el => el.innerHTML = t(el.getAttribute("data-i18n-html")));
  document.querySelectorAll(".lang button[data-lang]").forEach(b => b.classList.toggle("on", b.dataset.lang === currentLang));
}
function switchLang(l){ if(!T[l]) return; currentLang = l; try{ localStorage.setItem(LANG_KEY, l); }catch(e){} applyLang(); }
document.querySelectorAll(".lang button[data-lang]").forEach(b => b.addEventListener("click", () => switchLang(b.dataset.lang)));
try{ const s = localStorage.getItem(LANG_KEY); if(s && T[s]) currentLang = s; }catch(e){}
applyLang();
