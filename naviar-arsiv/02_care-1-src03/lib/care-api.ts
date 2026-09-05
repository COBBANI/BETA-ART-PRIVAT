import {validateRequest,authorise,allowedAction,osloInstant,fail,fingerprint,uuid,sharingLevels,incidentOwners,serviceIds,verifyStripe} from './care-domain.mjs';
import {createCheckout,retrieveCheckout,expireCheckout,sendReceipt,emailCopy,paymentsReady,mailReady,type Integrations} from './care-integrations';
type Statement={bind:(...v:unknown[])=>Statement;first:<T=Record<string,unknown>>()=>Promise<T|null>;all:<T=Record<string,unknown>>()=>Promise<{results:T[]}>;run:()=>Promise<{meta:{changes:number}}>};
type Database={prepare:(s:string)=>Statement;batch:(s:Statement[])=>Promise<{meta:{changes:number}}[]>};
export type CareEnv=Integrations&{DB:Database};
type Row={id:string;owner:string;email:string;fingerprint:string;lang:string;service:string;starts_at:number;duration:number;status:string;for_whom:string;consent:number;sharing:string;amount:number;payment_state:string;checkout_id:string;payment_attempt:string;checkout_started_at:number;hold_until?:number;reservation_state?:string;resource?:string;revision:number;created_at:number;name:string;postcode:string};
const output=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer'}});
const publicRow=(r:Row)=>({id:r.id,lang:r.lang,service:r.service,startsAt:r.starts_at,duration:r.duration,status:r.status,forWhom:r.for_whom,sharing:r.sharing,amount:r.amount,paymentState:r.payment_state,revision:r.revision,createdAt:r.created_at,name:r.name,postcode:r.postcode,holdUntil:r.hold_until||null,reservationState:r.reservation_state||null,resource:r.resource||null,checkoutStarted:!!r.checkout_started_at});
const audit=(db:Database,id:string,actor:string,action:string)=>db.prepare('INSERT INTO care_audit (id,request_id,actor,action,created_at) VALUES (?,?,?,?,?)').bind(crypto.randomUUID(),id,actor,action,Date.now());
const joinedRequests='SELECT r.*,s.hold_until,s.resource,s.state reservation_state FROM care_requests r LEFT JOIN care_reservations s ON s.request_id=r.id';
const conditionalAudit=(db:Database,id:string,actor:string,action:string)=>db.prepare('INSERT INTO care_audit (id,request_id,actor,action,created_at) SELECT ?,?,?,?,? WHERE changes()=1').bind(crypto.randomUUID(),id,actor,action,Date.now());
const expiryJob=(db:Database,id:string,session:string)=>db.prepare("INSERT OR IGNORE INTO care_outbox (id,request_id,kind,status,provider_id,created_at,updated_at) VALUES (?,?,'checkout_expiry','pending',?,?,?)").bind('expire-'+session,id,session,Date.now(),Date.now());
async function processExpiry(env:CareEnv,id:string,session:string){
 try{const result=await expireCheckout(env,session);await env.DB.prepare("UPDATE care_outbox SET status=?,last_error=NULL,updated_at=? WHERE id=?").bind(result.status==='complete'?'manual_review':'complete',Date.now(),'expire-'+session).run();return result.status;}
 catch{await env.DB.prepare("UPDATE care_outbox SET status='failed',attempts=attempts+1,last_error='checkout_expiry_pending',updated_at=? WHERE id=?").bind(Date.now(),'expire-'+session).run();return 'pending';}
}
async function rateLimit(db:Database,actor:string){const r=await db.prepare('SELECT count(*) n FROM care_requests WHERE owner=? AND created_at>?').bind(actor,Date.now()-3600000).first<{n:number}>();if((r?.n||0)>=20)fail('rate_limited',429);}
async function webhook(request:Request,env:CareEnv){if(!paymentsReady(env))return output({error:'payments_unconfigured'},503);const raw=await request.text();if(raw.length>262144)fail('too_large',413);const event=await verifyStripe(raw,request.headers.get('stripe-signature')||'',env.STRIPE_WEBHOOK_SECRET!);if(event.livemode===true)fail('live_payments_disabled',400);if(!['checkout.session.completed','checkout.session.async_payment_succeeded'].includes(event.type))return output({received:true});const s=event.data?.object;if(s?.payment_status!=='paid')return output({received:true});const id=s.metadata?.care_request_id;const b=await env.DB.prepare('SELECT * FROM care_requests WHERE id=?').bind(id).first<Row>();if(!b||b.checkout_id!==s.id||b.amount!==s.amount_total||s.currency!=='nok')fail('payment_mismatch',409);const old=await env.DB.prepare('SELECT id FROM care_payment_events WHERE id=?').bind(event.id).first();if(old)return output({received:true,duplicate:true});await env.DB.batch([env.DB.prepare('INSERT OR IGNORE INTO care_payment_events (id,request_id,created_at) VALUES (?,?,?)').bind(event.id,b.id,Date.now()),env.DB.prepare("UPDATE care_requests SET payment_state='paid',updated_at=? WHERE id=? AND checkout_id=? AND payment_state='unpaid'").bind(Date.now(),b.id,s.id)]);return output({received:true});}
export async function careApi(request:Request,env:CareEnv):Promise<Response>{
 try{
 const url=new URL(request.url),path=url.pathname.slice(5);if(path==='webhooks/stripe'&&request.method==='POST')return await webhook(request,env);
 const actor=request.headers.get('oai-authenticated-user-id');const email=request.headers.get('oai-authenticated-user-email');const operator=!!actor&&((!!env.OPERATIONS_USER_ID&&actor===env.OPERATIONS_USER_ID)||(!env.OPERATIONS_USER_ID&&!!env.OPERATIONS_EMAIL&&email===env.OPERATIONS_EMAIL));
 if(path==='status'&&request.method==='GET')return output({authenticated:!!actor&&!!email,operator:operator&&!!email,storageEnabled:!!env.DB,emailEnabled:mailReady(env),paymentsEnabled:paymentsReady(env),mode:'test'});
 if(!actor||!email)fail('unauthenticated',401);
 if(!['GET','HEAD'].includes(request.method)){
 const origin=request.headers.get('origin');if(origin!==url.origin)fail('invalid_origin',403);
 if(Number(request.headers.get('content-length')||0)>8192)fail('too_large',413);
 if(request.method!=='DELETE'&&!request.headers.get('content-type')?.includes('application/json'))fail('invalid_content_type',415);
 }
 if(!env.DB)fail('storage_unavailable',503);
 let d:any={};if(!['GET','HEAD','DELETE'].includes(request.method)){const raw=await request.text();if(raw.length>8192)fail('too_large',413);try{d=JSON.parse(raw);}catch{fail('invalid_json');}}
 const db=env.DB;
 if(path==='bookings'&&request.method==='GET'){const rows=await db.prepare(joinedRequests+' WHERE r.owner=? ORDER BY r.created_at DESC LIMIT 100').bind(actor).all<Row>();return output({bookings:rows.results.map(publicRow)});}
 if(path==='bookings'&&request.method==='POST'){
 const b=validateRequest(d);const hash=await fingerprint(b);const existing=await db.prepare('SELECT * FROM care_requests WHERE id=?').bind(b.id).first<Row>();if(existing){authorise(existing,actor);if(existing.fingerprint!==hash)fail('idempotency_conflict',409);return output({id:existing.id,status:existing.status});}
 await rateLimit(db,actor);const now=Date.now();try{await db.batch([
 db.prepare('INSERT INTO care_requests (id,owner,email,fingerprint,lang,name,postcode,service,timing,starts_at,duration,for_whom,consent,sharing,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(b.id,actor,email,hash,b.lang,b.name,b.postcode,b.service,b.timing,b.startsAt,b.duration,b.forWhom,b.consent,b.sharing,b.status,now,now),
 db.prepare("INSERT INTO care_outbox (id,request_id,kind,status,created_at,updated_at) VALUES (?,?,'request_received','preview',?,?)").bind('receipt-'+b.id,b.id,now,now),audit(db,b.id,actor,'request_created')]);}catch(e){const duplicate=await db.prepare('SELECT * FROM care_requests WHERE id=?').bind(b.id).first<Row>();if(!duplicate||duplicate.owner!==actor||duplicate.fingerprint!==hash)throw e;}return output({id:b.id,status:b.status},201);
 }
 if(path.startsWith('bookings/')&&request.method==='PATCH'){
 const id=path.split('/')[1];if(!uuid.test(id))fail('not_found',404);const b=await db.prepare('SELECT * FROM care_requests WHERE id=?').bind(id).first<Row>();if(!b)fail('not_found',404);allowedAction(b,d.action,actor);if(d.action!=='report'&&d.revision!==b.revision)fail('revision_conflict',409);
 let statement:Statement;const now=Date.now();
 if(d.action==='sharing'){if(!sharingLevels.includes(d.sharing))fail('invalid_sharing');statement=db.prepare('UPDATE care_requests SET sharing=?,revision=revision+1,updated_at=? WHERE id=? AND revision=?').bind(d.sharing,now,id,b.revision);}
 else if(d.action==='cancel')statement=db.prepare("UPDATE care_requests SET status='cancelled',revision=revision+1,updated_at=? WHERE id=? AND revision=? AND checkout_started_at IS NULL").bind(now,id,b.revision);
 else if(d.action==='reschedule'){const starts=osloInstant(d.date,d.time);statement=db.prepare('UPDATE care_requests SET starts_at=?,status=?,amount=NULL,payment_attempt=NULL,revision=revision+1,updated_at=? WHERE id=? AND revision=? AND checkout_started_at IS NULL').bind(starts,b.consent?'requested':'consent_pending',now,id,b.revision);}
 else if(d.action==='accept')statement=db.prepare("UPDATE care_requests SET status='confirmed',revision=revision+1,updated_at=? WHERE id=? AND revision=? AND status='quoted' AND consent=1 AND EXISTS (SELECT 1 FROM care_reservations s WHERE s.request_id=care_requests.id AND s.state='held' AND s.hold_until>?)").bind(now,id,b.revision,now);
 else if(d.action==='report'){
 if(!Object.hasOwn(incidentOwners,d.reason))fail('invalid_reason');
 const existing=await db.prepare('SELECT id FROM care_cases WHERE request_id=? AND reason=?').bind(id,d.reason).first();
 if(!existing)await db.batch([db.prepare('INSERT OR IGNORE INTO care_cases (id,request_id,reason,responsibility,created_at) VALUES (?,?,?,?,?)').bind(crypto.randomUUID(),id,d.reason,incidentOwners[d.reason as keyof typeof incidentOwners],now),db.prepare("UPDATE care_requests SET status='disputed',revision=revision+1,updated_at=? WHERE id=?").bind(now,id),audit(db,id,actor,'report_'+d.reason)]);
 // A failure to stop checkout must never discard the incident. The durable job can be retried.
 if(b.checkout_id){await expiryJob(db,id,b.checkout_id).run();const result=await processExpiry(env,id,b.checkout_id);return output({recorded:true,paymentReview:result});}return output({recorded:true});
 }
 else if(d.action==='checkout'){
 if(!paymentsReady(env))fail('payments_unconfigured',503);
 const open=await db.prepare("SELECT id FROM care_cases WHERE request_id=? AND status='open'").bind(id).first();if(open)fail('case_requires_review',409);
 const reservation=await db.prepare("SELECT request_id FROM care_reservations WHERE request_id=? AND state='confirmed'").bind(id).first();if(!reservation||!b.payment_attempt)fail('quote_requires_schedule',409);
 if(b.checkout_id){const current=await retrieveCheckout(env,b.checkout_id);if(current.metadata?.care_request_id!==b.id||current.amount_total!==b.amount||current.currency!=='nok')fail('payment_mismatch',409);if(current.status!=='open')fail(current.status==='expired'?'checkout_expired':'payment_processing',409);if(!current.url?.startsWith('https://checkout.stripe.com/'))fail('invalid_checkout',502);const stillOpen=await db.prepare("SELECT id FROM care_requests WHERE id=? AND status='confirmed' AND payment_state='unpaid' AND NOT EXISTS (SELECT 1 FROM care_cases WHERE request_id=? AND status='open')").bind(id,id).first();if(!stillOpen)fail('case_requires_review',409);return output({url:current.url,reused:true});}
 // Freeze one payment attempt independently of preference revisions. Never recreate it after the provider's idempotency window.
 await db.prepare("UPDATE care_requests SET checkout_started_at=? WHERE id=? AND checkout_started_at IS NULL AND status='confirmed'").bind(now,id).run();
 const locked=await db.prepare('SELECT checkout_started_at FROM care_requests WHERE id=?').bind(id).first<{checkout_started_at:number}>();if(!locked?.checkout_started_at||now-locked.checkout_started_at>23*3600000)fail('payment_manual_review',409);
 const session=await createCheckout(env,{id:b.id,lang:b.lang,amount:b.amount,attempt:b.payment_attempt});
 const assigned=await db.prepare("UPDATE care_requests SET checkout_id=? WHERE id=? AND payment_attempt=? AND status='confirmed' AND payment_state='unpaid' AND (checkout_id IS NULL OR checkout_id=?) AND NOT EXISTS (SELECT 1 FROM care_cases c WHERE c.request_id=care_requests.id AND c.status='open')").bind(session.id,id,b.payment_attempt,session.id).run();
 if(!assigned.meta.changes){await expiryJob(db,id,session.id).run();await processExpiry(env,id,session.id);fail('case_requires_review',409);}return output({url:session.url});
 }else fail('invalid_action');
 const steps=[statement!,conditionalAudit(db,id,actor,d.action)];
 if(d.action==='accept')steps.push(db.prepare("UPDATE care_reservations SET state='confirmed' WHERE request_id=? AND EXISTS (SELECT 1 FROM care_requests WHERE id=? AND revision=? AND status='confirmed')").bind(id,id,b.revision+1));
 if(['cancel','reschedule'].includes(d.action))steps.push(db.prepare("UPDATE care_reservations SET state='released' WHERE request_id=? AND EXISTS (SELECT 1 FROM care_requests WHERE id=? AND revision=? AND status IN ('cancelled','requested','consent_pending'))").bind(id,id,b.revision+1));
 const results=await db.batch(steps);if(!results[0].meta.changes)fail(d.action==='accept'?'quote_expired':'revision_conflict',409);return output({saved:true});
 }
 if(path==='applications'&&request.method==='POST'){
 if(!uuid.test(d.id)||typeof d.name!=='string'||!d.name.trim()||d.name.length>60||!/^\d{4}$/.test(d.postcode)||d.adult!==true||d.test!==true||!['nb','en','tr'].includes(d.lang)||!Array.isArray(d.services)||!d.services.length||d.services.length>6||d.services.some((s:string)=>!serviceIds.includes(s)))fail('invalid_application');
 const old=await db.prepare('SELECT owner FROM care_applications WHERE id=?').bind(d.id).first<{owner:string}>();if(old&&old.owner!==actor)fail('not_found',404);
 const count=await db.prepare('SELECT count(*) n FROM care_applications WHERE owner=?').bind(actor).first<{n:number}>();if(!old&&(count?.n||0)>=5)fail('rate_limited',429);
 await db.prepare("INSERT OR IGNORE INTO care_applications (id,owner,name,postcode,services,lang,status,created_at) VALUES (?,?,?,?,?,?,'unverified',?)").bind(d.id,actor,d.name.trim(),d.postcode,JSON.stringify(d.services),d.lang,Date.now()).run();return output({id:d.id,status:'unverified'},201);
 }
 if(path==='analytics'&&request.method==='POST'){
 if(d.consent!==true||!uuid.test(d.id)||!['page_view','content_engaged','service_view','booking_started'].includes(d.name)||(!['home','services','family','safety'].includes(d.section)&&!(d.name==='booking_started'&&d.section==='booking'))||!['nb','en','tr'].includes(d.lang)||(d.service&&!serviceIds.includes(d.service)))fail('invalid_event');
 await db.prepare('INSERT OR IGNORE INTO care_analytics (id,event,section,service,lang,consent_version,day,created_at) VALUES (?,?,?,?,?,?,?,?)').bind(d.id,d.name,d.section,d.service||null,d.lang,'2026-09-05',new Date().toISOString().slice(0,10),Date.now()).run();return output({recorded:true});
 }
 if(path==='feedback'&&request.method==='POST'){
 if(Object.keys(d).some(k=>!['id','section','lang','helpful','nextNeed'].includes(k))||!uuid.test(d.id)||!['home','services','family','safety'].includes(d.section)||!['nb','en','tr'].includes(d.lang)||!['yes','no'].includes(d.helpful)||!['none','prices','booking','family','safety','human_support'].includes(d.nextNeed))fail('invalid_feedback');
 await db.prepare('INSERT OR IGNORE INTO care_feedback (id,section,lang,helpful,next_need,day,created_at) VALUES (?,?,?,?,?,?,?)').bind(d.id,d.section,d.lang,d.helpful,d.nextNeed,new Date().toISOString().slice(0,10),Date.now()).run();return output({recorded:true});
 }
 if(path==='operations'){
 if(!operator)fail('operator_required',403);
 if(request.method==='GET'){
 const [bookings,events,cases,caseRows,content,queue,feedback]=await Promise.all([
 db.prepare(joinedRequests+' ORDER BY r.created_at DESC LIMIT 100').all<Row>(),
 db.prepare('SELECT count(*) n FROM care_analytics WHERE created_at>?').bind(Date.now()-90*86400000).first<{n:number}>(),
 db.prepare("SELECT count(*) n FROM care_cases WHERE status='open'").first<{n:number}>(),
 db.prepare('SELECT id,request_id,reason,status,responsibility,assigned_to FROM care_cases ORDER BY created_at DESC LIMIT 100').all<{assigned_to:string|null}>(),
 db.prepare('SELECT section,event,count(*) n FROM care_analytics WHERE created_at>? GROUP BY section,event HAVING count(*) >= 5').bind(Date.now()-90*86400000).all(),
 db.prepare('SELECT o.id,o.request_id,o.kind,o.status,o.attempts,o.next_attempt_at,o.first_attempt_at,o.lease_until,o.last_error,r.lang FROM care_outbox o JOIN care_requests r ON r.id=o.request_id ORDER BY o.created_at DESC LIMIT 100').all<{kind:string;lang:keyof typeof emailCopy}>(),
 db.prepare('SELECT section,helpful,next_need,count(*) n FROM care_feedback WHERE created_at>? GROUP BY section,helpful,next_need HAVING count(*)>=5').bind(Date.now()-90*86400000).all()]);
 return output({bookings:bookings.results.map(publicRow),events:events?.n||0,cases:cases?.n||0,caseRows:caseRows.results.map(c=>({...c,assigned_to:undefined,assigned:!!c.assigned_to,mine:c.assigned_to===actor})),content:content.results,feedback:feedback.results,queue:queue.results.map(q=>({...q,preview:q.kind==='request_received'?emailCopy[q.lang]||emailCopy.nb:null}))});
 }
 if(request.method==='POST'&&d.action==='quote'){
 if(!Number.isSafeInteger(d.amount)||d.amount<100||d.amount>1000000)fail('invalid_amount');
 const b=await db.prepare('SELECT * FROM care_requests WHERE id=?').bind(d.id).first<Row>();if(!b||!b.consent||b.for_whom!=='self')fail('recipient_consent_required',409);
 if(typeof d.resource!=='string'||!/^TEST-[A-Z0-9-]{1,20}$/.test(d.resource))fail('invalid_resource');
 const now=Date.now();const holdUntil=Math.min(now+24*3600000,b.starts_at);const attempt=crypto.randomUUID();
 // D1 batch is transactional: the overlap guard and claim execute as a single SQL mutation.
 const result=await db.batch([
 db.prepare(`INSERT INTO care_reservations (request_id,resource,starts_at,ends_at,hold_until,state)
 SELECT r.id,?,r.starts_at,r.starts_at+r.duration*60000,?,'held' FROM care_requests r
 WHERE r.id=? AND r.revision=? AND r.consent=1 AND r.for_whom='self' AND r.status IN ('requested','quoted') AND r.starts_at>? AND r.checkout_started_at IS NULL
 AND NOT EXISTS (SELECT 1 FROM care_reservations own WHERE own.request_id=r.id AND (own.state='confirmed' OR (own.state='held' AND own.hold_until>?)))
 AND NOT EXISTS (SELECT 1 FROM care_reservations other WHERE other.resource=? AND other.request_id<>r.id AND (other.state='confirmed' OR (other.state='held' AND other.hold_until>?)) AND other.starts_at<r.starts_at+r.duration*60000+900000 AND other.ends_at+900000>r.starts_at)
 ON CONFLICT(request_id) DO UPDATE SET resource=excluded.resource,starts_at=excluded.starts_at,ends_at=excluded.ends_at,hold_until=excluded.hold_until,state='held'`).bind(d.resource,holdUntil,d.id,d.revision,now,now,d.resource,now),
 db.prepare("UPDATE care_requests SET amount=?,status='quoted',payment_attempt=?,revision=revision+1,updated_at=? WHERE id=? AND revision=? AND changes()=1").bind(d.amount,attempt,now,d.id,d.revision),conditionalAudit(db,d.id,actor,'test_quote_and_time_held')]);
 if(!result[0].meta.changes||!result[1].meta.changes)fail('slot_or_request_conflict',409);return output({quoted:true,holdUntil});
 }
 if(request.method==='POST'&&d.action==='send_test_email'){
 if(!mailReady(env))fail('email_unconfigured',503);
 const b=await db.prepare('SELECT * FROM care_requests WHERE id=?').bind(d.id).first<Row>();if(!b)fail('not_found',404);
 const q=await db.prepare("SELECT * FROM care_outbox WHERE request_id=? AND kind='request_received'").bind(b.id).first<{status:string;first_attempt_at:number}>();if(!q)fail('not_found',404);if(q.status==='sent')return output({sent:true,duplicate:true});
 const now=Date.now();const claimed=await db.prepare("UPDATE care_outbox SET status='sending',attempts=attempts+1,lease_until=?,first_attempt_at=coalesce(first_attempt_at,?),updated_at=? WHERE request_id=? AND kind='request_received' AND status IN ('preview','failed','sending') AND attempts<3 AND (lease_until IS NULL OR lease_until<?) AND (next_attempt_at IS NULL OR next_attempt_at<=?) AND (first_attempt_at IS NULL OR first_attempt_at>?)").bind(now+120000,now,now,b.id,now,now,now-23*3600000).run();
 if(!claimed.meta.changes)fail('email_wait_or_review',409);
 try{const result=await sendReceipt(env,b);await db.prepare("UPDATE care_outbox SET status='sent',provider_id=?,lease_until=NULL,last_error=NULL,updated_at=? WHERE request_id=? AND kind='request_received'").bind(result.id,Date.now(),b.id).run();return output({sent:true});}
 catch(e){await db.prepare("UPDATE care_outbox SET status='failed',lease_until=NULL,next_attempt_at=?,last_error='email_provider_unavailable',updated_at=? WHERE request_id=? AND kind='request_received'").bind(Date.now()+120000,Date.now(),b.id).run();throw e;}
 }
 if(request.method==='POST'&&d.action==='retry_expiry'){
 const job=await db.prepare("SELECT request_id,provider_id FROM care_outbox WHERE id=? AND kind='checkout_expiry' AND status IN ('pending','failed')").bind(d.id).first<{request_id:string;provider_id:string}>();if(!job)fail('not_found',404);return output({status:await processExpiry(env,job.request_id,job.provider_id)});
 }
 if(request.method==='POST'&&d.action==='claim_case'){
 const r=await db.prepare("UPDATE care_cases SET assigned_to=?,claimed_at=? WHERE id=? AND status='open' AND (assigned_to IS NULL OR assigned_to=?)").bind(actor,Date.now(),d.id,actor).run();if(!r.meta.changes)fail('case_already_assigned',409);return output({claimed:true});
 }
 if(request.method==='POST'&&d.action==='resolve_case'){
 const c=await db.prepare('SELECT request_id FROM care_cases WHERE id=?').bind(d.id).first<{request_id:string}>();if(!c)fail('not_found',404);
 const r=await db.batch([db.prepare("UPDATE care_cases SET status='reviewed',reviewed_at=? WHERE id=? AND status='open' AND assigned_to=?").bind(Date.now(),d.id,actor),conditionalAudit(db,c.request_id,actor,'case_reviewed')]);if(!r[0].meta.changes)fail('claim_case_first',409);return output({reviewed:true});
 }
 if(request.method==='POST'&&d.action==='maintenance'){
 await db.batch([db.prepare('DELETE FROM care_analytics WHERE created_at<?').bind(Date.now()-90*86400000),db.prepare('DELETE FROM care_feedback WHERE created_at<?').bind(Date.now()-90*86400000)]);return output({complete:true});
 }
 }
 if(path==='me'&&request.method==='GET'){const [bookings,applications,cases]=await Promise.all([db.prepare(joinedRequests+' WHERE r.owner=?').bind(actor).all<Row>(),db.prepare('SELECT * FROM care_applications WHERE owner=?').bind(actor).all(),db.prepare('SELECT care_cases.* FROM care_cases JOIN care_requests ON care_requests.id=care_cases.request_id WHERE care_requests.owner=?').bind(actor).all()]);return new Response(JSON.stringify({bookings:bookings.results.map(publicRow),applications:applications.results,cases:cases.results},null,2),{headers:{'Content-Type':'application/json','Cache-Control':'no-store','Content-Disposition':'attachment; filename="naviar-care-test-data.json"'}});}
 if(path==='me'&&request.method==='DELETE'){
 const b=await db.prepare("SELECT id FROM care_requests WHERE owner=? AND (payment_state='paid' OR checkout_id IS NOT NULL OR status='disputed') LIMIT 1").bind(actor).first();if(b)fail('manual_review_required',409);await db.batch([db.prepare('DELETE FROM care_requests WHERE owner=?').bind(actor),db.prepare('DELETE FROM care_applications WHERE owner=?').bind(actor)]);return output({deleted:true});
 }
 return output({error:'not_found'},404);
 }catch(e){const err=e as Error&{status?:number};if(!err.status)console.error('care_api_failure',{type:err.name});return output({error:err.status?err.message:'temporarily_unavailable'},err.status||503);}
}
