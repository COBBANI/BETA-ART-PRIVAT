/* Beta Art — modelltillatelse.
 *
 * Et samtykke som ikke er lagret, er ikke et samtykke. Personvernforordningen
 * krever at den behandlingsansvarlige kan vise at samtykke er gitt, så dette
 * skjemaet gjør to ting og lyver ikke om noen av dem:
 *
 *   1. Det lager en fullstendig, tidsstemplet kopi som den som signerer får
 *      beholde. Den delen virker alltid, også uten nett bakover.
 *   2. Det sender kopien videre — til endepunktet under, hvis det er satt opp,
 *      ellers via e-post som personen selv sender.
 *
 * Det sier aldri "sendt" før noe faktisk er sendt. Et skjema som later som,
 * er verre enn ingen skjema: da tror begge parter at samtykket finnes.
 */
"use strict";

(function () {

/* Sett denne når et mottak er satt opp (Formspree, Basin, en egen funksjon).
   Står den tom, faller skjemaet tilbake til e-post og sier fra om det. */
var ENDPOINT = "";
var TO = "hallo@beta-art.com";

var form = document.getElementById("release-form");
if (!form) return;

var status = document.getElementById("release-status");
var output = document.getElementById("release-output");
var copyBox = document.getElementById("release-copy");
var note = document.getElementById("release-note");
var guardian = document.getElementById("step-guardian");
var answers = { signer: "" };

/* ---- hvem signerer: verge-feltene finnes bare når de trengs ---- */
Array.prototype.forEach.call(form.querySelectorAll("[data-pick]"), function (btn) {
  btn.addEventListener("click", function () {
    answers[btn.getAttribute("data-pick")] = btn.getAttribute("data-value");
    var group = btn.closest(".option-grid");
    if (group) Array.prototype.forEach.call(group.querySelectorAll(".option"), function (b) {
      b.classList.toggle("is-chosen", b === btn);
      b.setAttribute("aria-pressed", String(b === btn));
    });
    var needsGuardian = answers.signer === "verge";
    guardian.classList.toggle("is-hidden", !needsGuardian);
    Array.prototype.forEach.call(guardian.querySelectorAll("input"), function (i) {
      if (i.type !== "checkbox") i.required = needsGuardian;
    });
    setError("signer", "");
  });
});

/* ---- validering ---- */
function setError(field, message) {
  var box = form.querySelector('[data-error="' + field + '"]');
  var input = form.elements[field];
  if (box) { box.textContent = message || ""; box.hidden = !message; }
  if (input && input.setAttribute) {
    if (message) input.setAttribute("aria-invalid", "true");
    else input.removeAttribute("aria-invalid");
  }
}

function val(name) {
  var el = form.elements[name];
  return el && el.value ? el.value.trim() : "";
}

function checked(name) {
  var el = form.elements[name];
  return !!(el && el.checked);
}

function validate() {
  var first = null;
  function need(name, ok, msg) {
    setError(name, ok ? "" : msg);
    if (!ok && !first) first = form.elements[name] || form.querySelector('[data-error="' + name + '"]');
  }

  need("signer", !!answers.signer, "Velg hvem som fyller ut skjemaet.");
  need("model_name", val("model_name").length >= 2, "Skriv fullt navn.");
  need("model_born", /^(19|20)\d{2}$/.test(val("model_born")), "Skriv fødselsåret med fire siffer.");
  need("model_email", /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val("model_email")), "Skriv en gyldig e-postadresse.");

  if (answers.signer === "verge") {
    need("guardian_name", val("guardian_name").length >= 2, "Skriv fullt navn.");
    need("guardian_relation", val("guardian_relation").length >= 2, "Skriv relasjonen til barnet.");
    need("guardian_email", /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val("guardian_email")), "Skriv en gyldig e-postadresse.");
  }

  need("shoot_date", !!val("shoot_date"), "Velg datoen for opptaket.");
  need("shoot_place", val("shoot_place").length >= 2, "Skriv hvor opptaket var.");
  need("shoot_desc", val("shoot_desc").length >= 10, "Beskriv bildene kort.");
  need("signature", val("signature").length >= 2, "Skriv navnet ditt som signatur.");
  need("sign_place", val("sign_place").length >= 2, "Skriv stedet.");
  need("sign_date", !!val("sign_date"), "Velg datoen.");
  need("confirm", checked("confirm"), "Bekreft at du har lest skjemaet.");

  /* Et samtykke der alt står tomt er et nei, og det er greit — men da skal
     ingen tro at det er et ja. Vi ber om en bekreftelse på nettopp det. */
  var anyUse = checked("use_archive") || checked("use_commercial") ||
               checked("use_promo") || checked("use_name");
  if (!anyUse && status) {
    status.textContent = "Du har ikke krysset av for noen bruk. Det er et gyldig svar — " +
      "bildene blir da ikke publisert. Send inn hvis det er det du mener.";
  }

  /* Et barn kan ikke samtykke til kommersiell bruk gjennom en avkrysning alene. */
  var born = parseInt(val("model_born"), 10);
  var year = new Date(val("sign_date") || Date.now()).getFullYear();
  if (born && year - born < 18 && answers.signer === "selv") {
    setError("model_born", "Fødselsåret tilsier at du er under 18. Da må en forelder " +
      "eller verge fylle ut skjemaet — velg det øverst.");
    first = first || form.elements.model_born;
  }

  return first;
}

/* ---- kopien ---- */
function yn(name) { return checked(name) ? "JA" : "nei"; }

function buildCopy(stamp) {
  var L = [];
  L.push("BETA ART — MODELLTILLATELSE");
  L.push("Samtykke etter åndsverkloven § 104 og personvernforordningen art. 6 nr. 1 a");
  L.push("");
  L.push("Utfylt av:        " + (answers.signer === "verge" ? "forelder/verge" : "den avbildede selv"));
  L.push("");
  L.push("DEN AVBILDEDE");
  L.push("  Navn:           " + val("model_name"));
  L.push("  Fødselsår:      " + val("model_born"));
  L.push("  E-post:         " + val("model_email"));
  if (answers.signer === "verge") {
    L.push("");
    L.push("FORELDER / VERGE");
    L.push("  Navn:           " + val("guardian_name"));
    L.push("  Relasjon:       " + val("guardian_relation"));
    L.push("  E-post:         " + val("guardian_email"));
    L.push("  Barnet spurt:   " + yn("child_asked"));
  }
  L.push("");
  L.push("OPPTAKET");
  L.push("  Dato:           " + val("shoot_date"));
  L.push("  Sted:           " + val("shoot_place"));
  L.push("  Beskrivelse:    " + val("shoot_desc"));
  L.push("  Plater:         " + (val("plates") || "ikke tildelt ennå"));
  L.push("");
  L.push("SAMTYKKE, PUNKT FOR PUNKT");
  L.push("  Vises i arkivet:                  " + yn("use_archive"));
  L.push("  Lisensieres kommersielt:          " + yn("use_commercial"));
  L.push("  Beta Arts egen markedsføring:     " + yn("use_promo"));
  L.push("  Navnet kan oppgis:                " + yn("use_name"));
  L.push("  Egne begrensninger:               " + (val("limits") || "ingen"));
  L.push("");
  L.push("ALDRI TILLATT, UANSETT");
  L.push("  Ærekrenkende, diskriminerende, trakasserende eller ulovlig bruk.");
  L.push("  Fremstilling som anbefaling av produkt, sak eller standpunkt.");
  L.push("  Kobling til helse, seksualitet, politikk eller kriminalitet.");
  L.push("  Tobakk, pengespill, våpen, voksent innhold, ekstreme grupper.");
  L.push("  Treningsdata for generativ kunstig intelligens.");
  L.push("");
  L.push("TILBAKETREKKING");
  L.push("  Kan trekkes tilbake når som helst ved e-post til " + TO + ".");
  L.push("  Stopper videre publisering og videre lisensiering.");
  L.push("  Allerede utstedte lisenser kan ikke alltid kalles tilbake.");
  L.push("");
  L.push("BEHANDLINGSANSVARLIG");
  L.push("  Betül Öner, Beta Art — " + TO);
  L.push("");
  L.push("SIGNATUR");
  L.push("  Signert av:     " + val("signature"));
  L.push("  Sted:           " + val("sign_place"));
  L.push("  Dato:           " + val("sign_date"));
  L.push("  Bekreftet:      " + yn("confirm"));
  L.push("");
  L.push("Registrert:       " + stamp);
  L.push("Fra:              " + window.location.host + window.location.pathname);
  return L.join("\n");
}

/* ---- innsending ---- */
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var first = validate();
  if (first) {
    if (status) status.textContent = "Noe mangler. Feltene er merket nedenfor.";
    if (first.focus) first.focus();
    if (first.scrollIntoView) first.scrollIntoView({ block: "center", behavior: "smooth" });
    return;
  }

  var stamp = new Date().toISOString();
  var text = buildCopy(stamp);
  copyBox.value = text;
  output.hidden = false;
  output.scrollIntoView({ behavior: "smooth", block: "start" });

  var subject = "Modelltillatelse — " + val("model_name") + " — " + val("shoot_date");
  document.getElementById("release-mail").href =
    "mailto:" + TO + "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(text);

  if (!ENDPOINT) {
    /* Ingen mottaker satt opp. Si det rett ut framfor å vise en hake. */
    status.textContent = "Kopien din er klar nedenfor.";
    note.textContent = "Skjemaet er ikke lagret ennå. Denne siden har ingen mottaker satt " +
      "opp, så samtykket blir først registrert når teksten under er sendt til " + TO +
      " — bruk knappen, eller kopier den inn i din egen e-post. Ta vare på kopien uansett.";
    return;
  }

  status.textContent = "Sender …";
  var body = new FormData(form);
  body.append("signer", answers.signer);
  body.append("registered", stamp);
  body.append("record", text);

  fetch(ENDPOINT, { method: "POST", body: body, headers: { Accept: "application/json" } })
    .then(function (r) {
      if (!r.ok) throw new Error(String(r.status));
      status.textContent = "Sendt. En kopi kommer til " + val("model_email") + ".";
      note.textContent = "Samtykket er registrert " + stamp + ". Du kan trekke det tilbake " +
        "når som helst ved å skrive til " + TO + ".";
    })
    .catch(function () {
      status.textContent = "Innsendingen gikk ikke gjennom.";
      note.textContent = "Ingenting er lagret. Send teksten under til " + TO +
        " med knappen, så er samtykket registrert når e-posten kommer fram.";
    });
});

/* ---- kopier og skriv ut ---- */
var copyBtn = document.getElementById("release-copy-btn");
if (copyBtn) copyBtn.addEventListener("click", function () {
  copyBox.select();
  var ok = false;
  try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
  if (navigator.clipboard && !ok) navigator.clipboard.writeText(copyBox.value);
  copyBtn.textContent = "Kopiert";
});

Array.prototype.forEach.call(
  document.querySelectorAll("#release-print, #release-print-2"),
  function (b) { b.addEventListener("click", function () { window.print(); }); });

})();
