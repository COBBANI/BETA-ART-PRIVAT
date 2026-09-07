const LANG_KEY = "betaart:lang:v1";
const DEFAULT_LANG = "en";
let currentLang = DEFAULT_LANG;

const T = {
  en: {
    "nav.collection":"Collection","nav.verification":"Verification","nav.faq":"FAQ",
    "eyebrow":"Contact & business information",
    "title":"Contact",
    "intro":"One photographer, one archive, one inbox. Real replies from a real person. Route your question to the right address below for the fastest answer.",

    "s1.title":"Where to write",
    "s1.intro":"Three routes exist so your message reaches the right context. Any of them will eventually reach the same person, but the routed ones get faster and better-tailored replies.",
    "route.a.label":"A · Licensing",
    "route.a.name":"Buying, custom licences, questions before ordering",
    "route.a.desc":"Order status, licence tier questions, requests to inspect a RAW original, custom licence quotes, or anything about the archive itself.",
    "route.b.label":"B · Press",
    "route.b.name":"Editorial requests, interviews, exhibition inquiries",
    "route.b.desc":"Publication interviews, exhibition or gallery requests, book publishers, festival programmers, media background on the archive's positioning.",
    "route.c.label":"C · Legal",
    "route.c.name":"Copyright, GDPR, unauthorised use reports",
    "route.c.desc":"Copyright infringement reports, GDPR data subject requests, right-of-withdrawal claims, DMCA counter-notices, or any formal legal correspondence.",

    "s2.title":"Response times",
    "s2.intro":"Written commitments. If we miss one, tell us — that itself is worth a response.",
    "time.orders.lbl":"Orders",
    "time.orders.val":"24 hours",
    "time.orders.note":"Weekdays, 09–17 CET",
    "time.general.lbl":"General questions",
    "time.general.val":"48 hours",
    "time.general.note":"Weekdays",
    "time.legal.lbl":"Legal matters",
    "time.legal.val":"72 hours",
    "time.legal.note":"Acknowledged within 72h; substantive reply may take longer",
    "notice.holiday.lbl":"Note",
    "notice.holiday.body":"During Norwegian public holidays and the summer weeks 28–30, response times may double. Urgent matters should be flagged in the subject line: <code>[URGENT]</code>.",

    "s3.title":"Business information",
    "s3.intro":"Required by Norwegian angrerettloven § 8 and forbrukerkjøpsloven for e-commerce operators. If any of these details are missing or incorrect at the time of your purchase, tell us.",
    "biz.name":"Registered business name",
    "biz.name.suffix":"(enkeltpersonforetak, [PHOTOGRAPHER NAME])",
    "biz.orgnr":"Organisation number",
    "biz.mva":"VAT registration",
    "biz.mva.val":"<span class=\"mono\">[000 000 000] MVA</span> — registered from [DATE]. Below this date, the business was not MVA-liable.",
    "biz.address":"Registered address",
    "biz.address.val":"[STREET ADDRESS]<br>[POSTAL CODE] [CITY]<br>Norway",
    "biz.email":"Primary email",
    "biz.phone":"Telephone",
    "biz.phone.note":"— written correspondence is preferred",
    "biz.website":"Website",
    "biz.bank":"Bank details",
    "biz.bank.val":"Provided on invoices. For international transfers, IBAN and BIC are included.",

    "s4.title":"Complaints and right of withdrawal",
    "s4.intro":"<b>Consumer complaints</b> — If you are a consumer (not a business) and want to raise a complaint about a purchase, write to <a class=\"link\" href=\"mailto:legal@betaart.no\">legal@betaart.no</a>. If we cannot resolve it, you have the right to escalate to Forbrukertilsynet or Forbrukerklageutvalget (Norwegian consumer authorities).",
    "s4.withdrawal":"<b>Right of withdrawal (angrerett)</b> — 14 days from receipt for consumer purchases in the EU/EEA. For digital delivery, the right lapses once you have expressly consented to immediate download at checkout. Details in <a class=\"link\" href=\"/license-terms.html#withdrawal\">§ 07 of the licence terms</a>.",
    "s4.form":"To exercise the right of withdrawal (where it still applies), use the standard withdrawal form supplied by Forbrukertilsynet, downloadable at <a class=\"link\" href=\"https://www.forbrukertilsynet.no\" target=\"_blank\" rel=\"noopener\">forbrukertilsynet.no</a>, and send it to <a class=\"link\" href=\"mailto:legal@betaart.no\">legal@betaart.no</a>.",

    "s5.title":"Physical mail",
    "s5.intro":"Formal legal correspondence (writs, service of process, official notices from Datatilsynet, tax authorities, or courts) should be sent to the registered address in § 03. For non-urgent physical mail (books, contracts to sign, print portfolios) email first — someone may be away.",

    "footer.home":"Home","footer.faq":"FAQ","footer.terms":"Licence terms","footer.privacy":"Privacy policy",
    "footer.legal1":"© 2026 Beta Art · All plates human-made · No generative AI"
  },
  no: {
    "nav.collection":"Samling","nav.verification":"Verifisering","nav.faq":"Spørsmål og svar",
    "eyebrow":"Kontakt og virksomhetsinformasjon",
    "title":"Kontakt",
    "intro":"Én fotograf, ett arkiv, én innboks. Ekte svar fra en ekte person. Ruter du spørsmålet til riktig adresse under, får du raskest svar.",

    "s1.title":"Hvor du skal skrive",
    "s1.intro":"Tre ruter finnes for å sikre at meldingen når riktig kontekst. Alle når til slutt samme person, men de rutede får raskere og bedre tilpassede svar.",
    "route.a.label":"A · Lisensiering",
    "route.a.name":"Kjøp, skreddersydde lisenser, spørsmål før bestilling",
    "route.a.desc":"Ordrestatus, lisensnivå-spørsmål, forespørsler om å inspisere en RAW-original, skreddersydde lisenstilbud, eller hva som helst om selve arkivet.",
    "route.b.label":"B · Presse",
    "route.b.name":"Redaksjonelle henvendelser, intervjuer, utstillingsforespørsler",
    "route.b.desc":"Publikasjonsintervjuer, utstillings- eller galleriforespørsler, bokforleggere, festivalprogrammerere, mediebakgrunn om arkivets posisjonering.",
    "route.c.label":"C · Juridisk",
    "route.c.name":"Opphavsrett, GDPR, rapporter om uautorisert bruk",
    "route.c.desc":"Rapporter om opphavsrettskrenkelse, GDPR-forespørsler, angreretts-krav, DMCA-motmeldinger, eller enhver formell juridisk korrespondanse.",

    "s2.title":"Svartider",
    "s2.intro":"Skriftlige forpliktelser. Hvis vi bommer på en, si fra — det fortjener i seg selv et svar.",
    "time.orders.lbl":"Bestillinger",
    "time.orders.val":"24 timer",
    "time.orders.note":"Virkedager, 09–17 CET",
    "time.general.lbl":"Generelle spørsmål",
    "time.general.val":"48 timer",
    "time.general.note":"Virkedager",
    "time.legal.lbl":"Juridiske saker",
    "time.legal.val":"72 timer",
    "time.legal.note":"Bekreftet innen 72t; utfyllende svar kan ta lengre tid",
    "notice.holiday.lbl":"Merk",
    "notice.holiday.body":"I norske helligdager og sommerukene 28–30 kan svartidene doble seg. Hastesaker markeres i emnefeltet: <code>[HAST]</code>.",

    "s3.title":"Virksomhetsinformasjon",
    "s3.intro":"Påkrevd av norsk angrerettloven § 8 og forbrukerkjøpsloven for e-handelsaktører. Hvis noen av disse detaljene mangler eller er feil på tidspunktet for kjøpet ditt, si fra.",
    "biz.name":"Registrert firmanavn",
    "biz.name.suffix":"(enkeltpersonforetak, [FOTOGRAFENS NAVN])",
    "biz.orgnr":"Organisasjonsnummer",
    "biz.mva":"MVA-registrering",
    "biz.mva.val":"<span class=\"mono\">[000 000 000] MVA</span> — registrert fra [DATO]. Før denne datoen var virksomheten ikke MVA-pliktig.",
    "biz.address":"Registrert adresse",
    "biz.address.val":"[GATEADRESSE]<br>[POSTNUMMER] [POSTSTED]<br>Norge",
    "biz.email":"Primær e-post",
    "biz.phone":"Telefon",
    "biz.phone.note":"— skriftlig korrespondanse foretrekkes",
    "biz.website":"Nettsted",
    "biz.bank":"Bankopplysninger",
    "biz.bank.val":"Gis på fakturaer. For internasjonale overføringer inkluderes IBAN og BIC.",

    "s4.title":"Klager og angrerett",
    "s4.intro":"<b>Forbrukerklager</b> — Er du forbruker (ikke en virksomhet) og vil klage på et kjøp, skriv til <a class=\"link\" href=\"mailto:legal@betaart.no\">legal@betaart.no</a>. Kan vi ikke løse det, har du rett til å eskalere til Forbrukertilsynet eller Forbrukerklageutvalget.",
    "s4.withdrawal":"<b>Angrerett</b> — 14 dager fra mottak for forbrukerkjøp i EU/EØS. For digital levering bortfaller retten når du uttrykkelig har samtykket til umiddelbar nedlasting ved kassa. Detaljer i <a class=\"link\" href=\"/license-terms.html#withdrawal\">§ 07 i lisensvilkårene</a>.",
    "s4.form":"For å benytte angreretten (der den fortsatt gjelder), bruk standard angreskjema fra Forbrukertilsynet, tilgjengelig på <a class=\"link\" href=\"https://www.forbrukertilsynet.no\" target=\"_blank\" rel=\"noopener\">forbrukertilsynet.no</a>, og send det til <a class=\"link\" href=\"mailto:legal@betaart.no\">legal@betaart.no</a>.",

    "s5.title":"Fysisk post",
    "s5.intro":"Formell juridisk korrespondanse (stevninger, forkynnelser, offisielle varsler fra Datatilsynet, skattemyndigheter eller domstoler) sendes til den registrerte adressen i § 03. For ikke-hastende fysisk post (bøker, kontrakter til signering, trykkportfolioer) send e-post først — noen kan være bortreist.",

    "footer.home":"Hjem","footer.faq":"Spørsmål og svar","footer.terms":"Lisensvilkår","footer.privacy":"Personvern",
    "footer.legal1":"© 2026 Beta Art · Alle plater laget av mennesker · Ingen generativ KI"
  }
};

function t(key){ return (T[currentLang] && T[currentLang][key]) ?? (T[DEFAULT_LANG] && T[DEFAULT_LANG][key]) ?? key; }
function applyLang(){
  document.documentElement.lang = currentLang;
  document.title = currentLang === "no" ? "Kontakt — BETA ART" : "Contact — BETA ART";
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = t(el.getAttribute("data-i18n")));
  document.querySelectorAll("[data-i18n-html]").forEach(el => el.innerHTML = t(el.getAttribute("data-i18n-html")));
  document.querySelectorAll(".lang button[data-lang]").forEach(b => b.classList.toggle("on", b.dataset.lang === currentLang));
}
function switchLang(lang){ if(!T[lang]) return; currentLang = lang; try{ localStorage.setItem(LANG_KEY, lang); }catch(e){} applyLang(); }
document.querySelectorAll(".lang button[data-lang]").forEach(b => b.addEventListener("click", () => switchLang(b.dataset.lang)));
try{ const s = localStorage.getItem(LANG_KEY); if(s && T[s]) currentLang = s; }catch(e){}
applyLang();
