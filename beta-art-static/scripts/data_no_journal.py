#!/usr/bin/env python3
"""Field Notes in Norwegian — written, not translated.

The same rule `data_no.py` follows for the desk: this is Norwegian copy that
happens to say what the English says, rather than the English put through a
dictionary. Where the two must differ to read naturally, they differ.

Keyed by the English string so the builder can substitute without the page
needing a `data-i18n` attribute on every element.

Status: machine-written. `languages.json` records Norwegian as queue 1, and
the notice on every page says a native reader has not yet been through it.
That disclosure is the reason this may exist at all.
"""

NO = {
    # --- masthead -----------------------------------------------------------
    "Skip to content": "Hopp til innholdet",
    "Beta Art · Issue 01": "Beta Art · Utgave 01",
    "Norway": "Norge",
    "August 2026": "August 2026",
    # The English lead is exactly seven words, which is copy.py's floor for a
    # two-word headline. Norwegian says it in six, so this carries the extra
    # meaning the English leaves implicit: the archive is built frame by frame.
    "How a verified photography archive gets built":
        "Slik bygger vi et verifisert fotoarkiv, bilde for bilde",
    "Entries": "Artikler",
    "Topics": "Emner",
    "Shot list": "Opptaksliste",
    "Newsletter": "Nyhetsbrev",
    "The archive": "Arkivet",
    "Business": "Bedrift",

    # --- lead essay ---------------------------------------------------------
    "Essay · Provenance": "Essay · Proveniens",
    "The picture is not the proof. The paperwork is.":
        "Bildet er ikke beviset. Papirene er det.",
    "For a century a photograph argued for itself. That arrangement has quietly "
    "ended — and the cost of proving otherwise falls on the people still going "
    "outside with a camera.":
        "I hundre år talte et fotografi for seg selv. Den ordningen er stille "
        "over, og regningen for å bevise noe annet havner hos dem som fortsatt "
        "går ut med kamera.",
    "By": "Av",
    "the archivist": "arkivaren",
    "· 28 July 2026 · 9 min read": "· 28. juli 2026 · 9 minutter",
    "Read the essay →": "Les essayet →",
    "Fisher at first light": "Fisker i første lys",
    "· placeholder imagery": "· midlertidig bilde",

    # --- search and categories ----------------------------------------------
    "Search entries": "Søk i artiklene",
    "All": "Alle",
    "Provenance": "Proveniens",
    "Method": "Metode",
    "Light": "Lys",
    "Trade": "Fag",
    "Market": "Marked",
    "Nothing here matches that search.": "Ingenting her passer med det søket.",

    # --- entries ------------------------------------------------------------
    "The three tests every frame has to pass":
        "De tre testene hvert bilde må bestå",
    "Provenance, not-reproducible-by-a-machine, and a named buyer. Fail one and "
    "the frame stays personal — technically good is not the standard.":
        "Proveniens, ikke-gjenskapbart-av-en-maskin, og en navngitt kjøper. "
        "Stryker bildet på én av dem, blir det liggende som privat. Teknisk godt "
        "er ikke kravet.",
    "14 July 2026 · 6 min": "14. juli 2026 · 6 min",

    "What actually goes on an accession label":
        "Hva som faktisk står på en aksesjonsetikett",
    "Camera, lens, exposure, time, coordinates — and the three fields buyers ask "
    "about long after the campaign has ended.":
        "Kamera, objektiv, eksponering, tid og koordinater — og de tre feltene "
        "kjøpere spør om lenge etter at kampanjen er over.",
    "30 June 2026 · 7 min": "30. juni 2026 · 7 min",

    "Two days aboard before the first frame":
        "To døgn om bord før første bilde",
    "Why the fisher plate could not be shot on day one, and what changes in the "
    "pictures once nobody is performing for the camera.":
        "Hvorfor fiskerbildet ikke kunne tas første dagen, og hva som endrer seg "
        "i bildene når ingen lenger spiller for kameraet.",
    "12 June 2026 · 5 min": "12. juni 2026 · 5 min",

    "Pricing a licence when the buyer says “just for social”":
        "Å prise en lisens når kjøperen sier «bare til sosiale medier»",
    "Media, term and territory are three separate questions. \"Just for social\" "
    "answers none of them — and it is rarely meant unkindly.":
        "Medium, varighet og område er tre ulike spørsmål. «Bare til sosiale "
        "medier» svarer på ingen av dem, og er sjelden vondt ment.",
    "28 May 2026 · 8 min": "28. mai 2026 · 8 min",

    "Who actually buys photography in Norway":
        "Hvem som faktisk kjøper fotografi i Norge",
    "Thirty industries in four tiers, from advertising agencies buying daily to "
    "recruiters discovering employer branding &mdash; and the ten segments worth "
    "contacting first.":
        "Tretti bransjer i fire nivåer, fra reklamebyråer som kjøper daglig til "
        "rekrutterere som oppdager arbeidsgivermerkevare — og de ti segmentene "
        "det lønner seg å kontakte først.",
    "19 May 2026 &middot; 11 min": "19. mai 2026 · 11 min",

    "How long blue hour actually lasts at 59° north":
        "Hvor lenge den blå timen varer på 59 grader nord",
    "Not shortest in winter &mdash; shortest at the equinoxes, and about forty "
    "minutes when it is. A computed field table for deciding whether the drive is "
    "worth it.":
        "Den er ikke kortest om vinteren. Den er kortest ved jevndøgn, og varer "
        "da rundt førti minutter. En regnet tabell for å avgjøre om turen er verdt "
        "det.",
    "9 May 2026 · 5 min": "9. mai 2026 · 5 min",

    "Seven pictures worth avoiding at launch":
        "Sju bilder det er verdt å unngå ved lansering",
    "Aurora over wilderness, fjord at sunset, the perfectly composed cabin — "
    "technically fine, commercially finished.":
        "Nordlys over villmark, fjord i solnedgang, den perfekt komponerte hytta. "
        "Teknisk fine, kommersielt ferdigsnakket.",
    "21 April 2026 · 6 min": "21. april 2026 · 6 min",

    "Content credentials, switched on from the first frame":
        "Innholdslegitimasjon, slått på fra første bilde",
    "Why C2PA has to be switched on in camera, and why signing a file afterwards "
    "convinces nobody who matters.":
        "Hvorfor C2PA må slås på i kameraet, og hvorfor det ikke overbeviser noen "
        "å signere filen etterpå.",
    "2 April 2026 · 5 min": "2. april 2026 · 5 min",

    "The filing habit that makes an archive findable in nine years":
        "Arkivvanen som gjør et arkiv søkbart om ni år",
    "RAW archived within 24 hours, release signed within 7 days, catalogue "
    "decision within 14. Dull on purpose.":
        "RAW arkivert innen ett døgn, samtykke signert innen sju dager, "
        "katalogvedtak innen fjorten. Kjedelig med vilje.",
    "15 March 2026 · 7 min": "15. mars 2026 · 7 min",

    # --- about --------------------------------------------------------------
    "About this journal": "Om dette tidsskriftet",
    "Field Notes is written from inside the Beta Art archive: one photographer, "
    "one filing system, and a licensing desk that has to answer for every frame "
    "it sells.":
        "Field Notes skrives fra innsiden av Beta Art-arkivet: én fotograf, ett "
        "arkivsystem, og en lisensdesk som må svare for hvert eneste bilde den "
        "selger.",
    "Two or three entries a month. No sponsored posts, ever.":
        "To eller tre artikler i måneden. Aldri betalt innhold.",

    # --- shot list ----------------------------------------------------------
    "The launch shot list": "Opptakslisten for lanseringen",
    "Fourteen plates across five tiers. Published so readers can see what a "
    "working list looks like — and hold us to it.":
        "Fjorten plater fordelt på fem nivåer. Vi publiserer den så leserne ser "
        "hvordan en arbeidsliste ser ut, og kan holde oss til den.",
    "People at Norwegian work · 4 plates": "Folk i norsk arbeidsliv · 4 plater",
    "Craft and process · 3 plates": "Håndverk og prosess · 3 plater",
    "Signature places, unusual hours · 3 plates":
        "Kjente steder, uvante timer · 3 plater",
    "Nordic architecture and interiors · 2 plates":
        "Nordisk arkitektur og interiør · 2 plater",
    "Food and culture in progress · 2 plates":
        "Mat og kultur underveis · 2 plater",
    "See the plates →": "Se platene →",

    # --- market -------------------------------------------------------------
    "Who buys the work": "Hvem som kjøper arbeidet",
    "The Norwegian market in four tiers &mdash; the same map the licensing desk "
    "sells against.":
        "Det norske markedet i fire nivåer — det samme kartet lisensdesken selger "
        "etter.",
    "Advertising, e-commerce, media, marketing, PR":
        "Reklame, netthandel, medier, markedsføring, PR",
    "Property, health, education, travel, food, finance, tech, public sector":
        "Eiendom, helse, utdanning, reiseliv, mat, finans, teknologi, offentlig sektor",
    "Oil &amp; offshore, maritime, sport, tourism, NGOs, publishing, architecture, fashion":
        "Olje og offshore, maritim, idrett, turisme, frivillige organisasjoner, "
        "forlag, arkitektur, mote",
    "Social agencies, podcasters, creators, app makers, recruiters":
        "Sosiale byråer, podkastere, innholdsskapere, apputviklere, rekrutterere",
    "The full market map &rarr;": "Hele markedskartet →",

    # --- start here ---------------------------------------------------------
    "Start here": "Begynn her",
    "The picture is not the proof": "Bildet er ikke beviset",
    "Who buys photography in Norway": "Hvem som kjøper fotografi i Norge",
    "Pricing &ldquo;just for social&rdquo;": "Å prise «bare til sosiale medier»",
    "How long blue hour lasts up here": "Hvor lenge den blå timen varer her oppe",
    "9 min": "9 min", "11 min": "11 min", "8 min": "8 min", "5 min": "5 min",

    # --- plate of the month --------------------------------------------------
    "Plate of the month": "Månedens plate",
    "Preikestolen, February, 06:47": "Preikestolen, februar, 06:47",
    "· weather record attached": "· værrapport vedlagt",

    # --- newsletter ----------------------------------------------------------
    "Two letters a month": "To brev i måneden",
    "New entries, the next plates going onto the list, and a short note from the "
    "field. Unsubscribe in one click; the list is never passed on.":
        "Nye artikler, de neste platene som havner på listen, og en kort hilsen "
        "fra felten. Meld deg av med ett klikk. Vi gir aldri listen videre.",
    "Prefer a reader? Every entry also goes out on":
        "Vil du heller bruke en leser? Hver artikkel går også ut på",
    "the RSS feed": "RSS-strømmen",
    "Your email address": "E-postadressen din",
    "Subscribe": "Meld deg på",

    # --- footer --------------------------------------------------------------
    "Human approved": "Godkjent av et menneske",
    "Nothing is published here until a person has seen it and approved it.":
        "Ingenting blir publisert her før et menneske har sett det og godkjent det.",
    "All entries": "Alle artikler",
    "Write to us": "Skriv til oss",
    "Copyright &amp; IP": "Opphavsrett",
    "Privacy (worldwide)": "Personvern (hele verden)",
    "AI &amp; training data": "KI og treningsdata",
    "Licence terms": "Lisensvilkår",
    "Report content": "Meld fra om innhold",
}
