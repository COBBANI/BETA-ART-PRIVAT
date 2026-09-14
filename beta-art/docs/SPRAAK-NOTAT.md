# BETA ART — Språknotat

**Dato:** 16. august 2026 · **Omfang:** forsiden, 31 tekstnøkler, 13 språk

---

## Det viktigste funnet først

Den eksisterende flerspråksfilen hadde seks språk — engelsk, spansk, tyrkisk, kinesisk,
hindi og arabisk — **men ikke norsk.** Nettstedet heter betaart.no, hjemmemarkedet er
Norge, hele vekstplanen starter i Norge, og forsiden fantes ikke på norsk.

Det er nå rettet. Norsk (bokmål) står først i lista.

---

## Språk som nå er dekket

| Kode | Språk | Hvorfor |
|---|---|---|
| `nb` | Norsk bokmål | Hjemmemarked — manglet helt |
| `en` | English | Internasjonal standard for lisensiering |
| `de` | Deutsch | Størst B2B-lisensieringsmarked i Europa |
| `fr` | Français | Nest største europeiske marked |
| `es` | Español | Du ba om det · stort volum |
| `it` | Italiano | Europeisk redaksjonsmarked |
| `nl` | Nederlands | Høy engelskkompetanse, men konverterer bedre på eget språk |
| `sv` | Svenska | Nordisk ekspansjon — FASE 3 i vekstplanen |
| `da` | Dansk | Nordisk ekspansjon — FASE 3 |
| `tr` | Türkçe | Du ba om det |
| `zh` | 中文 | Fantes allerede |
| `hi` | हिन्दी | Fantes allerede |
| `ar` | العربية | Fantes allerede (RTL fungerer) |

403 strenger totalt. Alle 13 språk er komplette — ingen hull, ingen tomme felt.

---

## Hva som er endret teknisk

**Språkvelgeren er byttet fra knapper til nedtrekksmeny.** Tretten knapper får ikke plass
i en navigasjonslinje. Menyen viser språknavn på språket selv (Deutsch, ikke German).

**Automatisk språkgjenkjenning.** Rekkefølgen er: `?lang=` i URL → lagret valg →
nettleserspråk → engelsk. `no` og `nn` mappes til `nb`, slik at nynorskbrukere og eldre
`no`-koder ikke faller ut til engelsk.

**Delbare URL-er.** Valg av språk skriver `?lang=de` inn i adressefeltet uten omlasting.
Det gjør det mulig å sende en lenke direkte til den tyske versjonen.

**hreflang er lagt inn** for alle 13 språk pluss `x-default`.

---

## Tre ting du må vite før du regner dette som ferdig

**1. Dette gir foreløpig ingen SEO-effekt.**
Oversettelsen skjer i nettleseren med JavaScript. Google indekserer én versjon — den
engelske statiske markupen. `hreflang`-taggene peker på `?lang=xx`, som er bedre enn
ingenting, men reell flerspråklig SEO krever egne URL-er som serveres ferdig oversatt
(`/de/`, `/es/`) med server-side rendering. Med Next.js er det i18n-routing, ikke en stor
jobb — men det er en egen oppgave. Inntil da er oversettelsen en høflighet mot besøkende,
ikke en trafikkilde.

**2. Juridiske sider skal ikke maskinoversettes.**
Jeg har bevisst latt personvern, lisensbetingelser og informasjonskapsler stå urørt.
Oversatt juridisk tekst skaper ansvar: hvis den engelske og den tyske lisensteksten sier
litt forskjellige ting, er det uklart hvilken som gjelder. Standardløsningen er å beholde
én bindende språkversjon (norsk eller engelsk) og eventuelt legge ut oversettelser merket
som *uforpliktende oversettelse — den norske versjonen er bindende*. Det bør en jurist
bekrefte, ikke jeg.

**3. Selve merket bør ikke oversettes.**
«Verified Human Photograph» er tettere på et varemerke enn på en setning. I
verifiseringsmetodikken er det et definert begrep med et presist innhold. Hvis det står
*Verifiziertes menschliches Foto* på tysk og *Verified Human Photograph* på engelsk, er
det to merker, ikke ett. Anbefaling: behold merket på engelsk overalt, med en forklaring
på lokalspråket ved siden av. Jeg har oversatt den *beskrivende* teksten rundt merket,
men ikke rørt selve merkenavnet der det opptrer som navn.

---

## En innvending verdt å vurdere

Kjøperen din — slik forretningsplanen og bransjelista beskriver den — er et norsk eller
nordisk B2B-selskap som lisensierer bilder. Kinesisk, hindi og arabisk er allerede bygget,
så det koster ingenting å beholde dem. Men de kommer neppe til å konvertere, og hvert
språk du legger til er tekst som må vedlikeholdes hver gang copyen endres.

Verdt å teste: se på hvilke språk som faktisk brukes i analytics de første månedene, og
la de som ikke brukes ligge urørt i stedet for å oppdatere alle tretten hver gang.

---

## Neste steg

Oversettelsen dekker forsiden. Ikke oversatt ennå: FAQ, kontaktsiden, plate-sidene,
kassen. Si fra hvilken du vil ha neste gang — FAQ er den mest åpenbare, siden den er
ren salgstekst uten juridisk risiko.
