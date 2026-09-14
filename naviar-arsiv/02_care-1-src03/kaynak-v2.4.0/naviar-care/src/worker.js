import {readiness} from './readiness.js';
import {contentInsights, operationMetrics} from './insights.js';
import {render} from './render.js';
import {texts,services,sections} from './locales.js';
import css from './styles.css';
import client from './client.txt';
import hero from '../assets/hverdag.png';
import logo from '../assets/naviar-care-v03.svg';
const uuid=()=>crypto.randomUUID();
const ms=()=>Date.now();
const day=x=>new Date(x).toISOString().slice(0,10);
const SHA=async s=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))).map(x=>x.toString(16).padStart(2,'0')).join('');
export class HttpError extends Error{constructor(status,code){super(code);this.status=status;this.code=code}}
const fail=(n,c)=>{throw new HttpError(n,c)};
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});
const parseCookie=(req,n)=>req.headers.get('cookie')?.split(';').map(x=>x.trim()).find(x=>x.startsWith(n+'='))?.slice(n.length+1)||'';
const me=req=>req.headers.get('oai-authenticated-user-id');
const isAdmin=(req,env)=>!!me(req)&&(env.ADMIN_EMAILS||'').split(',').map(x=>x.trim().toLowerCase()).includes((req.headers.get('oai-authenticated-user-email')||'').toLowerCase());
const requireUser=req=>me(req)||fail(401,'signin');
const requireAdmin=(req,env)=>isAdmin(req,env)||fail(403,'forbidden');
const db=env=>env.DB||fail(503,'storage_unavailable');
const open=env=>env.SERVICE_OPEN==='true'&&!!env.OPERATOR_NAME&&!!env.CONTACT_EMAIL&&!!env.SERVICE_AREA&&env.LAUNCH_REVIEW_COMPLETE==='true';
const statement=(env,q,args=[])=>db(env).prepare(q).bind(...args);
const row=(env,q,args=[])=>statement(env,q,args).first();
const rows=async(env,q,args=[])=>{const r=await statement(env,q,args).all();return r.results||[]};
const run=(env,q,args=[])=>statement(env,q,args).run();
const changes=r=>(r.meta?.changes??r.changes??0);
const audit=(env,actor,action,target)=>run(env,'INSERT INTO audit(id,actor,action,target,created) VALUES(?,?,?,?,?)',[uuid(),actor,action,target,ms()]);
async function body(req){if(+(req.headers.get('content-length')||0)>16000)fail(413,'too_large');const raw=await req.text();if(raw.length>16000)fail(413,'too_large');try{return JSON.parse(raw)}catch{fail(400,'invalid_json')}}
function csrf(req,env){const origin=req.headers.get('origin');const cookie=parseCookie(req,'naviar_csrf');if(!env.SITE_ORIGIN||origin!==env.SITE_ORIGIN||!cookie||req.headers.get('x-csrf-token')!==cookie)fail(403,'origin');if(!req.headers.get('content-type')?.startsWith('application/json'))fail(415,'content_type')}
const clean=(v,max,min=1)=>typeof v==='string'&&v.trim().length>=min&&v.trim().length<=max&&!/[\u0000-\u0008\u000b\u000c]/.test(v)?v.trim():fail(400,'validation');
function contactData(b,demo){const name=clean(b.name,80),email=clean(b.email,254).toLowerCase();if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))fail(400,'validation');if(demo&&!/\.(test|invalid)$/.test(email))fail(400,'test_email');return {name,email}}
async function rate(req,env){const identity=me(req)||req.headers.get('cf-connecting-ip')||'anonymous';const bucket=Math.floor(ms()/60000);const key=await SHA((env.RATE_LIMIT_SECRET||'')+identity+bucket);const r=await row(env,'INSERT INTO rate_limits(key,count,expires) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count',[key,ms()+120000]);if(r.count>60)fail(429,'rate_limit')}
export function osloToUTC(value){if(typeof value!=='string'||!/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(value))fail(400,'invalid_time');const local=Date.parse(value+'Z');if(!Number.isFinite(local))fail(400,'invalid_time');const f=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Oslo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});const choices=[1,2].map(h=>local-h*3600000).filter(ts=>f.format(new Date(ts)).replace(' ','T')===value);if(choices.length!==1)fail(400,'ambiguous_time');return choices[0]}
async function listSlots(env){return rows(env,"SELECT id,start,end,demo FROM slots s WHERE active=1 AND demo=? AND start>? AND NOT EXISTS (SELECT 1 FROM bookings b WHERE b.slot_id=s.id AND b.status='confirmed') ORDER BY start LIMIT 80",[open(env)?0:1,ms()+900000])}
async function getBooking(req,env,id){const b=await row(env,'SELECT b.*,s.start,s.end FROM bookings b JOIN slots s ON s.id=b.slot_id WHERE b.id=?',[id]);if(!b||(!isAdmin(req,env)&&b.owner!==requireUser(req)))fail(404,'not_found');return b}
function publicBooking(b){return {id:b.id,service:b.service,name:b.name,email:b.email,locale:b.locale,start:b.start,end:b.end,status:b.status,demo:b.demo,total:b.total,payment:b.payment,offerVersion:b.offer_version,offerDetails:b.offer_details}}
async function checkout(req,env,input){
 const booking=await getBooking(req,env,clean(input.id,64));
 if(!open(env)||booking.demo||env.PAYMENTS_ENABLED!=='true'||!String(env.STRIPE_SECRET_KEY||'').startsWith('sk_live_')||!env.STRIPE_WEBHOOK_SECRET)fail(503,'payment_unavailable');
 if(input.acceptTerms!==true||input.offerVersion!==booking.offer_version)fail(409,'offer_changed');
 if(booking.status!=='confirmed'||!Number.isInteger(booking.total)||booking.total<=0||!booking.offer_details)fail(409,'no_offer');
 if(booking.payment==='paid')return json({paid:true});
 // Freeze this offer and remember the FIRST attempt, including uncertain network failures.
 const locked=await run(env,"UPDATE bookings SET payment='checkout_pending',checkout_started=CASE WHEN payment='offered' THEN ? ELSE checkout_started END WHERE id=? AND offer_version=? AND status='confirmed' AND payment IN ('offered','checkout_pending')",[ms(),booking.id,booking.offer_version]);
 if(!changes(locked))fail(409,'offer_changed');
 const current=await getBooking(req,env,booking.id);
 if(current.payment==='paid')return json({paid:true});
 if(current.offer_version!==booking.offer_version||current.payment!=='checkout_pending')fail(409,'offer_changed');
 // Never recreate a known session. Unknown legacy/old attempts need operator reconciliation.
 if(!current.stripe_session&&(!current.checkout_started||ms()-current.checkout_started>=23*3600000))fail(409,'payment_review');
 const headers={Authorization:'Bearer '+env.STRIPE_SECRET_KEY};
 let r;
 if(current.stripe_session){
  r=await fetch('https://api.stripe.com/v1/checkout/sessions/'+encodeURIComponent(current.stripe_session),{headers,signal:AbortSignal.timeout(10000)});
 }else{
  const params=new URLSearchParams({mode:'payment',success_url:env.SITE_ORIGIN+'/'+booking.locale+'/payment',cancel_url:env.SITE_ORIGIN+'/'+booking.locale+'/my','metadata[booking_id]':booking.id,'metadata[offer_version]':String(booking.offer_version),'line_items[0][price_data][currency]':'nok','line_items[0][price_data][unit_amount]':String(booking.total),'line_items[0][price_data][product_data][name]':'NAVIAR CARE · '+booking.id.slice(0,8),'line_items[0][quantity]':'1'});
  r=await fetch('https://api.stripe.com/v1/checkout/sessions',{method:'POST',headers:{...headers,'content-type':'application/x-www-form-urlencoded','Idempotency-Key':'care/'+booking.id+'/'+booking.offer_version},body:params,signal:AbortSignal.timeout(10000)});
 }
 if(!r.ok)fail(502,'payment_provider');
 const session=await r.json();
 if(typeof session.id!=='string'||!session.id.startsWith('cs_')||(current.stripe_session&&session.id!==current.stripe_session)||session.currency!=='nok'||session.amount_total!==booking.total||session.livemode!==true||session.metadata?.booking_id!==booking.id||String(session.metadata?.offer_version)!==String(booking.offer_version))fail(502,'payment_provider');
 const saved=await run(env,"UPDATE bookings SET stripe_session=? WHERE id=? AND offer_version=? AND payment='checkout_pending' AND (stripe_session IS NULL OR stripe_session=?)",[session.id,booking.id,booking.offer_version,session.id]);
 if(!changes(saved)){if((await getBooking(req,env,booking.id)).payment==='paid')return json({paid:true});fail(409,'offer_changed')}
 if(session.status==='expired'){
  await run(env,"UPDATE bookings SET payment='offered',offer_version=offer_version+1,stripe_session=NULL,checkout_started=NULL WHERE id=? AND offer_version=? AND stripe_session=? AND payment='checkout_pending'",[booking.id,booking.offer_version,session.id]);
  fail(409,'offer_changed');
 }
 // The provider webhook remains the payment authority; a completed checkout is not a new sale.
 if(session.status==='complete'||session.payment_status==='paid')return json({pending:true});
 let url;try{url=new URL(session.url)}catch{fail(502,'payment_provider')}
 if(session.status!=='open'||url.protocol!=='https:'||url.hostname!=='checkout.stripe.com'||url.username||url.password||url.port)fail(502,'payment_provider');
 return json({url:url.href});
}
async function sendBookingMail(env,id){const item=await row(env,'SELECT * FROM outbox WHERE id=?',[id]);if(!item||item.state==='sent'||item.state==='suppressed'||item.state==='superseded')return;
const b=await row(env,'SELECT b.*,s.start FROM bookings b JOIN slots s ON s.id=b.slot_id WHERE b.id=?',[item.booking_id]);if(!b)return;
if(item.kind==='confirm'&&b.status==='cancelled'){await run(env,"UPDATE outbox SET state='superseded' WHERE id=?",[id]);return}
if(b.demo){await run(env,"UPDATE outbox SET state='suppressed' WHERE id=?",[id]);return}
if(!open(env)||!env.RESEND_API_KEY||!env.EMAIL_FROM){await run(env,"UPDATE outbox SET state='blocked' WHERE id=?",[id]);return}
// After 24 hours Resend no longer deduplicates. Leave uncertain older attempts for manual reconciliation.
if(item.last_attempt&&ms()-item.last_attempt>23*3600000){await run(env,"UPDATE outbox SET state='failed' WHERE id=?",[id]);return}
const t=texts[b.locale],when=new Intl.DateTimeFormat(b.locale,{timeZone:'Europe/Oslo',dateStyle:'full',timeStyle:'short'}).format(b.start);const text=`NAVIAR CARE\n\n${item.kind==='cancel'?t.cancelled:t.bookingSuccess}\n${t.date}: ${when} (Europe/Oslo)\n${t.reference}: ${b.id}\n${env.SITE_ORIGIN}/${b.locale}/my\n\n${t.scope}`;
await run(env,'UPDATE outbox SET attempts=attempts+1,last_attempt=COALESCE(last_attempt,?) WHERE id=?',[ms(),id]);
try{const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'content-type':'application/json','Idempotency-Key':'care/'+id},body:JSON.stringify({from:env.EMAIL_FROM,to:[b.email],subject:'NAVIAR CARE · '+(item.kind==='cancel'?t.cancelled:t.confirmed),text}),signal:AbortSignal.timeout(10000)});if(!r.ok)throw Error('provider');const result=await r.json();if(!result.id)throw Error('provider');await run(env,"UPDATE outbox SET state='sent',provider_id=? WHERE id=?",[result.id,id])}catch{await run(env,"UPDATE outbox SET state='failed' WHERE id=?",[id])}}
export async function verifyStripe(raw,header,secret,now=Date.now()){if(!secret||!header)return false;const values=header.split(',').map(x=>x.split('='));const ts=values.find(x=>x[0]==='t')?.[1],signatures=values.filter(x=>x[0]==='v1').map(x=>x[1]);if(!ts||!/^\d+$/.test(ts)||Math.abs(now/1000-Number(ts))>300)return false;const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);const result=new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(ts+'.'+raw)));return signatures.some(hex=>{if(!/^[a-f0-9]{64}$/i.test(hex||''))return false;let difference=0;for(let i=0;i<32;i++)difference|=result[i]^parseInt(hex.slice(i*2,i*2+2),16);return difference===0})}
async function webhook(req,env){if(!env.STRIPE_WEBHOOK_SECRET)fail(503,'payment_unavailable');const raw=await req.text();if(raw.length>100000)fail(413,'too_large');if(!await verifyStripe(raw,req.headers.get('stripe-signature'),env.STRIPE_WEBHOOK_SECRET))fail(400,'signature');let event;try{event=JSON.parse(raw)}catch{fail(400,'invalid_json')};if(!event.id)fail(400,'event');const session=event.data?.object;
if(!['checkout.session.completed','checkout.session.async_payment_succeeded','checkout.session.async_payment_failed','checkout.session.expired'].includes(event.type))return json({received:true});
if(await row(env,'SELECT id FROM webhook_events WHERE id=?',[event.id]))return json({received:true});
const id=session?.metadata?.booking_id,b=await row(env,'SELECT * FROM bookings WHERE id=?',[id||'']);if(!b)return json({received:true});
if(session.id!==b.stripe_session||session.currency!=='nok'||session.amount_total!==b.total||Number(session.metadata.offer_version)!==b.offer_version)fail(409,'payment_mismatch');
if(event.livemode!==String(env.STRIPE_SECRET_KEY||'').startsWith('sk_live_')||b.demo)fail(409,'payment_mode');
if(event.type==='checkout.session.expired'){await db(env).batch([statement(env,"UPDATE bookings SET payment='offered',offer_version=offer_version+1,stripe_session=NULL,checkout_started=NULL WHERE id=? AND payment='checkout_pending' AND NOT EXISTS(SELECT 1 FROM webhook_events WHERE id=?)",[b.id,event.id]),statement(env,'INSERT OR IGNORE INTO webhook_events(id,created) VALUES(?,?)',[event.id,ms()])]);return json({received:true})}
const paid=session.payment_status==='paid'&&['checkout.session.completed','checkout.session.async_payment_succeeded'].includes(event.type);
await db(env).batch([statement(env,"UPDATE bookings SET payment=CASE WHEN ?=1 THEN 'paid' WHEN payment='paid' THEN payment WHEN ?=1 THEN 'failed' ELSE payment END WHERE id=? AND NOT EXISTS(SELECT 1 FROM webhook_events WHERE id=?)",[paid?1:0,event.type==='checkout.session.async_payment_failed'?1:0,b.id,event.id]),statement(env,'INSERT OR IGNORE INTO webhook_events(id,created) VALUES(?,?)',[event.id,ms()])]);return json({received:true})}
export function demandForecast(records,now=Date.now()){const week=7*86400000;const end=new Date(now);end.setUTCHours(0,0,0,0);end.setUTCDate(end.getUTCDate()-((end.getUTCDay()+6)%7));const stop=+end;const full=Array.from({length:10},(_,i)=>({start:stop-(10-i)*week,count:0}));for(const b of records){const k=Math.floor((b.created-full[0].start)/week);if(k>=0&&k<10)full[k].count++}const total=full.reduce((s,w)=>s+w.count,0);const active=full.filter(w=>w.count>0).length;if(total<40||active<8)return {available:false,total,fullWeeks:10};const mean=arr=>arr.reduce((a,b)=>a+b,0)/arr.length;const counts=full.map(x=>x.count);const error=(method,i)=>Math.abs(counts[i]-(method==='four_week_mean'?mean(counts.slice(i-4,i)):counts[i-1]));const candidates=['four_week_mean','last_week'];const selected=candidates.map(method=>({method,loss:mean([4,5,6,7].map(i=>error(method,i)))})).sort((a,b)=>a.loss-b.loss)[0].method;const sorted=counts.slice().sort((a,b)=>a-b);return {available:true,method:selected,expected:Math.round(selected==='four_week_mean'?mean(counts.slice(-4)):counts[9]),historicalRange:[sorted[1],sorted[8]],holdoutMAE:mean([8,9].map(i=>error(selected,i))),evaluationWeeks:2,periodStart:stop,periodEnd:stop+week,total,fullWeeks:10}}
async function api(req,env,ctx,path){const method=req.method;if(path==='/api/webhooks/stripe'&&method==='POST')return webhook(req,env);if(method==='POST'){csrf(req,env);await rate(req,env)}
if(path==='/api/status'){const r=readiness(env);return json({open:open(env),email:open(env)&&r.sender,payment:open(env)&&r.paymentKeys&&r.paymentEnabled,authenticated:!!me(req)})}
if(path==='/api/slots'&&method==='GET')return json({slots:await listSlots(env)});
if(path==='/api/bookings'&&method==='GET'){const owner=requireUser(req);return json({bookings:(await rows(env,'SELECT b.*,s.start,s.end FROM bookings b JOIN slots s ON s.id=b.slot_id WHERE owner=? ORDER BY created DESC LIMIT 100',[owner])).map(publicBooking)})}
if(path==='/api/bookings'&&method==='POST'){const owner=requireUser(req),b=await body(req),demo=!open(env),details=contactData(b,demo),idem=clean(b.idem,64),locale=texts[b.locale]?b.locale:'nb';if(!services.includes(b.service)||!['self','relative'].includes(b.relationship))fail(400,'validation');
const existing=await row(env,'SELECT b.*,s.start,s.end FROM bookings b JOIN slots s ON s.id=b.slot_id WHERE owner=? AND idem=?',[owner,idem]);if(existing)return json({booking:publicBooking(existing)});
const slot=await row(env,'SELECT * FROM slots WHERE id=? AND active=1 AND demo=? AND start>?',[clean(b.slotId,64),demo?1:0,ms()+900000]);if(!slot)fail(409,'slot_conflict');const id=uuid();
try{const inserted=await db(env).batch([statement(env,'INSERT INTO bookings(id,slot_id,owner,idem,service,name,email,locale,relationship,status,demo,created) SELECT ?,?,?,?,?,?,?,?,?,?,?,? WHERE EXISTS(SELECT 1 FROM slots WHERE id=? AND active=1 AND demo=? AND start>?)',[id,slot.id,owner,idem,b.service,details.name,details.email,locale,b.relationship,'confirmed',demo?1:0,ms(),slot.id,demo?1:0,ms()+900000]),statement(env,'INSERT INTO outbox(id,booking_id,kind,state,created) SELECT ?,?,?,?,? WHERE EXISTS(SELECT 1 FROM bookings WHERE id=?)',[id+'/confirm',id,'confirm',demo?'suppressed':'pending',ms(),id])]);if(!changes(inserted[0]))fail(409,'slot_conflict')}catch(e){if(/UNIQUE|constraint/i.test(e.message))fail(409,'slot_conflict');throw e}
ctx.waitUntil(sendBookingMail(env,id+'/confirm'));return json({booking:publicBooking(await getBooking(req,env,id))},201)}
if(/^\/api\/bookings\/[^/]+\/cancel$/.test(path)&&method==='POST'){const id=path.split('/')[3],owner=requireUser(req),b=await getBooking(req,env,id);if(['paid','checkout_pending'].includes(b.payment))fail(409,'manual_review');await db(env).batch([statement(env,"UPDATE bookings SET status='cancelled' WHERE id=? AND payment NOT IN ('paid','checkout_pending')",[id]),statement(env,"INSERT OR IGNORE INTO outbox(id,booking_id,kind,state,created) SELECT ?,?,?,?,? WHERE EXISTS(SELECT 1 FROM bookings WHERE id=? AND status='cancelled')",[id+'/cancel',id,'cancel',b.demo?'suppressed':'pending',ms(),id])]);if((await getBooking(req,env,id)).status!=='cancelled')fail(409,'manual_review');await audit(env,owner,'cancel',id);ctx.waitUntil(sendBookingMail(env,id+'/cancel'));return json({ok:true})}
if(path==='/api/enquiries'&&method==='GET'){const owner=requireUser(req);return json({messages:await rows(env,'SELECT id,topic,body,locale,demo,created,status,updated FROM messages WHERE owner=? ORDER BY created DESC LIMIT 100',[owner])})}
if(path==='/api/contact'&&method==='POST'){const owner=requireUser(req),b=await body(req),demo=!open(env),details=contactData(b,demo);const topic=clean(b.topic,30);if(!['support','helper','change','feedback'].includes(topic))fail(400,'validation');const id=uuid(),idem=clean(b.idem,64);await run(env,'INSERT OR IGNORE INTO messages(id,owner,idem,name,email,topic,body,locale,demo,created) VALUES(?,?,?,?,?,?,?,?,?,?)',[id,owner,idem,details.name,details.email,topic,clean(b.body,1500),texts[b.locale]?b.locale:'nb',demo?1:0,ms()]);return json({id:(await row(env,'SELECT id FROM messages WHERE owner=? AND idem=?',[owner,idem])).id,demo},201)}
if(path==='/api/analytics'&&method==='POST'){const b=await body(req);if(b.consent!==true||parseCookie(req,'naviar_analytics')!=='yes')fail(403,'consent');if(!['view','engaged','book_click','guide_click','contact_click'].includes(b.kind)||!sections.includes(b.section)||!texts[b.locale])fail(400,'validation');if(isAdmin(req,env)||!open(env))return json({ok:true,excluded:true});const session=clean(b.session,64);if(!/^[a-f0-9-]{36}$/.test(session))fail(400,'validation');await run(env,'INSERT OR IGNORE INTO events(id,session,kind,section,locale,day,created,live) VALUES(?,?,?,?,?,?,?,1)',[uuid(),await SHA(session),b.kind,b.section,b.locale,day(ms()),ms()]);return json({ok:true})}
if(path==='/api/checkout'&&method==='POST')return checkout(req,env,await body(req));
if(path.startsWith('/api/admin/')){requireAdmin(req,env);const actor=requireUser(req);
if(path==='/api/admin/overview'){const bookings=await rows(env,'SELECT b.*,s.start,s.end FROM bookings b JOIN slots s ON s.id=b.slot_id ORDER BY created DESC LIMIT 150');const events=await rows(env,"SELECT section,locale,SUM(CASE WHEN kind='view' THEN 1 ELSE 0 END) AS views,SUM(CASE WHEN kind='engaged' THEN 1 ELSE 0 END) AS engaged FROM events WHERE live=1 AND created>? AND kind IN ('view','engaged') GROUP BY section,locale ORDER BY views DESC",[ms()-30*86400000]);return json({readiness:readiness(env),nextSteps:await rows(env,"SELECT section,kind,COUNT(*) AS clicks FROM events WHERE live=1 AND created>? AND kind IN ('book_click','guide_click','contact_click') GROUP BY section,kind ORDER BY clicks DESC",[ms()-30*86400000]),bookings:bookings.map(publicBooking),messages:await rows(env,"SELECT id,name,email,topic,body,locale,demo,created,status,version,updated FROM messages ORDER BY CASE status WHEN 'new' THEN 0 WHEN 'in_progress' THEN 1 ELSE 2 END, created DESC LIMIT 100"),outbox:await rows(env,'SELECT kind,state,attempts,created FROM outbox ORDER BY created DESC LIMIT 30'),slots:await rows(env,"SELECT s.id,s.start,s.end,s.demo,EXISTS(SELECT 1 FROM bookings b WHERE b.slot_id=s.id AND b.status='confirmed') AS booked FROM slots s WHERE s.active=1 AND s.start>? ORDER BY s.start LIMIT 100",[ms()]),events,insights:contentInsights(events),metrics:await operationMetrics(env),forecast:demandForecast(await rows(env,'SELECT created FROM bookings WHERE demo=0 AND created>?',[ms()-80*86400000])),config:{booking:open(env)?'live':'preview',email:env.RESEND_API_KEY&&env.EMAIL_FROM?'configured':'not_configured',payment:readiness(env).paymentKeys&&readiness(env).paymentEnabled?'configured':'not_configured',analytics:'consent_only',timezone:'Europe/Oslo'}})}
if(path==='/api/admin/slots'&&method==='POST'){const b=await body(req),start=osloToUTC(b.start),duration=Number(b.duration);if(start<ms()+3600000||start>ms()+180*86400000||!Number.isInteger(duration)||duration<20||duration>120)fail(400,'validation');const end=start+duration*60000,id=uuid();const r=await run(env,'INSERT INTO slots(id,start,end,demo,active) SELECT ?,?,?,?,1 WHERE NOT EXISTS(SELECT 1 FROM slots WHERE active=1 AND start<? AND end>?)',[id,start,end,open(env)?0:1,end+10*60000,start-10*60000]);if(!changes(r))fail(409,'slot_conflict');await audit(env,actor,'create_slot',id);return json({id},201)}
if(path==='/api/admin/message-status'&&method==='POST'){
  const b=await body(req),id=clean(b.id,64);
  if(!['new','in_progress','closed'].includes(b.status)||!Number.isInteger(b.version)||b.version<0)fail(400,'validation');
  const existing=await row(env,'SELECT id,version FROM messages WHERE id=?',[id]);
  if(!existing)fail(404,'not_found');
  const r=await run(env,'UPDATE messages SET status=?,version=version+1,updated=? WHERE id=? AND version=?',[b.status,ms(),id,b.version]);
  if(!changes(r))fail(409,'stale_message');
  await audit(env,actor,'message_'+b.status,id);return json({ok:true,version:b.version+1});
}
if(path==='/api/admin/close-slot'&&method==='POST'){
  const b=await body(req),id=clean(b.id,64);
  const r=await run(env,"UPDATE slots SET active=0 WHERE id=? AND active=1 AND start>? AND NOT EXISTS(SELECT 1 FROM bookings WHERE slot_id=? AND status='confirmed')",[id,ms(),id]);
  if(!changes(r))fail(409,'slot_occupied');
  await audit(env,actor,'close_slot',id);return json({ok:true});
}
if(path==='/api/admin/offer'&&method==='POST'){const b=await body(req),total=Number(b.total),booking=await getBooking(req,env,clean(b.id,64));if(!Number.isInteger(total)||total<100||total>10000000)fail(400,'validation');const r=await run(env,"UPDATE bookings SET total=?,offer_details=?,offer_version=offer_version+1,payment='offered' WHERE id=? AND status='confirmed' AND payment NOT IN ('paid','checkout_pending')",[total,clean(b.details,1000),booking.id]);if(!changes(r))fail(409,'manual_review');await audit(env,actor,'create_offer',booking.id);return json({ok:true})}
if(path==='/api/admin/retry-email'&&method==='POST'){const items=await rows(env,"SELECT id FROM outbox WHERE state IN ('pending','blocked','failed') AND attempts<3 LIMIT 10");for(const i of items)await sendBookingMail(env,i.id);await audit(env,actor,'retry_email','outbox');return json({ok:true})}
if(path==='/api/admin/maintenance'&&method==='POST'){await db(env).batch([statement(env,'DELETE FROM events WHERE created<?',[ms()-90*86400000]),statement(env,'DELETE FROM rate_limits WHERE expires<?',[ms()])]);await audit(env,actor,'retention','events_and_limits');return json({ok:true})}
}
fail(404,'not_found')}
function security(response,env){const h=new Headers(response.headers);h.set('x-content-type-options','nosniff');h.set('referrer-policy','no-referrer');h.set('permissions-policy','camera=(), microphone=(), geolocation=()');h.set('content-security-policy',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self' https://checkout.stripe.com; frame-ancestors https://chatgpt.com https://*.chatgpt.com https://*.chatgpt.site");return new Response(response.body,{status:response.status,headers:h})}
export default {async fetch(req,env,ctx){try{const url=new URL(req.url);let path=url.pathname.replace(/\/$/,'')||'/';let response;
if(path.startsWith('/api/'))response=await api(req,env,ctx,path);
else if(path==='/styles.css')response=new Response(css,{headers:{'content-type':'text/css','cache-control':'public,max-age=3600'}});
else if(path==='/app.js')response=new Response(client,{headers:{'content-type':'application/javascript','cache-control':'public,max-age=3600'}});
else if(path==='/assets/naviar-care-v03.svg')response=new Response(logo,{headers:{'content-type':'image/svg+xml','cache-control':'public,max-age=86400'}});
else if(path==='/assets/hverdag.png')response=new Response(Uint8Array.from(atob(hero),c=>c.charCodeAt(0)),{headers:{'content-type':'image/png','cache-control':'public,max-age=86400'}});
else if(path==='/robots.txt')response=new Response('User-agent: *\nDisallow: /\n');
else if(path==='/')response=new Response(null,{status:302,headers:{location:'/nb','cache-control':'no-store'}});
else{const parts=path.split('/').filter(Boolean),lang=texts[parts[0]]?parts[0]:'nb',route=parts[1]||'home',valid=parts.length<=2&&texts[parts[0]]&&['home','book','guide','contact','enquiries','my','payment','privacy','terms','admin'].includes(route);let page=valid?route:'not-found';const token=parseCookie(req,'naviar_csrf');const csrfToken=/^[a-f0-9-]{36}$/.test(token)?token:uuid();const config={open:open(env),origin:env.SITE_ORIGIN||'https://naviar-care-1.andersen-betul.chatgpt.site',csrf:csrfToken,admin:isAdmin(req,env),paymentsReady:open(env)&&env.PAYMENTS_ENABLED==='true'&&String(env.STRIPE_SECRET_KEY||'').startsWith('sk_live_')&&!!env.STRIPE_WEBHOOK_SECRET,service:services.includes(url.searchParams.get('service'))?url.searchParams.get('service'):'',phone:env.CONTACT_PHONE||'',contactEmail:env.CONTACT_EMAIL||''};response=new Response(render(lang,page,config,me(req)),{status:valid?200:404,headers:{'content-type':'text/html; charset=utf-8','cache-control':'no-store','set-cookie':`naviar_csrf=${csrfToken}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=7200`}})}return security(response,env)}catch(e){return security(json({error:e.code||'unavailable'},e.status||503),env)}}};
