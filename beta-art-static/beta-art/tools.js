/* ============================================================
   BETA ART — plate tools
   1. Watermarked preview download, rendered client-side.
   2. Automatic SEO file naming from the plate's own record plus
      the search terms buyers actually use.
   3. Quote basket and printable proforma invoice.
   No dependencies; nothing leaves the browser.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- 1. SEO file naming ------------------------------------
     Buyers search for subject + place + the two qualifiers this archive
     competes on. The name is assembled from the plate record so every
     download carries the same, deliberate keyword order.
  ------------------------------------------------------------------- */

  var GLOBAL_KEYWORDS = ["verified", "human", "photography"];
  var MARKET_KEYWORDS = { no: "norway", nordic: "nordic" };

  function slugify(value) {
    return String(value)
      .toLowerCase()
      .replace(/[æå]/g, "a").replace(/ø/g, "o")
      .replace(/[ğ]/g, "g").replace(/[ıİ]/g, "i").replace(/[ş]/g, "s")
      .replace(/[ü]/g, "u").replace(/[ö]/g, "o").replace(/[ç]/g, "c")
      .normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function seoFileName(plate) {
    var parts = [];
    parts.push("beta-art");
    parts.push(slugify(plate.title));
    if (plate.place) parts.push(slugify(plate.place));
    parts.push(MARKET_KEYWORDS.no);
    parts = parts.concat(GLOBAL_KEYWORDS);
    if (plate.keywords) parts = parts.concat(plate.keywords.split(",").map(slugify));
    parts.push(slugify(plate.id));

    var seen = {};
    return parts.filter(function (part) {
      if (!part || seen[part]) return false;
      seen[part] = true;
      return true;
    }).join("-") + ".png";
  }

  function readPlate(article) {
    var titleEl = article.querySelector("h3");
    var accessionEl = article.querySelector(".accession");
    var priceEl = article.querySelector(".price");
    var accession = accessionEl ? accessionEl.textContent.trim() : "";
    var fields = accession.split("·").map(function (s) { return s.trim(); });

    return {
      id: fields[0] || "BA-000",
      title: titleEl ? titleEl.textContent.trim() : "Untitled plate",
      place: fields[1] || "",
      accession: accession,
      price: priceEl ? priceEl.textContent.trim() : "",
      keywords: article.getAttribute("data-keywords") || "",
      frameClass: (article.querySelector(".plate-frame") || {}).className || ""
    };
  }

  /* ---------- 2. Watermarked preview download ----------------------
     The placeholder frame is re-drawn onto a canvas with the accession
     label and a visible ownership watermark burned in, so a downloaded
     preview always carries its own provenance and cannot pass as an
     unmarked original.
  ------------------------------------------------------------------- */

  function drawPreview(plate, frameEl) {
    var W = 1600, H = 1067;
    var canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    var ctx = canvas.getContext("2d");

    var computed = window.getComputedStyle(frameEl);
    var base = computed.backgroundColor;
    ctx.fillStyle = (base && base !== "rgba(0, 0, 0, 0)") ? base : "#EAE6DD";
    ctx.fillRect(0, 0, W, H);

    // The CSS gradient cannot be read back, so the preview is rendered as a
    // neutral plate: buyers get the record, not a usable image.
    var grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, "#EAE6DD");
    grad.addColorStop(0.55, "#CFC9BC");
    grad.addColorStop(1, "#9C978C");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // Diagonal ownership watermark
    ctx.save();
    ctx.translate(W / 2, H / 2);
    ctx.rotate(-Math.PI / 9);
    ctx.font = "600 92px 'JetBrains Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgba(139, 26, 26, .22)";
    ctx.fillText("BETA ART — PREVIEW", 0, 0);
    ctx.font = "400 40px 'JetBrains Mono', monospace";
    ctx.fillStyle = "rgba(15, 15, 15, .22)";
    ctx.fillText("NOT LICENSED FOR USE", 0, 70);
    ctx.restore();

    // Accession strip
    ctx.fillStyle = "rgba(15, 15, 15, .88)";
    ctx.fillRect(0, H - 132, W, 132);
    ctx.fillStyle = "#8B1A1A";
    ctx.fillRect(0, H - 132, 8, 132);

    ctx.fillStyle = "#FBFAF7";
    ctx.font = "500 34px 'Inter', sans-serif";
    ctx.fillText(plate.title, 44, H - 82);
    ctx.font = "400 22px 'JetBrains Mono', monospace";
    ctx.fillStyle = "#CFC9BC";
    ctx.fillText(plate.accession.slice(0, 96), 44, H - 44);

    ctx.textAlign = "right";
    ctx.fillStyle = "#FBFAF7";
    ctx.font = "400 22px 'JetBrains Mono', monospace";
    ctx.fillText("© Beta Art · beta-art.com", W - 44, H - 44);

    return canvas;
  }

  function downloadPreview(article) {
    var plate = readPlate(article);
    var frameEl = article.querySelector(".plate-frame");
    if (!frameEl) return;

    var canvas = drawPreview(plate, frameEl);
    var link = document.createElement("a");
    link.download = seoFileName(plate);
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    announce("Preview saved as " + link.download);
  }

  /* ---------- 3. Quote basket and proforma invoice ------------------ */

  var basket = [];
  try {
    basket = JSON.parse(localStorage.getItem("beta-art-basket") || "[]");
  } catch (e) { basket = []; }

  function persist() {
    try { localStorage.setItem("beta-art-basket", JSON.stringify(basket)); } catch (e) { /* ignore */ }
  }

  function priceOf(plate) {
    var match = /kr\s*([\d\s]+)/i.exec(plate.price);
    return match ? parseInt(match[1].replace(/\s/g, ""), 10) : 890;
  }

  function addToBasket(article) {
    var plate = readPlate(article);
    if (basket.some(function (item) { return item.id === plate.id; })) {
      announce(plate.id + " is already on the quote.");
      return;
    }
    basket.push({ id: plate.id, title: plate.title, accession: plate.accession, amount: priceOf(plate) });
    persist();
    renderBasket();
    announce(plate.id + " added to the quote.");
  }

  function removeFromBasket(id) {
    basket = basket.filter(function (item) { return item.id !== id; });
    persist();
    renderBasket();
  }

  function money(value) {
    return "kr " + value.toLocaleString("nb-NO");
  }

  function invoiceNumber() {
    var now = new Date();
    var stamp = now.getFullYear() + String(now.getMonth() + 1).padStart(2, "0") + String(now.getDate()).padStart(2, "0");
    var seq = String(Math.floor(now.getTime() / 1000) % 10000).padStart(4, "0");
    return "BA-PRO-" + stamp + "-" + seq;
  }

  function renderBasket() {
    var host = document.getElementById("quote-lines");
    var panel = document.getElementById("quote-panel");
    var countEl = document.getElementById("quote-count");
    if (!host || !panel) return;

    host.innerHTML = "";
    var net = 0;

    basket.forEach(function (item) {
      net += item.amount;
      var row = document.createElement("div");
      row.className = "quote-line";
      row.innerHTML =
        '<span class="quote-id">' + item.id + "</span>" +
        '<span class="quote-title">' + item.title + "</span>" +
        '<span class="quote-amount">' + money(item.amount) + "</span>";

      var remove = document.createElement("button");
      remove.type = "button";
      remove.className = "quote-remove";
      remove.setAttribute("aria-label", "Remove " + item.id + " from the quote");
      remove.textContent = "×";
      remove.addEventListener("click", function () { removeFromBasket(item.id); });
      row.appendChild(remove);

      host.appendChild(row);
    });

    var vat = Math.round(net * 0.25);
    setText("quote-net", money(net));
    setText("quote-vat", money(vat));
    setText("quote-total", money(net + vat));
    if (countEl) countEl.textContent = String(basket.length);

    panel.hidden = basket.length === 0;
    var empty = document.getElementById("quote-empty");
    if (empty) empty.hidden = basket.length !== 0;
  }

  function setText(id, value) {
    var el = document.getElementById(id);
    if (el) el.textContent = value;
  }

  function buildInvoice() {
    if (!basket.length) return;
    var number = invoiceNumber();
    var issued = new Date().toISOString().slice(0, 10);
    var net = basket.reduce(function (sum, item) { return sum + item.amount; }, 0);
    var vat = Math.round(net * 0.25);

    var rows = basket.map(function (item) {
      return "<tr><td>" + item.id + "</td><td>" + item.title +
        '<br><span class="doc-note">' + item.accession + "</span></td><td>" + money(item.amount) + "</td></tr>";
    }).join("");

    var buyer = {
      name: value("inv-name"), org: value("inv-org"),
      email: value("inv-email"), vatNo: value("inv-vat"), address: value("inv-address")
    };

    var html =
      '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><title>Proforma invoice ' + number + '</title>' +
      "<style>" +
      "body{font-family:'Inter',Helvetica,Arial,sans-serif;color:#0F0F0F;background:#FBFAF7;margin:0;padding:48px;}" +
      "h1{font-size:22px;letter-spacing:.18em;text-transform:uppercase;margin:0 0 4px;}" +
      ".sub{font-family:monospace;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#85817A;margin:0 0 32px;}" +
      "table{width:100%;border-collapse:collapse;margin:24px 0;}" +
      "th,td{text-align:left;padding:10px 8px;border-bottom:1px solid #E4E0D8;font-size:13px;vertical-align:top;}" +
      "th{font-family:monospace;font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:#85817A;}" +
      ".totals{margin-left:auto;width:280px;}" +
      ".totals div{display:flex;justify-content:space-between;padding:6px 0;font-size:13px;}" +
      ".totals .grand{border-top:2px solid #0F0F0F;margin-top:6px;padding-top:10px;font-weight:600;}" +
      ".doc-note{font-family:monospace;font-size:10px;color:#85817A;}" +
      ".party{display:flex;gap:48px;margin-bottom:24px;font-size:13px;}" +
      ".terms{margin-top:32px;font-size:11px;color:#85817A;line-height:1.7;border-top:1px solid #E4E0D8;padding-top:16px;}" +
      "</style></head><body>" +
      "<h1>Beta Art</h1><p class=\"sub\">Proforma invoice · " + number + " · issued " + issued + "</p>" +
      '<div class="party"><div><strong>From</strong><br>Beta Art — Betül Öner<br>Norway<br>hallo@beta-art.com</div>' +
      "<div><strong>To</strong><br>" + (buyer.org || "—") + "<br>" + (buyer.name || "") + "<br>" +
      (buyer.address || "") + "<br>" + (buyer.email || "") + "<br>" +
      (buyer.vatNo ? "VAT/Org. no. " + buyer.vatNo : "") + "</div></div>" +
      "<table><thead><tr><th>Accession</th><th>Plate and record</th><th>Amount</th></tr></thead><tbody>" + rows + "</tbody></table>" +
      '<div class="totals"><div><span>Net</span><span>' + money(net) + "</span></div>" +
      "<div><span>VAT 25%</span><span>" + money(vat) + "</span></div>" +
      '<div class="grand"><span>Total</span><span>' + money(net + vat) + "</span></div></div>" +
      '<p class="terms">This is a proforma document, not a tax invoice, and no payment is due until a licence is countersigned by Beta Art. ' +
      "Licences are issued per plate for the media, term and territory agreed in writing. Use as training data for machine-learning systems is excluded from every licence. " +
      "Payment on the final invoice: card, Vipps or bank transfer, 14 days net. All plates, catalogue records and accession labels remain the property of Beta Art. © Beta Art.</p>" +
      "</body></html>";

    var win = window.open("", "_blank");
    if (!win) { announce("Allow pop-ups to open the proforma invoice."); return; }
    win.document.write(html);
    win.document.close();
    announce("Proforma " + number + " opened in a new tab — print or save as PDF.");
  }

  function value(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function announce(message) {
    var live = document.getElementById("tool-status");
    if (live) live.textContent = message;
  }

  /* ---------- Wiring ------------------------------------------------ */

  function init() {
    document.querySelectorAll("#plates .plate").forEach(function (article) {
      var actions = article.querySelector(".plate-actions");
      if (!actions) return;

      var download = actions.querySelector("[data-action='download']");
      if (download) download.addEventListener("click", function () { downloadPreview(article); });

      var quote = actions.querySelector("[data-action='quote']");
      if (quote) quote.addEventListener("click", function () { addToBasket(article); });
    });

    var clear = document.getElementById("quote-clear");
    if (clear) clear.addEventListener("click", function () { basket = []; persist(); renderBasket(); });

    var build = document.getElementById("quote-invoice");
    if (build) build.addEventListener("click", buildInvoice);

    var mail = document.getElementById("quote-mail");
    if (mail) {
      mail.addEventListener("click", function () {
        if (!basket.length) return;
        var lines = basket.map(function (i) { return i.id + " — " + i.title + " — " + money(i.amount); }).join("%0D%0A");
        var net = basket.reduce(function (s, i) { return s + i.amount; }, 0);
        window.location.href = "mailto:hallo@beta-art.com?subject=" +
          encodeURIComponent("Licence request — " + basket.length + " plate(s)") +
          "&body=" + lines + "%0D%0A%0D%0ANet:%20" + money(net) + "%0D%0A%0D%0AIntended%20use:%20";
      });
    }

    renderBasket();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.BetaArtTools = { seoFileName: seoFileName, slugify: slugify };
})();
