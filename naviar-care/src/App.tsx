import { useState, useEffect, useRef } from 'react'
import './index.css'
import { HVERDAG_IMG } from './hverdag'

function scrollTo(id: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
}

// ─── Språk / i18n ────────────────────────────────────────────────────────────
// Tre språk: norsk (primær), engelsk, tyrkisk. Alt innhold ligger i COPY.
// Atferdssystemet bruker STABILE nøkler (norske etiketter) uansett språk,
// slik at "sist sett" og neste-steg fungerer på tvers av språkbytte.

type Lang = 'no' | 'en' | 'tr'
const LANG_KEY = 'nc_lang'

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(LANG_KEY)
    if (saved === 'no' || saved === 'en' || saved === 'tr') return saved
  } catch {}
  const nav = (navigator.language || '').toLowerCase()
  if (nav.startsWith('tr')) return 'tr'
  if (nav.startsWith('en')) return 'en'
  return 'no'
}

// Stabile kategori-nøkler (norsk etikett = nøkkel i atferdsdata og skjema)
const CAT_KEYS = [
  'Sosial følge', 'Tur og aktivitet', 'Handling og ærend', 'Enkelt husarbeid',
  'Transport og avtaler', 'Trening og aktivitetsfølge',
  'Hjelp med mobil og nettbrett', 'Hage og sesong', 'Pårørendekoordinering',
  'Annet — beskriv oppgaven',
] as const
const EXTRA_KEYS = { faglig: 'Faglig rådgivning', hjelper: 'Bli hjelper', vetikke: 'Vet ikke' }

type Cat = { code: string; key: string; label: string; desc: string }

const COPY = {
  no: {
    nav: { tjenester: 'Tjenester', how: 'Slik fungerer det', fritid: 'Fritidskontakt', priser: 'Priser', fag: 'For fagpersoner', cta: 'Kom i gang →', menu: 'Meny' },
    hero: {
      badge: 'Pilotprogram — aktiv nå',
      h1: ['Hjemme er', 'livet ditt.', 'Vi hjelper med hverdagen.'],
      lead: 'En handletur. En tur ut. Hjelp med mobilen. NAVIAR CARE er praktisk hjelp for deg som vil bo hjemme og bestemme selv — med kartlagt behov, kvalitetssikret hjelper og totalpris avklart før avtalen bekreftes.',
      cta: 'Book behovskartlegging', how: 'Slik arbeider vi',
      back: 'Velkommen tilbake —',
      gdpr: 'Vi lagrer aldri helseopplysninger uten ditt eksplisitte samtykke · GDPR-sikker',
      area: 'Pilotområde: Drammen og omegn — utvides trinnvis',
      stats: [
        { val: '89%', label: 'fikk svar\ninnen 60 min' },
        { val: '8', label: 'fagområder\npå plattformen' },
        { val: '4.8', label: 'snittkarakter\nfra brukerne' },
      ],
      statsNote: '* Eksempeltall fra pilotperioden',
      cardTitle: 'Alltid avklart før besøket',
      cardItems: ['Hva som skal gjøres', 'Hvem som kommer', 'Når — og hvor lenge', 'Totalpris, før du godkjenner', 'Hvem som får se hva'],
      cardNote: 'Betaling gir ikke automatisk innsyn.',
      cardInput: 'Fortell hva dere trenger...',
    },
    promise: {
      items: [
        { t: 'Du bestemmer', d: 'Hva du trenger, og hvem som får vite det.' },
        { t: 'Prisen først', d: 'Totalpris avklares før en avtale bekreftes.' },
        { t: 'Mennesker, nær deg', d: 'Ønsk en fast hjelper når dere finner tonen.' },
      ],
    },
    how: {
      kicker: 'Slik fungerer det', h2: 'Fra behov til oppfølging — i fem steg',
      steps: [
        { n: '1', title: 'Kartlegging', body: 'Vi kartlegger behov, ønsker og hverdagsrutiner — strukturert, uten søknad og uten helsejournal.' },
        { n: '2', title: 'Behovsavklaring', body: 'Sammen avklarer vi målet bak behovet: aktivitet, mestring og sosial deltakelse — ikke bare oppgaven.' },
        { n: '3', title: 'Hverdagsplan', body: 'Dere mottar en konkret plan: aktiviteter, støttetimer, transport og familiekoordinering.' },
        { n: '4', title: 'Kvalitetssikret match', body: 'En koordinator matcher hjelper på kompetanse, egnethet, interesser og tilgjengelighet — dere godkjenner før oppstart.' },
        { n: '5', title: 'Gjennomføring og oppfølging', body: 'Tjenesten gjennomføres til avtalt tid med full prisoversikt. Vi følger opp kvalitet, trygghet og videre behov.' },
      ],
    },
    cats: {
      kicker: 'Hjelp time for time', h2: 'All lavrisiko hjelp — time for time',
      lead: 'Lavterskel bistand i hverdagen, levert av kvalitetssikrede hjelpere. Omfanget avgrenses av risiko — oppgaver utenfor kategoriene vurderes individuelt av en koordinator. Gebyret fremgår før bekreftelse og belastes ved fullført tjeneste.',
      last: 'SIST SETT',
      items: [
        { code: 'SOS', label: 'Sosial følge', desc: 'Besøk, samtale og selskap i hverdagen.' },
        { code: 'TUR', label: 'Tur og aktivitet', desc: 'Gåturer og aktiviteter i nærmiljøet.' },
        { code: 'ÆRE', label: 'Handling og ærend', desc: 'Dagligvarer, apotek, post og småærend.' },
        { code: 'HUS', label: 'Enkelt husarbeid', desc: 'Lette oppgaver hjemme — bæring, rydding, småfiks.' },
        { code: 'TRA', label: 'Transport og avtaler', desc: 'Følge til lege, frisør eller andre avtaler.' },
        { code: 'TRE', label: 'Trening og aktivitetsfølge', desc: 'Følge til svømming, trim og organisert aktivitet.' },
        { code: 'DIG', label: 'Hjelp med mobil og nettbrett', desc: 'Videosamtaler, bilder og enkle innstillinger.' },
        { code: 'HAG', label: 'Hage og sesong', desc: 'Vanning, feiing og lett arbeid ute.' },
        { code: 'KOO', label: 'Pårørendekoordinering', desc: 'Én plan for familien: hvem gjør hva, når.' },
        { code: 'ANN', label: 'Annet — beskriv oppgaven', desc: 'Alle andre lavrisiko-oppgaver i hverdagen. Grensen er risiko, ikke listen.' },
      ],
      outside: 'Utenfor tjenesten: medisinsk pleie, pengehåndtering, juridisk rådgivning og alt som krever autorisasjon — det hører til fagteamet eller det offentlige.',
    },
    trygg: {
      kicker: 'Trygghet', h2: 'Du skal vite hvem som kommer.',
      lead: 'Identitet, pålitelighet og kompetanse kontrolleres hver for seg — ingen stjerner eller poengsum kan erstatte dette.',
      cards: [
        { t: 'Identitet', d: 'Hjelperen identifiseres før oppdrag, og politiattest fremvises — vi lagrer den aldri.' },
        { t: 'Pålitelighet', d: 'Referanser og tidligere oppdrag gir informasjon — men mange oppdrag uten avvik er ingen garanti. Vi følger opp hver gang.' },
        { t: 'Kompetanse for oppgaven', d: 'Egnethet vurderes per oppgavetype. Medisinsk arbeid inngår ikke i tjenesten.' },
      ],
      money: 'Del aldri BankID, PIN-kode eller bankkort med en hjelper. Ekstra arbeid og pris avtales alltid før arbeidet starter.',
      emergency: 'Ved fare for liv ring 113 · brann 110 · akutt fare 112. NAVIAR CARE er ikke en nødtjeneste.',
      pipeline: 'Hjelperløpet: søknad → kontaktkontroll → ID → referanser → opplæring → oppgavevurdering. En søknad gjør ingen klar for oppdrag.',
    },
    photo: {
      alt: 'En eldre kvinne og en hjelper snakker sammen ved kjøkkenbordet. KI-generert illustrasjonsbilde.',
      caption: 'Plass til det som gjør dagen god.',
      tag: 'KI-generert illustrasjonsbilde',
    },
    pilot: {
      kicker: 'Pilotstatus', h2: 'Hva er aktivt i piloten — og hva kommer',
      lead: 'Vi lover bare det som virker i dag. Dette er status akkurat nå:',
      active: 'Aktivt nå', coming: 'Kommer senere',
      activeItems: [
        'Behovskartlegging via skjema — et menneske svarer innen 24 timer',
        'Manuell, kvalitetssikret matching — hver match godkjennes av en koordinator',
        'Oppfølging etter gjennomført tjeneste',
      ],
      comingItems: [
        'Betaling på nett — aktiveres etter juridisk avklaring av arbeidsforhold og skatt',
        'Automatisk booking med kalender',
        'Innlogging og egen side',
      ],
    },
    testi: {
      kicker: 'Fra pilotbrukerne', h2: 'Hva sier de som har prøvd',
      note: '* Sitater fra pilotbrukere. Navn og detaljer er anonymisert etter samtykke.',
      items: [
        { quote: 'Jeg hadde prøvd å nå fastlegen i tre dager. Her fikk jeg svar fra en sykepleier innen 40 minutter. Det var det jeg trengte.', name: 'Marianne L.', role: 'Datter til omsorgstrengende forelder, Oslo' },
        { quote: 'Trygdereglene er et mareritt å navigere alene. Sosionomen forklarte alt på én time — og vi fikk godkjent pleiepenger samme uke.', name: 'Bjørn E.', role: 'Pårørende, Bergen' },
        { quote: 'Visste ikke at fullmakt og testamente var to vidt forskjellige ting. Juristen ryddet opp i all forvirringen på en halvtime.', name: 'Kari og Tor S.', role: 'Ektepar med foreldre i institusjon, Trondheim' },
      ],
    },
    experts: {
      kicker: 'Faglig støttelag', h2: '8 fagområder bak tjenesten',
      lead: 'Når behovet krever autorisert kompetanse, står fagteamet klart — samme plattform, samme plan.',
      items: [
        { code: 'SYK', label: 'Sykepleier', desc: 'Klinisk vurdering, medisinering og omsorg i hjemmet.' },
        { code: 'SOS', label: 'Sosionom', desc: 'Rettigheter, trygdeytelser og kommunale tjenester.' },
        { code: 'ERG', label: 'Ergoterapeut', desc: 'Tilpasning av bolig og daglige aktiviteter.' },
        { code: 'PSY', label: 'Psykolog', desc: 'Sorg, stress og psykisk helse for pårørende.' },
        { code: 'JUR', label: 'Jurist', desc: 'Fullmakt, testamente og pasientrettigheter.' },
        { code: 'ØKO', label: 'Økonom', desc: 'Pleiepengeberegning, arv og økonomi.' },
        { code: 'TEK', label: 'Velferdsteknolog', desc: 'Digitale hjelpemidler, GPS og trygghetsteknologi.' },
        { code: 'ERN', label: 'Ernæringsfysiolog', desc: 'Kosthold, matlyst og ernæringsplan.' },
      ],
    },
    fritid: {
      kicker: 'Aktivitet og fellesskap', h2: 'Fritidskontakt for eldre',
      lead: 'Tilrettelagt fritid er en etablert kommunal tjenesteform. NAVIAR CARE leverer tilsvarende aktivitets- og deltakelsesstøtte: strukturert matching, kvalitetssikring og systematisk oppfølging — individuelt eller i gruppe.',
      cta1: 'Få en fritidskontakt', cta2: 'Bli fritidskontakt',
      points: [
        'Match basert på interesser, egnethet og kommunikasjonsstil — godkjent av koordinator',
        'Gjennomsnittlig 3–5 timer per uke, etter avtalt aktivitetsplan',
        'Individuelt eller i gruppe: kultur, aktivitet, trening og sosial deltakelse',
        'Politiattest fremvises før oppdrag — attesten lagres ikke',
      ],
    },
    pricing: {
      kicker: 'Priser', h2: 'Enkel, forutsigbar prising',
      lead: 'Start gratis i pilotperioden. Ingen kredittkort nødvendig.',
      badge: 'Pårørendepiloten',
      note: '* Priser er eksempeltall fra pilotperioden og kan endres. Hjelperens timepris og plattformgebyret vises alltid hver for seg før du betaler. NAVIAR CARE Match — verifisert matching på sted, tid og interesser — inngår i både Start og Assist. Alle priser inkl. mva.',
      plans: [
        { name: 'NAVIAR CARE Start', price: 'Fast pris', unit: '', desc: 'Pilotpakken: kartlegging og en personlig plan for hverdagen.', items: ['Strukturert behovskartlegging', 'Behovssammendrag + personlig hverdagsplan', 'Henvisning til riktig støtte', 'Systematisk oppfølging etter 14 dager'], cta: 'Book behovskartlegging', highlight: true },
        { name: 'NAVIAR CARE Assist', price: '250', unit: 'per time', desc: 'Alle typer lavrisiko-oppgaver — betal kun for timene du bruker.', items: ['Alle lavrisiko-oppgaver, også utenfor kategoriene', 'Gebyr 15–25 % — vises før, trekkes ved fullført hjelp', 'Kontrollert hjelper, godkjent av deg', 'Ingen binding'], cta: 'Be om hjelper', highlight: false },
        { name: 'NAVIAR CARE Partner', price: 'Avtale', unit: '', desc: 'For kommuner, BPA-leverandører og omsorgsvirksomheter.', items: ['Behovsanalyse og tjenestedesign', 'Pilotledelse og koordinering', 'Kvalitets- og brukerrapport', 'Plattformlisens, SLA og faktura'], cta: 'Ta kontakt', highlight: false },
      ],
      currency: 'kr',
    },
    forSec: {
      k1: 'For pårørende', h1: ['Du skal ikke stå alene', 'med dette'],
      l1: ['Svar fra riktig fagperson — ikke en generell liste', 'Tilgjengelig hverdager 08–20, responstid under én time', 'Ingen viderehenvisning. Ekspert svarer direkte.', 'Trygt og konfidensielt — GDPR-sertifisert'],
      c1: 'Meld inn behov',
      principle: 'Du kan foreslå hjelp og betale — men den som får hjelpen, godkjenner besøket og velger hva familien får se. Betaling gir ikke automatisk innsyn.',
      k2: 'For fagpersoner', h2: ['Bruk kompetansen din', 'der den trengs mest'],
      l2: ['Fleksibelt arbeid på egne vilkår og tider', 'Direkte kontakt med pårørende som virkelig trenger deg', 'Ryddig plattform — bare fagsamtaler, ingen admin', 'Konkurransedyktig honorar og ukentlig utbetaling'],
      c2: 'Søk som fagperson',
    },
    faq: {
      kicker: 'Spørsmål og svar', h2: 'Det du lurer på',
      items: [
        { q: 'Kan jeg få samme hjelper hver gang?', a: 'Ja — du kan ønske en fast hjelper når dere finner tonen. Personen må være ledig og kvalifisert for oppgaven, og vi sier alltid fra før vi foreslår en annen.' },
        { q: 'Hvem er ekspertene og hvordan godkjenner dere dem?', a: 'Alle rådgivere har godkjent norsk autorisasjon innen sitt fagfelt. Vi verifiserer legitimasjon, arbeidserfaring (minimum 5 år klinisk) og referanser før de tas opp på plattformen. Under piloten gjennomfører vi i tillegg en testsamtale.' },
        { q: 'Hvor raskt svarer ekspertene?', a: 'Målet er under én time på hverdager 08–20. I pilotperioden er gjennomsnittlig responstid 34 minutter (eksempeltall). Kveld og helg har lengre ventetid — vi viser alltid forventet tilgjengelighet før du sender spørsmål.' },
        { q: 'Hva skjer med informasjonen jeg deler?', a: 'Vi lagrer aldri helseopplysninger knyttet til identifiserbar tredjeperson uten eksplisitt samtykke. Samtaler er kryptert og slettes på forespørsel. Naviar AS behandler data i henhold til GDPR og norsk personopplysningslov. Les hele personvernerklæringen vår.' },
        { q: 'Er dette det samme som å konsultere lege eller advokat?', a: 'Nei — Naviar gir faglig veiledning, ikke juridisk rådgivning eller medisinsk behandling. Ekspertene hjelper deg å forstå situasjonen, kjenne rettighetene dine og ta informerte valg. Ved akutte helseproblemer ring alltid 113.' },
        { q: 'Hva er en fritidskontakt, og hvordan kvalitetssikres de?', a: 'En fritidskontakt følger den eldre til kultur- og fritidsaktiviteter — individuelt eller i gruppe, i snitt 3–5 timer per uke. Fritidskontakter er 18 år eller eldre, viser politiattest før oppdrag (vi lagrer den aldri, kun at den er fremvist), og matches på felles interesser og personlighet. Hver match godkjennes av et menneske, aldri av en algoritme alene.' },
        { q: 'Kan jeg avbryte abonnementet når som helst?', a: 'Ja, uten begrunnelse og uten ekstra kostnad. Abonnementet løper til slutten av inneværende periode og fornyes ikke. Du kan avbryte direkte i kontopanelet eller ved å sende oss en e-post.' },
      ],
    },
    finalCta: {
      h2: ['Ikke la usikkerheten', 'vente til i morgen'],
      lead: 'Meld inn behovet i dag — vi kartlegger, matcher og følger opp, når det passer dere.',
      placeholder: 'din@epost.no', btn: 'Meld meg på →',
      noBind: 'Ingen binding · Avbryt når som helst',
      thanks: 'Takk — du er registrert!', thanksSub: 'Vi sender deg en e-post så snart du kan ta i bruk Naviar Care.',
      or: 'Eller start med et spørsmål med én gang →',
    },
    footer: {
      tagline: 'Praktisk hjelp. På dine premisser. Fagfolk, tjenester og familie samlet på ett sted.',
      area: 'Pilotområde: Drammen og omegn',
      col1: 'Tjenesten', col1Links: ['Slik fungerer det', 'Fagområder', 'Priser', 'For fagpersoner'],
      col2: 'Selskapet', col2Links: ['Om oss', 'Personvern', 'Vilkår for bruk', 'Kontakt'],
      copyright: '© 2026 NAVIAR CARE · Drammen, Norge',
      wipe: 'Slett lagrede data', gdpr: 'GDPR-konform · Databehandling i EU',
    },
    cookie: {
      text: 'Vi lagrer valgene dine kun i din nettleser. Sier du ja til alle, husker siden også hva du så på sist — så neste besøk starter der du slapp. Ingenting sendes ut av nettleseren, og du kan slette alt når som helst.',
      all: 'Godta alle', necessary: 'Kun nødvendige', label: 'Informasjonskapsler',
    },
    modal: {
      kicker: 'Behovskartlegging', title: 'Meld inn behov',
      lead: 'Vi kartlegger behovet og matcher riktig hjelper innen én virkedag.',
      name: 'Navn *', namePh: 'Ditt navn', email: 'E-post *', emailPh: 'din@epost.no',
      phone: 'Telefon (valgfritt)', phonePh: '+47 000 00 000',
      topic: 'Tjeneste', topicPh: 'Velg tjeneste...',
      extraFaglig: 'Faglig rådgivning (helse, jus, økonomi)', extraHjelper: 'Jeg vil bli hjelper', extraVetikke: 'Vet ikke ennå',
      situation: 'Beskriv behovet *',
      situationPh: 'Beskriv behovet — ikke diagnosen. F.eks.: «Mor trenger hjelp til å søke hjemmetjenester i Bergen.»',
      hint: 'Ikke skriv diagnoser, medisinlister eller andre helseopplysninger her — eksperten spør om det som trengs, når det trengs.',
      privacy: 'Vi ber ikke om diagnoser og samler ikke inn mer enn det som trengs for å koble deg til riktig ekspert. Henvendelsen behandles konfidensielt i henhold til GDPR, og du kan be om sletting når som helst.',
      submit: 'Send henvendelse →', noBind: 'Uforpliktende henvendelse — ingen binding.',
      close: 'Lukk', thanks: 'Takk,', done1: 'Henvendelsen er registrert. Vi kontakter deg på', done2: 'innen 24 timer for behovsavklaring og videre prosess.',
      pilotNote: 'Dette er et pilotprogram. Responsene kan variere fra produksjonstid.',
      mailSubject: 'Forespørsel fra',
    },
    next: {
      finishTopic: (t: string) => `Fullføre forespørselen om ${t.toLowerCase()}?`,
      finish: 'Fullføre forespørselen din? Det tar under ett minutt',
      start: 'Klar til å starte? Første time uten binding',
      cont: (t: string) => `Fortsette med ${t.toLowerCase()}?`,
      how: 'Se hvordan det fungerer — tre enkle steg',
    },
    navi: {
      open: 'Spør Navi', close: 'Lukk', name: 'Navi',
      sub: 'Automatisk assistent — ikke et menneske',
      ariaOpen: 'Åpne chat med Navi, automatisk assistent', ariaClose: 'Lukk chat',
      region: 'Chat med Navi, automatisk assistent',
      inputLabel: 'Skriv til Navi', inputPh: 'Skriv et spørsmål...', send: 'Send',
      intro: 'Hei! Jeg er Navi — en automatisk assistent, ikke et menneske. Jeg svarer på det vanligste og setter deg videre til teamet. Ikke skriv helseopplysninger her. Hva lurer du på?',
      fallback: 'Det kan jeg ikke svare godt på ennå. Vil du sende spørsmålet til teamet? Et menneske svarer innen 24 timer — trykk «Snakk med et menneske».',
      quick: ['Hva koster det?', 'Hvordan fungerer det?', 'Bli hjelper', 'Snakk med et menneske'],
      humanBtn: 'Snakk med et menneske',
      answers: [
        { keys: /pris|koste|kr|betal|gebyr/i, text: 'NAVIAR CARE Start er pilotpakken til fast pris: behovssamtale, personlig plan og oppfølging etter 14 dager. NAVIAR CARE Assist koster fra 250 kr per time (eksempelpris), pluss plattformgebyr på 15–25 % som alltid vises før du betaler. Vil du booke en behovskartlegging?' },
        { keys: /fungerer|hvordan|steg|virker|metode/i, text: 'Vi arbeider i fem steg: kartlegging av behovet, behovsavklaring, en konkret hverdagsplan, kvalitetssikret match (alltid godkjent av et menneske) og oppfølging etter gjennomført tjeneste. Skal jeg åpne behovskartleggingen?' },
        { keys: /hjelper|jobb|søk|arbeid|bli/i, text: 'Så fint at du vil bli hjelper! Du må være 18+, vise politiattest (vi lagrer den aldri) og sette dine egne tilgjengelighetstider. Jeg kan åpne søknadsskjemaet for deg.', topic: EXTRA_KEYS.hjelper },
        { keys: /fritid|tur|aktivitet|følge|svøm/i, text: 'Fritidskontakt følger dine nærmeste til aktiviteter — i snitt 3–5 timer i uken, individuelt eller i gruppe, matchet på interesser. Vil du sende en forespørsel?', topic: 'Tur og aktivitet' },
        { keys: /handl|ærend|butikk|apotek|post/i, text: 'Vi hjelper med dagligvarer, apotek, post og småærend — betalt per time. Skal jeg åpne forespørselen med riktig tjeneste valgt?', topic: 'Handling og ærend' },
        { keys: /annet|andre ting|noe annet|spesiell/i, text: 'Vi hjelper med alt som er lavrisiko — grensen er risiko, ikke en liste. Beskriv oppgaven, så vurderer en koordinator den. Utenfor: medisinsk pleie, pengehåndtering, juridiske råd og alt som krever autorisasjon.', topic: 'Annet — beskriv oppgaven' },
        { keys: /trygg|sikker|attest|personvern|gdpr|data/i, text: 'Alle hjelpere viser politiattest før oppdrag (vi lagrer den aldri), matching godkjennes av et menneske, og vi ber aldri om diagnoser eller helseopplysninger. Alt du skriver her blir i nettleseren din.' },
        { keys: /menneske|person|ringe|kontakt|snakke/i, text: 'Selvsagt — send inn skjemaet, så tar et ekte menneske kontakt innen 24 timer. Jeg åpner det for deg.' },
      ],
    },
  },

  en: {
    nav: { tjenester: 'Services', how: 'How it works', fritid: 'Activity companion', priser: 'Pricing', fag: 'For professionals', cta: 'Get started →', menu: 'Menu' },
    hero: {
      badge: 'Pilot programme — active now',
      h1: ['Your home.', 'Your life.', 'A little help along the way.'],
      lead: 'Groceries. A walk outside. Help with the phone. NAVIAR CARE is practical help for people who want to live at home and make their own choices — with the need mapped, a quality-assured helper and the total price agreed before anything is confirmed.',
      cta: 'Book a needs assessment', how: 'How we work',
      back: 'Welcome back —',
      gdpr: 'We never store health data without your explicit consent · GDPR-safe',
      area: 'Pilot area: Drammen and surroundings — expanding step by step',
      stats: [
        { val: '89%', label: 'got an answer\nwithin 60 min' },
        { val: '8', label: 'professional fields\non the platform' },
        { val: '4.8', label: 'average rating\nfrom users' },
      ],
      statsNote: '* Example figures from the pilot period',
      cardTitle: 'Always agreed before the visit',
      cardItems: ['What will be done', 'Who is coming', 'When — and for how long', 'The total price, before you approve', 'Who gets to see what'],
      cardNote: 'Paying does not automatically give access.',
      cardInput: 'Tell us what you need...',
    },
    promise: {
      items: [
        { t: 'Your choice', d: 'What you need, and who gets to know.' },
        { t: 'Price first', d: 'The total price is agreed before an appointment is confirmed.' },
        { t: 'People, nearby', d: 'Request a familiar helper when you find a good fit.' },
      ],
    },
    how: {
      kicker: 'How it works', h2: 'From need to follow-up — in five steps',
      steps: [
        { n: '1', title: 'Mapping', body: 'We map needs, wishes and daily routines — structured, with no application and no medical record.' },
        { n: '2', title: 'Clarifying the need', body: 'Together we clarify the goal behind the need: activity, coping and social participation — not just the task.' },
        { n: '3', title: 'Everyday plan', body: 'You receive a concrete plan: activities, support hours, transport and family coordination.' },
        { n: '4', title: 'Quality-assured match', body: 'A coordinator matches a helper on competence, suitability, interests and availability — you approve before the start.' },
        { n: '5', title: 'Delivery and follow-up', body: 'The service is delivered at the agreed time with the full price shown. We follow up on quality, safety and further needs.' },
      ],
    },
    cats: {
      kicker: 'Help hour by hour', h2: 'All low-risk help — hour by hour',
      lead: 'Everyday assistance delivered by quality-assured helpers. The scope is defined by risk — tasks outside the categories are assessed individually by a coordinator. The fee is shown before you confirm and charged when the service is completed.',
      last: 'LAST VIEWED',
      items: [
        { code: 'SOS', label: 'Social visits', desc: 'Visits, conversation and company in everyday life.' },
        { code: 'TUR', label: 'Walks and activities', desc: 'Walks and activities in the neighbourhood.' },
        { code: 'ÆRE', label: 'Shopping and errands', desc: 'Groceries, pharmacy, post and small errands.' },
        { code: 'HUS', label: 'Light housework', desc: 'Light tasks at home — carrying, tidying, small fixes.' },
        { code: 'TRA', label: 'Transport and appointments', desc: 'Accompaniment to the doctor, hairdresser or other appointments.' },
        { code: 'TRE', label: 'Exercise companion', desc: 'Accompaniment to swimming, exercise and organised activities.' },
        { code: 'DIG', label: 'Phone and tablet help', desc: 'Video calls, photos and simple settings.' },
        { code: 'HAG', label: 'Garden and seasonal tasks', desc: 'Watering, sweeping and light outdoor work.' },
        { code: 'KOO', label: 'Family coordination', desc: 'One plan for the family: who does what, and when.' },
        { code: 'ANN', label: 'Other — describe the task', desc: 'Any other low-risk everyday task. The limit is risk, not the list.' },
      ],
      outside: 'Outside the service: medical care, handling money, legal advice and anything that requires authorisation — that belongs to the professional team or public services.',
    },
    trygg: {
      kicker: 'Safety', h2: 'Know who is coming.',
      lead: 'Identity, reliability and competence are checked separately — no star rating or score can replace this.',
      cards: [
        { t: 'Identity', d: 'The helper is identified before assignments, and a police certificate is shown — we never store it.' },
        { t: 'Reliability', d: 'References and previous assignments provide information — but many assignments without incidents are no guarantee. We follow up every time.' },
        { t: 'Competence for the task', d: 'Suitability is assessed per task type. Medical work is not part of the service.' },
      ],
      money: 'Never share BankID, PIN codes or bank cards with a helper. Extra work and its price are always agreed before the work starts.',
      emergency: 'For danger to life call 113 · fire 110 · immediate danger 112. NAVIAR CARE is not an emergency service.',
      pipeline: 'The helper path: application → contact check → identity → references → training → task assessment. Applying does not make anyone ready for assignments.',
    },
    photo: {
      alt: 'An older woman and a helper chat at the kitchen table. AI-generated illustrative image.',
      caption: 'Make room for a good day.',
      tag: 'AI-generated illustrative image',
    },
    pilot: {
      kicker: 'Pilot status', h2: 'What is active in the pilot — and what is coming',
      lead: 'We only promise what works today. This is the status right now:',
      active: 'Active now', coming: 'Coming later',
      activeItems: [
        'Needs assessment via the form — a human replies within 24 hours',
        'Manual, quality-assured matching — every match is approved by a coordinator',
        'Follow-up after each completed service',
      ],
      comingItems: [
        'Online payment — activated after legal clarification of employment and tax',
        'Automatic booking with a calendar',
        'Login and personal page',
      ],
    },
    testi: {
      kicker: 'From pilot users', h2: 'What people who tried it say',
      note: '* Quotes from pilot users. Names and details anonymised with consent.',
      items: [
        { quote: 'I had tried to reach the GP for three days. Here I got an answer from a nurse within 40 minutes. That was what I needed.', name: 'Marianne L.', role: 'Daughter of a parent needing care, Oslo' },
        { quote: 'The benefit rules are a nightmare to navigate alone. The social worker explained everything in one hour — and our care benefit was approved the same week.', name: 'Bjørn E.', role: 'Family carer, Bergen' },
        { quote: 'I did not know that a power of attorney and a will were two completely different things. The lawyer cleared up all the confusion in half an hour.', name: 'Kari and Tor S.', role: 'Couple with parents in care, Trondheim' },
      ],
    },
    experts: {
      kicker: 'Professional support team', h2: '8 professional fields behind the service',
      lead: 'When the need requires authorised competence, the professional team is ready — same platform, same plan.',
      items: [
        { code: 'SYK', label: 'Nurse', desc: 'Clinical assessment, medication and care at home.' },
        { code: 'SOS', label: 'Social worker', desc: 'Rights, benefits and municipal services.' },
        { code: 'ERG', label: 'Occupational therapist', desc: 'Adapting the home and daily activities.' },
        { code: 'PSY', label: 'Psychologist', desc: 'Grief, stress and mental health for family carers.' },
        { code: 'JUR', label: 'Lawyer', desc: 'Power of attorney, wills and patient rights.' },
        { code: 'ØKO', label: 'Economist', desc: 'Care benefit calculations, inheritance and finances.' },
        { code: 'TEK', label: 'Welfare technologist', desc: 'Digital aids, GPS and safety technology.' },
        { code: 'ERN', label: 'Nutritionist', desc: 'Diet, appetite and nutrition plans.' },
      ],
    },
    fritid: {
      kicker: 'Activity and community', h2: 'Activity companion for the elderly',
      lead: 'Supported leisure is an established municipal service in Norway. NAVIAR CARE delivers the same kind of activity and participation support: structured matching, quality assurance and systematic follow-up — individually or in groups.',
      cta1: 'Get an activity companion', cta2: 'Become a companion',
      points: [
        'Matched on interests, suitability and communication style — approved by a coordinator',
        'On average 3–5 hours per week, following an agreed activity plan',
        'Individually or in groups: culture, activity, exercise and social participation',
        'Police certificate shown before assignments — never stored by us',
      ],
    },
    pricing: {
      kicker: 'Pricing', h2: 'Simple, predictable pricing',
      lead: 'Start free during the pilot period. No credit card required.',
      badge: 'Family carer pilot',
      note: '* Prices are example figures from the pilot period and may change. The helper\'s hourly rate and the platform fee are always shown separately before you pay. NAVIAR CARE Match — verified matching on place, time and interests — is included in both Start and Assist. All prices incl. VAT.',
      plans: [
        { name: 'NAVIAR CARE Start', price: 'Fixed price', unit: '', desc: 'The pilot package: needs assessment and a personal everyday plan.', items: ['Structured needs assessment', 'Needs summary + personal everyday plan', 'Referral to the right support', 'Systematic follow-up after 14 days'], cta: 'Book a needs assessment', highlight: true },
        { name: 'NAVIAR CARE Assist', price: '250', unit: 'per hour', desc: 'All low-risk tasks — pay only for the hours you use.', items: ['All low-risk tasks, also outside the categories', 'Fee 15–25% — shown first, charged on completed help', 'Vetted helper, approved by you', 'No commitment'], cta: 'Request a helper', highlight: false },
        { name: 'NAVIAR CARE Partner', price: 'Agreement', unit: '', desc: 'For municipalities, BPA providers and care organisations.', items: ['Needs analysis and service design', 'Pilot management and coordination', 'Quality and user report', 'Platform licence, SLA and invoicing'], cta: 'Contact us', highlight: false },
      ],
      currency: 'NOK',
    },
    forSec: {
      k1: 'For family carers', h1: ['You should not stand alone', 'with this'],
      l1: ['Answers from the right professional — not a generic list', 'Available weekdays 08–20, response within one hour', 'No forwarding. The expert answers directly.', 'Safe and confidential — GDPR-certified'],
      c1: 'Tell us your need',
      principle: 'You can suggest help and pay — but the person receiving help approves the visit and chooses what the family gets to see. Paying does not automatically give access.',
      k2: 'For professionals', h2: ['Use your competence', 'where it is needed most'],
      l2: ['Flexible work on your own terms and hours', 'Direct contact with families who really need you', 'Clean platform — only professional conversations, no admin', 'Competitive pay and weekly payout'],
      c2: 'Apply as a professional',
    },
    faq: {
      kicker: 'Questions and answers', h2: 'What you may wonder about',
      items: [
        { q: 'Can I have the same helper every time?', a: 'Yes — you can request a familiar helper when you find a good fit. The person must be available and qualified for the task, and we always tell you before proposing someone else.' },
        { q: 'Who are the experts and how do you approve them?', a: 'All advisers hold approved Norwegian authorisation in their field. We verify credentials, work experience (minimum 5 years clinical) and references before they join the platform. During the pilot we also conduct a test conversation.' },
        { q: 'How fast do the experts answer?', a: 'The goal is under one hour on weekdays 08–20. In the pilot period the average response time is 34 minutes (example figure). Evenings and weekends have longer waits — we always show expected availability before you send a question.' },
        { q: 'What happens to the information I share?', a: 'We never store health data linked to an identifiable third person without explicit consent. Conversations are encrypted and deleted on request. Naviar processes data in accordance with the GDPR and Norwegian privacy law. Read our full privacy statement.' },
        { q: 'Is this the same as consulting a doctor or a lawyer?', a: 'No — Naviar provides professional guidance, not legal advice or medical treatment. The experts help you understand the situation, know your rights and make informed choices. For acute health problems always call 113.' },
        { q: 'What is an activity companion, and how are they vetted?', a: 'An activity companion accompanies the elderly person to cultural and leisure activities — individually or in a group, on average 3–5 hours per week. Companions are 18 or older, show a police certificate before assignments (we never store it, only that it was shown), and are matched on shared interests and personality. Every match is approved by a human, never by an algorithm alone.' },
        { q: 'Can I cancel at any time?', a: 'Yes, without giving a reason and at no extra cost. The subscription runs to the end of the current period and is not renewed. You can cancel directly or by sending us an email.' },
      ],
    },
    finalCta: {
      h2: ['Do not let the uncertainty', 'wait until tomorrow'],
      lead: 'Tell us your need today — we map, match and follow up, when it suits you.',
      placeholder: 'you@email.com', btn: 'Sign me up →',
      noBind: 'No commitment · Cancel at any time',
      thanks: 'Thank you — you are registered!', thanksSub: 'We will email you as soon as you can start using Naviar Care.',
      or: 'Or start with a question right away →',
    },
    footer: {
      tagline: 'Practical help. On your terms. Professionals, services and family gathered in one place.',
      area: 'Pilot area: Drammen and surroundings',
      col1: 'The service', col1Links: ['How it works', 'Professional fields', 'Pricing', 'For professionals'],
      col2: 'Company', col2Links: ['About us', 'Privacy', 'Terms of use', 'Contact'],
      copyright: '© 2026 NAVIAR CARE · Drammen, Norway',
      wipe: 'Delete stored data', gdpr: 'GDPR-compliant · Data processing in the EU',
    },
    cookie: {
      text: 'We store your choices only in your browser. If you accept all, the site also remembers what you looked at last — so your next visit starts where you left off. Nothing leaves your browser, and you can delete everything at any time.',
      all: 'Accept all', necessary: 'Only necessary', label: 'Cookies',
    },
    modal: {
      kicker: 'Needs assessment', title: 'Tell us your need',
      lead: 'We map the need and match the right helper within one working day.',
      name: 'Name *', namePh: 'Your name', email: 'Email *', emailPh: 'you@email.com',
      phone: 'Phone (optional)', phonePh: '+47 000 00 000',
      topic: 'Service', topicPh: 'Choose a service...',
      extraFaglig: 'Professional advice (health, law, finances)', extraHjelper: 'I want to become a helper', extraVetikke: 'Not sure yet',
      situation: 'Describe the need *',
      situationPh: 'Describe the need — not the diagnosis. E.g.: "My mother needs help applying for home care in Bergen."',
      hint: 'Do not write diagnoses, medication lists or other health data here — the expert asks for what is needed, when it is needed.',
      privacy: 'We do not ask for diagnoses and collect no more than what is needed to connect you to the right expert. Your request is handled confidentially under the GDPR, and you can request deletion at any time.',
      submit: 'Send request →', noBind: 'Non-binding request — no commitment.',
      close: 'Close', thanks: 'Thank you,', done1: 'Your request is registered. We will contact you at', done2: 'within 24 hours to clarify the need and the next steps.',
      pilotNote: 'This is a pilot programme. Response times may differ from production.',
      mailSubject: 'Request from',
    },
    next: {
      finishTopic: (t: string) => `Finish your request about ${t.toLowerCase()}?`,
      finish: 'Finish your request? It takes less than a minute',
      start: 'Ready to start? First hour with no commitment',
      cont: (t: string) => `Continue with ${t.toLowerCase()}?`,
      how: 'See how it works — in a few simple steps',
    },
    navi: {
      open: 'Ask Navi', close: 'Close', name: 'Navi',
      sub: 'Automatic assistant — not a human',
      ariaOpen: 'Open chat with Navi, automatic assistant', ariaClose: 'Close chat',
      region: 'Chat with Navi, automatic assistant',
      inputLabel: 'Write to Navi', inputPh: 'Type a question...', send: 'Send',
      intro: 'Hi! I am Navi — an automatic assistant, not a human. I answer the most common questions and pass you on to the team. Please do not write health information here. What would you like to know?',
      fallback: 'I cannot answer that well yet. Would you like to send the question to the team? A human replies within 24 hours — press "Talk to a human".',
      quick: ['What does it cost?', 'How does it work?', 'Become a helper', 'Talk to a human'],
      humanBtn: 'Talk to a human',
      answers: [
        { keys: /price|cost|pay|fee|nok/i, text: 'NAVIAR CARE Start is the pilot package at a fixed price: a needs conversation, a personal plan and follow-up after 14 days. NAVIAR CARE Assist costs from 250 NOK per hour (example price), plus a platform fee of 15–25% always shown before you pay. Would you like to book a needs assessment?' },
        { keys: /work|how|step|method/i, text: 'We work in five steps: mapping the need, clarifying it, a concrete everyday plan, a quality-assured match (always approved by a human) and follow-up after the service. Shall I open the needs assessment?' },
        { keys: /helper|job|apply|become/i, text: 'Great that you want to become a helper! You must be 18+, show a police certificate (we never store it) and set your own availability. I can open the application form for you.', topic: EXTRA_KEYS.hjelper },
        { keys: /leisure|walk|activity|companion|swim/i, text: 'An activity companion accompanies your loved one to activities — on average 3–5 hours a week, individually or in a group, matched on interests. Would you like to send a request?', topic: 'Tur og aktivitet' },
        { keys: /shop|errand|grocer|pharmac|post/i, text: 'We help with groceries, pharmacy, post and small errands — paid per hour. Shall I open the request with the right service selected?', topic: 'Handling og ærend' },
        { keys: /other|something else|special/i, text: 'We help with anything low-risk — the limit is risk, not a list. Describe the task and a coordinator will assess it. Outside the service: medical care, handling money, legal advice and anything requiring authorisation.', topic: 'Annet — beskriv oppgaven' },
        { keys: /safe|secure|certificate|privacy|gdpr|data/i, text: 'All helpers show a police certificate before assignments (we never store it), matching is approved by a human, and we never ask for diagnoses or health data. Everything you write here stays in your browser.' },
        { keys: /human|person|call|contact|talk/i, text: 'Of course — send in the form and a real human will contact you within 24 hours. I will open it for you.' },
      ],
    },
  },

  tr: {
    nav: { tjenester: 'Hizmetler', how: 'Nasıl çalışır', fritid: 'Aktivite arkadaşı', priser: 'Fiyatlar', fag: 'Uzmanlar için', cta: 'Hemen başla →', menu: 'Menü' },
    hero: {
      badge: 'Pilot program — şu an aktif',
      h1: ['Eviniz.', 'Hayatınız.', 'Günlük işlerde yanınızdayız.'],
      lead: 'Bir market alışverişi. Kısa bir yürüyüş. Telefonla bir yardım. NAVIAR CARE, evinde yaşamak ve kendi kararlarını vermek isteyenlere pratik destektir — ihtiyaç belirlenir, kalite güvenceli yardımcı eşleştirilir ve toplam fiyat her şey onaylanmadan önce netleşir.',
      cta: 'İhtiyaç görüşmesi planla', how: 'Nasıl çalışıyoruz',
      back: 'Tekrar hoş geldin —',
      gdpr: 'Açık onayın olmadan sağlık bilgisi asla saklamayız · GDPR güvencesi',
      area: 'Pilot bölge: Drammen ve çevresi — adım adım genişliyor',
      stats: [
        { val: '89%', label: '60 dk içinde\nyanıt aldı' },
        { val: '8', label: 'uzmanlık alanı\nplatformda' },
        { val: '4.8', label: 'kullanıcı\npuan ortalaması' },
      ],
      statsNote: '* Pilot dönemden örnek rakamlar',
      cardTitle: 'Ziyaretten önce her zaman netleşir',
      cardItems: ['Ne yapılacağı', 'Kimin geleceği', 'Ne zaman — ve ne kadar süre', 'Toplam fiyat, siz onaylamadan önce', 'Kimin neyi görebileceği'],
      cardNote: 'Ödeme yapmak otomatik bilgi erişimi sağlamaz.',
      cardInput: 'Neye ihtiyacınız olduğunu anlatın...',
    },
    promise: {
      items: [
        { t: 'Karar sizin', d: 'İhtiyacınıza ve kimin bilgi alacağına siz karar verirsiniz.' },
        { t: 'Önce fiyat', d: 'Toplam fiyat, randevu onaylanmadan önce netleşir.' },
        { t: 'Yakınınızdaki insanlar', d: 'Anlaştığınız yardımcıyla devam etmeyi isteyebilirsiniz.' },
      ],
    },
    how: {
      kicker: 'Nasıl çalışır', h2: 'İhtiyaçtan takibe — beş adımda',
      steps: [
        { n: '1', title: 'İhtiyaç haritası', body: 'İhtiyaçları, istekleri ve günlük rutinleri belirliyoruz — yapılandırılmış, başvurusuz ve sağlık dosyası olmadan.' },
        { n: '2', title: 'İhtiyacın netleşmesi', body: 'İhtiyacın arkasındaki hedefi birlikte netleştiriyoruz: aktivite, öz güven ve sosyal katılım — yalnızca görev değil.' },
        { n: '3', title: 'Günlük yaşam planı', body: 'Somut bir plan alırsınız: aktiviteler, destek saatleri, ulaşım ve aile koordinasyonu.' },
        { n: '4', title: 'Kalite güvenceli eşleştirme', body: 'Koordinatör; yetkinlik, uygunluk, ilgi alanları ve müsaitliğe göre yardımcı eşleştirir — başlamadan önce siz onaylarsınız.' },
        { n: '5', title: 'Uygulama ve takip', body: 'Hizmet, fiyatı önceden eksiksiz gösterilerek kararlaştırılan saatte yapılır. Kaliteyi, güvenliği ve sonraki ihtiyaçları takip ederiz.' },
      ],
    },
    cats: {
      kicker: 'Saat saat yardım', h2: 'Tüm düşük riskli yardımlar — saat saat',
      lead: 'Kalite güvenceli yardımcılarla günlük yaşam desteği. Kapsamın sınırı risktir — kategoriler dışındaki görevleri koordinatör tek tek değerlendirir. Ücret onaydan önce gösterilir ve hizmet tamamlanınca tahsil edilir.',
      last: 'SON BAKILAN',
      items: [
        { code: 'SOS', label: 'Sosyal ziyaret', desc: 'Günlük yaşamda ziyaret, sohbet ve arkadaşlık.' },
        { code: 'TUR', label: 'Yürüyüş ve aktivite', desc: 'Yakın çevrede yürüyüş ve aktiviteler.' },
        { code: 'ÆRE', label: 'Alışveriş ve işler', desc: 'Market, eczane, posta ve küçük işler.' },
        { code: 'HUS', label: 'Basit ev işleri', desc: 'Evde hafif işler — taşıma, toplama, küçük tamirler.' },
        { code: 'TRA', label: 'Ulaşım ve randevular', desc: 'Doktora, kuaföre veya diğer randevulara eşlik.' },
        { code: 'TRE', label: 'Egzersiz eşliği', desc: 'Yüzme, spor ve organize aktivitelere eşlik.' },
        { code: 'DIG', label: 'Telefon ve tablet desteği', desc: 'Görüntülü arama, fotoğraflar ve basit ayarlar.' },
        { code: 'HAG', label: 'Bahçe ve mevsimlik işler', desc: 'Sulama, süpürme ve dışarıda hafif işler.' },
        { code: 'KOO', label: 'Aile koordinasyonu', desc: 'Aile için tek plan: kim, neyi, ne zaman yapar.' },
        { code: 'ANN', label: 'Diğer — görevi tarif edin', desc: 'Günlük yaşamdaki diğer tüm düşük riskli görevler. Sınır risktir, liste değil.' },
      ],
      outside: 'Hizmet dışı: tıbbi bakım, para işlemleri, hukuki danışmanlık ve yetki gerektiren her iş — bunlar uzman ekibin veya kamunun alanıdır.',
    },
    trygg: {
      kicker: 'Güvenlik', h2: 'Kimin geleceğini bilmelisiniz.',
      lead: 'Kimlik, güvenilirlik ve yetkinlik ayrı ayrı kontrol edilir — hiçbir yıldız puanı bunun yerine geçmez.',
      cards: [
        { t: 'Kimlik', d: 'Yardımcının kimliği görev öncesi doğrulanır ve adli sicil belgesi gösterilir — belgeyi asla saklamayız.' },
        { t: 'Güvenilirlik', d: 'Referanslar ve önceki görevler bilgi verir — ama sorunsuz geçen çok sayıda görev garanti değildir. Her seferinde takip ederiz.' },
        { t: 'İşe uygun yetkinlik', d: 'Uygunluk her görev türü için ayrı değerlendirilir. Tıbbi işler hizmete dahil değildir.' },
      ],
      money: 'BankID, PIN kodu veya banka kartınızı yardımcıyla asla paylaşmayın. Ek iş ve ücreti her zaman iş başlamadan önce kararlaştırılır.',
      emergency: 'Hayati tehlikede 113 · yangında 110 · acil tehlikede 112. NAVIAR CARE bir acil yardım hizmeti değildir.',
      pipeline: 'Yardımcı hattı: başvuru → iletişim kontrolü → kimlik → referanslar → eğitim → görev değerlendirmesi. Başvuru yapmak kimseyi göreve hazır yapmaz.',
    },
    photo: {
      alt: 'Yaşlı bir kadın ve yardımcı mutfak masasında sohbet ediyor. YZ üretimi temsili görsel.',
      caption: 'Günü güzelleştiren şeylere yer açın.',
      tag: 'YZ üretimi temsili görsel',
    },
    pilot: {
      kicker: 'Pilot durumu', h2: 'Pilotta ne aktif — ne yolda',
      lead: 'Yalnızca bugün çalışanı vaat ediyoruz. Şu anki durum:',
      active: 'Şu an aktif', coming: 'Daha sonra',
      activeItems: [
        'Form üzerinden ihtiyaç görüşmesi — 24 saat içinde bir insan yanıtlar',
        'Manuel, kalite güvenceli eşleştirme — her eşleşmeyi koordinatör onaylar',
        'Tamamlanan her hizmet sonrası takip',
      ],
      comingItems: [
        'Online ödeme — çalışma statüsü ve vergi konularının hukuki netleşmesinden sonra açılacak',
        'Takvimli otomatik rezervasyon',
        'Giriş ve kişisel sayfa',
      ],
    },
    testi: {
      kicker: 'Pilot kullanıcılarından', h2: 'Deneyenler ne diyor',
      note: '* Pilot kullanıcı alıntıları. İsimler ve ayrıntılar onayla anonimleştirildi.',
      items: [
        { quote: 'Üç gündür aile hekimine ulaşmaya çalışıyordum. Burada 40 dakika içinde bir hemşireden yanıt aldım. İhtiyacım olan tam buydu.', name: 'Marianne L.', role: 'Bakıma muhtaç ebeveyn kızı, Oslo' },
        { quote: 'Sosyal yardım kuralları tek başına içinden çıkılmaz bir labirent. Sosyal hizmet uzmanı her şeyi bir saatte anlattı — bakım ödeneğimiz aynı hafta onaylandı.', name: 'Bjørn E.', role: 'Yakın bakım veren, Bergen' },
        { quote: 'Vekaletname ile vasiyetin bambaşka iki şey olduğunu bilmiyordum. Avukat yarım saatte tüm karışıklığı çözdü.', name: 'Kari ve Tor S.', role: 'Ebeveynleri kurumda olan çift, Trondheim' },
      ],
    },
    experts: {
      kicker: 'Uzman destek ekibi', h2: 'Hizmetin arkasında 8 uzmanlık alanı',
      lead: 'İhtiyaç yetkili uzmanlık gerektirdiğinde uzman ekip hazır — aynı platform, aynı plan.',
      items: [
        { code: 'SYK', label: 'Hemşire', desc: 'Klinik değerlendirme, ilaç düzeni ve evde bakım.' },
        { code: 'SOS', label: 'Sosyal hizmet uzmanı', desc: 'Haklar, sosyal ödemeler ve belediye hizmetleri.' },
        { code: 'ERG', label: 'Ergoterapist', desc: 'Konut ve günlük aktivitelerin uyarlanması.' },
        { code: 'PSY', label: 'Psikolog', desc: 'Yakınlar için yas, stres ve ruh sağlığı.' },
        { code: 'JUR', label: 'Hukukçu', desc: 'Vekalet, vasiyet ve hasta hakları.' },
        { code: 'ØKO', label: 'Ekonomist', desc: 'Bakım ödeneği hesabı, miras ve ekonomi.' },
        { code: 'TEK', label: 'Refah teknoloğu', desc: 'Dijital yardımcılar, GPS ve güvenlik teknolojisi.' },
        { code: 'ERN', label: 'Beslenme uzmanı', desc: 'Beslenme, iştah ve beslenme planı.' },
      ],
    },
    fritid: {
      kicker: 'Aktivite ve topluluk', h2: 'Yaşlılar için aktivite arkadaşı',
      lead: 'Destekli boş zaman, Norveç\'te yerleşik bir belediye hizmetidir. NAVIAR CARE aynı tür aktivite ve katılım desteğini sunar: yapılandırılmış eşleştirme, kalite güvencesi ve sistematik takip — bireysel veya grup halinde.',
      cta1: 'Aktivite arkadaşı iste', cta2: 'Aktivite arkadaşı ol',
      points: [
        'İlgi alanı, uygunluk ve iletişim tarzına göre eşleştirme — koordinatör onaylı',
        'Kararlaştırılan aktivite planına göre haftada ortalama 3–5 saat',
        'Bireysel veya grupça: kültür, aktivite, egzersiz ve sosyal katılım',
        'Görev öncesi adli sicil belgesi gösterilir — belge asla saklanmaz',
      ],
    },
    pricing: {
      kicker: 'Fiyatlar', h2: 'Basit, öngörülebilir fiyatlandırma',
      lead: 'Pilot döneminde ücretsiz başlayın. Kredi kartı gerekmez.',
      badge: 'Yakın bakım pilotu',
      note: '* Fiyatlar pilot dönemden örnek rakamlardır ve değişebilir. Yardımcının saat ücreti ile platform ücreti ödemeden önce her zaman ayrı ayrı gösterilir. NAVIAR CARE Match — yer, zaman ve ilgiye göre doğrulanmış eşleştirme — hem Start hem Assist\'e dahildir. Fiyatlara KDV dahildir.',
      plans: [
        { name: 'NAVIAR CARE Start', price: 'Sabit fiyat', unit: '', desc: 'Pilot paketi: ihtiyaç görüşmesi ve kişisel günlük yaşam planı.', items: ['Yapılandırılmış ihtiyaç görüşmesi', 'İhtiyaç özeti + kişisel günlük plan', 'Doğru desteğe yönlendirme', '14 gün sonra sistematik takip'], cta: 'İhtiyaç görüşmesi planla', highlight: true },
        { name: 'NAVIAR CARE Assist', price: '250', unit: 'saat başı', desc: 'Tüm düşük riskli görevler — yalnız kullandığınız saatleri ödersiniz.', items: ['Kategori dışındakiler dahil tüm düşük riskli görevler', 'Ücret %15–25 — önce gösterilir, hizmet tamamlanınca alınır', 'Kontrollü yardımcı, sizin onayınızla', 'Taahhüt yok'], cta: 'Yardımcı iste', highlight: false },
        { name: 'NAVIAR CARE Partner', price: 'Anlaşma', unit: '', desc: 'Belediyeler, BPA sağlayıcıları ve bakım kuruluşları için.', items: ['İhtiyaç analizi ve hizmet tasarımı', 'Pilot yönetimi ve koordinasyon', 'Kalite ve kullanıcı raporu', 'Platform lisansı, SLA ve fatura'], cta: 'İletişime geç', highlight: false },
      ],
      currency: 'kr',
    },
    forSec: {
      k1: 'Yakınlar için', h1: ['Bu yükle tek başına', 'kalmamalısın'],
      l1: ['Doğru uzmandan yanıt — genel liste değil', 'Hafta içi 08–20 ulaşılabilir, yanıt bir saatin altında', 'Yönlendirme yok; uzman doğrudan yanıtlar.', 'Güvenli ve gizli — GDPR sertifikalı'],
      c1: 'İhtiyacını bildir',
      principle: 'Yardım önerebilir ve ücretini ödeyebilirsiniz — ama ziyareti yardımı alan kişi onaylar ve ailenin neyi göreceğini o seçer. Ödeme yapmak otomatik bilgi erişimi sağlamaz.',
      k2: 'Uzmanlar için', h2: ['Yetkinliğini en çok', 'gereken yerde kullan'],
      l2: ['Kendi koşullarında ve saatlerinde esnek çalışma', 'Sana gerçekten ihtiyacı olan ailelerle doğrudan iletişim', 'Düzenli platform — yalnız uzman görüşmeleri, evrak işi yok', 'Rekabetçi ücret ve haftalık ödeme'],
      c2: 'Uzman olarak başvur',
    },
    faq: {
      kicker: 'Soru ve yanıtlar', h2: 'Merak ettikleriniz',
      items: [
        { q: 'Her seferinde aynı yardımcıyı alabilir miyim?', a: 'Evet — anlaştığınızda sabit bir yardımcı isteyebilirsiniz. Kişinin müsait ve görev için yetkin olması gerekir; başka birini önermeden önce size her zaman haber veririz.' },
        { q: 'Uzmanlar kim ve onları nasıl onaylıyorsunuz?', a: 'Tüm danışmanların kendi alanında onaylı Norveç yetki belgesi vardır. Platforma alınmadan önce belge, iş deneyimi (en az 5 yıl klinik) ve referanslar doğrulanır. Pilot sırasında ayrıca bir test görüşmesi yapıyoruz.' },
        { q: 'Uzmanlar ne kadar hızlı yanıtlıyor?', a: 'Hedef, hafta içi 08–20 arasında bir saatin altı. Pilot döneminde ortalama yanıt süresi 34 dakika (örnek rakam). Akşam ve hafta sonu bekleme daha uzundur — soru göndermeden önce beklenen müsaitliği her zaman gösteririz.' },
        { q: 'Paylaştığım bilgilere ne oluyor?', a: 'Kimliği belirlenebilir üçüncü kişilere ait sağlık bilgilerini açık onay olmadan asla saklamayız. Görüşmeler şifrelidir ve talep üzerine silinir. Naviar, verileri GDPR\'a ve Norveç kişisel veri yasasına uygun işler. Gizlilik bildirimimizin tamamını okuyabilirsiniz.' },
        { q: 'Bu, doktora veya avukata danışmakla aynı şey mi?', a: 'Hayır — Naviar mesleki rehberlik sunar; hukuki danışmanlık veya tıbbi tedavi değildir. Uzmanlar durumu anlamanıza, haklarınızı bilmenize ve bilinçli seçim yapmanıza yardım eder. Acil sağlık sorunlarında her zaman 113\'ü arayın.' },
        { q: 'Aktivite arkadaşı nedir, nasıl denetlenir?', a: 'Aktivite arkadaşı, yaşlıya kültür ve boş zaman aktivitelerinde eşlik eder — bireysel veya grupça, haftada ortalama 3–5 saat. 18 yaş ve üzeridir, görev öncesi adli sicil belgesi gösterir (belgeyi asla saklamayız, yalnız gösterildiğini kaydederiz) ve ortak ilgi ile kişiliğe göre eşleştirilir. Her eşleşmeyi bir insan onaylar; asla yalnız bir algoritma değil.' },
        { q: 'İstediğim zaman iptal edebilir miyim?', a: 'Evet — gerekçesiz ve ek ücretsiz. Abonelik mevcut dönemin sonuna kadar sürer ve yenilenmez. Doğrudan ya da bize e-posta göndererek iptal edebilirsiniz.' },
      ],
    },
    finalCta: {
      h2: ['Belirsizlik yarına', 'kalmasın'],
      lead: 'İhtiyacını bugün bildir — size uyan zamanda belirler, eşleştirir ve takip ederiz.',
      placeholder: 'eposta@adresin.com', btn: 'Kaydol →',
      noBind: 'Taahhüt yok · İstediğin zaman iptal',
      thanks: 'Teşekkürler — kaydın alındı!', thanksSub: 'Naviar Care\'i kullanmaya başlayabileceğin anda sana e-posta göndereceğiz.',
      or: 'Ya da hemen bir soruyla başla →',
    },
    footer: {
      tagline: 'Pratik yardım. Sizin tercihlerinizle. Uzmanlar, hizmetler ve aile tek yerde.',
      area: 'Pilot bölge: Drammen ve çevresi',
      col1: 'Hizmet', col1Links: ['Nasıl çalışır', 'Uzmanlık alanları', 'Fiyatlar', 'Uzmanlar için'],
      col2: 'Şirket', col2Links: ['Hakkımızda', 'Gizlilik', 'Kullanım koşulları', 'İletişim'],
      copyright: '© 2026 NAVIAR CARE · Drammen, Norveç',
      wipe: 'Kayıtlı verileri sil', gdpr: 'GDPR uyumlu · Veri işleme AB içinde',
    },
    cookie: {
      text: 'Tercihlerini yalnız kendi tarayıcında saklarız. Tümünü kabul edersen site son baktıklarını da hatırlar — bir sonraki ziyaretin kaldığın yerden başlar. Tarayıcından dışarı hiçbir şey gönderilmez ve her şeyi istediğin an silebilirsin.',
      all: 'Tümünü kabul et', necessary: 'Yalnız gerekli', label: 'Çerezler',
    },
    modal: {
      kicker: 'İhtiyaç görüşmesi', title: 'İhtiyacını bildir',
      lead: 'İhtiyacı belirler ve bir iş günü içinde doğru yardımcıyla eşleştiririz.',
      name: 'İsim *', namePh: 'Adınız', email: 'E-posta *', emailPh: 'eposta@adresin.com',
      phone: 'Telefon (isteğe bağlı)', phonePh: '+47 000 00 000',
      topic: 'Hizmet', topicPh: 'Hizmet seçin...',
      extraFaglig: 'Uzman danışmanlığı (sağlık, hukuk, ekonomi)', extraHjelper: 'Yardımcı olmak istiyorum', extraVetikke: 'Henüz bilmiyorum',
      situation: 'İhtiyacı tarif edin *',
      situationPh: 'İhtiyacı yazın — teşhisi değil. Örn.: "Annemin Bergen\'de evde bakım başvurusu için yardıma ihtiyacı var."',
      hint: 'Buraya teşhis, ilaç listesi veya başka sağlık bilgisi yazmayın — uzman gerekeni, gerektiğinde sorar.',
      privacy: 'Teşhis sormayız ve sizi doğru uzmana bağlamak için gerekenden fazlasını toplamayız. Talebiniz GDPR\'a uygun, gizli işlenir; istediğiniz an silinmesini isteyebilirsiniz.',
      submit: 'Talebi gönder →', noBind: 'Bağlayıcı olmayan talep — taahhüt yok.',
      close: 'Kapat', thanks: 'Teşekkürler,', done1: 'Talebiniz kaydedildi. İhtiyacın netleşmesi ve sonraki adımlar için', done2: 'adresinden 24 saat içinde size ulaşacağız.',
      pilotNote: 'Bu bir pilot programdır. Yanıt süreleri üretim ortamından farklı olabilir.',
      mailSubject: 'Talep:',
    },
    next: {
      finishTopic: (t: string) => `${t} talebini tamamlayalım mı?`,
      finish: 'Talebini tamamlayalım mı? Bir dakikadan az sürer',
      start: 'Başlamaya hazır mısın? İlk saat taahhütsüz',
      cont: (t: string) => `${t} ile devam edelim mi?`,
      how: 'Nasıl çalıştığını gör — birkaç basit adım',
    },
    navi: {
      open: 'Navi\'ye sor', close: 'Kapat', name: 'Navi',
      sub: 'Otomatik asistan — insan değil',
      ariaOpen: 'Otomatik asistan Navi ile sohbeti aç', ariaClose: 'Sohbeti kapat',
      region: 'Otomatik asistan Navi ile sohbet',
      inputLabel: 'Navi\'ye yaz', inputPh: 'Bir soru yazın...', send: 'Gönder',
      intro: 'Merhaba! Ben Navi — otomatik bir asistanım, insan değilim. En sık sorulanları yanıtlar, sizi ekibe yönlendiririm. Buraya sağlık bilgisi yazmayın lütfen. Neyi merak ediyorsunuz?',
      fallback: 'Bunu henüz iyi yanıtlayamıyorum. Soruyu ekibe iletmek ister misiniz? Bir insan 24 saat içinde yanıtlar — "Bir insanla konuş"a basın.',
      quick: ['Ücreti ne kadar?', 'Nasıl çalışıyor?', 'Yardımcı ol', 'Bir insanla konuş'],
      humanBtn: 'Bir insanla konuş',
      answers: [
        { keys: /fiyat|ücret|kaç para|öde|maliyet/i, text: 'NAVIAR CARE Start sabit fiyatlı pilot pakettir: ihtiyaç görüşmesi, kişisel plan ve 14 gün sonra takip. NAVIAR CARE Assist saat başı 250 kr\'dan başlar (örnek fiyat); %15–25 platform ücreti ödemeden önce her zaman gösterilir. İhtiyaç görüşmesi planlayalım mı?' },
        { keys: /nasıl|çalış|adım|yöntem/i, text: 'Beş adımda çalışıyoruz: ihtiyacın belirlenmesi, netleştirilmesi, somut bir günlük plan, kalite güvenceli eşleştirme (her zaman insan onaylı) ve hizmet sonrası takip. İhtiyaç görüşmesini açayım mı?' },
        { keys: /yardımcı|iş|başvur|çalışmak/i, text: 'Yardımcı olmak istemene çok sevindik! 18 yaş üstü olmalı, adli sicil belgesi göstermeli (asla saklamayız) ve kendi müsaitlik saatlerini belirlemelisin. Başvuru formunu açabilirim.', topic: EXTRA_KEYS.hjelper },
        { keys: /aktivite|yürüyüş|eşlik|yüzme|boş zaman/i, text: 'Aktivite arkadaşı, yakınınıza aktivitelerde eşlik eder — haftada ortalama 3–5 saat, bireysel veya grupça, ilgi alanlarına göre eşleştirilir. Talep gönderelim mi?', topic: 'Tur og aktivitet' },
        { keys: /alışveriş|market|eczane|posta|iş/i, text: 'Market, eczane, posta ve küçük işlerde yardım ediyoruz — saat başı ödeme. Doğru hizmet seçili olarak talebi açayım mı?', topic: 'Handling og ærend' },
        { keys: /diğer|başka|özel/i, text: 'Düşük riskli her işte yardım ederiz — sınır risktir, liste değil. Görevi tarif edin, koordinatör değerlendirsin. Kapsam dışı: tıbbi bakım, para işlemleri, hukuki tavsiye ve yetki gerektiren her iş.', topic: 'Annet — beskriv oppgaven' },
        { keys: /güven|belge|gizlilik|gdpr|veri/i, text: 'Tüm yardımcılar görev öncesi adli sicil belgesi gösterir (asla saklamayız), eşleştirmeyi bir insan onaylar; teşhis veya sağlık bilgisi istemeyiz. Buraya yazdıkların tarayıcında kalır.' },
        { keys: /insan|kişi|ara|iletişim|konuş/i, text: 'Elbette — formu gönder, gerçek bir insan 24 saat içinde seninle iletişime geçer. Formu açıyorum.' },
      ],
    },
  },
}

type Copy = typeof COPY.no

// Nøkkel (stabil) → lokalisert etikett, for kategorier
function catLabel(L: Copy, key: string): string {
  const i = CAT_KEYS.indexOf(key as (typeof CAT_KEYS)[number])
  if (i >= 0) return L.cats.items[i].label
  return key
}
function localCats(L: Copy): Cat[] {
  return L.cats.items.map((c, i) => ({ ...c, key: CAT_KEYS[i] }))
}

// ─── Atferdssystem: samtykkebasert, kun i nettleseren, sendes aldri ut ───────

const CONSENT_KEY  = 'nc_consent'
const BEHAVIOR_KEY = 'nc_behavior'
type NCEvent = { t: number; e: string; v: string }

function getConsent(): 'all' | 'necessary' | null {
  try {
    const c = localStorage.getItem(CONSENT_KEY)
    if (c === 'all' || c === 'necessary') return c
    if (localStorage.getItem('nc_cookie') === '1') return 'necessary'
  } catch {}
  return null
}

function track(e: string, v: string) {
  if (getConsent() !== 'all') return
  try {
    const now = Date.now()
    const cutoff = now - 90 * 24 * 3600 * 1000
    const list: NCEvent[] = JSON.parse(localStorage.getItem(BEHAVIOR_KEY) || '[]')
      .filter((x: NCEvent) => x.t > cutoff)
    list.push({ t: now, e, v })
    localStorage.setItem(BEHAVIOR_KEY, JSON.stringify(list.slice(-200)))
  } catch {}
}

// Frekvens x ferskhet: nyere interesse teller mest; alt eldre enn 90 dager slettes
function topCategory(): string | null {
  if (getConsent() !== 'all') return null
  try {
    const list: NCEvent[] = JSON.parse(localStorage.getItem(BEHAVIOR_KEY) || '[]')
    const score: Record<string, number> = {}
    const now = Date.now()
    for (const x of list) {
      if (x.e !== 'cat') continue
      const ageDays = (now - x.t) / 86400000
      score[x.v] = (score[x.v] || 0) + Math.max(0.2, 1 - ageDays / 90)
    }
    const best = Object.entries(score).sort((a, b) => b[1] - a[1])[0]
    return best ? best[0] : null
  } catch { return null }
}

// "Neste steg": regelbasert og forklarbar — ingen ML, jf. prosjektplanens
// Build-prinsipp. Leser hendelsene og foreslår ett riktig neste steg.
type NextStep = { label: string; action: 'modal' | 'how'; topic?: string }

function nextStep(L: Copy): NextStep | null {
  if (getConsent() !== 'all') return null
  try {
    const list: NCEvent[] = JSON.parse(localStorage.getItem(BEHAVIOR_KEY) || '[]')
    if (!list.length) return null
    const last = (e: string) => [...list].reverse().find(x => x.e === e)
    const lastSubmit = last('submit')
    const lastCta = last('cta')

    // Allerede sendt inn, og ikke startet noe nytt siden: ikke mas
    if (lastSubmit && (!lastCta || lastSubmit.t >= lastCta.t)) return null

    // Åpnet skjemaet uten å sende: fullfør der de slapp
    if (lastCta) {
      const topic = lastCta.v !== 'generell' ? lastCta.v : (topCategory() || undefined)
      return {
        label: topic ? L.next.finishTopic(catLabel(L, topic)) : L.next.finish,
        action: 'modal', topic,
      }
    }

    // Så på priser: klar til å starte
    if (last('plan')) return { label: L.next.start, action: 'modal' }

    // Viste interesse for en kategori
    const top = topCategory()
    if (top) return { label: L.next.cont(catLabel(L, top)), action: 'modal', topic: top }

    // Leste bare FAQ: vis hvordan det fungerer
    if (last('faq')) return { label: L.next.how, action: 'how' }

    return null
  } catch { return null }
}

function clearAllLocalData() {
  try {
    localStorage.removeItem(BEHAVIOR_KEY)
    localStorage.removeItem(CONSENT_KEY)
    localStorage.removeItem('nc_cookie')
  } catch {}
  window.location.reload()
}

// ─── Logo ────────────────────────────────────────────────────────────────────

// Nytt merke (kundens beslutning 05.09.2026, docs/logo-karari.md):
// N-monogram med diamant-hakk i diagonalen + geometrisk NAVIAR-ordmerke,
// CARE mindre og høyrestilt under. Interim-implementasjon i kode inntil
// kildefiler (SVG) leveres fra designsiden.
// Logo geometrisi teslim edilen kaynak dosyadan birebir alınmıştır:
// naviar-arsiv/03_care-1-studio-web-2026-002/brand/NAVIAR-CARE-001_master_candidate_v0.2.svg
// (v0.3 master ChatGPT arşivinde — gelince güncellenecek; docs/logo-karari.md)
function NaviarMonogram({ size = 30, color = '#10384A' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="32 32 192 192" aria-hidden>
      <path
        fill={color}
        fillRule="evenodd"
        d="M32 224V32h47l98 105V32h47v192h-47L79 119v105zm96-111 15 15-15 15-15-15z"
      />
    </svg>
  )
}

function NaviarLogo({ size = 30, dark = false }: { size?: number; dark?: boolean }) {
  const mark = dark ? '#FFFFFF' : '#10384A'
  const sub  = dark ? '#A7D1CE' : '#0B5152'
  return (
    <svg height={size} width={Math.round(size * 1252 / 360)} viewBox="0 0 1252 360" role="img" aria-label="NAVIAR CARE">
      <path fill={mark} fillRule="evenodd" d="M32 224V32h47l98 105V32h47v192h-47L79 119v105zm96-111 15 15-15 15-15-15z" transform="translate(54 52)" />
      <g fill={mark} transform="translate(350 78) scale(1.08)">
        <path d="M20 100V20h20l51 54V20h19v80H91L39 46v54z" />
        <path d="M140 100l48-80h20l48 80h-22l-36-61-36 61z" />
        <path d="M186 78h24v11h-24z" />
        <path d="M278 20h22l37 61 37-61h22l-49 80h-20z" />
        <path d="M429 20h18v80h-18z" />
        <path d="M480 100l48-80h20l48 80h-22l-36-61-36 61z" />
        <path d="M526 78h24v11h-24z" />
        <path fillRule="evenodd" d="M630 100V20h62c29 0 45 12 45 31 0 16-10 27-29 30l36 19h-36l-42-31v31zm18-63v29h43c18 0 27-5 27-15 0-9-9-14-27-14z" />
      </g>
      <g fill={sub}>
        <path d="M876 230h-35q-25 0-25 25t25 25h35v-11h-34q-14 0-14-14t14-14h34z" />
        <path d="M895 280l30-50h20l30 50h-15l-25-36-25 36z" />
        <path d="M923 261h24v9h-24z" />
        <path fillRule="evenodd" d="M995 280v-50h40q30 0 30 19 0 15-19 19l23 12h-21l-26-19v19zm13-39v16h27q16 0 16-8t-16-8z" />
        <path d="M1090 230h60v11h-47v8h42v11h-42v9h47v11h-60z" />
      </g>
    </svg>
  )
}

// ─── Cookie banner ────────────────────────────────────────────────────────────

function CookieBanner({ L, onAccept }: { L: Copy; onAccept: (level: 'all' | 'necessary') => void }) {
  return (
    <div role="region" aria-label={L.cookie.label} style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: '#10384A',
      borderTop: '1px solid #1D5052',
      padding: '16px 24px',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center',
        gap: 20, flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}>
        <p style={{ fontSize: 13.5, color: '#C9DADC', margin: 0, flex: '1 1 320px', lineHeight: 1.5 }}>
          {L.cookie.text}
        </p>
        <div style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          <button
            onClick={() => onAccept('all')}
            style={{
              padding: '9px 22px',
              background: '#EAC57C', color: '#10384A',
              fontSize: 13.5, fontWeight: 700,
              border: 'none', borderRadius: 6, cursor: 'pointer',
            }}
          >{L.cookie.all}</button>
          <button
            onClick={() => onAccept('necessary')}
            style={{
              padding: '9px 22px',
              background: 'transparent', color: '#C9DADC',
              fontSize: 13.5, fontWeight: 500,
              border: '1px solid #1D5052', borderRadius: 6, cursor: 'pointer',
            }}
          >{L.cookie.necessary}</button>
        </div>
      </div>
    </div>
  )
}

// ─── Contact modal ────────────────────────────────────────────────────────────

function ContactModal({ L, onClose, initialTopic }: { L: Copy; onClose: () => void; initialTopic?: string }) {
  const [step, setStep] = useState<'form' | 'done'>('form')
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [phone, setPhone]     = useState('')
  const [situation, setSit]   = useState('')
  const [topic, setTopic]     = useState(initialTopic || '')
  const overlayRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !situation) return
    // Pilot: mailto-based — open email client as submission mechanism
    const body = encodeURIComponent(
      `Navn: ${name}\nE-post: ${email}\nTelefon: ${phone || '—'}\nTjeneste: ${topic || '—'}\n\nSituasjon:\n${situation}`
    )
    window.open(`mailto:hei@naviar.no?subject=${encodeURIComponent(L.modal.mailSubject)} ${encodeURIComponent(name)}&body=${body}`)
    track('submit', topic || 'skjema')
    setStep('done')
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '10px 14px',
    border: '1px solid #C6DCDC', borderRadius: 6,
    fontSize: 15, color: '#10384A', background: '#fff',
    outline: 'none', fontFamily: '"DM Sans", system-ui, sans-serif',
    boxSizing: 'border-box',
  }

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="nc-modal-title"
      onClick={e => { if (e.target === overlayRef.current) onClose() }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(16,56,74,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <div style={{
        background: '#FFFFFF',
        borderRadius: 12,
        maxWidth: 520, width: '100%',
        maxHeight: '90vh', overflowY: 'auto',
        padding: '36px 36px 40px',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(16,56,74,0.2)',
      }}>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label={L.modal.close}
          style={{
            position: 'absolute', top: 18, right: 18,
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#52676F', padding: 4,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12"/>
          </svg>
        </button>

        {step === 'done' ? (
          <div style={{ textAlign: 'center', paddingTop: 16 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: '#EAC57C', margin: '0 auto 24px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10384A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 26, fontWeight: 700, color: '#10384A', marginBottom: 12 }}>{L.modal.thanks} {name.split(' ')[0]}!</h3>
            <p style={{ fontSize: 15, color: '#52676F', lineHeight: 1.6, marginBottom: 28 }}>
              {L.modal.done1} <strong>{email}</strong> {L.modal.done2}
            </p>
            <p style={{ fontSize: 12, color: '#52676F' }}>{L.modal.pilotNote}</p>
            <button onClick={onClose} style={{
              marginTop: 20, padding: '12px 28px',
              background: '#10384A', color: '#FFFFFF',
              fontSize: 14, fontWeight: 600,
              border: 'none', borderRadius: 6, cursor: 'pointer',
            }}>{L.modal.close}</button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 28 }}>
              <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: '0.1em', color: '#52676F', textTransform: 'uppercase' }}>{L.modal.kicker}</span>
              <h3 id="nc-modal-title" style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 24, fontWeight: 700, color: '#10384A', marginTop: 8 }}>{L.modal.title}</h3>
              <p style={{ fontSize: 14, color: '#52676F', marginTop: 6 }}>{L.modal.lead}</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label htmlFor="nc-name" style={{ fontSize: 12.5, fontWeight: 600, color: '#10384A', display: 'block', marginBottom: 6 }}>{L.modal.name}</label>
                  <input id="nc-name" required value={name} onChange={e => setName(e.target.value)}
                    placeholder={L.modal.namePh} autoComplete="name" style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="nc-email" style={{ fontSize: 12.5, fontWeight: 600, color: '#10384A', display: 'block', marginBottom: 6 }}>{L.modal.email}</label>
                  <input id="nc-email" required type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder={L.modal.emailPh} autoComplete="email" style={inputStyle} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label htmlFor="nc-phone" style={{ fontSize: 12.5, fontWeight: 600, color: '#10384A', display: 'block', marginBottom: 6 }}>{L.modal.phone}</label>
                  <input id="nc-phone" value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder={L.modal.phonePh} autoComplete="tel" style={inputStyle} />
                </div>
                <div>
                  <label htmlFor="nc-topic" style={{ fontSize: 12.5, fontWeight: 600, color: '#10384A', display: 'block', marginBottom: 6 }}>{L.modal.topic}</label>
                  <select id="nc-topic" value={topic} onChange={e => setTopic(e.target.value)} style={{ ...inputStyle, appearance: 'none' }}>
                    <option value="">{L.modal.topicPh}</option>
                    {localCats(L).map(c => <option key={c.code} value={c.key}>{c.label}</option>)}
                    <option value={EXTRA_KEYS.faglig}>{L.modal.extraFaglig}</option>
                    <option value={EXTRA_KEYS.hjelper}>{L.modal.extraHjelper}</option>
                    <option value={EXTRA_KEYS.vetikke}>{L.modal.extraVetikke}</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="nc-situation" style={{ fontSize: 12.5, fontWeight: 600, color: '#10384A', display: 'block', marginBottom: 6 }}>{L.modal.situation}</label>
                <textarea id="nc-situation" required value={situation} onChange={e => setSit(e.target.value)}
                  placeholder={L.modal.situationPh}
                  rows={4}
                  aria-describedby="nc-situation-hint"
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.55 }}
                />
                <p id="nc-situation-hint" style={{ fontSize: 12, color: '#52676F', margin: '6px 0 0', lineHeight: 1.5 }}>
                  {L.modal.hint}
                </p>
              </div>

              <div style={{ background: '#E9F3F3', borderRadius: 8, padding: '10px 14px', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0B5152" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>
                </svg>
                <p style={{ fontSize: 12.5, color: '#10384A', margin: 0, lineHeight: 1.5 }}>
                  {L.modal.privacy}
                </p>
              </div>

              <button type="submit" style={{
                marginTop: 4,
                padding: '14px',
                background: '#10384A', color: '#FFFFFF',
                fontSize: 15, fontWeight: 700,
                border: 'none', borderRadius: 6, cursor: 'pointer',
              }}>
                {L.modal.submit}
              </button>
              <p style={{ fontSize: 11.5, color: '#52676F', textAlign: 'center', margin: 0 }}>
                {L.modal.noBind}
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Navi: skriptet chatassistent (ingen KI ennå, ingen data ut) ─────────────
// Avataren er en midlertidig SVG. Bytt til ekte bilde ved å legge
// naviar-care/assets/navi.jpg i repoet og erstatte <NaviAvatar/> med <img>.

function NaviAvatar({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden style={{ display: 'block', borderRadius: '50%' }}>
      <circle cx="32" cy="32" r="32" fill="#E9F3F3"/>
      <path d="M14 34 a18 18 0 0 1 36 0 v10 a4 4 0 0 1 -8 0 v-8 a14 14 0 0 0 -20 0 v8 a4 4 0 0 1 -8 0 z" fill="#10384A"/>
      <circle cx="32" cy="34" r="13" fill="#f2d5bd"/>
      <path d="M19 32 a13 13 0 0 1 26 0 c-4 -6 -9 -8 -13 -8 s-9 2 -13 8 z" fill="#10384A"/>
      <circle cx="27" cy="35" r="1.8" fill="#10384A"/>
      <circle cx="37" cy="35" r="1.8" fill="#10384A"/>
      <path d="M28 42 q4 3 8 0" stroke="#10384A" strokeWidth="1.6" strokeLinecap="round" fill="none"/>
      <rect x="10" y="30" width="6" height="12" rx="3" fill="#0B5152"/>
      <rect x="48" y="30" width="6" height="12" rx="3" fill="#0B5152"/>
      <path d="M50 42 q0 8 -10 9" stroke="#0B5152" strokeWidth="2.4" fill="none" strokeLinecap="round"/>
      <circle cx="39" cy="52" r="2.4" fill="#EAC57C"/>
    </svg>
  )
}

type ChatMsg = { from: 'navi' | 'meg'; text: string }

function NaviChat({ L, onCta, lifted }: { L: Copy; onCta: (topic?: string) => void; lifted: boolean }) {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState<ChatMsg[]>([{ from: 'navi', text: L.navi.intro }])
  const [input, setInput] = useState('')

  // Bytter man språk mens chatten er tom, følger introen med
  useEffect(() => {
    setMsgs(m => (m.length === 1 && m[0].from === 'navi') ? [{ from: 'navi', text: L.navi.intro }] : m)
  }, [L])

  function say(text: string) {
    const q = text.trim()
    if (!q) return
    const hit = L.navi.answers.find(a => a.keys.test(q))
    const reply: ChatMsg = hit
      ? { from: 'navi', text: hit.text }
      : { from: 'navi', text: L.navi.fallback }
    track('chat', hit ? hit.keys.source.slice(0, 20) : 'ukjent')
    setMsgs(m => [...m, { from: 'meg', text: q }, reply])
    setInput('')
    if (hit && 'topic' in hit && hit.topic) setTimeout(() => onCta(hit.topic), 900)
  }

  return (
    <>
      <button
        onClick={() => { setOpen(!open); track('chat', open ? 'lukk' : 'åpne') }}
        aria-label={open ? L.navi.ariaClose : L.navi.ariaOpen}
        style={{
          position: 'fixed', insetInlineEnd: 20, bottom: lifted ? 96 : 20, zIndex: 90,
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 16px 8px 8px',
          background: '#10384A', border: 'none', borderRadius: 100,
          cursor: 'pointer', boxShadow: '0 4px 20px rgba(16,56,74,0.3)',
        }}>
        <NaviAvatar size={36} />
        <span style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 700 }}>{open ? L.navi.close : L.navi.open}</span>
      </button>

      {open && (
        <div role="region" aria-label={L.navi.region} style={{
          position: 'fixed', insetInlineEnd: 20, bottom: lifted ? 156 : 80, zIndex: 90,
          width: 'min(360px, calc(100vw - 40px))',
          background: '#FFFFFF', border: '1px solid #C6DCDC', borderRadius: 14,
          boxShadow: '0 12px 40px rgba(16,56,74,0.22)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#10384A' }}>
            <NaviAvatar size={34} />
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ color: '#FFFFFF', fontSize: 14, fontWeight: 700 }}>{L.navi.name}</div>
              <div style={{ color: '#A7D1CE', fontSize: 11 }}>{L.navi.sub}</div>
            </div>
          </div>

          <div aria-live="polite" style={{ padding: 14, maxHeight: 300, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {msgs.map((m, i) => (
              <p key={i} style={{
                alignSelf: m.from === 'navi' ? 'flex-start' : 'flex-end',
                background: m.from === 'navi' ? '#E9F3F3' : '#10384A',
                color: m.from === 'navi' ? '#10384A' : '#FFFFFF',
                borderRadius: m.from === 'navi' ? '12px 12px 12px 3px' : '12px 12px 3px 12px',
                padding: '9px 13px', fontSize: 13.5, lineHeight: 1.5, maxWidth: '85%',
              }}>{m.text}</p>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', padding: '0 14px 10px' }}>
            {L.navi.quick.map(q => (
              <button key={q} onClick={() => q === L.navi.humanBtn ? (track('chat', 'menneske'), onCta()) : say(q)} style={{
                fontSize: 12, fontWeight: 600, color: '#10384A',
                background: '#F5F9F9', border: '1px solid #C6DCDC',
                borderRadius: 100, padding: '5px 12px', cursor: 'pointer',
              }}>{q}</button>
            ))}
          </div>

          <form onSubmit={e => { e.preventDefault(); say(input) }} style={{ display: 'flex', gap: 8, padding: '10px 14px', borderTop: '1px solid #C6DCDC' }}>
            <label htmlFor="navi-input" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>{L.navi.inputLabel}</label>
            <input id="navi-input" value={input} onChange={e => setInput(e.target.value)}
              placeholder={L.navi.inputPh} autoComplete="off"
              style={{ flex: 1, padding: '9px 12px', border: '1px solid #C6DCDC', borderRadius: 6, fontSize: 13.5, fontFamily: 'inherit', color: '#10384A', background: '#fff' }} />
            <button type="submit" aria-label={L.navi.send} style={{
              width: 38, height: 38, background: '#EAC57C', border: 'none', borderRadius: 6,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10384A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}

// ─── Språkvelger ─────────────────────────────────────────────────────────────

function LangSwitch({ lang, setLang, compact = false }: { lang: Lang; setLang: (l: Lang) => void; compact?: boolean }) {
  const langs: { code: Lang; label: string }[] = [
    { code: 'no', label: 'NO' }, { code: 'en', label: 'EN' }, { code: 'tr', label: 'TR' },
  ]
  return (
    <div role="group" aria-label="Språk / Language / Dil" style={{ display: 'flex', gap: 2, background: '#F5F9F9', border: '1px solid #C6DCDC', borderRadius: 100, padding: 2 }}>
      {langs.map(l => (
        <button key={l.code} onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          lang={l.code}
          style={{
            padding: compact ? '5px 10px' : '5px 12px',
            fontSize: 12, fontWeight: 700, letterSpacing: '0.04em',
            background: lang === l.code ? '#10384A' : 'transparent',
            color: lang === l.code ? '#FFFFFF' : '#52676F',
            border: 'none', borderRadius: 100, cursor: 'pointer',
          }}>{l.label}</button>
      ))}
    </div>
  )
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav({
  L, lang, setLang, menuOpen, setMenuOpen, onCta
}: {
  L: Copy
  lang: Lang
  setLang: (l: Lang) => void
  menuOpen: boolean
  setMenuOpen: (v: boolean) => void
  onCta: () => void
}) {
  const links = [
    { label: L.nav.tjenester, id: 'tjenester' },
    { label: L.nav.how, id: 'how' },
    { label: L.nav.fritid, id: 'fritid' },
    { label: L.nav.priser, id: 'priser' },
    { label: L.nav.fag, id: 'for-section' },
  ]
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: '#FFFFFF', borderBottom: '1px solid #C6DCDC' }}>
      <nav style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <NaviarLogo size={30} />

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 28 }}>
          {links.map(({ label, id }) => (
            <button key={id} onClick={() => scrollTo(id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, color: '#52676F', padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#10384A')}
              onMouseLeave={e => (e.currentTarget.style.color = '#52676F')}
            >{label}</button>
          ))}
        </div>

        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 14 }}>
          <LangSwitch lang={lang} setLang={setLang} />
          <button onClick={onCta} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '10px 20px',
            background: '#EAC57C', color: '#10384A',
            fontSize: 14, fontWeight: 700,
            borderRadius: 6, border: 'none', cursor: 'pointer',
          }}>{L.nav.cta}</button>
        </div>

        {/* Mobile hamburger */}
        <div className="flex md:hidden" style={{ alignItems: 'center', gap: 10 }}>
          <LangSwitch lang={lang} setLang={setLang} compact />
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label={L.nav.menu}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: '#10384A' }}>
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M18 6 6 18M6 6l12 12"/>
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{ background: '#FFFFFF', borderTop: '1px solid #C6DCDC', padding: '20px 24px 28px' }}>
          {links.map(({ label, id }) => (
            <button key={id} onClick={() => { scrollTo(id); setMenuOpen(false) }}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '12px 0',
                background: 'none', border: 'none', borderBottom: '1px solid #C6DCDC',
                fontSize: 16, fontWeight: 500, color: '#52676F', cursor: 'pointer',
              }}
            >{label}</button>
          ))}
          <button onClick={() => { onCta(); setMenuOpen(false) }} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%',
            marginTop: 20, padding: '14px',
            background: '#EAC57C', color: '#10384A',
            fontSize: 15, fontWeight: 700,
            borderRadius: 6, border: 'none', cursor: 'pointer',
          }}>{L.nav.cta}</button>
        </div>
      )}
    </header>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero({ L, onCta, next }: { L: Copy; onCta: (topic?: string) => void; next: NextStep | null }) {
  return (
    <section style={{ background: '#F5F9F9', padding: '80px 24px 72px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 32 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px 5px 10px', background: '#E9F3F3', borderRadius: 100 }}>
            <span style={{ width: 6, height: 6, background: '#0B5152', borderRadius: '50%', flexShrink: 0 }} />
            <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 11, letterSpacing: '0.1em', color: '#10384A', textTransform: 'uppercase' }}>{L.hero.badge}</span>
          </span>
        </div>

        <div style={{ display: 'flex', gap: 60, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Left */}
          <div style={{ flex: '1 1 480px', maxWidth: 620 }}>
            <h1 style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: 700, lineHeight: 1.08, color: '#10384A',
              marginBottom: 24, letterSpacing: '-0.02em', textWrap: 'balance',
            }}>
              {L.hero.h1[0]}<br/>{L.hero.h1[1]}<br/>
              <span style={{ color: '#0B5152', fontSize: '0.62em', letterSpacing: '-0.01em' }}>{L.hero.h1[2]}</span>
            </h1>

            <p style={{ fontSize: 18, lineHeight: 1.65, color: '#52676F', maxWidth: 480, marginBottom: 40 }}>
              {L.hero.lead}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <button onClick={onCta} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '14px 28px',
                background: '#10384A', color: '#FFFFFF',
                fontSize: 15, fontWeight: 600,
                borderRadius: 6, border: 'none', cursor: 'pointer',
              }}>
                {L.hero.cta}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
              <button onClick={() => scrollTo('how')} style={{
                fontSize: 15, fontWeight: 500,
                color: '#10384A', background: 'none', border: 'none', cursor: 'pointer',
                textDecoration: 'underline', textUnderlineOffset: 3,
              }}>{L.hero.how}</button>
            </div>

            {next && (
              <button
                onClick={() => next.action === 'how' ? scrollTo('how') : onCta(next.topic)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  marginTop: 16, padding: '8px 16px',
                  background: '#E9F3F3', border: '1px solid #C6DCDC',
                  borderRadius: 100, cursor: 'pointer',
                  fontSize: 13.5, fontWeight: 600, color: '#10384A',
                }}>
                {L.hero.back} {next.label} →
              </button>
            )}

            {/* GDPR trust line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 16 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0B5152" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span style={{ fontSize: 12.5, color: '#52676F' }}>{L.hero.gdpr}</span>
            </div>
            {/* Service area */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 8 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0B5152" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <span style={{ fontSize: 12.5, color: '#52676F' }}>{L.hero.area}</span>
            </div>

            {/* Trust stats */}
            <div style={{ display: 'flex', alignItems: 'stretch', marginTop: 52, paddingTop: 40, borderTop: '1px solid #C6DCDC' }}>
              {L.hero.stats.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'stretch' }}>
                  {i > 0 && <div style={{ width: 1, background: '#C6DCDC', margin: '0 24px', flexShrink: 0 }} />}
                  <div>
                    <div style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 30, fontWeight: 700, color: '#10384A' }}>{s.val}</div>
                    <div style={{ fontSize: 13, color: '#52676F', marginTop: 2, lineHeight: 1.4, whiteSpace: 'pre-line' }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 11, color: '#52676F', marginTop: 10 }}>{L.hero.statsNote}</p>
          </div>

          {/* Right: avtale-kortet — de fem spørsmålene som alltid er avklart */}
          <div style={{ flex: '1 1 300px', maxWidth: 420 }}>
            <div style={{
              background: '#FFFFFF', border: '1px solid #C6DCDC',
              borderRadius: 12, padding: 28,
              boxShadow: '0 4px 24px rgba(16,56,74,0.06)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: '#E9F3F3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0B5152" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                  </svg>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#10384A' }}>{L.hero.cardTitle}</div>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px', display: 'flex', flexDirection: 'column', gap: 11 }}>
                {L.hero.cardItems.map((it, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0B5152" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span style={{ fontSize: 14, lineHeight: 1.5, color: '#10384A' }}>{it}</span>
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 12.5, color: '#52676F', margin: '0 0 16px', paddingLeft: 2 }}>{L.hero.cardNote}</p>

              <div style={{ borderTop: '1px solid #C6DCDC', paddingTop: 16 }}>
                <button onClick={onCta} style={{
                  display: 'flex', alignItems: 'center', gap: 8, width: '100%',
                  padding: '10px 14px',
                  background: '#F5F9F9', borderRadius: 8,
                  border: '1px solid #C6DCDC', cursor: 'pointer',
                  textAlign: 'left',
                }}>
                  <span style={{ fontSize: 13, color: '#52676F', flex: 1 }}>{L.hero.cardInput}</span>
                  <div style={{ width: 30, height: 30, background: '#EAC57C', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10384A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Løftestripen (Du bestemmer · Prisen først · Mennesker, nær deg) ─────────

function Promises({ L }: { L: Copy }) {
  const icons = [
    <path key="a" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/>,
    <path key="b" d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>,
    <path key="c" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>,
  ]
  return (
    <section style={{ background: '#E9F3F3', borderTop: '1px solid #C6DCDC', borderBottom: '1px solid #C6DCDC', padding: '28px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 28 }}>
        {L.promise.items.map((p, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0B5152" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>{icons[i]}</svg>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#10384A' }}>{p.t}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.5, color: '#52676F', margin: '4px 0 0' }}>{p.d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Trygghet (identitet · pålitelighet · kompetanse + pengeregler) ──────────

function Trygghet({ L }: { L: Copy }) {
  return (
    <section id="trygghet" style={{ background: '#F5F9F9', padding: '80px 24px', scrollMarginTop: 68 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 11, letterSpacing: '0.1em', color: '#52676F', textTransform: 'uppercase' }}>{L.trygg.kicker}</span>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, color: '#10384A', marginTop: 12, letterSpacing: '-0.02em' }}>{L.trygg.h2}</h2>
          <p style={{ fontSize: 16, color: '#52676F', marginTop: 12, maxWidth: 560 }}>{L.trygg.lead}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 28 }}>
          {L.trygg.cards.map((c, i) => (
            <div key={i} style={{ background: '#FFFFFF', border: '1px solid #C6DCDC', borderRadius: 10, padding: '24px 24px 22px' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: '#E9F3F3', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0B5152" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  {i === 0 && <><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M15 8h4M15 12h4M6.5 16a2.5 2.5 0 0 1 5 0"/></>}
                  {i === 1 && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4"/>}
                  {i === 2 && <><circle cx="12" cy="8" r="5"/><path d="M9 13l-1 9 4-3 4 3-1-9"/></>}
                </svg>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#10384A', marginBottom: 8 }}>{c.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: '#52676F', margin: 0 }}>{c.d}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', background: '#FFFFFF', border: '1px solid #C6DCDC', borderLeft: '3px solid #0B5152', borderRadius: 8, padding: '14px 18px', marginBottom: 12 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0B5152" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
            <rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: '#10384A', margin: 0 }}>{L.trygg.money}</p>
        </div>
        <p style={{ fontSize: 13, color: '#10384A', margin: '0 0 10px' }}>{L.trygg.pipeline}</p>
        <p style={{ fontSize: 12.5, color: '#52676F', margin: 0 }}>{L.trygg.emergency}</p>
      </div>
    </section>
  )
}

// ─── Fotoğraf bandı (YZ-etiketli temsili görsel — kaynak: v2.4.0 hverdag.png) ─

function PhotoBand({ L }: { L: Copy }) {
  return (
    <section style={{ background: '#FFFFFF', padding: '0 24px' }}>
      <figure style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 0' }}>
        <img
          src={HVERDAG_IMG}
          alt={L.photo.alt}
          style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 10, border: '1px solid #C6DCDC' }}
        />
        <figcaption style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap', marginTop: 12 }}>
          <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 19, color: '#10384A' }}>{L.photo.caption}</span>
          <span style={{ fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#52676F' }}>{L.photo.tag}</span>
        </figcaption>
      </figure>
    </section>
  )
}

// ─── How it works ─────────────────────────────────────────────────────────────

function HowItWorks({ L }: { L: Copy }) {
  return (
    <section id="how" style={{ background: '#FFFFFF', padding: '80px 24px', scrollMarginTop: 68 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 56 }}>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 11, letterSpacing: '0.1em', color: '#52676F', textTransform: 'uppercase' }}>{L.how.kicker}</span>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, color: '#10384A', marginTop: 12, letterSpacing: '-0.02em' }}>{L.how.h2}</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {L.how.steps.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
              <div style={{ width: 44, height: 44, flexShrink: 0, background: '#EAC57C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 18, fontWeight: 700, color: '#10384A' }}>{s.n}</span>
              </div>
              <div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#10384A', marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: '#52676F' }}>{s.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Categories (primary service) ────────────────────────────────────────────

function Categories({ L, onCta, top }: { L: Copy; onCta: (topic?: string) => void; top: string | null }) {
  const cats = localCats(L)
  const ordered = top
    ? [...cats].sort((a, b) => (a.key === top ? -1 : b.key === top ? 1 : 0))
    : cats
  return (
    <section id="tjenester" style={{ background: '#F5F9F9', padding: '80px 24px', scrollMarginTop: 68 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 11, letterSpacing: '0.1em', color: '#52676F', textTransform: 'uppercase' }}>{L.cats.kicker}</span>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, color: '#10384A', marginTop: 12, letterSpacing: '-0.02em' }}>{L.cats.h2}</h2>
          <p style={{ fontSize: 16, color: '#52676F', marginTop: 12, maxWidth: 520 }}>
            {L.cats.lead}
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {ordered.map(c => (
            <button key={c.code} onClick={() => { track('cat', c.key); onCta(c.key) }} style={{
              background: '#FFFFFF', border: '1px solid #C6DCDC',
              borderRadius: 10, padding: '20px 22px',
              cursor: 'pointer', textAlign: 'left', width: '100%',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = '#10384A'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(16,56,74,0.08)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = '#C6DCDC'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#10384A' }}>{c.label}</span>
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: '0.06em', padding: '2px 7px', background: c.key === top ? '#EAC57C' : '#E9F3F3', color: '#10384A', borderRadius: 4 }}>{c.key === top ? L.cats.last : c.code}</span>
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, color: '#52676F', margin: 0 }}>{c.desc}</p>
            </button>
          ))}
        </div>
        <p style={{ fontSize: 12, color: '#52676F', marginTop: 20 }}>
          {L.cats.outside}
        </p>
      </div>
    </section>
  )
}

// ─── Pilotstatus (åpenhet: hva virker i dag) ─────────────────────────────────

function PilotStatus({ L }: { L: Copy }) {
  const col = (title: string, items: string[], active: boolean) => (
    <div style={{ flex: '1 1 300px', background: '#FFFFFF', border: '1px solid #C6DCDC', borderRadius: 12, padding: '28px 28px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: active ? '#0B5152' : '#C6DCDC', flexShrink: 0 }} />
        <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 11, letterSpacing: '0.08em', color: '#10384A', textTransform: 'uppercase', fontWeight: 700 }}>{title}</span>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.map((it, i) => (
          <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
            {active ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0B5152" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}>
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#52676F" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 3 }}>
                <circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 3"/>
              </svg>
            )}
            <span style={{ fontSize: 14.5, lineHeight: 1.55, color: '#52676F' }}>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
  return (
    <section id="pilotstatus" style={{ background: '#FFFFFF', padding: '80px 24px', scrollMarginTop: 68 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 40 }}>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 11, letterSpacing: '0.1em', color: '#52676F', textTransform: 'uppercase' }}>{L.pilot.kicker}</span>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, color: '#10384A', marginTop: 12, letterSpacing: '-0.02em' }}>{L.pilot.h2}</h2>
          <p style={{ fontSize: 16, color: '#52676F', marginTop: 12, maxWidth: 520 }}>{L.pilot.lead}</p>
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          {col(L.pilot.active, L.pilot.activeItems, true)}
          {col(L.pilot.coming, L.pilot.comingItems, false)}
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials({ L }: { L: Copy }) {
  return (
    <section style={{ background: '#F5F9F9', padding: '80px 24px', scrollMarginTop: 68 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 11, letterSpacing: '0.1em', color: '#52676F', textTransform: 'uppercase' }}>{L.testi.kicker}</span>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, color: '#10384A', marginTop: 12, letterSpacing: '-0.02em' }}>{L.testi.h2}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {L.testi.items.map((t, i) => (
            <div key={i} style={{
              background: '#FFFFFF', border: '1px solid #C6DCDC',
              borderRadius: 10, padding: '28px 28px 24px',
            }}>
              {/* Quote mark */}
              <svg width="24" height="18" viewBox="0 0 24 18" fill="#EAC57C" aria-hidden style={{ marginBottom: 16 }}>
                <path d="M0 18V10.2C0 4.56 3.36.84 10.08 0l1.68 2.52C8.28 3.24 6.48 5.16 6 8.4h4.08V18H0zm13.92 0V10.2c0-5.64 3.36-9.36 10.08-10.2L25.68 2.52C22.2 3.24 20.4 5.16 19.92 8.4H24V18H13.92z"/>
              </svg>
              <p style={{ fontSize: 15, lineHeight: 1.65, color: '#2A5A66', marginBottom: 20, fontStyle: 'italic' }}>"{t.quote}"</p>
              <div style={{ borderTop: '1px solid #C6DCDC', paddingTop: 16 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#10384A' }}>{t.name}</div>
                <div style={{ fontSize: 12.5, color: '#52676F', marginTop: 2 }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: '#52676F', marginTop: 20 }}>{L.testi.note}</p>
      </div>
    </section>
  )
}

// ─── Experts ─────────────────────────────────────────────────────────────────

function Experts({ L, onCta }: { L: Copy; onCta: (topic?: string) => void }) {
  return (
    <section id="experts" style={{ background: '#FFFFFF', padding: '80px 24px', scrollMarginTop: 68 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 11, letterSpacing: '0.1em', color: '#52676F', textTransform: 'uppercase' }}>{L.experts.kicker}</span>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, color: '#10384A', marginTop: 12, letterSpacing: '-0.02em' }}>{L.experts.h2}</h2>
          <p style={{ fontSize: 16, color: '#52676F', marginTop: 12, maxWidth: 480 }}>{L.experts.lead}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {L.experts.items.map(ex => (
            <button key={ex.code} onClick={() => { track('exp', ex.code); onCta(EXTRA_KEYS.faglig) }} style={{
              background: '#FFFFFF', border: '1px solid #C6DCDC',
              borderRadius: 10, padding: '20px 22px',
              cursor: 'pointer', textAlign: 'left', width: '100%',
              transition: 'border-color 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = '#10384A'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(16,56,74,0.08)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = '#C6DCDC'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <span style={{ fontSize: 15, fontWeight: 700, color: '#10384A' }}>{ex.label}</span>
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: '0.06em', padding: '2px 7px', background: '#E9F3F3', color: '#10384A', borderRadius: 4 }}>{ex.code}</span>
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, color: '#52676F', margin: 0 }}>{ex.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Fritidskontakt ──────────────────────────────────────────────────────────

function Fritidskontakt({ L, onCta }: { L: Copy; onCta: (topic?: string) => void }) {
  return (
    <section id="fritid" style={{ background: '#E9F3F3', padding: '80px 24px', scrollMarginTop: 68 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', gap: 56, flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 420px', maxWidth: 560 }}>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 11, letterSpacing: '0.1em', color: '#52676F', textTransform: 'uppercase' }}>{L.fritid.kicker}</span>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, color: '#10384A', marginTop: 12, letterSpacing: '-0.02em' }}>{L.fritid.h2}</h2>
          <p style={{ fontSize: 16, color: '#52676F', marginTop: 14, lineHeight: 1.65 }}>
            {L.fritid.lead}
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <button onClick={() => { track('cat', 'Tur og aktivitet'); onCta('Tur og aktivitet') }} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', background: '#10384A', color: '#FFFFFF',
              fontSize: 14, fontWeight: 600, borderRadius: 6, border: 'none', cursor: 'pointer',
            }}>{L.fritid.cta1} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
            <button onClick={() => onCta(EXTRA_KEYS.hjelper)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '12px 24px', background: '#FFFFFF', color: '#10384A',
              fontSize: 14, fontWeight: 600, borderRadius: 6,
              border: '1px solid #C6DCDC', cursor: 'pointer',
            }}>{L.fritid.cta2}</button>
          </div>
        </div>
        <ul style={{ flex: '1 1 320px', maxWidth: 480, listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {L.fritid.points.map((p, i) => (
            <li key={i} style={{
              display: 'flex', gap: 12, alignItems: 'flex-start',
              background: '#FFFFFF', border: '1px solid #C6DCDC',
              borderRadius: 10, padding: '16px 18px',
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0B5152" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3 }}>
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span style={{ fontSize: 14.5, lineHeight: 1.55, color: '#52676F' }}>{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ─── Pricing ─────────────────────────────────────────────────────────────────

function Pricing({ L, onCta }: { L: Copy; onCta: () => void }) {
  return (
    <section id="priser" style={{ background: '#F5F9F9', padding: '80px 24px', scrollMarginTop: 68 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ marginBottom: 52, maxWidth: 540 }}>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 11, letterSpacing: '0.1em', color: '#52676F', textTransform: 'uppercase' }}>{L.pricing.kicker}</span>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, color: '#10384A', marginTop: 12, letterSpacing: '-0.02em' }}>{L.pricing.h2}</h2>
          <p style={{ fontSize: 16, color: '#52676F', marginTop: 12, lineHeight: 1.6 }}>{L.pricing.lead}</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, alignItems: 'start' }}>
          {L.pricing.plans.map((p) => (
            <div key={p.name} style={{
              background: p.highlight ? '#10384A' : '#FFFFFF',
              border: `1px solid ${p.highlight ? 'transparent' : '#C6DCDC'}`,
              borderRadius: 12, padding: '32px 28px',
              position: 'relative',
            }}>
              {p.highlight && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: '#EAC57C', color: '#10384A',
                  fontFamily: '"DM Mono", monospace',
                  fontSize: 10, letterSpacing: '0.08em',
                  padding: '4px 12px', borderRadius: 100, textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                }}>{L.pricing.badge}</div>
              )}

              <div style={{ marginBottom: 24 }}>
                <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: p.highlight ? '#A7D1CE' : '#52676F' }}>{p.name}</span>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 10, marginBottom: 4 }}>
                  {!/^\d/.test(p.price) ? (
                    <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 32, fontWeight: 700, color: p.highlight ? '#FFFFFF' : '#10384A' }}>{p.price}</span>
                  ) : (
                    <>
                      <span style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 36, fontWeight: 700, color: p.highlight ? '#FFFFFF' : '#10384A' }}>{L.pricing.currency} {p.price}</span>
                      <span style={{ fontSize: 14, color: p.highlight ? '#A7D1CE' : '#52676F' }}>{p.unit}</span>
                    </>
                  )}
                </div>
                <p style={{ fontSize: 13.5, color: p.highlight ? '#A7D1CE' : '#52676F', lineHeight: 1.5, margin: 0 }}>{p.desc}</p>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 28px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {p.items.map((item, i) => (
                  <li key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={p.highlight ? '#EAC57C' : '#0B5152'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span style={{ fontSize: 14, color: p.highlight ? '#C9DADC' : '#52676F', lineHeight: 1.4 }}>{item}</span>
                  </li>
                ))}
              </ul>

              <button onClick={() => { track('plan', p.name); onCta() }} style={{
                width: '100%', padding: '12px',
                background: p.highlight ? '#EAC57C' : 'transparent',
                color: '#10384A',
                fontSize: 14, fontWeight: 700,
                border: p.highlight ? 'none' : '1.5px solid #C6DCDC',
                borderRadius: 6, cursor: 'pointer',
              }}>{p.cta} →</button>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12, color: '#52676F', marginTop: 24 }}>
          {L.pricing.note}
        </p>
      </div>
    </section>
  )
}

// ─── For / For ───────────────────────────────────────────────────────────────

function ForSection({ L, onCta }: { L: Copy; onCta: (topic?: string) => void }) {
  const check = (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0B5152" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  )
  return (
    <section id="for-section" style={{ background: '#FFFFFF', padding: '80px 24px', scrollMarginTop: 68 }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 2, border: '1px solid #C6DCDC', borderRadius: 12, overflow: 'hidden',
      }}>
        <div style={{ background: '#F5F9F9', padding: '52px 48px' }}>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: '0.1em', color: '#52676F', textTransform: 'uppercase' }}>{L.forSec.k1}</span>
          <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 700, color: '#10384A', marginTop: 10, marginBottom: 28, letterSpacing: '-0.01em' }}>{L.forSec.h1[0]}<br/>{L.forSec.h1[1]}</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px' }}>
            {L.forSec.l1.map((p, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
                <span style={{ flexShrink: 0, marginTop: 2 }}>{check}</span>
                <span style={{ fontSize: 14.5, lineHeight: 1.55, color: '#52676F' }}>{p}</span>
              </li>
            ))}
          </ul>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: '#10384A', background: '#E9F3F3', borderRadius: 8, padding: '12px 16px', margin: '0 0 24px' }}>{L.forSec.principle}</p>
          <button onClick={() => onCta()} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 24px', background: '#10384A', color: '#FFFFFF',
            fontSize: 14, fontWeight: 600, borderRadius: 6, border: 'none', cursor: 'pointer',
          }}>{L.forSec.c1} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
        </div>

        <div style={{ background: '#E9F3F3', padding: '52px 48px' }}>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: '0.1em', color: '#52676F', textTransform: 'uppercase' }}>{L.forSec.k2}</span>
          <h3 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(22px, 2.5vw, 30px)', fontWeight: 700, color: '#10384A', marginTop: 10, marginBottom: 28, letterSpacing: '-0.01em' }}>{L.forSec.h2[0]}<br/>{L.forSec.h2[1]}</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 36px' }}>
            {L.forSec.l2.map((p, i) => (
              <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 14 }}>
                <span style={{ flexShrink: 0, marginTop: 2 }}>{check}</span>
                <span style={{ fontSize: 14.5, lineHeight: 1.55, color: '#52676F' }}>{p}</span>
              </li>
            ))}
          </ul>
          <button onClick={() => onCta(EXTRA_KEYS.hjelper)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '12px 24px', background: '#FFFFFF', color: '#10384A',
            fontSize: 14, fontWeight: 600, borderRadius: 6,
            border: '1px solid #C6DCDC', cursor: 'pointer',
          }}>{L.forSec.c2} <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg></button>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

function FAQ({ L }: { L: Copy }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" style={{ background: '#F5F9F9', padding: '80px 24px', scrollMarginTop: 68 }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <span style={{ fontFamily: '"DM Mono", monospace', fontSize: 11, letterSpacing: '0.1em', color: '#52676F', textTransform: 'uppercase' }}>{L.faq.kicker}</span>
          <h2 style={{ fontFamily: '"Playfair Display", Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 700, color: '#10384A', marginTop: 12, letterSpacing: '-0.02em' }}>{L.faq.h2}</h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {L.faq.items.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={i} style={{ borderTop: i === 0 ? '1px solid #C6DCDC' : 'none' }}>
                <div style={{ borderBottom: '1px solid #C6DCDC' }}>
                  <button
                    onClick={() => { if (!isOpen) track('faq', faq.q); setOpen(isOpen ? null : i) }}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    style={{
                      width: '100%', textAlign: 'left',
                      padding: '20px 0',
                      background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                    }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 600, color: '#10384A', lineHeight: 1.4 }}>{faq.q}</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#52676F" strokeWidth="1.7" strokeLinecap="round" style={{
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                    }}>
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                  {isOpen && (
                    <p id={`faq-panel-${i}`} style={{ fontSize: 15, lineHeight: 1.7, color: '#52676F', paddingBottom: 20, margin: 0 }}>{faq.a}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ───────────────────────────────────────────────────────────────

function FinalCTA({ L, onCta }: { L: Copy; onCta: () => void }) {
  const [email, setEmail] = useState('')
  const [done, setDone]   = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    // Pilot: open mail client
    window.open(`mailto:hei@naviar.no?subject=Ventliste-påmelding&body=E-post: ${encodeURIComponent(email)}`)
    track('submit', 'venteliste')
    setDone(true)
  }

  return (
    <section id="cta" style={{ background: '#10384A', padding: '96px 24px', textAlign: 'center', scrollMarginTop: 68 }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
          <NaviarLogo size={32} dark />
        </div>

        <h2 style={{
          fontFamily: '"Playfair Display", Georgia, serif',
          fontSize: 'clamp(32px, 4vw, 52px)',
          fontWeight: 700, color: '#FFFFFF',
          marginBottom: 20, letterSpacing: '-0.02em', textWrap: 'balance',
        }}>{L.finalCta.h2[0]}<br/>{L.finalCta.h2[1]}</h2>

        <p style={{ fontSize: 17, color: '#A7D1CE', maxWidth: 400, margin: '0 auto 44px', lineHeight: 1.6 }}>
          {L.finalCta.lead}
        </p>

        {done ? (
          <div style={{ padding: '20px 28px', background: 'rgba(216,239,117,0.12)', borderRadius: 10, border: '1px solid rgba(216,239,117,0.25)', maxWidth: 380, margin: '0 auto' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#EAC57C', marginBottom: 6 }}>{L.finalCta.thanks}</div>
            <p style={{ fontSize: 14, color: '#A7D1CE', margin: 0 }}>{L.finalCta.thanksSub}</p>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, maxWidth: 400, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
              <input
                type="email" required value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={L.finalCta.placeholder}
                aria-label={L.modal.email}
                style={{
                  flex: '1 1 200px', padding: '13px 18px',
                  fontSize: 15, borderRadius: 6,
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.07)', color: '#FFFFFF',
                  outline: 'none', fontFamily: '"DM Sans", system-ui, sans-serif',
                }}
              />
              <button type="submit" style={{
                padding: '13px 24px',
                background: '#EAC57C', color: '#10384A',
                fontSize: 15, fontWeight: 700,
                borderRadius: 6, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
              }}>{L.finalCta.btn}</button>
            </form>

            <p style={{ fontSize: 13, color: '#A7D1CE', marginTop: 16 }}>{L.finalCta.noBind}</p>

            <div style={{ marginTop: 28, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <button onClick={onCta} style={{
                fontSize: 14, fontWeight: 500, color: '#A7D1CE',
                background: 'none', border: 'none', cursor: 'pointer',
                textDecoration: 'underline', textUnderlineOffset: 3,
              }}>{L.finalCta.or}</button>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer({ L }: { L: Copy }) {
  return (
    <footer style={{ background: '#0A2530', padding: '40px 24px 48px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32, marginBottom: 32 }}>
          {/* Logo + tagline */}
          <div style={{ maxWidth: 260 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <NaviarMonogram size={22} color="#9FC8C9" />
              <div style={{ lineHeight: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.22em', color: '#9FC8C9' }}>NAVIAR</div>
                <div style={{ fontSize: 7, fontWeight: 700, letterSpacing: '0.34em', color: '#9FC8C9', textTransform: 'uppercase', marginTop: 2, textAlign: 'right' }}>CARE</div>
              </div>
            </div>
            <p style={{ fontSize: 13, color: '#9FC8C9', lineHeight: 1.55, margin: 0 }}>{L.footer.tagline}</p>
            <p style={{ fontSize: 12, color: '#9FC8C9', lineHeight: 1.55, margin: '8px 0 0' }}>{L.footer.area}</p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 52, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: '0.08em', color: '#9FC8C9', textTransform: 'uppercase', marginBottom: 12 }}>{L.footer.col1}</div>
              {L.footer.col1Links.map(l => (
                <div key={l} style={{ marginBottom: 8 }}><a href="#" style={{ fontSize: 13.5, color: '#A7D1CE', textDecoration: 'none' }}>{l}</a></div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: '"DM Mono", monospace', fontSize: 10, letterSpacing: '0.08em', color: '#9FC8C9', textTransform: 'uppercase', marginBottom: 12 }}>{L.footer.col2}</div>
              {L.footer.col2Links.map(l => (
                <div key={l} style={{ marginBottom: 8 }}><a href="#" style={{ fontSize: 13.5, color: '#A7D1CE', textDecoration: 'none' }}>{l}</a></div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1D4E5E', paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
          <p style={{ fontFamily: '"DM Mono", monospace', fontSize: 11, color: '#9FC8C9', margin: 0 }}>{L.footer.copyright}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <button onClick={clearAllLocalData} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 12, color: '#9FC8C9', textDecoration: 'underline', textUnderlineOffset: 2, padding: 0,
            }}>{L.footer.wipe}</button>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9FC8C9" strokeWidth="2" strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span style={{ fontSize: 12, color: '#9FC8C9' }}>{L.footer.gdpr}</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLangState] = useState<Lang>(() => detectLang())
  const [menuOpen, setMenuOpen]       = useState(false)
  const [modalOpen, setModalOpen]     = useState(false)
  const [initialTopic, setInitialTopic] = useState<string | undefined>(undefined)
  const [consent, setConsent] = useState<'all' | 'necessary' | null>(() => getConsent())
  const L = COPY[lang]
  const top  = consent === 'all' ? topCategory() : null
  const next = consent === 'all' ? nextStep(L) : null

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.style.scrollBehavior = 'smooth'
    }
    return () => { document.documentElement.style.scrollBehavior = '' }
  }, [])

  function setLang(l: Lang) {
    setLangState(l)
    try { localStorage.setItem(LANG_KEY, l) } catch {}
  }

  function handleCookieAccept(level: 'all' | 'necessary') {
    try { localStorage.setItem(CONSENT_KEY, level) } catch {}
    setConsent(level)
  }

  function openModal(topic?: unknown) {
    const t = typeof topic === 'string' ? topic : undefined
    setInitialTopic(t)
    track('cta', t || 'generell')
    setModalOpen(true)
    setMenuOpen(false)
  }

  return (
    <div style={{ fontFamily: '"DM Sans", system-ui, sans-serif', WebkitFontSmoothing: 'antialiased' }}>
      <Nav L={L} lang={lang} setLang={setLang} menuOpen={menuOpen} setMenuOpen={setMenuOpen} onCta={openModal} />
      <main>
        <Hero L={L} onCta={openModal} next={next} />
        <Promises L={L} />
        <PhotoBand L={L} />
        <HowItWorks L={L} />
        <Categories L={L} onCta={openModal} top={top} />
        <Trygghet L={L} />
        <PilotStatus L={L} />
        <Testimonials L={L} />
        <Experts L={L} onCta={openModal} />
        <Fritidskontakt L={L} onCta={openModal} />
        <Pricing L={L} onCta={openModal} />
        <ForSection L={L} onCta={openModal} />
        <FAQ L={L} />
        <FinalCTA L={L} onCta={openModal} />
      </main>
      <Footer L={L} />
      <NaviChat L={L} onCta={openModal} lifted={!consent} />
      {modalOpen && <ContactModal L={L} onClose={() => setModalOpen(false)} initialTopic={initialTopic} />}
      {!consent && <CookieBanner L={L} onAccept={handleCookieAccept} />}
    </div>
  )
}
