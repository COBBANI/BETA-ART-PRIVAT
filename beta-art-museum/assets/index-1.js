/* ============================================================
   1) CONFIG — replace with your own before publishing
   ============================================================ */
const CONTACT_EMAIL = "hello@betaart.no";
const CURRENCY = n => "kr " + n.toLocaleString("nb-NO");
const YEAR_PREFIX = "2026";  /* accession numbers: 2026.0142 etc. */

/* Three license tiers */
const LICENSES = [
  {id:"personal",   name:"Personal License",   desc:"Personal, non-commercial use. One user, one project.",             price:190},
  {id:"commercial", name:"Commercial License", desc:"One entity. Marketing, web, social, print to 5,000 copies.",       price:890},
  {id:"extended",   name:"Extended License",   desc:"Unlimited print, campaigns, resale products, one client sublicense.",price:2900},
];

/* Plates in the archive */
const PLATES = [
  {n:"0142", size:"wide", title:"First Light", cat:"landscape", loc:"Lofoten, Norway",         date:"March 2026",   camera:"Nikon Z8",       lens:"24–70mm ƒ/2.8",  exp:"ƒ/8 · 1/160 · ISO 64",   note:"Taken at 05:47, twenty minutes before civil dawn. Wind 6 m/s NW.", img:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1600&auto=format&fit=crop"},
  {n:"0143",         title:"Into the Pines",  cat:"landscape", loc:"Nordmarka, Oslo",         date:"October 2025", camera:"Canon R5",       lens:"35mm ƒ/1.8",     exp:"ƒ/4 · 1/250 · ISO 200",  note:"Morning walk after two days of rain.",                              img:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1200&auto=format&fit=crop"},
  {n:"0144", size:"tall", title:"Sea of Fog", cat:"landscape", loc:"Hardangervidda",          date:"September 2025",camera:"Sony A7R V",     lens:"70–200mm ƒ/4",   exp:"ƒ/9 · 1/320 · ISO 100",  note:"Temperature inversion at the plateau edge.",                       img:"https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1200&auto=format&fit=crop"},
  {n:"0145",         title:"Still Water",     cat:"landscape", loc:"Jotunheimen",             date:"July 2025",    camera:"Hasselblad X2D", lens:"38mm ƒ/2.5",     exp:"ƒ/11 · 1/60 · ISO 64",   note:"Long midnight sun. No filters used.",                              img:"https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format&fit=crop"},
  {n:"0146",         title:"Polar Night",     cat:"landscape", loc:"Senja, Norway",           date:"January 2026", camera:"Nikon Z8",       lens:"14–24mm ƒ/2.8",  exp:"ƒ/2.8 · 15s · ISO 1600", note:"Aurora activity Kp 6. Single exposure, no stacking.",              img:"https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop"},
  {n:"0147", size:"wide", title:"Blue Hour Grid", cat:"city", loc:"Chicago, US",              date:"November 2025",camera:"Sony A7R V",     lens:"16–35mm ƒ/2.8",  exp:"ƒ/8 · 2s · ISO 100",     note:"Twenty-fourth floor, west-facing. Tripod on tile.",                img:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1600&auto=format&fit=crop"},
  {n:"0148",         title:"Night Crossing",  cat:"city",      loc:"Singapore",               date:"February 2026",camera:"Canon R5",       lens:"24mm ƒ/1.4",     exp:"ƒ/5.6 · 4s · ISO 200",   note:"Long exposure, foot traffic captured as motion.",                  img:"https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1200&auto=format&fit=crop"},
  {n:"0149", size:"tall", title:"Golden Hour", cat:"city",     loc:"San Francisco",           date:"June 2025",    camera:"Nikon Z8",       lens:"85mm ƒ/1.8",     exp:"ƒ/7.1 · 1/500 · ISO 100",note:"Handheld from the Fillmore hill at 19:22.",                        img:"https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=1200&auto=format&fit=crop"},
  {n:"0150",         title:"Portrait in Amber", cat:"portrait", loc:"Studio, Oslo",           date:"April 2026",   camera:"Hasselblad X2D", lens:"80mm ƒ/1.9",     exp:"ƒ/2.8 · 1/200 · ISO 100",note:"Model release on file. Natural light, one reflector.",             img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1200&auto=format&fit=crop", release:true},
  {n:"0151",         title:"The Maker",       cat:"portrait",  loc:"Bergen, Norway",          date:"May 2026",     camera:"Leica Q3",       lens:"28mm ƒ/1.7",     exp:"ƒ/2 · 1/125 · ISO 400",  note:"Photographed in his workshop. Model release on file.",             img:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1200&auto=format&fit=crop", release:true},
  {n:"0152", size:"wide", title:"Slow Morning", cat:"landscape",loc:"Lago di Braies, Italy", date:"August 2025",  camera:"Sony A7R V",     lens:"24–70mm ƒ/2.8",  exp:"ƒ/6.3 · 1/250 · ISO 100",note:"05:20, before the first tourist boat launched.",                   img:"https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=1600&auto=format&fit=crop"},
  {n:"0153",         title:"Low Tide",        cat:"landscape", loc:"Ko Samui, Thailand",      date:"December 2025",camera:"Leica Q3",       lens:"28mm ƒ/1.7",     exp:"ƒ/8 · 1/640 · ISO 100",  note:"Storm the night before had cleared the sky by dawn.",              img:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop"},
];

const CATS = [
  {id:"all",label:"All plates"},{id:"landscape",label:"Landscape"},
  {id:"city",label:"City"},{id:"portrait",label:"Portrait"},
];

/* ============================================================
   State
   ============================================================ */
let activeCat = "all";
let cart = [];
let currentPlate = null;
let selectedLicense = "commercial";

const $ = id => document.getElementById(id);
const plateBy = n => PLATES.find(p => p.n === n);
const licBy = id => LICENSES.find(l => l.id === id);
const accessionOf = p => `${YEAR_PREFIX}.${p.n}`;

/* ============================================================
   Filters
   ============================================================ */
function renderFilters(){
  $("filters").innerHTML = CATS.map(c =>
    `<button class="filter-btn ${c.id===activeCat?'active':''}" data-cat="${c.id}">${c.label}</button>`
  ).join("");
  $("filters").querySelectorAll(".filter-btn").forEach(b =>
    b.addEventListener("click", () => { activeCat = b.dataset.cat; renderFilters(); renderGallery(); })
  );
}

/* ============================================================
   Gallery — irregular editorial grid
   ============================================================ */
let observer;
function renderGallery(){
  const list = PLATES.filter(p => activeCat==="all" || p.cat===activeCat);
  $("gallery").innerHTML = list.map(p => `
    <article class="piece ${p.size||''}" data-n="${p.n}" tabindex="0" role="button" aria-label="View plate ${accessionOf(p)}: ${p.title}">
      <img class="piece-img" src="${p.img}" alt="${p.title} — ${p.loc}" loading="lazy">
      <div class="piece-caption">
        <div>
          <div class="piece-title">${p.title}</div>
          <div class="piece-meta">${p.loc} · ${p.date}</div>
        </div>
        <div>
          <div class="piece-acc">${accessionOf(p)}</div>
          <div class="piece-price">from ${CURRENCY(LICENSES[0].price)}</div>
        </div>
      </div>
    </article>
  `).join("");

  const items = $("gallery").querySelectorAll(".piece");
  items.forEach(el => {
    el.addEventListener("click", () => openDetail(el.dataset.n));
    el.addEventListener("keydown", e => { if(e.key==="Enter"||e.key===" "){ e.preventDefault(); openDetail(el.dataset.n); } });
  });
}

/* ============================================================
   Detail panel — museum treatment
   ============================================================ */
function openDetail(n){
  currentPlate = plateBy(n);
  selectedLicense = "commercial";
  drawDetail();
  $("detailOverlay").classList.add("open");
  $("detailPanel").classList.add("open");
  $("detailPanel").setAttribute("aria-hidden","false");
  requestAnimationFrame(() => $("detailOverlay").classList.add("shown"));
  document.body.style.overflow = "hidden";
}
function closeDetail(){
  $("detailOverlay").classList.remove("shown");
  $("detailPanel").classList.remove("open");
  $("detailPanel").setAttribute("aria-hidden","true");
  setTimeout(() => { $("detailOverlay").classList.remove("open"); }, 350);
  document.body.style.overflow = "";
}
function drawDetail(){
  const p = currentPlate;
  const idx = PLATES.indexOf(p) + 1;
  $("detailContent").innerHTML = `
    <div class="detail-imgwrap">
      <img class="detail-img" src="${p.img}" alt="${p.title} — ${p.loc}">
    </div>
    <div class="detail-body">
      <div class="detail-head-row">
        <div>
          <span class="rule-label">Plate ${idx} of ${PLATES.length}</span>
          <h2 class="detail-title" style="margin-top:14px">${p.title}</h2>
          <div class="detail-loc">${p.loc} · ${p.date}</div>
        </div>
        <div class="seal-lg" title="Human verified — Seal ${p.n.slice(-2)}">
          <b>H</b>
          <span>Verified<br>Seal ${p.n.slice(-2)}</span>
        </div>
      </div>
      <div class="accession">
        <span class="a-key">Accession</span> <span class="a-val strong">${accessionOf(p)}</span>
        <span class="a-key">Camera</span> <span class="a-val">${p.camera}</span>
        <span class="a-key">Lens</span> <span class="a-val">${p.lens}</span>
        <span class="a-key">Exposure</span> <span class="a-val">${p.exp}</span>
        <span class="a-key">RAW</span> <span class="a-val">Original on record</span>
        ${p.release ? `<span class="a-key">Release</span><span class="a-val">Model release on file</span>` : ""}
      </div>
      <p class="detail-desc">${p.note}</p>
      <div>
        <span class="rule-label" style="margin-bottom:16px;display:inline-flex">Select a license</span>
        <div class="license-list">
          ${LICENSES.map(l => `
            <div class="license ${l.id===selectedLicense?'selected':''}" data-lic="${l.id}" role="radio" aria-checked="${l.id===selectedLicense}" tabindex="0">
              <div class="license-radio"></div>
              <div>
                <div class="license-name">${l.name}</div>
                <div class="license-desc">${l.desc}</div>
              </div>
              <div class="license-price">${CURRENCY(l.price)}</div>
            </div>`).join("")}
        </div>
      </div>
      <button class="add-btn" id="addBtn">Add to order · ${CURRENCY(licBy(selectedLicense).price)}</button>
    </div>
  `;
  $("detailContent").querySelectorAll(".license").forEach(el => {
    const pick = () => { selectedLicense = el.dataset.lic; drawDetail(); };
    el.addEventListener("click", pick);
    el.addEventListener("keydown", e => { if(e.key==="Enter"||e.key===" "){ e.preventDefault(); pick(); } });
  });
  $("addBtn").addEventListener("click", () => {
    cart.push({n:currentPlate.n, lic:selectedLicense});
    updateCart();
    closeDetail();
    toast(`Added · ${accessionOf(currentPlate)}`);
  });
}

/* ============================================================
   Order drawer
   ============================================================ */
function updateCart(){
  $("orderCount").textContent = cart.length;
  const body = $("drawerBody");
  if(!cart.length){
    body.innerHTML = `<div class="drawer-empty">— empty —</div>`;
  } else {
    body.innerHTML = cart.map((c,i) => {
      const p = plateBy(c.n), l = licBy(c.lic);
      return `
        <div class="cart-item">
          <img src="${p.img}" alt="${p.title}">
          <div>
            <div class="cart-name">${p.title}</div>
            <div class="cart-acc">Accession ${accessionOf(p)}</div>
            <div class="cart-lic">${l.name}</div>
            <div class="cart-row-btm">
              <span class="cart-price">${CURRENCY(l.price)}</span>
              <button class="cart-remove" data-i="${i}">Remove</button>
            </div>
          </div>
        </div>`;
    }).join("");
    body.querySelectorAll(".cart-remove").forEach(b =>
      b.addEventListener("click", () => { cart.splice(+b.dataset.i,1); updateCart(); })
    );
  }
  const total = cart.reduce((s,c) => s + licBy(c.lic).price, 0);
  $("cartTotal").textContent = CURRENCY(total);
}
function openDrawer(){ $("drawer").classList.add("open"); $("drawerOverlay").classList.add("open"); }
function closeDrawer(){ $("drawer").classList.remove("open"); $("drawerOverlay").classList.remove("open"); }

/* Checkout — manual, works with zero backend integrations */
function checkout(){
  toast("Preview only — sample photographs are not available for licensing.");
}

/* ============================================================
   UI plumbing
   ============================================================ */
let toastTimer;
function toast(msg){
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2400);
}

/* rise-in animations on load */
window.addEventListener("load", () => {
  document.querySelectorAll(".rise").forEach(el => el.classList.add("in"));
});

/* nav shadow on scroll */
window.addEventListener("scroll", () =>
  $("nav").classList.toggle("scrolled", window.scrollY > 20)
);

/* keyboard */
document.addEventListener("keydown", e => {
  if(e.key === "Escape"){ closeDetail(); closeDrawer(); }
});

/* wire up */
$("detailClose").addEventListener("click", closeDetail);
$("detailOverlay").addEventListener("click", closeDetail);
$("orderBtn").addEventListener("click", openDrawer);
$("drawerClose").addEventListener("click", closeDrawer);
$("drawerOverlay").addEventListener("click", closeDrawer);
$("checkoutBtn").addEventListener("click", checkout);
$("footMail").addEventListener("click", e => { e.preventDefault(); window.location.href = "mailto:"+CONTACT_EMAIL; });

/* boot */
renderFilters();
renderGallery();
updateCart();
