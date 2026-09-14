# BETA ART — Oppstartspakke

**Prosjektstart 16. august 2026.** Fire dokumenter du trenger for å komme i gang,
i den rekkefølgen de skal brukes.

---

## 1 · Metadatastandard v0.1

*Vedtak 10. Denne blokkerer pilotene — uten fast navngiving bygger du et rot du ikke
kan rydde i senere. Den skal passe på én side, og den skal ikke endres midt i et
prosjekt.*

### Filnavn

```
BA-{prosjektnr}-{ÅÅÅÅMMDD}-{sone}-{fase}-{løpenr}.{ext}
```

Eksempel: `BA-2601-20260903-B02-TETT-0147.CR3`

### Felter som følger hvert oppdrag

| Felt | Format | Eksempel | Obligatorisk |
|---|---|---|---|
| Prosjektnummer | `BA-ÅÅNN` | BA-2601 | Ja |
| Prosjektnavn | fritekst | Storgata 14, rehabilitering | Ja |
| Oppdragsgiver | organisasjonsnavn | — | Ja |
| Dato | ÅÅÅÅMMDD | 20260903 | Ja |
| Sone | bygg/etasje/akse | B02 = bygg B, 2. etasje | Ja |
| Fase | fast liste | GRUNN · RÅBYGG · TETT · INNV · FERDIG · AVVIK | Ja |
| Fotograf | navn + sertifikatnr | — | Ja |
| Utstyr | kamera + objektiv | fra EXIF | Automatisk |
| Oppbevaring til | ÅÅÅÅ | 2031 | Ja |
| Merknad | fritekst | «avvik meldt i KS-sak 214» | Nei |

**Faselista er lukket.** Sju verdier, ikke flere. Åpner du for fritekst her, mister
du gjenfinning på tvers av prosjekter — som er hele produktet.

**Sone er det vanskeligste.** Spør kunden hvilken soneinndeling de allerede bruker i
sitt eget prosjektverktøy, og bruk den. Ikke innfør din egen.

---

## 2 · Til personvernjuristen

*Vedtak 2. Blokkerende. Dette er den samtalen som står mellom deg og en publiserbar
nettside — send den som e-post og be om et prisestimat på skriftlig svar.*

> Jeg starter en tjeneste som tar imot og arkiverer fotodokumentasjon fra
> byggeprosjekter på vegne av entreprenører. Bildene kan inneholde gjenkjennelige
> arbeidere. Fotografene er selvstendige oppdragstakere som laster opp til min
> plattform. Jeg trenger avklart:
>
> 1. Er jeg databehandler for oppdragsgiveren, og hva må databehandleravtalen dekke?
> 2. Hva må stå i fotografens oppdragsavtale for at overføring til meg er lovlig?
> 3. Kan jeg lagre RAW-filer i ti år, og hva krever det av sletterutiner?
> 4. Hvilket behandlingsgrunnlag gjelder for bilder av arbeidere — og er det
>    oppdragsgiver eller jeg som må sikre det?
> 5. Jeg vil utstede en «verifiseringsrapport». Hvilke formuleringer må unngås for
>    at den ikke leses som en garanti jeg ikke kan innfri?
>
> Jeg trenger en databehandleravtale jeg kan publisere åpent på nettsiden.

**Be spesifikt om at avtalen kan publiseres.** Det er en uvanlig bestilling, og det
er hele salgspoenget i vedtak 13.

---

## 3 · Prisstesten

*Vedtak 9 hviler på én antakelse: at 15 000 går inn i prosjektbudsjettet. Test den på
fire prosjektledere før prisen trykkes noe sted.*

Ring, ikke send e-post. Femten minutter. Ordrett:

> «Jeg holder på å sette opp en tjeneste for arkivering av prosjektdokumentasjon, og
> jeg trenger å vite om jeg har priset den feil. Har du fem minutter?»
>
> 1. Hvem bestiller fotografering hos dere i dag?
> 2. Hvor ligger bildene fra et prosjekt dere avsluttet i fjor?
> 3. Hvis jeg tok 15 000 for å arkivere et prosjekt i fem år — ville det gått inn i
>    prosjektbudsjettet, eller måtte det til ledelsen?
> 4. Hva ville måtte være med for at det var verdt 15 000?

**Spørsmål 3 er hele testen.** Sier tre av fire «prosjektbudsjett», er vedtak 9
riktig. Sier de «det må til ledelsen», er du like langt som med abonnement, og
modellen må revideres på nytt.

Spørsmål 4 gir deg kravspesifikasjonen gratis.

---

## 4 · De første fjorten dagene

| Dag | Handling | Ferdig når |
|---|---|---|
| 1 | Send juristbrevet | E-post sendt |
| 1 | Registrer enkeltpersonforetak | Org.nr. mottatt |
| 2–3 | Ring fire prosjektledere (prisstesten) | Fire svar på spørsmål 3 |
| 4 | Ring tre fotografer: «tar du 8 500 for en dag jeg skaffer?» | Tre svar |
| 5 | Ferdigstill metadatastandarden med kundens soneinndeling | Én A4 |
| 6–7 | Publiser nettsiden med org.nr. og ekte e-post | Live |
| 8–10 | Ring ti entreprenører. Book tjue minutter | Tre møter booket |
| 11–14 | Avhold møtene. Selg ett pilotprosjekt | **Én signert pilot** |

**Måltallet for dag 14 er ett solgt pilotprosjekt.** Ikke besøkende, ikke
registreringer, ikke ferdig plattform.

---

## Det som fortsatt er uavklart

**Agent eller mellommann** (vedtak 6) må avklares med regnskapsfører før du sender
den første fakturaen. Det avgjør om du fakturerer 11 000 eller 2 500 for en
formidlet dag, og det påvirker både prising og likviditet.

**Verifiseringsmetodikken må publiseres** før første sertifikat utstedes. Du har
utkastet fra før — det trenger en gjennomlesing av juristen i samme runde som
databehandleravtalen. Ta begge i én bestilling; det er billigere.

---

*Analyse og struktur, ikke juridisk, skatte- eller forsikringsrådgivning. Punktene om
personvern, avtaler, mva. og ansvar må avklares med kvalifiserte personer før du
signerer eller fakturerer.*
