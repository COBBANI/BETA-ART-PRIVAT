import test from 'node:test';
import assert from 'node:assert/strict';
import {createHmac} from 'node:crypto';
import {createServer} from 'node:http';
import {createStore} from '../src/store.mjs';
import {application} from '../server.mjs';
import {validateRequest,validateEvent,verifyWebhook,forecast} from '../src/domain.mjs';
import {checkout,sendOutbox,providerStatus} from '../src/providers.mjs';
import {copy} from '../public/content.js';
import {render} from '../public/render.js';
const payload=()=>({name:'Test Person',email:'qa@example.test',postcode:'0150',service:'company',locale:'nb',audience:'self',date:new Date(Date.now()+3*86400000).toISOString().slice(0,10),consent:true});
function fixture(){const store=createStore();let counter=0;return {store,add:()=>store.create(validateRequest(payload()),'test-request-key-'+(++counter),'secret-'+counter)};}
const rejects=(fn,code)=>assert.throws(fn,e=>e.message===code);

test('minimal request validates real dates, Oslo date window, consent and sensitive extra fields',()=>{
 const p=payload();assert.equal(validateRequest({...p,email:'QA@EXAMPLE.TEST'}).email,'qa@example.test');
 rejects(()=>validateRequest({...p,medicalHistory:'private'}),'invalid_fields');rejects(()=>validateRequest({...p,consent:false}),'consent_required');rejects(()=>validateRequest({...p,date:'2026-02-30'}),'invalid_date');rejects(()=>validateRequest({...p,website:'bot'}),'invalid_request');
 assert.equal(validateRequest({...p,date:'2026-12-05'},new Date('2026-09-05T23:30:00Z')).date,'2026-12-05');
 rejects(()=>validateRequest({...p,date:'2026-09-06'},new Date('2026-09-05T23:30:00Z')),'invalid_date');
});
test('idempotency creates exactly one request, one email and one demand count; changed input conflicts',()=>{
 const {store}=fixture();try{const p=validateRequest(payload()),a=store.create(p,'one-key','token');assert.equal(store.create(p,'one-key','different').id,a.id);assert.equal(store.queued().length,1);assert.equal(store.db.prepare('SELECT SUM(count) AS n FROM demand').get().n,1);rejects(()=>store.create({...p,name:'Changed'},'one-key','token'),'idempotency_conflict');rejects(()=>store.own(a.id,'wrong'),'not_found');rejects(()=>store.own(undefined,undefined),'not_found');assert.equal(store.own(a.id,'token').name,p.name);}finally{store.close();}
});
test('human-confirmed slots reject overlaps and buffer conflicts, allow a 15 minute gap',()=>{
 const {store,add}=fixture();try{const a=add(),b=add(),base=Date.now()+5*86400000,start=new Date(base).toISOString(),end=new Date(base+3600000).toISOString();store.confirm(a.id,'helper-1',start,end);rejects(()=>store.confirm(b.id,'helper-1',new Date(base+70*60000).toISOString(),new Date(base+130*60000).toISOString()),'slot_conflict');assert.equal(store.confirm(b.id,'helper-1',new Date(base+75*60000).toISOString(),new Date(base+135*60000).toISOString()).status,'confirmed');}finally{store.close();}
});
test('webhook rejects modified raw body, stale signature and missing configuration',()=>{
 const raw=JSON.stringify({id:'evt_1',livemode:false}),time=10000,secret='whsec_test',sig='t='+time+',v1='+createHmac('sha256',secret).update(time+'.'+raw).digest('hex');assert.equal(verifyWebhook(raw,sig,secret,time).id,'evt_1');rejects(()=>verifyWebhook(raw+' ',sig,secret,time),'invalid_signature');rejects(()=>verifyWebhook(raw,sig,secret,time+301),'invalid_signature');rejects(()=>verifyWebhook(raw,sig,undefined,time),'payment_unavailable');
});
test('payment settles only a matching signed event, is idempotent and cannot be downgraded',()=>{
 const {store,add}=fixture();try{const a=add();store.approveQuote(a.id,12500);store.setCheckout(a.id,'cs_test_1');const event={id:'evt_test_1',livemode:false,type:'checkout.session.completed',data:{object:{id:'cs_test_1',metadata:{request_id:a.id},client_reference_id:a.id,amount_total:12500,currency:'nok',payment_status:'unpaid'}}};store.webhook(event);assert.equal(store.get(a.id).payment_status,'pending');rejects(()=>store.webhook({...event,id:'bad',data:{object:{...event.data.object,amount_total:100}}}),'payment_mismatch');rejects(()=>store.webhook({...event,id:'live',livemode:true}),'test_mode_required');store.webhook({...event,id:'evt_paid',data:{object:{...event.data.object,payment_status:'paid'}}});assert.equal(store.get(a.id).payment_status,'paid');assert.equal(store.webhook({...event,id:'evt_paid'}).duplicate,true);store.webhook({...event,id:'evt_expired',type:'checkout.session.expired'});assert.equal(store.get(a.id).payment_status,'paid');assert.equal(store.cancel(a.id).refundStatus,'manual_review');}finally{store.close();}
});
test('checkout uses server quote, test keys and hosted Stripe destination only',async()=>{
 assert.equal(providerStatus({STRIPE_SECRET_KEY:'sk_live_example',STRIPE_WEBHOOK_SECRET:'whsec'}).payment,false);
 const env={STRIPE_SECRET_KEY:'sk_test_example',STRIPE_WEBHOOK_SECRET:'whsec',APP_ORIGIN:'https://care.example.test'},r={id:'req1',locale:'tr',quote_approved:1,status:'confirmed',quote_amount:12500};let calls=0;
 const mock=async(url,options)=>{calls++;assert.equal(url,'https://api.stripe.com/v1/checkout/sessions');assert.equal(options.body.get('line_items[0][price_data][unit_amount]'),'12500');assert.equal(options.headers['Idempotency-Key'],'care-req1');return {ok:true,json:async()=>({id:'cs_test_2',url:'https://checkout.stripe.com/c/pay/cs_test_2'})};};
 await assert.rejects(checkout({...r,status:'pending_review'},env,mock),/quote_required/);assert.equal(calls,0);assert.equal((await checkout(r,env,mock)).id,'cs_test_2');await assert.rejects(checkout(r,{},mock),/payment_unavailable/);
});
test('outbox sends only to configured test recipient and records accepted, not delivered',async()=>{
 const {store,add}=fixture();try{add();const item=store.queued()[0];const result=await sendOutbox(item,{RESEND_API_KEY:'test',MAIL_FROM:'Care <verified@example.test>',MAIL_TEST_RECIPIENT:'operator@example.test'},async(url,options)=>{const body=JSON.parse(options.body);assert.deepEqual(body.to,['operator@example.test']);assert.ok(!body.text.includes('qa@example.test'));return {ok:true,json:async()=>({id:'email_1'})};});store.delivery(item.id,result);assert.equal(store.db.prepare('SELECT status FROM outbox').get().status,'accepted_by_provider');assert.equal(store.queued().length,0);}finally{store.close();}
});
test('analytics rejects identifiers and non-consent; forecast uses complete weeks and holdout',()=>{
 rejects(()=>validateEvent({name:'page_view',section:'home',locale:'nb',consent:false}),'invalid_event');rejects(()=>validateEvent({name:'page_view',section:'home',locale:'nb',consent:true,email:'private@example.test'}),'invalid_event');assert.equal(forecast([1,2]).status,'insufficient_data');const f=forecast([8,10,9,11,8,10,9,11,8,10,9,11]);assert.equal(f.holdoutWeeks,4);assert.ok(f.mae<=f.naiveMAE);assert.ok(f.planningRange[0]>=0);
 const {store}=fixture();try{store.db.prepare('UPDATE settings SET value=? WHERE key=?').run('2026-05-25','tracking_started_week');store.db.prepare('INSERT INTO demand VALUES(?,?)').run('2026-06-01',3);store.db.prepare('INSERT INTO demand VALUES(?,?)').run('2026-09-07',99);assert.equal(store.weeklyDemand(new Date('2026-09-09T12:00:00Z')).length,0);for(let day=+new Date('2026-06-01T12:00:00Z');day<+new Date('2026-09-07T12:00:00Z');day+=7*86400000)store.db.prepare('INSERT INTO demand_quality VALUES(?,?)').run(new Date(day).toISOString().slice(0,10),'2026-09-09');const series=store.weeklyDemand(new Date('2026-09-09T12:00:00Z'));assert.equal(series[0],3);assert.equal(series.length,14);assert.ok(!series.includes(99));}finally{store.close();}
});
test('all three languages have complete text keys and render semantic page with no undefined copy',()=>{
 for(const locale of ['nb','en','tr']){assert.deepEqual(Object.keys(copy[locale]).sort(),Object.keys(copy.nb).sort());assert.ok(Object.values(copy[locale]).every(x=>typeof x==='string'&&x.trim()));const html=render(locale);assert.ok(!html.includes('undefined'));assert.equal((html.match(/<h1>/g)||[]).length,1);assert.ok(html.includes('id="booking-form"'));}
});
test('HTTP: origin protection, scoped status, private administration, review gates and provider failure',async()=>{
 const store=createStore(),server=createServer(application(store,{APP_ORIGIN:'http://care.test',ADMIN_ACCESS_KEY:'a'.repeat(40)}));await new Promise(r=>server.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+server.address().port;
 const post=(path,data,headers={})=>fetch(base+path,{method:'POST',headers:{'Content-Type':'application/json',Origin:'http://care.test',...headers},body:JSON.stringify(data)});
 try{assert.equal((await fetch(base+'/api/admin/overview')).status,401);assert.equal((await post('/api/requests',payload(),{Origin:'http://evil.test','Idempotency-Key':'http-idempotency-test1'})).status,403);const r=await post('/api/requests',payload(),{'Idempotency-Key':'http-idempotency-test1'});assert.equal(r.status,201);const created=await r.json();assert.equal(created.emailStatus,'queued_not_sent');assert.equal((await post('/api/request/status',{id:created.id})).status,404);assert.equal((await post('/api/request/status',{id:created.id},{Authorization:'Bearer '+created.managementToken})).status,200);assert.equal((await post('/api/checkout',{id:created.id},{Authorization:'Bearer '+created.managementToken})).status,503);
 const login=await post('/api/admin/login',{key:'a'.repeat(40)});assert.equal(login.status,200);const cookie=login.headers.get('set-cookie');assert.ok(cookie.includes('HttpOnly'));assert.ok(cookie.includes('SameSite=Strict'));const auth={Cookie:cookie.split(';')[0]};assert.equal((await post('/api/admin/confirm',{id:created.id},auth)).status,400);const overview=await fetch(base+'/api/admin/overview',{headers:auth});const result=await overview.json();assert.equal(result.forecast.status,'insufficient_data');assert.ok(!JSON.stringify(result).includes('qa@example.test'));
 for(const locale of ['nb','en','tr']){const page=await fetch(base+'/'+locale+'/');assert.equal(page.status,200);assert.ok((await page.text()).includes('lang="'+locale+'"'));}
 }finally{server.closeAllConnections();await new Promise(r=>server.close(r));store.close();}
});
