// ============================================
// BETA ART COOKIE BANNER — JavaScript
// ============================================
const BA_COOKIE_KEY = "betaart:consent:v1";
const BA_PLAUSIBLE_DOMAIN = "betaart.no";

function baCookieState(){
  try { return JSON.parse(localStorage.getItem(BA_COOKIE_KEY)); }
  catch(e){ return null; }
}
function baCookieDecision(kind){
  const state = { necessary:true, analytics:kind==="all", ts:new Date().toISOString(), v:1 };
  try { localStorage.setItem(BA_COOKIE_KEY, JSON.stringify(state)); } catch(e){}
  document.getElementById("ba-cookie").classList.remove("show");
  if (state.analytics) baLoadPlausible();
  refreshState();
}
function baCookieShow(){ document.getElementById("ba-cookie").classList.add("show"); }
function baCookieReset(){
  try { localStorage.removeItem(BA_COOKIE_KEY); } catch(e){}
  baCookieShow(); refreshState();
}
function baLoadPlausible(){
  // Demonstration only: no analytics requests are made from this preview.
}
(function(){
  const state = baCookieState();
  if (!state) baCookieShow();
  else if (state.analytics) baLoadPlausible();
})();

// ============================================
// PAGE-SPECIFIC (for this demo/documentation page only)
// ============================================
function refreshState(){
  const state = baCookieState();
  const box = document.getElementById("state-box");
  if (!state) box.textContent = currentLang === "no" ? "Ikke bestemt ennå" : "Not decided yet";
  else box.textContent = JSON.stringify(state, null, 2);
}

const LANG_KEY = "betaart:lang:v1";
const DEFAULT_LANG = "en";
let currentLang = DEFAULT_LANG;

const T = {
  en: {
    "eyebrow":"Cookie consent · Live preview & integration",
    "title":"Cookie Banner",
    "intro":"A GDPR-compliant cookie banner in the BETA ART design language. This page shows it working, explains what it does, and gives you the code to paste into every HTML page.",
    "s1.title":"Live preview","s1.intro":"Click the buttons below to interact with the banner. State is saved to localStorage and displayed underneath so you can see what the visitor's browser stores.",
    "btn.show":"Show banner","btn.reset":"Reset consent","btn.refresh":"Refresh state",
    "state.label":"Current consent state",
    "s2.title":"Two categories, no dark patterns","s2.intro":"GDPR forbids pre-checked boxes and requires equally easy Accept and Reject. This banner uses only two categories — necessary (always on) and analytics (opt-in). No advertising cookies. No third-party trackers. No fingerprinting.",
    "cat.a.label":"Category A · Necessary","cat.a.name":"Always active","cat.a.desc":"Required for the site to function. Cart state, language preference, session security. Legal basis: legitimate interest (GDPR Art. 6.1.f). Cannot be turned off.","cat.a.list":"betaart:cart:v1<br>betaart:lang:v1<br>betaart:consent:v1",
    "cat.b.label":"Category B · Analytics","cat.b.name":"Opt-in only","cat.b.desc":"Privacy-friendly analytics via Plausible (no cookies, no fingerprinting, EU-hosted). Used only to understand page traffic. Legal basis: consent (GDPR Art. 6.1.a).","cat.b.list":"No cookies set.<br>Plausible.io script loaded<br>only after consent.",
    "s3.title":"Integration — three steps per page","s3.intro":"Paste three snippets into every HTML page: the CSS, the HTML markup, and the JavaScript. The banner uses the same localStorage LANG_KEY as your other pages, so language switches everywhere at once.",
    "step1.title":"Step 1 — CSS (inside <style> or in your stylesheet)","step1.intro":"Copy the block marked <code>BETA ART COOKIE BANNER — start / end</code> from this file's <style> block. About 60 lines.",
    "step2.title":"Step 2 — HTML (just before </body>)",
    "step3.title":"Step 3 — JavaScript (before your existing <script>)",
    "step4.title":"Bonus — Footer link to reopen banner","step4.intro":"Users must be able to change their mind. Add this button anywhere in your footer:",
    "s4.title":"Integration checklist","s4.intro":"Apply to every page that visitors can land on directly. That means all six existing pages, plus any future ones.",
    "chk.1":"☐ index.html (main site — beta-art-v3.html)","chk.2":"☐ privacy.html","chk.3":"☐ license-terms.html","chk.4":"☐ faq.html","chk.5":"☐ contact.html","chk.6":"☐ qr.html (already noindex; still recommended)","chk.7":"☐ Add \"Manage cookies\" button to footer of each page","chk.8":"☐ Change BA_PLAUSIBLE_DOMAIN to your real domain","chk.9":"☐ Add translations to your existing T{} object",
    "s5.title":"Translations for T{} object","s5.intro":"Add these five keys to both <code>T.en</code> and <code>T.no</code> in each page's script block:",
    "cookie.eyebrow":"Cookies","cookie.title":"A quick word about cookies","cookie.body":"This site uses only what's necessary to function — cart state, language preference. If you accept analytics, we also load Plausible, a privacy-friendly analytics tool. No advertising cookies. Ever. See our <a href='/privacy.html'>privacy policy</a>.","cookie.acceptAll":"Accept all","cookie.necessary":"Necessary only",
    "footer.manage":"Manage cookies","footer.note":"Cookie consent · Live preview"
  },
  no: {
    "eyebrow":"Informasjonskapsler · Live forhåndsvisning og integrasjon",
    "title":"Informasjonskapsel-banner",
    "intro":"En GDPR-samsvarende banner i BETA ART sitt designspråk. Denne siden viser den i drift, forklarer hva den gjør, og gir deg koden du limer inn i hver HTML-side.",
    "s1.title":"Live forhåndsvisning","s1.intro":"Klikk knappene under for å samhandle med banneret. Tilstanden lagres i localStorage og vises nedenfor så du ser hva besøkendes nettleser lagrer.",
    "btn.show":"Vis banner","btn.reset":"Nullstill samtykke","btn.refresh":"Oppdater tilstand",
    "state.label":"Nåværende samtykkestatus",
    "s2.title":"To kategorier, ingen mørke mønstre","s2.intro":"GDPR forbyr forhåndskryssede bokser og krever like enkel Godta og Avslå. Dette banneret bruker bare to kategorier — nødvendige (alltid på) og analytikk (opt-in). Ingen reklamekapsler. Ingen tredjepartssporere. Ingen fingeravtrykk.",
    "cat.a.label":"Kategori A · Nødvendige","cat.a.name":"Alltid aktiv","cat.a.desc":"Kreves for at siden skal fungere. Handlekurv, språkvalg, sesjonssikkerhet. Rettslig grunnlag: berettiget interesse (GDPR Art. 6.1.f). Kan ikke slås av.","cat.a.list":"betaart:cart:v1<br>betaart:lang:v1<br>betaart:consent:v1",
    "cat.b.label":"Kategori B · Analytikk","cat.b.name":"Kun med samtykke","cat.b.desc":"Personvernvennlig analytikk via Plausible (ingen kapsler, ingen fingeravtrykk, EU-hostet). Brukes kun for å forstå sidetrafikk. Rettslig grunnlag: samtykke (GDPR Art. 6.1.a).","cat.b.list":"Ingen kapsler settes.<br>Plausible.io-skript lastes<br>kun etter samtykke.",
    "s3.title":"Integrasjon — tre steg per side","s3.intro":"Lim tre snuttar inn i hver HTML-side: CSS-en, HTML-oppmerkingen og JavaScript-en. Banneret bruker samme localStorage LANG_KEY som dine andre sider, så språket byttes overalt samtidig.",
    "step1.title":"Steg 1 — CSS (inne i <style> eller stilarket ditt)","step1.intro":"Kopier blokken merket <code>BETA ART COOKIE BANNER — start / end</code> fra denne filens <style>-blokk. Cirka 60 linjer.",
    "step2.title":"Steg 2 — HTML (rett før </body>)",
    "step3.title":"Steg 3 — JavaScript (før din eksisterende <script>)",
    "step4.title":"Bonus — Footer-lenke for å åpne banneret igjen","step4.intro":"Brukere må kunne ombestemme seg. Legg denne knappen hvor som helst i footeren:",
    "s4.title":"Integrasjonssjekkliste","s4.intro":"Bruk på hver side som besøkende kan lande på direkte. Det betyr alle seks eksisterende sider, pluss enhver fremtidig.",
    "chk.1":"☐ index.html (hovednettsted — beta-art-v3.html)","chk.2":"☐ privacy.html","chk.3":"☐ license-terms.html","chk.4":"☐ faq.html","chk.5":"☐ contact.html","chk.6":"☐ qr.html (allerede noindex; likevel anbefalt)","chk.7":"☐ Legg til «Håndter kapsler»-knapp i footeren på hver side","chk.8":"☐ Endre BA_PLAUSIBLE_DOMAIN til ditt ekte domene","chk.9":"☐ Legg oversettelsene inn i ditt eksisterende T{}-objekt",
    "s5.title":"Oversettelser for T{}-objektet","s5.intro":"Legg til disse fem nøklene i både <code>T.en</code> og <code>T.no</code> i skript-blokken på hver side:",
    "cookie.eyebrow":"Informasjonskapsler","cookie.title":"Kort om informasjonskapsler","cookie.body":"Denne siden bruker bare det som trengs for å fungere — handlekurv, språkvalg. Godtar du analytikk, laster vi også Plausible, et personvernvennlig analyseverktøy. Ingen reklamesporing. Aldri. Se <a href='/privacy.html'>personvernerklæringen</a>.","cookie.acceptAll":"Godta alt","cookie.necessary":"Kun nødvendige",
    "footer.manage":"Håndter informasjonskapsler","footer.note":"Informasjonskapsler · Live forhåndsvisning"
  }
};

function t(key){ return (T[currentLang] && T[currentLang][key]) ?? (T[DEFAULT_LANG] && T[DEFAULT_LANG][key]) ?? key; }
function applyLang(){
  document.documentElement.lang = currentLang;
  document.title = currentLang === "no" ? "Informasjonskapsler — BETA ART" : "Cookie Consent — BETA ART";
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t(el.getAttribute("data-i18n")));
  document.querySelectorAll("[data-i18n-html]").forEach(el => el.innerHTML = t(el.getAttribute("data-i18n-html")));
  document.querySelectorAll(".lang button[data-lang]").forEach(b => b.classList.toggle("on", b.dataset.lang === currentLang));
  refreshState();
}
function switchLang(lang){ if(!T[lang]) return; currentLang = lang; try{ localStorage.setItem(LANG_KEY, lang); }catch(e){} applyLang(); }
document.querySelectorAll(".lang button[data-lang]").forEach(b => b.addEventListener("click", () => switchLang(b.dataset.lang)));
try{ const s = localStorage.getItem(LANG_KEY); if(s && T[s]) currentLang = s; }catch(e){}
applyLang();
