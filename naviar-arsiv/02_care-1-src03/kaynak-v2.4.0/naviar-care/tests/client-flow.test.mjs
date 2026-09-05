import {test} from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {parseHTML} from 'linkedom';
import {render} from '../src/render.js';
import {texts} from '../src/locales.js';

// DOM-level orchestration tests, not browser/constraint-validation/layout tests.
// API responses, focus, form collections and native validity are test fixtures.
const script=readFileSync('src/client.txt','utf8');
const tick=()=>new Promise(resolve=>setImmediate(resolve));
const slot={id:'slot-fixture',start:Date.now()+86400000,end:Date.now()+87600000,demo:1};
function harness({lang='en',page='book',fetcher,service='',cryptoApi=crypto}={}){
  const {document,Event}=parseHTML(render(lang,page,{open:false,origin:'https://care.test',service,csrf:'fixture'},'fixture-user'));
  document.cookie='';
  const calls=[];let focus;
  for(const el of document.querySelectorAll('*'))el.focus=()=>{focus=el};
  for(const form of document.querySelectorAll('form')){
    Object.defineProperty(form,'elements',{value:new Proxy({}, {get(_,key){const inputs=[...form.querySelectorAll(`[name="${key}"]`)];if(!inputs.length)return undefined;if(inputs.length===1)return inputs[0];return {get value(){return inputs.find(x=>x.hasAttribute('checked'))?.value||''}}}})});
    form.reportValidity=()=>true;
  }
  const location=new URL(`https://care.test/${lang}/${page}${service?'?service='+service:''}`);
  const context=vm.createContext({document,URL,URLSearchParams,Intl,Date,Response,AbortController,crypto:cryptoApi,Blob,FormData,location,confirm:()=>true,setInterval:()=>0,setTimeout,clearTimeout,
    fetch:async(path,options)=>{calls.push({path,options});if(fetcher)return fetcher(path,options,calls);return Response.json(path==='/api/slots'?{slots:[slot]}:{bookings:[]})}
  });
  vm.runInContext(script,context);
  const trigger=(selector,type='click')=>document.querySelector(selector).dispatchEvent(new Event(type,{bubbles:true,cancelable:true}));
  const choose=(name,value)=>{for(const input of document.querySelectorAll(`input[name="${name}"]`)){if(input.value===value)input.setAttribute('checked','');else input.removeAttribute('checked')}trigger(`input[name="${name}"][value="${value}"]`,'change')};
  return {document,calls,context,trigger,choose,get focus(){return focus},run:code=>vm.runInContext(code,context)};
}

test('booking Enter advances valid steps; one available slot still needs explicit selection',async()=>{
  const h=harness();await tick();
  h.trigger('#booking','submit');
  assert.match(h.document.querySelector('.form-status').textContent,/Choose a service first/);
  assert.equal(h.document.querySelector('[data-step="0"]').hidden,false);
  h.choose('service','social');h.trigger('#booking','submit');
  assert.equal(h.document.querySelector('[data-step="1"]').hidden,false);
  h.trigger('#booking','submit');
  assert.match(h.document.querySelector('.form-status').textContent,/Choose an available time first/);
  assert.equal(h.document.querySelector('[data-step="1"]').hidden,false);
  h.choose('slot',slot.id);h.trigger('#booking','submit');
  assert.equal(h.document.querySelector('[data-step="2"]').hidden,false);
  assert.equal(h.calls.filter(c=>c.path==='/api/bookings').length,0);
});

test('pending booking blocks duplicate submissions and renders a clear test confirmation',async()=>{
  let resolveBooking;
  const h=harness({fetcher:async(path)=>path==='/api/slots'?Response.json({slots:[slot]}):new Promise(resolve=>{resolveBooking=resolve})});await tick();
  h.choose('service','practical');h.trigger('[data-step="0"] [data-next]');h.choose('slot',slot.id);h.trigger('[data-step="1"] [data-next]');
  h.document.querySelector('[name=name]').value='Fixture';h.document.querySelector('[name=email]').value='user@example.test';
  h.trigger('#booking','submit');h.trigger('#booking','submit');
  assert.equal(h.calls.filter(c=>c.path==='/api/bookings').length,1);
  resolveBooking(Response.json({booking:{...slot,id:'booking-fixture'}}));await tick();
  assert.equal(h.document.querySelector('#booking-result').hidden,false);
  assert.match(h.document.querySelector('#booking-result').textContent,/not a real appointment/);
});

test('retry after a lost response keeps the original booking idempotency key',async()=>{
  const h=harness({fetcher:async(path)=>{if(path==='/api/slots')return Response.json({slots:[slot]});throw Error('Network response lost')}});await tick();
  h.choose('service','practical');h.trigger('[data-step="0"] [data-next]');h.choose('slot',slot.id);h.trigger('[data-step="1"] [data-next]');
  h.trigger('#booking','submit');await tick();h.trigger('#booking','submit');await tick();
  const submissions=h.calls.filter(c=>c.path==='/api/bookings');assert.equal(submissions.length,2);
  assert.equal(JSON.parse(submissions[0].options.body).idem,JSON.parse(submissions[1].options.body).idem);
  assert.equal(h.document.querySelector('[type=submit]').disabled,false);
});

test('an older availability response cannot replace the latest list',async()=>{
  const resolvers=[];
  const h=harness({fetcher:()=>new Promise(resolve=>resolvers.push(resolve))});
  const latest=h.run('loadSlots()');assert.equal(resolvers.length,2);
  resolvers[1](Response.json({slots:[{...slot,id:'latest'}]}));await latest;
  resolvers[0](Response.json({slots:[{...slot,id:'outdated'}]}));await tick();
  assert.ok(h.document.querySelector('input[value=latest]'));
  assert.equal(h.document.querySelector('input[value=outdated]'),null);
});

test('language links follow the newly chosen service in all languages',async()=>{
  for(const lang of ['nb','en','tr']){
    const h=harness({lang,service:'practical'});await tick();h.choose('service','social');
    for(const a of h.document.querySelectorAll('.language a'))assert.match(a.getAttribute('href'),/service=social$/);
    assert.equal(h.document.querySelector('#consent').hidden,true);
    assert.ok(h.document.body.textContent.includes(texts[lang].studio.demoConfirm));
  }
});

test('a failed booking list can be refreshed without a full page reload',async()=>{
  let attempts=0;
  const h=harness({page:'my',fetcher:async()=>{if(++attempts===1)throw Error('offline');return Response.json({bookings:[]})}});await tick();
  assert.match(h.document.querySelector('#my-records').textContent,/could not load/);
  h.trigger('[data-refresh-bookings]');await tick();
  assert.equal(h.document.querySelector('#my-records').textContent,texts.en.noRecords);
  assert.equal(h.document.querySelector('[data-refresh-bookings]').disabled,false);
});

test('HTTP preview without randomUUID starts and advances booking with secure IDs',async()=>{
 const h=harness({cryptoApi:{getRandomValues:crypto.getRandomValues.bind(crypto)}});await tick();
 const ids=Array.from({length:100},()=>h.run('newRequestId()'));
 assert.equal(new Set(ids).size,100);
 for(const id of ids)assert.match(id,/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
 h.choose('service','social');h.trigger('#booking','submit');
 assert.equal(h.document.querySelector('[data-step="1"]').hidden,false);
});
