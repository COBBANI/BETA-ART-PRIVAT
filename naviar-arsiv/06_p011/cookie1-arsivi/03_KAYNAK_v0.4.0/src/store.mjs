import { DatabaseSync } from 'node:sqlite';
import { randomBytes, randomUUID } from 'node:crypto';
import { sha,Problem } from './domain.mjs';
export function createStore(file=':memory:'){
 const db=new DatabaseSync(file);
 db.exec(`PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000;
 CREATE TABLE IF NOT EXISTS requests(id TEXT PRIMARY KEY, idempotency TEXT UNIQUE, body_hash TEXT, token_hash TEXT, token_expires INTEGER, name TEXT,email TEXT,postcode TEXT,service TEXT,locale TEXT,audience TEXT,preferred_date TEXT,status TEXT DEFAULT 'pending_review',created_at TEXT,quote_amount INTEGER,quote_approved INTEGER DEFAULT 0,currency TEXT DEFAULT 'nok',checkout_id TEXT,payment_status TEXT DEFAULT 'not_started',resource TEXT,start_at TEXT,end_at TEXT);
 CREATE TABLE IF NOT EXISTS outbox(id TEXT PRIMARY KEY,request_id TEXT REFERENCES requests(id),kind TEXT, status TEXT DEFAULT 'queued',attempts INTEGER DEFAULT 0,next_attempt INTEGER DEFAULT 0,provider_id TEXT,UNIQUE(request_id,kind));
 CREATE TABLE IF NOT EXISTS webhook_events(id TEXT PRIMARY KEY,processed_at TEXT);
 CREATE TABLE IF NOT EXISTS events(day TEXT,name TEXT,section TEXT,locale TEXT,count INTEGER DEFAULT 0,PRIMARY KEY(day,name,section,locale));
 CREATE TABLE IF NOT EXISTS audit(id TEXT PRIMARY KEY,request_id TEXT,action TEXT,created_at TEXT);
 CREATE TABLE IF NOT EXISTS demand(week TEXT PRIMARY KEY,count INTEGER DEFAULT 0);
 CREATE TABLE IF NOT EXISTS demand_quality(week TEXT PRIMARY KEY,reviewed_at TEXT);
 CREATE TABLE IF NOT EXISTS settings(key TEXT PRIMARY KEY,value TEXT);`);
 const monday=date=>{const day=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Oslo'}).format(date),d=new Date(day+'T12:00:00Z');d.setUTCDate(d.getUTCDate()-(d.getUTCDay()+6)%7);return d.toISOString().slice(0,10);};
 db.prepare('INSERT OR IGNORE INTO settings VALUES(?,?)').run('tracking_started_week',monday(new Date()));
 const tx=fn=>{db.exec('BEGIN IMMEDIATE');try{const v=fn();db.exec('COMMIT');return v;}catch(e){db.exec('ROLLBACK');throw e;}};
 const audit=(id,action)=>db.prepare('INSERT INTO audit VALUES(?,?,?,?)').run(randomUUID(),id,action,new Date().toISOString());
 return {db,close:()=>db.close(),
 create(input,key,token){return tx(()=>{
   const hash=sha(JSON.stringify(input));const old=db.prepare('SELECT id,body_hash,status FROM requests WHERE idempotency=?').get(sha(key));
   if(old){if(old.body_hash!==hash)throw new Problem('idempotency_conflict',409);return {id:old.id,status:old.status,duplicate:true};}
   const id=randomUUID();db.prepare('INSERT INTO requests(id,idempotency,body_hash,token_hash,token_expires,name,email,postcode,service,locale,audience,preferred_date,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)').run(id,sha(key),hash,sha(token),Date.now()+30*86400000,input.name,input.email,input.postcode,input.service,input.locale,input.audience,input.date,new Date().toISOString());
   db.prepare('INSERT INTO outbox(id,request_id,kind) VALUES(?,?,?)').run(randomUUID(),id,'request_received');db.prepare('INSERT INTO demand VALUES(?,1) ON CONFLICT(week) DO UPDATE SET count=count+1').run(monday(new Date()));audit(id,'request_created');return{id,status:'pending_review',duplicate:false};
 });},
 own(id,token){if(typeof id!=='string'||typeof token!=='string')throw new Problem('not_found',404);const x=db.prepare('SELECT * FROM requests WHERE id=?').get(id);if(!x||sha(token)!==x.token_hash||x.token_expires<Date.now())throw new Problem('not_found',404);return x;},
 get:id=>db.prepare('SELECT * FROM requests WHERE id=?').get(id),
 list:()=>db.prepare('SELECT id,service,locale,audience,preferred_date,status,created_at,quote_amount,quote_approved,payment_status,start_at,end_at FROM requests ORDER BY created_at DESC LIMIT 100').all(),
 cancel(id){return tx(()=>{const x=this.get(id);if(!x)throw new Problem('not_found',404);db.prepare("UPDATE requests SET status='cancelled' WHERE id=?").run(id);db.prepare("UPDATE outbox SET status='cancelled' WHERE request_id=? AND status='queued'").run(id);audit(id,'cancelled_refund_review_required');return{status:'cancelled',refundStatus:x.payment_status==='paid'?'manual_review':'not_applicable'};});},
 approveQuote(id,amount){if(!Number.isSafeInteger(amount)||amount<100||amount>1000000)throw new Problem('invalid_amount');const x=this.get(id);if(!x||x.status==='cancelled'||x.checkout_id)throw new Problem('invalid_state',409);db.prepare('UPDATE requests SET quote_amount=?,quote_approved=1 WHERE id=?').run(amount,id);audit(id,'quote_approved');},
 confirm(id,resource,start,end){return tx(()=>{const x=this.get(id);if(!x||x.status!=='pending_review')throw new Problem('invalid_state',409);const a=+new Date(start),b=+new Date(end);if(!resource||resource.length>50||!Number.isFinite(a)||!Number.isFinite(b)||a<Date.now()||b<=a||b-a>4*3600000)throw new Problem('invalid_slot');
  const from=new Date(a-15*60000).toISOString(),to=new Date(b+15*60000).toISOString();
  if(db.prepare("SELECT id FROM requests WHERE status='confirmed' AND resource=? AND start_at<? AND end_at>?").get(resource,to,from))throw new Problem('slot_conflict',409);
  db.prepare("UPDATE requests SET status='confirmed',resource=?,start_at=?,end_at=? WHERE id=?").run(resource,new Date(a).toISOString(),new Date(b).toISOString(),id);audit(id,'confirmed_after_human_review');return {status:'confirmed'};
 });},
 setCheckout(id,checkout){db.prepare("UPDATE requests SET checkout_id=?,payment_status='pending' WHERE id=? AND payment_status!='paid'").run(checkout,id);},
 webhook(event){return tx(()=>{
   if(!event||typeof event.id!=='string'||!event.id||event.id.length>255)throw new Problem('invalid_event');
   if(event.livemode!==false)throw new Problem('test_mode_required',409);
   if(db.prepare('SELECT id FROM webhook_events WHERE id=?').get(event.id))return{duplicate:true};
   if(['checkout.session.completed','checkout.session.async_payment_succeeded','checkout.session.async_payment_failed','checkout.session.expired'].includes(event.type)){
     const s=event.data?.object;const x=this.get(s?.metadata?.request_id);
     if(!x||s.id!==x.checkout_id||s.amount_total!==x.quote_amount||s.currency!==x.currency||s.client_reference_id!==x.id)throw new Problem('payment_mismatch',409);
     let state=s.payment_status==='paid'?'paid':event.type==='checkout.session.async_payment_failed'?'failed':event.type==='checkout.session.expired'?'expired':'pending';
     if(x.payment_status==='paid'&&state!=='paid')state='paid';
     db.prepare('UPDATE requests SET payment_status=? WHERE id=?').run(state,x.id);audit(x.id,'payment_'+state);
   }
   db.prepare('INSERT INTO webhook_events VALUES(?,?)').run(event.id,new Date().toISOString());return{received:true};
 });},
 event(e){db.prepare('INSERT INTO events(day,name,section,locale,count) VALUES(?,?,?,?,1) ON CONFLICT(day,name,section,locale) DO UPDATE SET count=count+1').run(new Date().toISOString().slice(0,10),e.name,e.section,e.locale);},
 aggregates(){return{requests:db.prepare('SELECT service,status,COUNT(*) as count FROM requests GROUP BY service,status').all(),content:db.prepare('SELECT day,name,section,locale,count FROM events ORDER BY day DESC LIMIT 200').all(),email:db.prepare('SELECT status,COUNT(*) as count FROM outbox GROUP BY status').all()};},
 markCompleteWeek(week){if(typeof week!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(week)||!Number.isFinite(+new Date(week+'T12:00:00Z'))||monday(new Date(week+'T12:00:00Z'))!==week||week>=monday(new Date()))throw new Problem('invalid_week');db.prepare('INSERT OR REPLACE INTO demand_quality VALUES(?,?)').run(week,new Date().toISOString());audit(null,'demand_week_reviewed_'+week);},
 weeklyDemand(now=new Date()){const first=db.prepare('SELECT value FROM settings WHERE key=?').get('tracking_started_week').value;const current=monday(now),series=[],counts=new Map(db.prepare('SELECT * FROM demand').all().map(x=>[x.week,x.count]));for(let day=+new Date(first+'T12:00:00Z')+7*86400000;new Date(day).toISOString().slice(0,10)<current;day+=7*86400000){const week=new Date(day).toISOString().slice(0,10);if(db.prepare('SELECT week FROM demand_quality WHERE week=?').get(week))series.push(counts.get(week)||0);else series.length=0;}return series;},
 queued(){return db.prepare("SELECT o.*,r.email,r.locale FROM outbox o JOIN requests r ON r.id=o.request_id WHERE o.status='queued' AND o.next_attempt<=? AND o.attempts<5 LIMIT 10").all(Date.now());},
 delivery(id,result){if(result.id)db.prepare("UPDATE outbox SET status='accepted_by_provider',provider_id=?,attempts=attempts+1 WHERE id=?").run(result.id,id);else db.prepare("UPDATE outbox SET attempts=attempts+1,next_attempt=?,status=CASE WHEN attempts>=4 THEN 'failed' ELSE 'queued' END WHERE id=?").run(Date.now()+60000*2**result.attempts,id);},
 retention(days=30){const cutoff=new Date(Date.now()-days*86400000).toISOString();return tx(()=>{db.prepare('DELETE FROM events WHERE day<?').run(cutoff.slice(0,10));const old=db.prepare("SELECT id FROM requests WHERE created_at<? AND status IN ('cancelled','pending_review') AND payment_status IN ('not_started','failed','expired')").all(cutoff);for(const x of old){db.prepare('DELETE FROM outbox WHERE request_id=?').run(x.id);db.prepare('DELETE FROM requests WHERE id=?').run(x.id);audit(x.id,'contact_record_deleted_retention');}return{deleted:old.length};});}
 };
}
