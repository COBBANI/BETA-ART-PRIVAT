/* Shared language system — same LANG_KEY as the rest of the site
   so choice persists across pages. */
const LANG_KEY = "betaart:lang:v1";
const DEFAULT_LANG = "en";
let currentLang = DEFAULT_LANG;

const T = {
  en: {
    "nav.collection":"Collection",
    "nav.verification":"Verification",
    "nav.photographer":"Photographer",

    "eyebrow":"Legal document",
    "title":"License Terms",
    "meta.effective":"Effective",
    "meta.applies":"Applies to",
    "meta.version":"Version",

    "intro":"These terms govern any license granted by BETA ART for the use of a photograph. By ordering a plate, you accept these terms in full. If anything is unclear, ask at <a class=\"link\" href=\"mailto:hello@betaart.no\">hello@betaart.no</a> before ordering.",

    "s1.title":"Copyright ownership",
    "s1.p1":"Every photograph in the BETA ART archive was created by <b>[PHOTOGRAPHER NAME]</b> and remains their sole property. Copyright is protected under the Norwegian Copyright Act (åndsverkloven) and international copyright conventions.",
    "s1.p2":"Purchasing a license grants you the right to USE the photograph within the scope of the license you select. It does not transfer copyright. You do not own the photograph. You may not resell, redistribute, or sublicense it beyond what your license grant explicitly permits.",
    "s1.p3":"Moral rights — attribution and integrity (åndsverkloven § 5) — remain with the photographer at all times and cannot be waived.",

    "s2.title":"What you are licensing",
    "s2.p1":"Subject to full payment and the terms of your chosen license tier, BETA ART grants you a non-exclusive, non-transferable, worldwide right to use the photograph in the ways permitted by that tier, in perpetuity from the date of delivery.",
    "s2.deliveryHead":"Every order includes",
    "s2.deliveryList":"<li>A full-resolution digital file (JPEG at maximum quality; TIFF on request)</li><li>A written license naming the purchaser and licensed use</li><li>A proper invoice</li><li>A numbered certificate of authenticity</li><li>Full accession record — camera, lens, exposure, location, date</li><li>The RAW original archived and available for inspection on request</li>",
    "s2.guaranteeHead":"Every photograph is guaranteed to be",
    "s2.guaranteeList":"<li>Made by a human photographer with a physical camera</li><li><b>Not generated, composited, or hallucinated by artificial intelligence</b></li><li>Taken in a real place on a real date, recorded in the accession label</li>",

    "s3.title":"The three license tiers",
    "s3.intro":"Every plate is offered under one of three tiers. All tiers grant a perpetual, worldwide, non-exclusive right to use the photograph within the scope defined below.",
    "s3.permitted":"Permitted",
    "s3.notPermitted":"Not permitted",
    "s3.a.label":"A · Personal",
    "s3.a.name":"Personal License",
    "s3.a.price":"kr 190",
    "s3.a.grant":"Personal, non-commercial use by one individual for one project.",
    "s3.a.permit":"<li>Personal social media (private accounts)</li><li>Personal blog, portfolio, or website — not monetised</li><li>Home printing</li><li>Screensaver or wallpaper</li>",
    "s3.a.deny":"<li>Any use by or for a business or organisation</li><li>Any use where money changes hands</li>",
    "s3.b.label":"B · Commercial",
    "s3.b.name":"Commercial License",
    "s3.b.price":"kr 890",
    "s3.b.grant":"One entity. Marketing, editorial and communications use.",
    "s3.b.permit":"<li>Company website, social media, blog</li><li>Marketing materials (brochures, ads, presentations)</li><li>Print runs up to 5,000 copies</li><li>Editorial use (magazines, newspapers, newsletters)</li><li>Internal communications</li>",
    "s3.b.deny":"<li>Resale as a product (e.g. printed merchandise for sale)</li><li>Inclusion in a template or resold digital product</li><li>Sublicensing to third parties</li>",
    "s3.c.label":"C · Extended",
    "s3.c.name":"Extended License",
    "s3.c.price":"kr 2,900",
    "s3.c.grant":"One entity, unlimited print, product resale, one client sublicense.",
    "s3.c.permit":"<li>Everything under Commercial, plus:</li><li>Unlimited print runs and campaign reach</li><li>Merchandise for sale (prints, books, apparel)</li><li>Product packaging</li><li>One sublicense to a named end-client</li>",
    "s3.c.deny":"<li>Sublicensing to multiple clients (needs custom license)</li><li>Inclusion in stock photography catalogues</li>",
    "s3.custom":"Need something else — a longer sublicense chain, a book cover print of 50,000, or an exclusive right in one industry for a period? Write to <a class=\"link\" href=\"mailto:hello@betaart.no\">hello@betaart.no</a> for a custom license quote.",

    "s4.title":"Prohibited under every license",
    "s4.intro":"Regardless of the tier you hold, the following uses are always prohibited unless separately negotiated in writing:",
    "s4.aiLabel":"Article 04.1 — AI training",
    "s4.aiBody":"<b>No BETA ART photograph may be used to train, fine-tune, benchmark, or evaluate any artificial intelligence, machine learning, or generative model.</b> The archive exists precisely because human-made photographs remain distinguishable from generated images. Feeding these plates into an AI training pipeline destroys that value proposition and is expressly forbidden, in all license tiers, without exception.",
    "s4.list":"<li><b>Resale, redistribution, or sublicensing</b> of the photograph itself as a licensable asset beyond what your tier explicitly permits</li><li><b>Trademark or logo registration</b> incorporating the photograph</li><li><b>Defamatory, obscene, misleading, or unlawful contexts</b> — including political smears, false attribution, or contexts implying the depicted subject endorses something they do not</li><li><b>Uses harmful to depicted persons</b> (models, identifiable individuals)</li><li><b>Removal or alteration of embedded metadata</b>, watermarks, or C2PA Content Credentials, except where technically required for delivery</li><li><b>Modification that materially alters the character of the photograph</b> without written approval — moral rights under åndsverkloven § 5 apply</li>",

    "s5.title":"Model releases and third-party content",
    "s5.p1":"Photographs of identifiable individuals are only offered under a Commercial or Extended license where a signed model release is on file. This is indicated in the accession record as <code>Release · Model release on file</code>.",
    "s5.p2":"Even with a release, licensees must not use portraits in a manner that could reasonably be considered defamatory to the depicted person, or in political or commercial contexts to which the depicted person would reasonably object.",
    "s5.p3":"Where a photograph contains identifiable third-party trademarks, artworks, or property, the licensee is responsible for ensuring their intended use is compatible with any rights the third party may hold.",

    "s6.title":"Delivery",
    "s6.intro":"Following payment and confirmation of order details:",
    "s6.list":"<li>A full-resolution digital file is delivered by secure download link within 24 hours (Monday–Friday, 09:00–17:00 CET)</li><li>Default format is JPEG at maximum quality; TIFF is available on request at no additional charge</li><li>The download link remains valid for 30 days</li><li>The written license, invoice, and certificate are attached to the delivery email</li>",
    "s6.outro":"You are responsible for backing up the delivered file. Re-issuance after the 30-day window may be subject to a small fee.",

    "s7.title":"Right of withdrawal (angrerett)",
    "s7.p1":"For consumer purchases within the EU/EEA, Norwegian law (angrerettloven) grants a 14-day right of withdrawal.",
    "s7.p2":"<b>However</b>: because the file is delivered digitally as a distinct copy, and because you expressly consent to immediate delivery and waiver of the withdrawal right at checkout (via the required consent checkbox), the angrerett does not apply once the download link has been sent.",
    "s7.p3":"If you did not tick the consent checkbox, you retain the 14-day right but the download will not be released until either (a) you tick the consent or (b) the 14-day period expires.",
    "s7.p4":"For B2B purchases (where you are ordering on behalf of a business), the right of withdrawal does not apply.",

    "s8.title":"Warranties and indemnity",
    "s8.intro":"BETA ART warrants that:",
    "s8.list":"<li>The photograph is an original work created by the photographer named in the accession record</li><li>The photograph was made with a physical camera in a real place — it was not generated, composited, or hallucinated by artificial intelligence</li><li>The RAW original file is archived and available for inspection</li><li>Where a model release is stated to be on file, it is on file</li><li>BETA ART has the right to grant the license offered</li>",
    "s8.indemnity":"BETA ART indemnifies the licensee against direct damages arising from a breach of these warranties, up to the total amount paid for the license. This is the licensee's exclusive remedy.",
    "s8.disclaim":"Otherwise, the photograph is licensed as-is. BETA ART is not liable for indirect, incidental, or consequential damages arising from the licensee's use.",

    "s9.title":"Enforcement",
    "s9.intro":"Unauthorized use — including use beyond the scope of your license tier, or any use prohibited under § 04 — is a breach of these terms and an infringement of copyright under Norwegian law.",
    "s9.rights":"In the event of unauthorized use, BETA ART is entitled to:",
    "s9.list":"<li>Damages of no less than three times the applicable license fee, in accordance with åndsverkloven § 81</li><li>Injunctive relief to stop the continued use</li><li>Recovery of legal and enforcement costs</li>",
    "s9.forensic":"BETA ART uses reverse image search, embedded metadata, and third-party monitoring services to detect unauthorized use.",

    "s10.title":"Governing law and jurisdiction",
    "s10.p1":"These terms are governed by Norwegian law. Any dispute arising from these terms is subject to the exclusive jurisdiction of Oslo tingrett (Oslo District Court), unless mandatory consumer protection law provides otherwise.",
    "s10.p2":"For international licensees, BETA ART may in its discretion agree to arbitration in place of litigation. Requests should be sent to <a class=\"link\" href=\"mailto:hello@betaart.no\">hello@betaart.no</a>.",

    "governing":"<b>Governing text</b> — In case of conflict between the Norwegian and English versions of these terms, the Norwegian version prevails.<br><b>Contact</b> — <a class=\"link\" href=\"mailto:hello@betaart.no\">hello@betaart.no</a>",

    "footer.home":"Home",
    "footer.privacy":"Privacy policy",
    "footer.faq":"FAQ",
    "footer.legal1":"© 2026 Beta Art · All plates human-made · No generative AI"
  },

  no: {
    "nav.collection":"Samling",
    "nav.verification":"Verifisering",
    "nav.photographer":"Fotograf",

    "eyebrow":"Juridisk dokument",
    "title":"Lisensvilkår",
    "meta.effective":"Ikrafttredelse",
    "meta.applies":"Gjelder for",
    "meta.version":"Versjon",

    "intro":"Disse vilkårene regulerer enhver lisens gitt av BETA ART for bruk av et fotografi. Ved å bestille en plate aksepterer du disse vilkårene i sin helhet. Er noe uklart, spør på <a class=\"link\" href=\"mailto:hello@betaart.no\">hello@betaart.no</a> før du bestiller.",

    "s1.title":"Opphavsrett",
    "s1.p1":"Hvert fotografi i BETA ART-arkivet er skapt av <b>[FOTOGRAFENS NAVN]</b> og forblir dennes eiendom. Opphavsretten er beskyttet av åndsverkloven og internasjonale opphavsrettskonvensjoner.",
    "s1.p2":"Kjøp av en lisens gir deg rett til Å BRUKE fotografiet innenfor omfanget av lisensen du velger. Opphavsretten overføres ikke. Du eier ikke fotografiet. Du kan ikke videreselge, redistribuere eller viderelisensiere det utover det lisensen uttrykkelig tillater.",
    "s1.p3":"Ideelle rettigheter — navngivelse og respekt (åndsverkloven § 5) — forblir hos fotografen til enhver tid og kan ikke fraskrives.",

    "s2.title":"Hva du lisensierer",
    "s2.p1":"Under forutsetning av full betaling og vilkårene for valgt lisensnivå, gir BETA ART deg en ikke-eksklusiv, ikke-overførbar, verdensomspennende rett til å bruke fotografiet på måtene som nivået tillater, evigvarende fra leveringsdato.",
    "s2.deliveryHead":"Hver bestilling inkluderer",
    "s2.deliveryList":"<li>En digital fil i full oppløsning (JPEG i maksimal kvalitet; TIFF på forespørsel)</li><li>En skriftlig lisens som navngir kjøper og lisensiert bruk</li><li>En ordinær faktura</li><li>Et nummerert ekthetssertifikat</li><li>Fullt tilvekstregister — kamera, objektiv, eksponering, sted, dato</li><li>RAW-originalen arkivert og tilgjengelig for inspeksjon på forespørsel</li>",
    "s2.guaranteeHead":"Hvert fotografi garanteres å være",
    "s2.guaranteeList":"<li>Laget av en menneskelig fotograf med et fysisk kamera</li><li><b>Ikke generert, satt sammen eller hallusinert av kunstig intelligens</b></li><li>Tatt på et virkelig sted en virkelig dag, registrert i tilvekstetiketten</li>",

    "s3.title":"De tre lisensnivåene",
    "s3.intro":"Hver plate tilbys under ett av tre nivåer. Alle nivåer gir en evigvarende, verdensomspennende, ikke-eksklusiv rett til å bruke fotografiet innenfor omfanget definert nedenfor.",
    "s3.permitted":"Tillatt",
    "s3.notPermitted":"Ikke tillatt",
    "s3.a.label":"A · Personlig",
    "s3.a.name":"Personlig lisens",
    "s3.a.price":"kr 190",
    "s3.a.grant":"Personlig, ikke-kommersiell bruk av én person for ett prosjekt.",
    "s3.a.permit":"<li>Personlig bruk på sosiale medier (private kontoer)</li><li>Personlig blogg, portefølje eller nettside — ikke monetarisert</li><li>Hjemmeutskrift</li><li>Skjermsparer eller bakgrunnsbilde</li>",
    "s3.a.deny":"<li>Enhver bruk av eller for en virksomhet eller organisasjon</li><li>Enhver bruk der penger skifter hender</li>",
    "s3.b.label":"B · Kommersiell",
    "s3.b.name":"Kommersiell lisens",
    "s3.b.price":"kr 890",
    "s3.b.grant":"Én virksomhet. Markedsføring, redaksjonell og kommunikasjonsbruk.",
    "s3.b.permit":"<li>Bedriftens nettside, sosiale medier, blogg</li><li>Markedsmateriell (brosjyrer, annonser, presentasjoner)</li><li>Opplag inntil 5 000 eksemplarer</li><li>Redaksjonell bruk (magasiner, aviser, nyhetsbrev)</li><li>Internkommunikasjon</li>",
    "s3.b.deny":"<li>Videresalg som produkt (f.eks. trykt merchandise til salgs)</li><li>Innlemmelse i en mal eller videresolgt digitalt produkt</li><li>Viderelisensiering til tredjeparter</li>",
    "s3.c.label":"C · Utvidet",
    "s3.c.name":"Utvidet lisens",
    "s3.c.price":"kr 2 900",
    "s3.c.grant":"Én virksomhet, ubegrenset opplag, videresalg av produkter, én kundeunderlisens.",
    "s3.c.permit":"<li>Alt under Kommersiell, pluss:</li><li>Ubegrenset opplag og kampanjerekkevidde</li><li>Merchandise for salg (trykk, bøker, klær)</li><li>Produktemballasje</li><li>Én underlisens til en navngitt sluttkunde</li>",
    "s3.c.deny":"<li>Viderelisensiering til flere kunder (krever skreddersydd lisens)</li><li>Innlemmelse i stock-fotokataloger</li>",
    "s3.custom":"Trenger du noe annet — en lengre underlisenskjede, et bokomslagsopplag på 50 000, eller en eksklusiv rett i én bransje i en periode? Skriv til <a class=\"link\" href=\"mailto:hello@betaart.no\">hello@betaart.no</a> for et skreddersydd lisenstilbud.",

    "s4.title":"Forbudt under enhver lisens",
    "s4.intro":"Uavhengig av hvilket nivå du har, er følgende bruk alltid forbudt med mindre det er separat avtalt skriftlig:",
    "s4.aiLabel":"Artikkel 04.1 — KI-trening",
    "s4.aiBody":"<b>Ingen BETA ART-fotografier kan brukes til å trene, finjustere, teste eller evaluere kunstig intelligens, maskinlæring eller generative modeller.</b> Arkivet eksisterer nettopp fordi menneskeskapte fotografier forblir distinkt fra genererte bilder. Å mate disse platene inn i en KI-treningspipeline ødelegger dette verdiforslaget og er uttrykkelig forbudt, i alle lisensnivåer, uten unntak.",
    "s4.list":"<li><b>Videresalg, redistribusjon eller viderelisensiering</b> av selve fotografiet som en lisensierbar ressurs utover det ditt nivå uttrykkelig tillater</li><li><b>Registrering av varemerke eller logo</b> som inkorporerer fotografiet</li><li><b>Ærekrenkende, obskøn, villedende eller ulovlig kontekst</b> — inkludert politiske sverting, falsk attribusjon, eller kontekster som antyder at det avbildede subjektet støtter noe det ikke gjør</li><li><b>Bruk som skader avbildede personer</b> (modeller, identifiserbare individer)</li><li><b>Fjerning eller endring av innebygde metadata</b>, vannmerker, eller C2PA Content Credentials, unntatt der teknisk påkrevd for levering</li><li><b>Endring som vesentlig endrer fotografiets karakter</b> uten skriftlig godkjenning — ideelle rettigheter etter åndsverkloven § 5 gjelder</li>",

    "s5.title":"Modellsamtykker og tredjepartsinnhold",
    "s5.p1":"Fotografier av identifiserbare individer tilbys kun under Kommersiell eller Utvidet lisens der signert modellsamtykke er arkivert. Dette angis i tilvekstregisteret som <code>Samtykke · Modellsamtykke i arkiv</code>.",
    "s5.p2":"Selv med samtykke må lisensinnehavere ikke bruke portretter på en måte som med rimelighet kan anses som ærekrenkende for den avbildede personen, eller i politiske eller kommersielle kontekster som personen med rimelighet ville motsette seg.",
    "s5.p3":"Der et fotografi inneholder identifiserbare tredjeparts varemerker, kunstverk eller eiendom, er lisensinnehaveren ansvarlig for å sikre at tiltenkt bruk er forenlig med eventuelle rettigheter tredjeparten måtte inneha.",

    "s6.title":"Levering",
    "s6.intro":"Etter betaling og bekreftelse av bestillingsdetaljer:",
    "s6.list":"<li>En digital fil i full oppløsning leveres via sikker nedlastingslenke innen 24 timer (mandag–fredag, 09:00–17:00 CET)</li><li>Standardformat er JPEG i maksimal kvalitet; TIFF er tilgjengelig på forespørsel uten ekstra kostnad</li><li>Nedlastingslenken er gyldig i 30 dager</li><li>Skriftlig lisens, faktura og sertifikat er vedlagt leverings-e-posten</li>",
    "s6.outro":"Du er ansvarlig for å sikkerhetskopiere den leverte filen. Ny levering etter 30-dagersvinduet kan være underlagt et lite gebyr.",

    "s7.title":"Angrerett",
    "s7.p1":"For forbrukerkjøp innen EU/EØS gir angrerettloven en 14-dagers angrerett.",
    "s7.p2":"<b>Imidlertid</b>: fordi filen leveres digitalt som en distinkt kopi, og fordi du uttrykkelig samtykker til umiddelbar levering og fraskrivelse av angreretten ved kassa (via den påkrevde samtykke-avmerkingsboksen), gjelder ikke angreretten når nedlastingslenken er sendt.",
    "s7.p3":"Hvis du ikke krysset av samtykkeboksen, beholder du 14-dagers angreretten, men nedlastingen frigis ikke før enten (a) du krysser av samtykket eller (b) 14-dagersperioden utløper.",
    "s7.p4":"For B2B-kjøp (der du bestiller på vegne av en virksomhet) gjelder ikke angreretten.",

    "s8.title":"Garantier og skadesløsholdelse",
    "s8.intro":"BETA ART garanterer at:",
    "s8.list":"<li>Fotografiet er et originalt verk skapt av fotografen navngitt i tilvekstregisteret</li><li>Fotografiet ble laget med et fysisk kamera på et virkelig sted — det ble ikke generert, satt sammen eller hallusinert av kunstig intelligens</li><li>RAW-originalfilen er arkivert og tilgjengelig for inspeksjon</li><li>Der det er oppgitt at modellsamtykke er arkivert, er det arkivert</li><li>BETA ART har rett til å gi den tilbudte lisensen</li>",
    "s8.indemnity":"BETA ART holder lisensinnehaveren skadesløs mot direkte skader som oppstår ved brudd på disse garantiene, opp til totalbeløpet betalt for lisensen. Dette er lisensinnehaverens eksklusive rettsmiddel.",
    "s8.disclaim":"Ellers lisensieres fotografiet som det er. BETA ART er ikke ansvarlig for indirekte, tilfeldige eller konsekvensielle skader som oppstår fra lisensinnehaverens bruk.",

    "s9.title":"Håndhevelse",
    "s9.intro":"Uautorisert bruk — inkludert bruk utover omfanget av ditt lisensnivå, eller enhver bruk forbudt under § 04 — er et brudd på disse vilkårene og en krenkelse av opphavsretten etter norsk lov.",
    "s9.rights":"Ved uautorisert bruk har BETA ART rett til:",
    "s9.list":"<li>Skadeserstatning på minst tre ganger gjeldende lisensgebyr, i henhold til åndsverkloven § 81</li><li>Midlertidig forføyning for å stanse fortsatt bruk</li><li>Dekning av juridiske kostnader og håndhevingskostnader</li>",
    "s9.forensic":"BETA ART bruker omvendt bildesøk, innebygde metadata og tredjeparts overvåkingstjenester for å avdekke uautorisert bruk.",

    "s10.title":"Lovvalg og jurisdiksjon",
    "s10.p1":"Disse vilkårene reguleres av norsk lov. Enhver tvist som oppstår fra disse vilkårene er underlagt Oslo tingretts eksklusive jurisdiksjon, med mindre ufravikelig forbrukervernlovgivning bestemmer annet.",
    "s10.p2":"For internasjonale lisensinnehavere kan BETA ART etter eget skjønn samtykke til voldgift i stedet for søksmål. Forespørsler sendes til <a class=\"link\" href=\"mailto:hello@betaart.no\">hello@betaart.no</a>.",

    "governing":"<b>Rådende versjon</b> — Ved konflikt mellom norsk og engelsk versjon av disse vilkårene gjelder den norske versjonen.<br><b>Kontakt</b> — <a class=\"link\" href=\"mailto:hello@betaart.no\">hello@betaart.no</a>",

    "footer.home":"Hjem",
    "footer.privacy":"Personvern",
    "footer.faq":"Spørsmål og svar",
    "footer.legal1":"© 2026 Beta Art · Alle plater laget av mennesker · Ingen generativ KI"
  }
};

function t(key){
  return (T[currentLang] && T[currentLang][key])
      ?? (T[DEFAULT_LANG] && T[DEFAULT_LANG][key])
      ?? key;
}

function applyLang(){
  document.documentElement.lang = currentLang;
  document.title = currentLang === "no"
    ? "Lisensvilkår — BETA ART"
    : "License Terms — BETA ART";
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.getAttribute("data-i18n"));
  });
  document.querySelectorAll("[data-i18n-html]").forEach(el => {
    el.innerHTML = t(el.getAttribute("data-i18n-html"));
  });
  document.querySelectorAll(".lang button[data-lang]").forEach(b => {
    b.classList.toggle("on", b.dataset.lang === currentLang);
  });
}

function switchLang(lang){
  if(!T[lang]) return;
  currentLang = lang;
  try{ localStorage.setItem(LANG_KEY, lang); }catch(e){}
  applyLang();
}

document.querySelectorAll(".lang button[data-lang]").forEach(b => {
  b.addEventListener("click", () => switchLang(b.dataset.lang));
});

try{
  const saved = localStorage.getItem(LANG_KEY);
  if(saved && T[saved]) currentLang = saved;
}catch(e){}
applyLang();
