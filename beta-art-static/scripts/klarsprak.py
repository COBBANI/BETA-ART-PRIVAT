#!/usr/bin/env python3
"""Klarspråk, målt — ikke antatt.

Nettstedet har rundt 15 000 ord norsk. En native klarspråkgjennomgang av alt
det er dagsverk, og den må gjøres av et menneske. Det denne filen gjør er å
gjøre den jobben avgrensbar: den finner det en maskin trygt kan finne, slik at
den som leser korrekturen bruker tiden sin på det bare et menneske kan avgjøre.

Reglene er Språkrådets egne klarspråkprinsipper, ikke mine preferanser:

  · skriv aktivt, ikke passivt
  · bruk verb i stedet for substantiveringer
  · unngå kansellistil og byråkratord
  · skriv korte, hele setninger
  · snakk til leseren — «du», ikke «man» eller «vedkommende»
  · skriv forkortelser fullt ut

Det verktøyet ikke kan avgjøre, sier det ikke noe om: om teksten er idiomatisk,
om tonen stemmer, om en fagterm er riktig valgt, om en setning faktisk er
forståelig for den som skal lese den. Det er derfor gjennomgangen fortsatt
trenger en som har norsk som morsmål.

    python3 tools/klarsprak.py
    python3 tools/klarsprak.py --report     tall per side
    python3 tools/klarsprak.py --pakke      skriv korrekturpakke til docs/

Avslutter med feilkode hvis noe blir funnet.
"""

import json
import os
import re
import sys
from collections import defaultdict

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ---------------------------------------------------------------- ordlister --
# Kansellistil med klarspråkalternativ. Kilde: Språkrådets liste over
# tunge ord og uttrykk, og Klarspråk-veilederen for staten.
KANSELLI = {
    "vedrørende": "om",
    "angående": "om",
    "herunder": "blant annet",
    "således": "slik",
    "hvorvidt": "om",
    "samt": "og",
    "foreligger": "finnes / er klar",
    "påse": "sørge for",
    "benytte": "bruke",
    "benyttes": "brukes / vi bruker",
    "anvende": "bruke",
    "foreta": "gjøre",
    "erholde": "få",
    "oversende": "sende",
    "innehar": "har",
    "erverve": "kjøpe / skaffe",
    "medføre": "føre til",
    "forestå": "ha ansvar for",
    "iverksette": "sette i gang",
    "vederlag": "betaling",
    "vedkommende": "du / den det gjelder",
    "anmodning": "spørsmål / forespørsel",
    "i henhold til": "etter",
    "i forbindelse med": "om / når",
    "på bakgrunn av": "fordi",
    "med hensyn til": "om",
    "i den hensikt": "for å",
    "for det tilfelle at": "hvis",
    "grunnet": "på grunn av",
    "det vil si": "altså",
    "i løpet av": "i",
    "å kunne være i stand til": "å kunne",
    "gjennomføre en vurdering av": "vurdere",
    "har til hensikt å": "skal",
}

# Forkortelser klarspråk vil ha skrevet ut.
FORKORTELSER = {
    r"\bbl\.a\.": "blant annet",
    r"\bf\.eks\.": "for eksempel",
    r"\bdvs\.": "det vil si",
    r"\bevt\.": "eventuelt",
    r"\bca\.": "cirka / om lag",
    r"\bmm\.": "med mer",
    r"\biht\.": "etter",
    r"\bjf\.": "se",
    r"\betc\.": "og så videre",
    r"\bosv\.": "og så videre",
}

# Substantivsjuke: verbet er gjemt inne i et substantiv.
NOMINAL = re.compile(
    r"\b(\w{4,}(?:ing|else|sjon|het|ering))\s+(?:av|til)\b", re.U | re.I)
# «for» er tatt ut: «AI-automatisering for bedrifter» er et tjenestenavn
# fulgt av hvem det er for, ikke et verb gjemt i et substantiv.

# Passiv: «blir/ble + partisipp», og s-passiv på verb vi faktisk bruker.
BLI_PASSIV = re.compile(r"\b(blir|ble|bli|blitt)\s+\w+(?:et|t|dd)\b", re.U | re.I)
S_PASSIV = [
    "leveres", "sendes", "utføres", "gjennomføres", "behandles", "vurderes",
    "beregnes", "fastsettes", "oppbevares", "slettes", "lagres", "brukes",
    "benyttes", "kreves", "gis", "tas", "settes", "avtales", "faktureres",
    "godkjennes", "publiseres", "registreres", "håndteres", "prioriteres",
]

# Ord klarspråk ber om at du bytter ut fordi de holder leseren på avstand.
UPERSONLIG = ["man", "vedkommende", "en søker", "brukeren av tjenesten"]

MAKS_ORD_I_SETNING = 25
# Norsk setter sammen ord, og et langt sammensatt ord er ikke i seg selv uklart.
# Klarspråk advarer mot unødvendige sammensetninger, ikke mot at «søkemotor-
# optimalisering» heter det den heter. Grensen er satt der ord slutter å være
# fagtermer og begynner å bli konstruksjoner.
LANGT_ORD = 24
FAGORD = {
    "søkemotoroptimalisering", "prosessautomatisering", "karriereveiledning",
    "automatiseringsprosjekter", "godkjenningspunkter", "eskaleringsregler",
    "behandlingsgrunnlaget", "overleveringspunkt", "månedsoppsummeringen",
    "personopplysninger", "personvernforordningen", "markedsføring",
    "innholdsproduksjon", "tilgjengelighet", "universell", "modelltillatelse",
}
IKKE_NOMINAL = {
    "ingenting", "myndighet", "mulighet", "sikkerhet", "kvalitet", "enhet",
    "helhet", "lenking", "nyhet", "sannhet", "virksomhet", "hastighet",
}

# Klarspråk sier «foretrekk aktiv», ikke «aldri passiv», og norsk bruker
# s-passiv langt mer naturlig enn engelsk bruker sin. Et verktøy som gjør hver
# passiv til en feil blir stående rødt for alltid, og et gate som aldri kan
# klareres blir ignorert. Derfor to klasser: det som er galt, og det som en
# som kan norsk må se på.
RAADGIVENDE = {"passiv", "lange setninger", "lange ord"}

findings = defaultdict(list)
stats = []


def note(seksjon, melding):
    findings[seksjon].append(melding)


# ------------------------------------------------------------------- kilder --
def norske_sider():
    ut = []
    for her, dirs, filer in os.walk(ROOT):
        dirs[:] = [d for d in dirs if d not in (".git", "tools", "docs", "__pycache__")]
        for f in sorted(filer):
            if not f.endswith(".html"):
                continue
            sti = os.path.join(her, f)
            src = open(sti, encoding="utf-8").read()
            if '<html lang="no">' in src:
                ut.append((os.path.relpath(sti, ROOT), src))
    return sorted(ut)


def les_array(kilde, etter):
    """Én JSON-array ut av en JS-fil, med klammetelling — ikke regex."""
    i = kilde.find(etter)
    if i < 0:
        return None
    i = kilde.find("[", i)
    dyp, j, i_streng, escape = 0, i, False, False
    while j < len(kilde):
        c = kilde[j]
        if escape:
            escape = False
        elif c == "\\":
            escape = True
        elif c == '"':
            i_streng = not i_streng
        elif not i_streng:
            if c == "[":
                dyp += 1
            elif c == "]":
                dyp -= 1
                if dyp == 0:
                    try:
                        return json.loads(kilde[i:j + 1])
                    except ValueError:
                        return None
        j += 1
    return None


def i18n_norsk():
    """De norske strengene i språkvelgeren — de vises på hver eneste side."""
    ut = []
    for rel in ["i18n.js", "beta-art/i18n.js", "beta-art-business/i18n.js",
                "beta-art-blog/i18n.js"]:
        sti = os.path.join(ROOT, rel)
        if not os.path.exists(sti):
            continue
        s = open(sti, encoding="utf-8").read()
        # Arkivet har alle språk på én linje, de andre ett per linje. En
        # linjeforankret regex fant derfor ikke norsk der — og verktøyet meldte
        # «fant ikke» om en fil som var full av norsk.
        nokler = les_array(s, "var K=")
        verdier = les_array(s, '"no":')
        if nokler is None or verdier is None:
            note("kilde", "%s: fant ikke de norske strengene" % rel)
            continue
        ut.append((rel, dict(zip(nokler, verdier))))
    return ut


def synlig_tekst(src):
    s = re.sub(r"<head>.*?</head>", " ", src, flags=re.S | re.I)
    s = re.sub(r"<(script|style|svg|nav|header|footer)[^>]*>.*?</\1>", " ",
               s, flags=re.S | re.I)
    m = re.search(r"<main[^>]*>(.*?)</main>", s, flags=re.S | re.I)
    if m:
        s = m.group(1)
    s = re.sub(r"<!--.*?-->", " ", s, flags=re.S)
    s = re.sub(r"<[^>]+>", " ", s)
    for a, b in [("&amp;", "&"), ("&nbsp;", " "), ("&mdash;", "—"),
                 ("&aring;", "å"), ("&oslash;", "ø"), ("&aelig;", "æ"),
                 ("&uuml;", "ü"), ("&Ouml;", "Ö"), ("&copy;", "©")]:
        s = s.replace(a, b)
    return re.sub(r"\s+", " ", s).strip()


def setninger(tekst):
    # forkortelser med punktum skal ikke dele setningen
    t = tekst
    for f in FORKORTELSER:
        t = re.sub(f, lambda m: m.group(0).replace(".", "․"), t)
    t = re.sub(r"\bkr\.\s", "kr․ ", t)
    return [s.replace("․", ".") for s in re.split(r"(?<=[.!?])\s+", t)
            if len(s.split()) > 3]


# -------------------------------------------------------------------- regler --
def blokktekst(src):
    """Synlig tekst, med blokkgrensene beholdt."""
    b = re.sub(r"<head>.*?</head>", " ", src, flags=re.S | re.I)
    b = re.sub(r"<(script|style|svg|nav|header|footer)[^>]*>.*?</\1>", " ",
               b, flags=re.S | re.I)
    m = re.search(r"<main[^>]*>(.*?)</main>", b, flags=re.S | re.I)
    if m:
        b = m.group(1)
    b = re.sub(r"<!--.*?-->", " ", b, flags=re.S)
    ut = []
    for m in re.finditer(r"<(h1|h2|h3|p|li|dt|dd|summary|figcaption|caption|th|td)[^>]*>(.*?)</\1>",
                         b, re.S | re.I):
        t = re.sub(r"<[^>]+>", " ", m.group(2))
        for a, c in [("&amp;", "&"), ("&nbsp;", " "), ("&mdash;", "—"),
                     ("&aring;", "å"), ("&oslash;", "ø"), ("&aelig;", "æ")]:
            t = t.replace(a, c)
        t = re.sub(r"\s+", " ", t).strip()
        if not t:
            continue
        merke = {"h1": "# ", "h2": "## ", "h3": "### ",
                 "li": "  - ", "dt": "  ", "dd": "    "}.get(m.group(1).lower(), "")
        ut.append(merke + t)
    return ut


def avsnitt(src):
    """Bare <p>. En knapperad uten punktum er ikke en 39 ords setning — det var
    den feilen som fylte den første kjøringen med funn som ikke fantes."""
    body = re.sub(r"<head>.*?</head>", " ", src, flags=re.S | re.I)
    body = re.sub(r"<(script|style|svg|nav|header|footer)[^>]*>.*?</\1>", " ",
                  body, flags=re.S | re.I)
    ut = []
    for m in re.finditer(r"<p[^>]*>(.*?)</p>", body, re.S):
        t = re.sub(r"<[^>]+>", " ", m.group(1))
        t = t.replace("&amp;", "&").replace("&nbsp;", " ").replace("&mdash;", "—")
        ut.append(re.sub(r"\s+", " ", t).strip())
    # Hvert avsnitt for seg. Slås de sammen, henger en <p class="tag"> uten
    # punktum fast i avsnittet under, og to korte ting blir målt som én lang
    # setning — det var halvparten av funnene i første kjøring.
    return [x for x in ut if x]


def sjekk(kilde, tekst, prosa=None):
    lav = tekst.lower()
    ord_ = re.findall(r"[^\W\d_]+", tekst, re.U)
    if len(ord_) < 25:
        return None

    for ord_et, bedre in KANSELLI.items():
        for _ in re.finditer(r"\b" + re.escape(ord_et) + r"\b", lav):
            note("kansellistil", "%s: «%s» — klarspråk sier «%s»" % (kilde, ord_et, bedre))
            break       # ett funn per ord per side holder for en korrekturliste

    for m, bedre in FORKORTELSER.items():
        if re.search(m, lav):
            note("forkortelser", "%s: «%s» bør skrives ut som «%s»"
                 % (kilde, re.sub(r"\\b|\\", "", m), bedre))

    sett = set()
    grunnlag = " ".join(prosa) if prosa is not None else tekst
    for m in NOMINAL.finditer(grunnlag):
        s = m.group(0).lower()
        if s in sett or m.group(1).lower() in IKKE_NOMINAL:
            continue
        sett.add(s)
        note("substantivsjuke", "%s: «%s» — bruk verbet i stedet" % (kilde, m.group(0)))

    for m in BLI_PASSIV.finditer(tekst):
        if m.group(1) == "Bli":          # «Bli funnet på …» er imperativ
            continue
        note("passiv", "%s: «%s» — skriv hvem som gjør det" % (kilde, m.group(0)))
        break
    for v in S_PASSIV:
        if re.search(r"\b" + v + r"\b", lav):
            note("passiv", "%s: «%s» er s-passiv — skriv hvem som gjør det" % (kilde, v))
            break

    for u in UPERSONLIG:
        if re.search(r"\b" + re.escape(u) + r"\b", lav):
            note("avstand til leseren", "%s: «%s» — skriv «du» eller «vi»" % (kilde, u))

    lange = [o for o in ord_ if len(o) >= LANGT_ORD and o.lower() not in FAGORD]
    for o in sorted(set(lange))[:3]:
        note("lange ord", "%s: «%s» (%d tegn) — vurder å dele eller forklare"
             % (kilde, o, len(o)))

    if prosa is None:
        ss = setninger(tekst)
    else:
        ss = [x for avs in prosa for x in setninger(avs)]
    if ss:
        snitt = sum(len(s.split()) for s in ss) / len(ss)
        lengst = max(ss, key=lambda s: len(s.split()))
        if len(lengst.split()) > MAKS_ORD_I_SETNING:
            note("lange setninger", "%s: %d ord i én setning — «%s …»"
                 % (kilde, len(lengst.split()), " ".join(lengst.split()[:10])))
    else:
        snitt = 0

    du = len(re.findall(r"\b(du|deg|din|ditt|dine|dere)\b", lav))
    vi = len(re.findall(r"\b(vi|oss|vår|vårt|våre)\b", lav))
    if vi >= 6 and du < vi * 0.6:
        note("avstand til leseren",
             "%s: «vi» %d ganger, «du» %d — teksten handler om oss, ikke om leseren"
             % (kilde, vi, du))

    return (kilde, len(ord_), round(snitt, 1), du, vi)


def main():
    rapport = "--report" in sys.argv
    pakke = "--pakke" in sys.argv

    sider = norske_sider()
    for rel, src in sider:
        s = sjekk(rel, synlig_tekst(src), avsnitt(src))
        if s:
            stats.append(s)

    for rel, ordbok in i18n_norsk():
        s = sjekk(rel, " ".join(ordbok.values()))
        if s:
            stats.append(s)

    if pakke:
        skriv_pakke(sider)

    if rapport:
        print("%-46s %6s %7s %5s %5s" % ("SIDE", "ORD", "SNITT", "DU", "VI"))
        for r in sorted(stats, key=lambda x: -x[2]):
            print("%-46s %6d %7.1f %5d %5d" % r)
        print()

    feil = raad = 0
    for klasse, tittel in ((False, "FEIL — dette er klarspråk enig i at er galt"),
                           (True, "TIL GJENNOMGANG — en som kan norsk må avgjøre")):
        seksjoner = [x for x in sorted(findings) if (x in RAADGIVENDE) == klasse]
        if not seksjoner:
            continue
        print("== %s ==\n" % tittel)
        for seksjon in seksjoner:
            punkter = findings[seksjon]
            if klasse:
                raad += len(punkter)
            else:
                feil += len(punkter)
            print("%s — %d" % (seksjon, len(punkter)))
            for m in punkter[:10]:
                print("   · %s" % m)
            if len(punkter) > 10:
                print("   · … og %d til" % (len(punkter) - 10))
            print()
    print("%d norske kilder · %d feil · %d til gjennomgang" % (len(stats), feil, raad))
    return 1 if feil else 0


def skriv_pakke(sider):
    """Alt norsk på ett sted, med funnene ved siden av — så gjennomgangen er
    en avgrenset jobb og ikke et arkeologisk arbeid."""
    per_side = defaultdict(list)
    for seksjon, punkter in findings.items():
        for p in punkter:
            per_side[p.split(":")[0]].append("**%s** — %s" % (seksjon, p.split(": ", 1)[1]))

    ut = ["# Korrekturpakke — norsk tekst",
          "",
          "**Dette er ikke en oversettelse.** Den norske teksten er skrevet direkte,",
          "ikke oversatt fra engelsk, og ingen oversettelsestjeneste har vært inne i",
          "den — verken DeepL, Smartling, LILT eller noen annen. Det betyr to ting for",
          "den som skal gjennomgå den:",
          "",
          "- Bestill **språkvask mot klarspråk**, ikke oversettelseskontroll. En",
          "  oversettelseskontroll sammenligner norsk med engelsk og melder avvik — men",
          "  her *skal* de avvike, fordi de er skrevet hver for seg for hvert sitt marked.",
          "- Teksten har aldri vært lest av noen med norsk som morsmål. Den er skrevet",
          "  av en maskin. Det er hele grunnen til at denne pakken finnes.",
          "",
          "Alt norsk på nettstedet, side for side, med maskinfunnene ved siden av.",
          "Funnene er *forslag*, ikke fasit: klarspråk er en vurdering, og en maskin",
          "kan ikke gjøre den. Det den kan, er å peke på stedene det er verdt å se på.",
          "",
          "Det verktøyet ikke sjekker, og som gjennomgangen må ta stilling til:",
          "",
          "- om teksten er idiomatisk, eller oversatt-klingende",
          "- om fagtermene er de bransjen faktisk bruker",
          "- særskriving og orddeling",
          "- om tonen passer til den som skal lese",
          "- om innholdet i det hele tatt er riktig",
          ""]
    for rel, src in sider:
        # Én blokk per linje. En vegg av tekst er ikke noe et menneske kan
        # korrekturlese, og pakken finnes nettopp for at det skal gå an.
        blokker = blokktekst(src)
        tekst = "\n".join(blokker)
        if len(tekst.split()) < 25:
            continue
        ut += ["---", "", "## %s" % rel, ""]
        if per_side.get(rel):
            ut += ["**Maskinfunn på denne siden**", ""]
            ut += ["- %s" % p for p in sorted(set(per_side[rel]))]
            ut.append("")
        else:
            ut += ["Ingen maskinfunn på denne siden.", ""]
        ut += ["```", tekst, "```", ""]

    sti = os.path.join(ROOT, "docs", "11-korrektur-norsk.md")
    open(sti, "w", encoding="utf-8").write("\n".join(ut) + "\n")
    print("skrev %s (%d sider)\n" % (os.path.relpath(sti, ROOT), len(sider)))


if __name__ == "__main__":
    sys.exit(main())
