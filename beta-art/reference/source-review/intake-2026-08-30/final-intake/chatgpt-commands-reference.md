# ChatGPT-kommandoer og promptkoder – oppdatert 16. august 2026

Dette er en samlet oversikt over dokumenterte ChatGPT- og Codex-kommandoer, hurtigtaster, CLI-kommandoer og nyttige egendefinerte promptkoder.

## Viktig avgrensning

- **Innebygd** betyr at kommandoen er dokumentert av OpenAI.
- **Betinget** betyr at kommandoen bare vises på enkelte plattformer, planer, modeller, arbeidsområder eller utrullinger.
- **Eksperimentell** betyr at funksjonen kan endres eller forsvinne.
- **Egendefinert promptkode** betyr vanlig tekstinstruksjon, ikke en hemmelig ChatGPT-funksjon.
- **Interne eller ikke-offentliggjorte systemkommandoer** kan ikke listes eller verifiseres. Systeminstruksjoner, sikkerhetsregler, interne verktøy, private endepunkter, A/B-testflagg og uutgitte funksjoner er ikke brukerkommandoer og kan ikke pålitelig aktiveres fra en chat.

Tilgjengelige kommandoer varierer. Den sikreste kontrollen er alltid å skrive `/` i skrivefeltet, åpne hurtigtastoversikten eller kjøre `codex --help` i den aktuelle installasjonen.

---

## 1. Innebygde slash-kommandoer i ChatGPT/Codex-appen

Skriv `/` i skrivefeltet. Bare kommandoer som kontoen og miljøet ditt støtter, vises.

| Kommando | Funksjon | Status/merknad |
|---|---|---|
| `/approve` | Godkjenn ett nytt forsøk etter et avslag fra automatisk gjennomgang | Betinget |
| `/cloud` | Kjør chatten i skyen | Betinget |
| `/cloud-environment` | Velg skymiljø | Betinget |
| `/compact` | Komprimer samtalekonteksten | Innebygd |
| `/fast` | Slå tilgjengelig Fast-tjenestenivå av/på | Modellavhengig |
| `/feedback` | Åpne tilbakemeldingsdialogen | Innebygd |
| `/fork` | Lag en kopi av lokal chat eller arbeidsgren | Betinget |
| `/goal` | Sett et vedvarende mål ChatGPT skal arbeide mot | Betinget |
| `/ide-context` | Slå delt IDE-kontekst av/på | IDE-avhengig |
| `/init` | Opprett et grunnskjelett for `AGENTS.md` | Prosjekt/Codex |
| `/local` | Kjør chatten i valgt lokalt prosjekt | Skrivebordsapp |
| `/mcp` | Vis status for tilkoblede MCP-servere | Betinget |
| `/memories` | Konfigurer bruk eller generering av minner | Betinget |
| `/model` | Velg modell for chatten | Tilgjengelighet varierer |
| `/pet` | Vekk eller skjul skrivebordskjæledyret | Betinget |
| `/personality` | Velg kommunikasjonsstil | Modellavhengig |
| `/plan` | Slå på planmodus for oppgaver i flere trinn | Betinget |
| `/project` | Velg prosjekt for nye chatter | Betinget |
| `/reasoning` | Velg resonneringsinnsats | Modellavhengig |
| `/review` | Start kodegjennomgang | Codex/prosjekt |
| `/side` | Start en midlertidig sidechat | Betinget |
| `/status` | Vis chat-ID, kontekstbruk og grenser | Codex |
| `/task` | Start en chat uten prosjekt | Betinget |
| `/worktree` | Kjør chatten i et nytt Git-worktree | Codex/Git |

### Andre komponeringsoperatorer

| Tegn/syntaks | Funksjon |
|---|---|
| `/` | Åpner menyen med tilgjengelige slash-kommandoer og aktiverte ferdigheter |
| `$` | Søker etter eller påkaller en aktivert ferdighet |
| `@` | Legger ved eller refererer til fil/ressurs der grensesnittet støtter det |
| `[@Navn](plugin://...)` | Refererer til en installert plugin i støttede ChatGPT/Codex-miljøer |
| `/prompts:navn` | Kaller en eldre egendefinert Codex-prompt; denne mekanismen er utfaset til fordel for ferdigheter |

---

## 2. Hurtigtaster i ChatGPT-skrivebordsappen

Bruk `Cmd` på macOS og `Ctrl` på Windows der tabellen viser `Cmd/Ctrl`.

| Handling | Hurtigtast |
|---|---|
| Kommandomeny | `Cmd/Ctrl + Shift + P` eller `Cmd/Ctrl + K` |
| Innstillinger | `Cmd/Ctrl + ,` |
| Vis hurtigtaster | `Cmd/Ctrl + Shift + /` |
| Åpne mappe | `Cmd/Ctrl + O` |
| Naviger tilbake | `Cmd/Ctrl + [` |
| Naviger fremover | `Cmd/Ctrl + ]` |
| Større skrift | `Cmd/Ctrl + +` |
| Mindre skrift | `Cmd/Ctrl + -` |
| Vis/skjul sidefelt | `Cmd/Ctrl + B` |
| Åpne review-fanen | `Ctrl + Shift + G` |
| Vis/skjul review-panel | `Cmd/Ctrl + Alt + B` |
| Vis/skjul bunnpanel | `Cmd/Ctrl + J` |
| Vis/skjul terminal | `Ctrl + \`` |
| Tøm terminalvisning | `Ctrl + L` |
| Hurtigchat | macOS: `Cmd + Option + N`; Windows: `Ctrl + Alt + N` |
| Ny chat | `Cmd/Ctrl + N` eller `Cmd/Ctrl + Shift + O` |
| Søk i chatter | `Cmd/Ctrl + G` |
| Finn i aktiv chat | `Cmd/Ctrl + F` |
| Forrige chat | `Cmd/Ctrl + Shift + [` |
| Neste chat | `Cmd/Ctrl + Shift + ]` |
| Diktering | `Ctrl + Shift + D` |

Hurtigtastene kan søkes opp, endres eller nullstilles under **Settings → Keyboard Shortcuts**.

---

## 3. Offisielle `codex://`-dyplenker

| Lenkeform | Åpner |
|---|---|
| `codex://threads/new` | Ny lokal chat |
| `codex://new?prompt={URL-kodet tekst}` | Ny chat med forhåndsutfylt prompt |
| `codex://new?path={absolutt mappe}` | Ny chat i lokal mappe |
| `codex://new?originUrl={Git-remote}` | Ny chat knyttet til passende prosjektrot |
| `codex://threads/{THREAD_ID}` | Bestemt lokal chat |
| `codex://settings` | Innstillinger |
| `codex://settings/browser-use` | Nettleserinnstillinger |
| `codex://settings/computer-use/google-chrome` | Chrome/Computer Use-innstillinger |
| `codex://settings/connections` | Tilkoblinger |
| `codex://settings/connections/computer` | Kontroll av denne datamaskinen |
| `codex://settings/connections/devices` | Tilkoblede enheter |
| `codex://settings/connections/ssh` | SSH-tilkoblinger |
| `codex://settings/connections/ssh/add?name={SSH_ALIAS}` | Legg til vert fra SSH-konfigurasjon |
| `codex://skills` | Ferdigheter |
| `codex://automations` | Opprett planlagt oppgave |
| `codex://plugins/{PLUGIN_ID}` | Detaljsiden for en plugin |
| `codex://plugins/install/{PLUGIN_ID}?marketplace={MARKEDSPLASS}` | Installasjonsflyt for plugin |
| `codex://plugins/{PLUGIN_ID}?marketplacePath={ABSOLUTT_STI}` | Lokal plugin-detaljside |
| `codex://pets/install?name={NAVN}&imageUrl={HTTPS_URL}` | Installasjon av skrivebordskjæledyr |

Parameterverdier må URL-kodes. En dyplenke åpner vanligvis chatten eller skrivefeltet; den sender ikke nødvendigvis meldingen automatisk.

---

## 4. Codex IDE-utvidelse

### Kommandoer i VS Code Command Palette

| Kommando-ID | Funksjon |
|---|---|
| `chatgpt.addToThread` | Legg markert tekst til aktiv chat |
| `chatgpt.addFileToThread` | Legg hele filen til aktiv chat |
| `chatgpt.newChat` | Opprett ny chat |
| `chatgpt.newCodexPanel` | Opprett nytt Codex-panel |
| `chatgpt.openCommandMenu` | Åpne Codex-kommandomenyen |
| `chatgpt.openSidebar` | Åpne Codex-sidefeltet |

Standard for ny chat er `Cmd + N` på macOS og `Ctrl + N` på Windows/Linux.

### Slash-kommandoer i IDE-utvidelsen

`/approve`, `/cloud`, `/cloud-environment`, `/compact`, `/fast`, `/feedback`, `/fork`, `/goal`, `/ide-context`, `/init`, `/local`, `/mcp`, `/memories`, `/model`, `/personality`, `/plan`, `/project`, `/reasoning`, `/review`, `/side`, `/status`, `/worktree`.

---

## 5. Codex CLI – innebygde slash-kommandoer

Skriv `/` i Codex-terminalens skrivefelt. Flere av kommandoene er betingede.

### Modell, mål og tillatelser

| Kommando | Funksjon |
|---|---|
| `/model` | Velg aktiv modell og eventuell resonneringsinnsats |
| `/fast` | Slå Fast-nivå av/på når modellen støtter det |
| `/personality` | Velg `friendly`, `pragmatic` eller `none` når støttet |
| `/plan` | Gå til planmodus; kan etterfølges av prompttekst |
| `/goal` | Vis eller sett mål |
| `/goal edit` | Rediger målet |
| `/goal pause` | Sett målet på pause |
| `/goal resume` | Fortsett målet |
| `/goal clear` | Fjern målet |
| `/permissions` | Endre godkjennings- og tillatelsesprofil |
| `/approve` | Godkjenn ett nytt forsøk etter automatisk avslag |
| `/memories` | Konfigurer minner |
| `/experimental` | Slå eksperimentelle funksjoner av/på |

### Chatter, økter og kontekst

| Kommando | Funksjon |
|---|---|
| `/new` | Start ny chat uten å tømme terminalvisningen |
| `/clear` | Tøm terminalen og start ny chat |
| `/resume` | Fortsett en lagret chat |
| `/fork` | Lag en ny gren av aktiv chat |
| `/side` eller `/btw` | Start midlertidig sidechat |
| `/rename` | Gi chatten nytt navn |
| `/archive` | Arkiver økten og avslutt |
| `/delete` | Slett økten permanent, inkludert etterkommere |
| `/compact` | Oppsummer eldre kontekst for å frigjøre plass |
| `/status` | Vis modell, tillatelser, skrivbare røtter og tokenbruk |
| `/usage` | Åpne bruksmenyen |
| `/usage daily` | Vis daglig tokenaktivitet |
| `/usage weekly` | Vis ukentlig tokenaktivitet |
| `/usage cumulative` | Vis kumulativ tokenaktivitet |

### Kode, filer og kontroll

| Kommando | Funksjon |
|---|---|
| `/ide` | Inkluder åpne filer, markering og IDE-kontekst |
| `/mention {sti}` | Legg fil eller mappe eksplisitt til chatten |
| `/diff` | Vis Git-differanser og usporede filer |
| `/review` | Gjennomgå arbeidstreet |
| `/init` | Generer `AGENTS.md`-grunnskjelett |
| `/copy` | Kopier siste fullførte svar |
| `/ps` | Vis bakgrunnsterminaler og nylig utdata |
| `/stop` eller `/clean` | Stopp alle bakgrunnsterminaler for økten |

### Verktøy, agenter og utvidelser

| Kommando | Funksjon |
|---|---|
| `/agent` eller `/subagents` | Bytt mellom agenttråder |
| `/mcp` | List MCP-servere og verktøy |
| `/mcp verbose` | Vis mer detaljert MCP-diagnostikk |
| `/apps` | Bla gjennom apper/tilkoblinger og sett inn `$app-slug` |
| `/plugins` | Bla gjennom, inspiser og administrer plugins |
| `/skills` | Velg og bruk ferdighet |
| `/hooks` | Vis og administrer livssyklushooks |
| `/import` | Importer støttede oppsett og chatter fra Claude Code eller Cursor |

### Terminalgrensesnitt

| Kommando | Funksjon |
|---|---|
| `/vim` | Slå Vim-modus av/på i skrivefeltet |
| `/keymap` | Se og endre TUI-hurtigtaster |
| `/raw`, `/raw on`, `/raw off` | Kontroller rå rullevisning |
| `/statusline` | Konfigurer statuslinjen |
| `/title` | Konfigurer terminaltittelen |
| `/theme` | Velg syntaksfargetema |
| `/pets` eller `/pet` | Velg eller skjul terminalkjæledyr |
| `/pets off` | Skjul kjæledyret |

### Plattform, støtte og avslutning

| Kommando | Funksjon |
|---|---|
| `/app` | Fortsett aktiv økt i ChatGPT-skrivebordsappen |
| `/setup-default-sandbox` | Sett opp forhøyet Windows-sandkasse |
| `/sandbox-add-read-dir {absolutt sti}` | Gi Windows-sandkassen lesetilgang til ekstra mappe |
| `/debug-config` | Vis konfigurasjonslag og gjeldende policykrav |
| `/feedback` | Send tilbakemelding med valgfri diagnostikk |
| `/logout` | Logg ut og fjern lokale legitimasjoner |
| `/quit` eller `/exit` | Avslutt CLI |

### Andre interaktive CLI-snarveier

| Snarvei | Funksjon |
|---|---|
| `@` | Søk etter fil i arbeidsområdet |
| `!kommando` | Kjør lokal skallkommando under gjeldende tillatelser |
| `↑` / `↓` | Gjenopprett utkastshistorikk |
| `Ctrl + R` | Søk i prompthistorikk |
| `Ctrl + O` | Kopier siste fullførte Codex-svar |
| `Tab` mens Codex arbeider | Legg oppfølging, slash- eller skallkommando i kø |
| `Enter` mens Codex arbeider | Styr aktiv kjøring med ny instruksjon |
| `Esc` to ganger med tomt felt | Rediger forrige brukermelding og forgren derfra |
| `Ctrl + C` | Avslutt økten |

---

## 6. Codex CLI – toppnivåkommandoer

### Stabile kommandoer

| Kommando | Funksjon |
|---|---|
| `codex` | Start interaktiv terminal |
| `codex app [PATH]` | Start ChatGPT-skrivebordsappen |
| `codex apply TASK_ID` eller `codex a TASK_ID` | Bruk siste diff fra en Codex-skyoppgave lokalt |
| `codex archive SESSION` | Arkiver lagret økt |
| `codex unarchive SESSION` | Gjenopprett arkivert økt |
| `codex delete SESSION` | Slett lagret økt |
| `codex completion [SHELL]` | Generer skallfullføring |
| `codex doctor` | Lag diagnostisk rapport |
| `codex exec PROMPT` eller `codex e PROMPT` | Kjør Codex ikke-interaktivt |
| `codex exec resume [SESSION_ID]` | Fortsett en ikke-interaktiv økt |
| `codex features list` | Vis funksjonsflagg og status |
| `codex features enable FEATURE` | Aktiver funksjonsflagg permanent |
| `codex features disable FEATURE` | Deaktiver funksjonsflagg permanent |
| `codex fork [SESSION_ID]` | Forgren tidligere økt |
| `codex login` | Logg inn |
| `codex login status` | Vis innloggingsstatus |
| `codex logout` | Logg ut |
| `codex mcp` | Administrer MCP-servere |
| `codex mcp-server` | Kjør Codex som MCP-server over stdio |
| `codex plugin` | Administrer plugins |
| `codex plugin marketplace` | Administrer plugin-markedsplasser |
| `codex resume [SESSION_ID]` | Fortsett interaktiv økt |
| `codex review` | Kjør ikke-interaktiv kodegjennomgang |
| `codex sandbox` | Kjør kommando i Codex-sandkasse |
| `codex update` | Kontroller og installer CLI-oppdatering når støttet |

### Eksperimentelle eller utviklerrettede kommandoer

| Kommando | Funksjon |
|---|---|
| `codex app-server` | Start lokal app-server |
| `codex cloud` eller `codex cloud-tasks` | Bla gjennom eller kjør Codex-skyoppgaver |
| `codex cloud list` | List skyoppgaver |
| `codex debug app-server send-message-v2` | Test V2-melding mot app-server |
| `codex debug models` | Vis rå modellkatalog |
| `codex debug prompt-input` | Vis modellens promptinndata som JSON |
| `codex execpolicy` | Evaluer `.rules`-filer mot en kommando |
| `codex remote-control` | Kjør fjernkontroll i forgrunnen |
| `codex remote-control start` | Start lokal app-serverdaemon med fjernkontroll |
| `codex remote-control stop` | Stopp daemonen |
| `codex remote-control pair` | Opprett kortlivet parkode |

### MCP-underkommandoer

`codex mcp add`, `codex mcp get`, `codex mcp list`, `codex mcp login`, `codex mcp logout`, `codex mcp remove`.

### Plugin-underkommandoer

`codex plugin add`, `codex plugin list`, `codex plugin remove`, `codex plugin marketplace add`, `codex plugin marketplace list`, `codex plugin marketplace upgrade`, `codex plugin marketplace remove`.

### Globale CLI-flagg

| Flagg | Funksjon |
|---|---|
| `--add-dir PATH` | Gi ekstra mappe skrivetilgang |
| `--ask-for-approval MODE`, `-a MODE` | Velg når Codex skal be om godkjenning |
| `--cd PATH`, `-C PATH` | Sett arbeidsmappe |
| `--config KEY=VALUE`, `-c KEY=VALUE` | Overstyr konfigurasjonsverdi |
| `--disable FEATURE` | Tving funksjon av for kjøringen |
| `--enable FEATURE` | Tving funksjon på for kjøringen |
| `--image PATH`, `-i PATH` | Legg bilde til første prompt |
| `--local-provider lmstudio|ollama` | Velg lokal modelltilbyder |
| `--model MODEL`, `-m MODEL` | Overstyr modell |
| `--no-alt-screen` | Deaktiver alternativ terminalskjerm |
| `--oss` | Bruk lokal åpen modelltilbyder |
| `--profile NAME`, `-p NAME` | Legg navngitt konfigurasjonsprofil over grunnkonfigurasjonen |
| `--remote URL` | Koble til ekstern app-server |
| `--remote-auth-token-env ENV_VAR` | Les ekstern bearer-token fra navngitt miljøvariabel |
| `--sandbox MODE`, `-s MODE` | Velg `read-only`, `workspace-write` eller `danger-full-access` |
| `--search` | Bruk direkte nettsøk i stedet for standard hurtigbuffer |
| `--strict-config` | Feil ved ukjente konfigurasjonsfelt |
| `PROMPT` | Valgfri startinstruksjon |
| `--dangerously-bypass-hook-trust` | Omgå krav om lagret hook-tillit; kun for kontrollert automatisering |
| `--dangerously-bypass-approvals-and-sandbox`, `--yolo` | Omgå godkjenninger og sandkasse; svært farlig |

Bruk `codex --help` og `codex {underkommando} --help` for den komplette, installasjonsavhengige flagglisten. Nye eller betingede flagg kan dukke opp før denne oversikten oppdateres.

---

## 7. Egendefinerte promptkoder – ikke innebygde kommandoer

Kodene nedenfor er korte navn på arbeidsinstruksjoner. De gir ingen skjult tilgang og øker ikke modellens faktiske IQ. For best resultat må betydningen være definert i prosjektinstruksjoner, en ferdighet eller samme prompt.

### Kvalitet, analyse og beslutning

| Promptkode | Betydning du kan gi den |
|---|---|
| `/THINK` | Tenk grundig før du svarer; vis konklusjon og avgjørende begrunnelse |
| `/THINK100` | Bruk maksimal relevant grundighet, test antakelser og kontroller resultatet |
| `/IQ100` | Lever ekspertkvalitet; dette er en kvalitetsmerkelapp, ikke en faktisk IQ-innstilling |
| `/DEEP` | Gå i dybden med årsaker, mekanismer og konsekvenser |
| `/PLAN` | Lag gjennomførbar plan med prioritet, ansvar og rekkefølge |
| `/EXECUTE` | Utfør arbeidet, ikke bare foreslå neste steg |
| `/VERIFY` | Kontroller tall, navn, datoer, logikk og intern konsistens |
| `/FACTCHECK` | Faktasjekk viktige påstander mot pålitelige kilder |
| `/ASSUMPTIONS` | List antakelser og hva som vil endre konklusjonen |
| `/GAPS` | Finn manglende informasjon, dekning og avhengigheter |
| `/CRITIQUE` | Gi konkret, streng og konstruktiv kritikk |
| `/REDTEAM` | Angrip forslaget fra en skeptisk motparts perspektiv |
| `/REVIEW` | Kontroller kvalitet, feil, risiko og forbedringspunkter |
| `/IMPROVE` | Skriv eller bygg en bedre versjon direkte |
| `/COMPARE` | Sammenlign alternativer etter tydelige kriterier |
| `/RANK` | Ranger alternativer og forklar vektingen |
| `/DECIDE` | Anbefal ett valg og oppgi viktigste trade-offs |
| `/FIRSTPRINCIPLES` | Bryt problemet ned til grunnantakelser |
| `/80-20` | Finn de få tiltakene som gir størst effekt |

### Forskning og kilder

| Promptkode | Betydning du kan gi den |
|---|---|
| `/RESEARCH` | Undersøk temaet systematisk |
| `/WEB` | Bruk nettet når oppdatert informasjon er nødvendig |
| `/LATEST` | Verifiser siste tilgjengelige informasjon og oppgi dato |
| `/PRIMARY` | Prioriter primærkilder og offisielle kilder |
| `/SOURCES` | Oppgi kildene som faktisk støtter svaret |
| `/CITE` | Sett kildehenvisninger nær påstandene |
| `/TIMELINE` | Presenter hendelser kronologisk |
| `/EVIDENCE` | Skill dokumentasjon, tolkning og antakelse |
| `/NOHALLUCINATION` | Ikke gjett; marker ukjent eller utilgjengelig informasjon |

### Skriving, språk og format

| Promptkode | Betydning du kan gi den |
|---|---|
| `/REWRITE` | Skriv teksten på nytt med samme mening |
| `/SHORTEN` | Forkort uten å miste avgjørende innhold |
| `/EXPAND` | Utvid med relevant substans, ikke fyllstoff |
| `/CLEAR` | Bruk klart, enkelt og presist språk |
| `/TONE` | Tilpass tonen til oppgitt målgruppe og situasjon |
| `/TRANSLATE` | Oversett og bevar mening, tone og faguttrykk |
| `/NORWEGIAN` | Svar på naturlig norsk |
| `/TURKISH` | Svar på naturlig tyrkisk |
| `/ENGLISH` | Svar på naturlig engelsk |
| `/SUMMARY` | Lag kort oppsummering med viktigste konklusjoner |
| `/TLDR` | Gi svært kort hovedpoeng først |
| `/TABLE` | Bruk tabell når eksakte sammenligninger blir tydeligere |
| `/BULLETS` | Bruk konsise punktlister |
| `/MARKDOWN` | Lever gyldig Markdown |
| `/JSON` | Lever gyldig JSON uten ekstra tekst |
| `/OUTPUTONLY` | Lever bare sluttresultatet |

### Jobb og karriere

| Promptkode | Betydning du kan gi den |
|---|---|
| `/CV` | Tilpass CV-en til konkret rolle og dokumenter effekt |
| `/APPLICATION` | Skriv målrettet jobbsøknad |
| `/ATS` | Optimaliser for relevante ATS-nøkkelord uten keyword stuffing |
| `/JOBMATCH` | Vurder samsvar mellom kandidat og stillingsannonse |
| `/RECRUITER` | Vurder materialet som en erfaren rekrutterer |
| `/INTERVIEW` | Lag realistiske spørsmål og sterke svar |
| `/STAR` | Formuler eksempel med situasjon, oppgave, handling og resultat |
| `/LINKEDIN` | Forbedre LinkedIn-profil eller innlegg for profesjonelt formål |

### Forretning, markedsføring og innhold

| Promptkode | Betydning du kan gi den |
|---|---|
| `/BUSINESS` | Vurder forretningsmodell, kunde, verdi og inntekt |
| `/MARKET` | Analyser marked, segmenter og etterspørsel |
| `/COMPETITORS` | Sammenlign relevante konkurrenter |
| `/SWOT` | Lag SWOT med konkrete konsekvenser |
| `/KPI` | Definer målbare nøkkeltall med datakilde og frekvens |
| `/FINANCE` | Vurder inntekter, kostnader, marginer og risiko |
| `/IDEAS10` | Lever ti prioriterte ideer med kort begrunnelse |
| `/SEO` | Optimaliser struktur, søkeintensjon og metadata |
| `/SOCIAL` | Tilpass innhold til valgte sosiale kanaler |
| `/CONTENTPLAN` | Lag publiseringsplan med format, kanal og mål |
| `/CTA` | Skriv tydelig og relevant handlingsoppfordring |
| `/BRAND` | Følg definert merkevare, språk og visuell retning |

### Juridisk, personvern og risiko

| Promptkode | Betydning du kan gi den |
|---|---|
| `/LEGAL` | Identifiser juridiske spørsmål, jurisdiksjon, dato og behov for fagjurist |
| `/PRIVACY` | Vurder personvern, dataminimering, samtykke og lagring |
| `/GDPR` | Kartlegg relevante GDPR-roller, behandlingsgrunnlag og rettigheter |
| `/COPYRIGHT` | Vurder opphavsrett, lisens, kreditering og bruksomfang |
| `/COMPLIANCE` | Lag kravkart med kilde, ansvar og kontrollbevis |
| `/RISK` | Lag risikoregister med sannsynlighet, konsekvens og tiltak |
| `/SECURITY` | Vurder trusler, sårbarheter og sikkerhetstiltak |
| `/ACCESSIBILITY` | Kontroller tilgjengelighet og relevante WCAG-krav |
| `/SAFETY` | Identifiser skadepotensial og sikre alternativer |

Juridiske promptkoder gjør ikke svaret til juridisk rådgivning. Oppgi land, rettsområde og dato, og be om primærkilder ved viktige avgjørelser.

### Kode, data og produkter

| Promptkode | Betydning du kan gi den |
|---|---|
| `/CODE` | Implementer ønsket funksjon og lever kjørbart resultat |
| `/DEBUG` | Finn rotårsak med bevis før løsning foreslås |
| `/FIX` | Implementer og verifiser rettelsen |
| `/TEST` | Lag eller kjør relevante tester |
| `/REFACTOR` | Forbedre struktur uten å endre tilsiktet atferd |
| `/CODEREVIEW` | Finn feil, regresjoner, sikkerhetsproblemer og manglende tester |
| `/ARCHITECTURE` | Foreslå komponenter, grenser, dataflyt og trade-offs |
| `/PERFORMANCE` | Mål flaskehals før optimalisering |
| `/DOCS` | Skriv presis teknisk dokumentasjon |
| `/DEPLOY` | Lag sikker utrullings- og tilbakeføringsplan |
| `/DATAQUALITY` | Kontroller mangler, duplikater, typer og avvik |
| `/ANALYZE` | Analyser data med metode, resultat og begrensninger |

### Bilder, design og presentasjon

| Promptkode | Betydning du kan gi den |
|---|---|
| `/IMAGE` | Generer bilde fra en presis visuell beskrivelse |
| `/EDITIMAGE` | Rediger vedlagt bilde etter spesifiserte endringer |
| `/DESIGN` | Lag designretning med målgruppe, hierarki og stil |
| `/WIREFRAME` | Lag informasjonsarkitektur og skjermstruktur |
| `/PRESENTATION` | Lag presentasjon med tydelig fortelling og konklusjon |
| `/VISUALIZE` | Velg en visualisering som faktisk tydeliggjør sammenhengen |
| `/ALT` | Skriv presis alternativ tekst for bilde |

### Samarbeid og arbeidsflyt

| Promptkode | Betydning du kan gi den |
|---|---|
| `/ASKFIRST` | Still nødvendige avklaringsspørsmål før utførelse |
| `/NOQUESTIONS` | Gjør rimelige antakelser og fortsett innenfor oppgaven |
| `/STEPBYSTEP` | Presenter en praktisk trinnvis fremgangsmåte |
| `/CHECKLIST` | Lever avkryssbar kontrolliste |
| `/CONTINUE` | Fortsett fra gjeldende resultat uten å starte på nytt |
| `/STOP` | Stans arbeidet; ikke utfør flere handlinger |
| `/SAVE` | Lagre det ferdige resultatet som en fil når miljøet støtter det |
| `/UPDATE` | Oppdater eksisterende resultat og bevar relevant innhold |

### Pålitelig kombinasjon

Eksempel:

```text
/RESEARCH /LATEST /PRIMARY /CITE /VERIFY

Undersøk hvordan kunstfotografi kan selges internasjonalt i 2026.
Skill mellom dokumenterte krav, anbefalinger og antakelser.
Lever en prioritert handlingsplan på norsk.
```

Mer presis variant uten koder:

```text
Undersøk temaet systematisk med oppdatert informasjon per 16. august 2026.
Prioriter offisielle primærkilder, sett kildehenvisninger nær påstandene,
kontroller tall, navn og datoer, og marker alt du ikke kan verifisere.
Lever en prioritert handlingsplan på norsk.
```

Den siste varianten er mest portabel fordi hele betydningen står i selve prompten.

---

## 8. Slik gjør du egne koder til faktiske, gjenbrukbare kommandoer

1. **Prosjektinstruksjoner:** Definer kodene én gang i prosjektet.
2. **Ferdighet:** Lag en ferdighet når arbeidsflyten skal være gjenbrukbar og kunne aktiveres eksplisitt eller automatisk.
3. **Eldre Codex custom prompt:** En Markdown-fil i `~/.codex/prompts/` kan påkalles som `/prompts:navn`, men denne løsningen er utfaset til fordel for ferdigheter.
4. **AGENTS.md:** Brukes til varige instruksjoner i et kodeprosjekt, ikke som en universell ChatGPT-kommando.

Eksempel på eldre Codex custom prompt:

```markdown
---
description: Verifiser et utkast grundig
argument-hint: FILE={sti}
---

Les $FILE. Kontroller fakta, datoer, logikk, kilder og interne motsigelser.
Marker usikkerhet og lever en forbedret versjon.
```

Kalles med:

```text
/prompts:verify FILE="rapport.md"
```

---

## 9. Hva som ikke er reelle brukerkommandoer

Følgende påstander er misvisende dersom de presenteres som innebygde ChatGPT-funksjoner:

- `/IQ100`, `/THINK100`, `/LEGAL`, `/EXPERT`, `/HUMANIZE` og lignende er ikke skjulte OpenAI-kommandoer.
- «Jailbreak-koder» gir ikke legitim tilgang til systemnivå, hemmelige data eller deaktivering av sikkerhet.
- Modellens interne system- og utviklerinstruksjoner kan ikke overstyres av et prefiks i brukerens melding.
- Uutgitte funksjoner, private adminverktøy og interne API-ruter bør ikke gjettes eller fremstilles som tilgjengelige.
- En kommando som finnes i én app, modell eller testutrulling, finnes ikke nødvendigvis på web, mobil, IDE eller CLI.

Bruk dokumenterte kommandoer for grensesnittkontroll og klare naturlige instruksjoner for selve oppgaven.

---

## Offisielle kilder

- [ChatGPT/Codex slash commands](https://learn.chatgpt.com/docs/reference/slash-commands)
- [ChatGPT desktop app commands and shortcuts](https://learn.chatgpt.com/docs/reference/commands)
- [Codex CLI command reference](https://learn.chatgpt.com/docs/developer-commands?surface=cli)
- [Codex IDE extension commands](https://learn.chatgpt.com/docs/developer-commands?surface=ide)
- [Custom prompts – deprecated in favor of skills](https://learn.chatgpt.com/docs/custom-prompts)
- [Skills and plugins](https://learn.chatgpt.com/docs/skills-and-plugins)

Oppdatert mot OpenAIs gjeldende dokumentasjon 16. august 2026. Funksjoner kan avhenge av plan, plattform, region, modell, administratorinnstillinger og utrullingsstatus.
