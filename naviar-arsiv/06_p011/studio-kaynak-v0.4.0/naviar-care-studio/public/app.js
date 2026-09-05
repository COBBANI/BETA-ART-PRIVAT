import {requestError,reviewRows} from './journey.js';
import {createDemoApi,requestId} from './demo.js';
import {copy} from './content.js';
import {render} from './render.js';
export function boot(preferredLang){
const portableDemo=document.documentElement.dataset.demo==='true';
const demoApi=portableDemo?createDemoApi():null;
const lang=preferredLang in copy?preferredLang:location.pathname.split('/')[1] in copy?location.pathname.split('/')[1]:'nb',t={...copy[lang]};
if(portableDemo)Object.assign(t,{preview:t.demoTitle,successTitle:t.demoSuccess,successText:t.demoSuccessText,privacyText:t.demoPrivacy,cookieTitle:t.demoChoiceTitle,cookieText:t.demoChoiceText,saved:t.demoSaved});
Object.assign(copy[lang],t);
document.documentElement.lang=lang;document.title=t.title;document.querySelector('meta[name=description]').content=t.description;document.querySelector('#app').innerHTML=render(lang);
const $=s=>document.querySelector(s);let management=null,idempotency=requestId(),busy=false,lastPayload=null;
const consentKey='naviar-care-consent-v1';let analytics=false,observer,pageViewSent=false,timers=new Map(),seen=new Set();
try{const stored=portableDemo?null:JSON.parse(localStorage.getItem(consentKey));analytics=stored?.choice==='allow'&&stored.until>Date.now();if(!stored||stored.until<Date.now())$('#consent-banner').hidden=false;}catch{$('#consent-banner').hidden=false;}
async function event(name,section){if(portableDemo||!analytics||document.visibilityState!=='visible')return;try{await fetch('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,section,locale:lang,consent:true})});}catch{}}
function stopObservers(){observer?.disconnect();for(const timer of timers.values())clearTimeout(timer);timers.clear();}
function track(){stopObservers();if(portableDemo||!analytics||document.hidden)return;if(!pageViewSent){event('page_view','home');pageViewSent=true;}observer=new IntersectionObserver(entries=>{for(const x of entries){const key=x.target.dataset.section;if(!x.isIntersecting){clearTimeout(timers.get(key));timers.delete(key);}else if(!seen.has(key)&&!timers.has(key)){timers.set(key,setTimeout(()=>{if(analytics&&document.visibilityState==='visible'){seen.add(key);event('content_engaged',key);}timers.delete(key);},15000));}}},{threshold:0.5});document.querySelectorAll('[data-section]').forEach(x=>observer.observe(x));}
const onVisibility=()=>{if(document.hidden)stopObservers();else if(analytics)track();};document.addEventListener('visibilitychange',onVisibility);
function choice(allow){analytics=allow;try{if(!portableDemo)localStorage.setItem(consentKey,JSON.stringify({choice:allow?'allow':'deny',until:Date.now()+180*86400000}));}catch{}$('#consent-banner').hidden=true;$('#live').textContent=t.saved;track();}
$('#allow-analytics').onclick=()=>choice(true);$('#decline-analytics').onclick=()=>choice(false);$('#privacy-choices').onclick=()=>{$('#consent-banner').hidden=false;$('#decline-analytics').focus();};track();
$('.menu-toggle').onclick=()=>{const open=$('.menu-toggle').getAttribute('aria-expanded')!=='true';$('.menu-toggle').setAttribute('aria-expanded',String(open));$('#main-nav').classList.toggle('open',open);};
document.querySelectorAll('#main-nav a').forEach(a=>a.onclick=()=>{$('#main-nav').classList.remove('open');$('.menu-toggle').setAttribute('aria-expanded','false');});
const onEscape=e=>{if(e.key==='Escape'){$('#main-nav').classList.remove('open');$('.menu-toggle').setAttribute('aria-expanded','false');}};document.addEventListener('keydown',onEscape);
document.querySelectorAll('[data-service]').forEach(button=>button.onclick=()=>{document.querySelectorAll('[data-service]').forEach(b=>{const chosen=b===button;b.setAttribute('aria-pressed',String(chosen));b.setAttribute('aria-label',(chosen?t.selected:t.select)+': '+t[b.dataset.service]);b.firstChild.textContent=chosen?t.selected:t.select;b.closest('article').classList.toggle('selected',chosen);});$('#booking-form').elements.service.value=button.dataset.service;$('#recommendation').hidden=false;$('#live').textContent=t.selected+': '+t[button.dataset.service];});
document.querySelectorAll('[data-document]').forEach(b=>b.onclick=()=>{const type=b.dataset.document;$('#document-title').textContent=t[type+'Title'];$('#document-text').textContent=t[type+'Text'];$('#document-dialog').showModal();});
document.querySelectorAll('.dialog-close').forEach(b=>b.onclick=()=>b.closest('dialog').close());
const form=$('#booking-form');const oslo=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Oslo'}).format(new Date());const base=new Date(oslo+'T12:00:00Z');form.elements.date.min=new Date(+base+86400000).toISOString().slice(0,10);form.elements.date.max=new Date(+base+90*86400000).toISOString().slice(0,10);
let started=false;form.addEventListener('focusin',()=>{if(!started){event('booking_started','booking');started=true;}});
async function api(path,data,token){if(portableDemo)return demoApi.request(path,data,token,idempotency);const res=await fetch(path,{method:'POST',headers:{'Content-Type':'application/json',...(token?{Authorization:'Bearer '+token}:{}),'Idempotency-Key':idempotency},body:JSON.stringify(data)});let result;try{result=await res.json();}catch{throw new Error('unavailable');}if(!res.ok)throw new Error(result.error||'error');return result;}
let reviewedPayload=null;
function readPayload(){return {...Object.fromEntries(new FormData(form)),locale:lang,consent:form.elements.consent.checked};}
function showFieldError(field,key){const input=form.elements[field];input.setAttribute('aria-invalid','true');input.setAttribute('aria-describedby','form-error'+(field==='date'?' date-hint':''));$('#form-error').textContent=t[key];$('#form-error').hidden=false;input.focus();}
form.addEventListener('input',e=>{e.target.removeAttribute('aria-invalid');if(e.target.name==='date')e.target.setAttribute('aria-describedby','date-hint');else e.target.removeAttribute('aria-describedby');$('#form-error').hidden=true;});
form.onsubmit=e=>{e.preventDefault();if(busy)return;$('#form-error').hidden=true;const payload=readPayload();const invalid=requestError(payload,form.elements.date.min,form.elements.date.max);if(invalid){showFieldError(...invalid);return;}reviewedPayload=payload;$('#review-details').replaceChildren();for(const[label,value]of reviewRows(payload,t)){const row=document.createElement('div'),dt=document.createElement('dt'),dd=document.createElement('dd');dt.textContent=label;dd.textContent=value;row.append(dt,dd);$('#review-details').append(row);}$('#review-dialog').showModal();};
$('#edit-request').onclick=()=>{$('#review-dialog').close();form.elements.name.focus();};
$('#confirm-request').onclick=async()=>{if(busy||!reviewedPayload)return;const payload=reviewedPayload;$('#review-dialog').close();const fingerprint=JSON.stringify(payload);if(lastPayload&&lastPayload!==fingerprint)idempotency=requestId();lastPayload=fingerprint;busy=true;form.querySelector('[type=submit]').disabled=true;form.querySelector('[type=submit]').textContent=t.sending;
 try{const r=await api('/api/requests',payload);if(!r.id||!['pending_review','confirmed','cancelled'].includes(r.status))throw new Error('unavailable');if(!r.duplicate)management={id:r.id,token:r.managementToken};$('#result-copy').textContent=r.duplicate?t.duplicate:t.successText;$('#request-reference').textContent=r.id;$('#request-status').textContent='';$('#cancel-request').hidden=!management;$('#check-request').hidden=!management;$('#pay-request').hidden=!management;$('#result-dialog').showModal();}
 catch(err){$('#form-error').textContent=t[err.message]||(['durable_database_required','Failed to fetch'].includes(err.message)?t.unavailable:t.error);$('#form-error').hidden=false;$('#form-error').focus();event('booking_error','booking');}finally{busy=false;form.querySelector('[type=submit]').disabled=false;form.querySelector('[type=submit]').textContent=t.reviewButton;}};
const statusNames={nb:{pending_review:'Til vurdering',confirmed:'Bekreftet',cancelled:'Avbrutt',paid:'Betalt',not_started:'Ikke startet',pending:'Venter',failed:'Mislykket',expired:'Utløpt'},en:{pending_review:'Awaiting review',confirmed:'Confirmed',cancelled:'Cancelled',paid:'Paid',not_started:'Not started',pending:'Pending',failed:'Failed',expired:'Expired'},tr:{pending_review:'Değerlendirme bekliyor',confirmed:'Onaylandı',cancelled:'İptal edildi',paid:'Ödendi',not_started:'Başlamadı',pending:'Bekliyor',failed:'Başarısız',expired:'Süresi doldu'}};
$('#cancel-request').onclick=async()=>{if(!management)return;try{await api('/api/request/cancel',{id:management.id},management.token);$('#request-status').textContent=t.cancelled;}catch{$('#request-status').textContent=t.error;}};
$('#check-request').onclick=async()=>{if(!management)return;try{const r=await api('/api/request/status',{id:management.id},management.token);$('#request-status').textContent=(statusNames[lang][r.status]||r.status)+' · '+(statusNames[lang][r.paymentStatus]||r.paymentStatus);}catch{$('#request-status').textContent=t.error;}};
$('#pay-request').onclick=async()=>{if(!management)return;try{const r=await api('/api/checkout',{id:management.id},management.token);const url=new URL(r.url);if(url.origin!=='https://checkout.stripe.com')throw 0;location.assign(r.url);}catch{$('#request-status').textContent=t.paymentPending;}};
if(new URLSearchParams(location.search).has('payment')){$('#live').textContent=t.paymentPending;history.replaceState(null,'',location.pathname);}

if(portableDemo){
 const panel=document.createElement('aside');panel.className='demo-tools wrap';
 const text=document.createElement('p');text.textContent=t.demoText;
 const actions=document.createElement('div');actions.className='actions';
 const sample=document.createElement('button');sample.type='button';sample.className='button secondary';sample.textContent=t.sample;
 const fail=document.createElement('button');fail.type='button';fail.className='button secondary';fail.textContent=t.fail;
 const status=document.createElement('p');status.setAttribute('role','status');status.className='demo-status';
 sample.onclick=()=>{form.elements.name.value='Demo Person';form.elements.email.value='demo@example.test';form.elements.postcode.value='0150';form.elements.date.value=form.elements.date.min;form.elements.consent.checked=false;status.textContent=t.sampleReady;form.scrollIntoView({block:'center'});form.elements.name.focus();};
 fail.onclick=()=>{demoApi.failNext();status.textContent=t.failureReady;};
 actions.append(sample,fail);panel.append(text,actions,status);document.querySelector('main').before(panel);
}

return ()=>{stopObservers();document.removeEventListener('visibilitychange',onVisibility);document.removeEventListener('keydown',onEscape);document.querySelector('.demo-tools')?.remove();};
}
let cleanup=boot();
