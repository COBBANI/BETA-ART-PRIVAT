import {createServer} from 'node:http';
import {readFile,mkdir,chmod} from 'node:fs/promises';
import {resolve,dirname,extname} from 'node:path';
import {fileURLToPath,pathToFileURL} from 'node:url';
import {randomBytes} from 'node:crypto';
import {createStore} from './src/store.mjs';
import {Problem,validateRequest,validateEvent,verifyWebhook,equal,sha,forecast} from './src/domain.mjs';
import {checkout,sendOutbox,providerStatus} from './src/providers.mjs';
import {render} from './public/render.js';
import {copy} from './public/content.js';
const root=dirname(fileURLToPath(import.meta.url));
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.json':'application/json','.txt':'text/plain'};
export function application(store,env={},network=fetch){
 const sessions=new Map(),rate=new Map();
 const origin=env.APP_ORIGIN||'http://localhost:4173';
 const body=async req=>{const chunks=[];let size=0;for await(const chunk of req){size+=chunk.length;if(size>8192)throw new Problem('body_too_large',413);chunks.push(chunk);}return Buffer.concat(chunks).toString('utf8');};
 const respond=(res,status,data)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
 const auth=req=>{const token=req.headers.cookie?.split(';').map(x=>x.trim()).find(x=>x.startsWith('care_admin='))?.slice(11);const expiry=sessions.get(sha(token??''));if(!expiry||expiry<Date.now())throw new Problem('unauthorized',401);};
 const limited=req=>{const now=Date.now();for(const[k,v]of rate)if(v.until<now)rate.delete(k);const key=sha(req.socket.remoteAddress||'unknown');let x=rate.get(key)||{n:0,until:now+60000};if(++x.n>40)throw new Problem('rate_limited',429);rate.set(key,x);};
 const json=raw=>{try{const x=JSON.parse(raw);if(!x||typeof x!=='object'||Array.isArray(x))throw 0;return x;}catch{throw new Problem('invalid_json');}};
 return async(req,res)=>{try{
  res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','no-referrer');res.setHeader('X-Frame-Options','SAMEORIGIN');res.setHeader('Permissions-Policy','camera=(), microphone=(), geolocation=()');res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'self'");
  const url=new URL(req.url,'http://internal'),path=url.pathname;
  if(path.startsWith('/api/')){
   limited(req);
   if(req.method==='GET'&&path==='/api/status')return respond(res,200,{mode:'development',booking:'local_test_requests',...providerStatus(env)});
   if(req.method==='POST'&&path!=='/api/payments/webhook'){
    if(req.headers.origin!==origin)throw new Problem('origin_denied',403);
    if(!req.headers['content-type']?.startsWith('application/json'))throw new Problem('json_required',415);
   }
   if(path.startsWith('/api/admin/')&&path!=='/api/admin/login')auth(req);
   if(req.method==='GET'&&path==='/api/admin/overview')return respond(res,200,{rows:store.list(),metrics:store.aggregates(),forecast:forecast(store.weeklyDemand())});
   if(req.method!=='POST')throw new Problem('not_found',404);
   const raw=await body(req);
   if(path==='/api/payments/webhook')return respond(res,200,store.webhook(verifyWebhook(raw,req.headers['stripe-signature'],env.STRIPE_WEBHOOK_SECRET)));
   const data=json(raw);
   if(path==='/api/admin/login'){
    if(!env.ADMIN_ACCESS_KEY||env.ADMIN_ACCESS_KEY.length<32)throw new Problem('admin_unconfigured',503);
    if(!equal(sha(String(data.key??'')),sha(env.ADMIN_ACCESS_KEY)))throw new Problem('unauthorized',401);
    const token=randomBytes(32).toString('hex');for(const[k,v]of sessions)if(v<Date.now())sessions.delete(k);sessions.set(sha(token),Date.now()+30*60000);
    res.setHeader('Set-Cookie',`care_admin=${token}; HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=1800${origin.startsWith('https:')?'; Secure':''}`);return respond(res,200,{ok:true});
   }
   if(path==='/api/admin/logout'){const token=req.headers.cookie?.match(/care_admin=([^;]+)/)?.[1];sessions.delete(sha(token??''));res.setHeader('Set-Cookie','care_admin=; HttpOnly; SameSite=Strict; Path=/api/admin; Max-Age=0');return respond(res,200,{ok:true});}
   if(path==='/api/requests'){
    const key=req.headers['idempotency-key'];if(typeof key!=='string'||!/^[a-zA-Z0-9-]{20,80}$/.test(key))throw new Problem('idempotency_required');
    const input=validateRequest(data);const token=randomBytes(32).toString('hex');const result=store.create(input,key,token);
    return respond(res,result.duplicate?200:201,{...result,...(!result.duplicate?{managementToken:token}:{}),emailStatus:'queued_not_sent',mode:'development'});
   }
   if(path==='/api/request/status'){const x=store.own(data.id,req.headers.authorization?.replace(/^Bearer /,''));return respond(res,200,{id:x.id,status:x.status,quoteAmount:x.quote_amount,currency:x.currency,paymentStatus:x.payment_status});}
   if(path==='/api/request/cancel'){store.own(data.id,req.headers.authorization?.replace(/^Bearer /,''));return respond(res,200,store.cancel(data.id));}
   if(path==='/api/checkout'){const x=store.own(data.id,req.headers.authorization?.replace(/^Bearer /,''));const s=await checkout(x,{...env,APP_ORIGIN:origin},network);store.setCheckout(x.id,s.id);return respond(res,200,{url:s.url});}
   if(path==='/api/events'){store.event(validateEvent(data));return respond(res,202,{accepted:true});}
   if(path==='/api/admin/quote'){store.approveQuote(data.id,data.amount);return respond(res,200,{status:'approved'});}
   if(path==='/api/admin/confirm'){if(data.scopeReviewed!==true||data.authorityReviewed!==true)throw new Problem('human_review_required');return respond(res,200,store.confirm(data.id,data.resource,data.start,data.end));}
   if(path==='/api/admin/outbox/dispatch'){
    if(!providerStatus(env).email)throw new Problem('email_unavailable',503);
    let accepted=0,failed=0;for(const item of store.queued()){try{store.delivery(item.id,await sendOutbox(item,env,network));accepted++;}catch{store.delivery(item.id,{attempts:item.attempts});failed++;}}return respond(res,200,{acceptedByProvider:accepted,failed,delivered:'not_verified'});
   }
   if(path==='/api/admin/demand/complete-week'){if(data.reviewed!==true)throw new Problem('data_review_required');store.markCompleteWeek(data.week);return respond(res,200,{reviewed:true});}
   if(path==='/api/admin/retention')return respond(res,200,store.retention());
   throw new Problem('not_found',404);
  }
  if(req.method!=='GET'&&req.method!=='HEAD')throw new Problem('method_not_allowed',405);
  let file=path==='/'||/^\/(nb|en|tr)\/?$/.test(path)?'index.html':path==='/operations'?'operations.html':decodeURIComponent(path).replace(/^\//,'');
  const absolute=resolve(root,'public',file);if(!absolute.startsWith(resolve(root,'public')+'/'))throw new Problem('not_found',404);
  let bytes;try{bytes=await readFile(absolute);}catch{throw new Problem('not_found',404);}
  if(file==='index.html'){const lang=['nb','en','tr'].includes(path.split('/')[1])?path.split('/')[1]:'nb';bytes=bytes.toString().replace('{{CONTENT}}',render(lang)).replace('lang="nb"','lang="'+lang+'"').replace('<title>NAVIAR CARE</title>','<title>'+copy[lang].title+'</title>').replace('NAVIAR CARE utviklingsversjon',copy[lang].description);}
  res.writeHead(200,{'Content-Type':mime[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(req.method==='HEAD'?undefined:bytes);
 }catch(e){respond(res,e instanceof Problem?e.status:500,{error:e instanceof Problem?e.message:'server_error'});}};
}
if(process.argv[1]&&pathToFileURL(resolve(process.argv[1])).href===import.meta.url){
 if(process.env.VERCEL)throw new Error('SQLite development backend must not run on Vercel. Connect a durable database adapter first.');
 const dataDir=resolve(root,'data');await mkdir(dataDir,{recursive:true,mode:0o700});await chmod(dataDir,0o700);
 const store=createStore(resolve(dataDir,'care.sqlite'));await chmod(resolve(dataDir,'care.sqlite'),0o600);
 const port=Number(process.env.PORT||4173);const server=createServer(application(store,process.env));server.listen(port,'0.0.0.0',()=>console.log('NAVIAR CARE development server on port '+port));
}
