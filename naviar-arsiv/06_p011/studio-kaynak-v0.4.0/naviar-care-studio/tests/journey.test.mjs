import test from 'node:test';
import assert from 'node:assert/strict';
import {requestError,reviewRows} from '../public/journey.js';
import {createDemoApi,requestId} from '../public/demo.js';
import {copy} from '../public/content.js';
const data={name:'Demo Person',email:'demo@example.test',postcode:'0150',audience:'family',service:'digital',date:'2026-10-01',consent:true};
test('review rejects invalid contact, date and missing acknowledgement; displays values as data',()=>{
 assert.equal(requestError(data,'2026-09-06','2026-12-04'),null);
 assert.deepEqual(requestError({...data,email:'wrong'},'2026-09-06','2026-12-04'),['email','invalid_email']);
 assert.deepEqual(requestError({...data,date:'2026-09-31'},'2026-09-06','2026-12-04'),['date','invalid_date']);
 assert.deepEqual(requestError({...data,consent:false},'2026-09-06','2026-12-04'),['consent','consent_required']);
 for(const lang of ['nb','en','tr'])assert.ok(reviewRows(data,copy[lang]).some(row=>row[1]===copy[lang].digital));
});
test('portable demo creates once, requires its token, cancels and resets with new instance',async()=>{
 const api=createDemoApi(),key=requestId(),created=await api.request('/api/requests',data,null,key);
 assert.match(created.id,/^DEMO-/);assert.equal((await api.request('/api/requests',data,null,key)).duplicate,true);
 await assert.rejects(api.request('/api/request/status',{id:created.id},'wrong'),/error/);
 assert.equal((await api.request('/api/request/cancel',{id:created.id},created.managementToken)).status,'cancelled');
 assert.equal((await api.request('/api/request/status',{id:created.id},created.managementToken)).paymentStatus,'not_started');
 await assert.rejects(createDemoApi().request('/api/request/status',{id:created.id},created.managementToken),/error/);
});
test('simulated connection failure leaves no record and retry can succeed; payment stays blocked',async()=>{
 const api=createDemoApi(),key=requestId();api.failNext();
 await assert.rejects(api.request('/api/requests',data,null,key),/unavailable/);
 const created=await api.request('/api/requests',data,null,key);assert.equal(created.id,'DEMO-001');
 await assert.rejects(api.request('/api/checkout',{id:created.id},created.managementToken),/payment_unavailable/);
});
