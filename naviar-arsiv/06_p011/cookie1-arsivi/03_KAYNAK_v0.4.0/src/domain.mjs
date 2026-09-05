import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
export const locales = ['nb','en','tr'];
export const services = ['company','errands','digital'];
export const sha = value => createHash('sha256').update(value).digest('hex');
export class Problem extends Error { constructor(code,status=400){super(code);this.status=status;} }
export function equal(a,b){if(typeof a!=='string'||typeof b!=='string')return false;const x=Buffer.from(a),y=Buffer.from(b);return x.length===y.length&&timingSafeEqual(x,y);}
export function validateRequest(input,now=new Date()){
  const allowed=['name','email','postcode','service','locale','audience','date','consent','website'];
  if(Object.keys(input).some(k=>!allowed.includes(k))) throw new Problem('invalid_fields');
  if(input.website) throw new Problem('invalid_request');
  const name=String(input.name??'').trim(),email=String(input.email??'').trim().toLowerCase();
  if(name.length<2 || name.length>80 || /[<>\r\n]/.test(name)) throw new Problem('invalid_name');
  if(email.length>254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) throw new Problem('invalid_email');
  if(!/^\d{4}$/.test(input.postcode??'')) throw new Problem('invalid_postcode');
  if(!services.includes(input.service)||!locales.includes(input.locale)||!['self','family'].includes(input.audience)) throw new Problem('invalid_selection');
  const d=new Date(String(input.date)+'T12:00:00Z');
  const today=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Oslo'}).format(now);
  const lastDay=new Date(+new Date(today+'T12:00:00Z')+90*86400000).toISOString().slice(0,10);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(input.date??'')||!Number.isFinite(+d)||d.toISOString().slice(0,10)!==input.date||input.date<=today||input.date>lastDay) throw new Problem('invalid_date');
  if(input.consent!==true) throw new Problem('consent_required');
  return {name,email,postcode:input.postcode,service:input.service,locale:input.locale,audience:input.audience,date:input.date,consent:true};
}
export const analyticsNames=['page_view','content_engaged','booking_started','booking_error'];
export const sections=['home','support','process','family','safety','booking','faq'];
export function validateEvent(x){
  if(Object.keys(x).some(k=>!['name','section','locale','consent'].includes(k))||x.consent!==true||!analyticsNames.includes(x.name)||!sections.includes(x.section)||!locales.includes(x.locale))throw new Problem('invalid_event');
  return {name:x.name,section:x.section,locale:x.locale};
}
export function verifyWebhook(raw,signature,secret,now=Math.floor(Date.now()/1000)){
  if(!secret)throw new Problem('payment_unavailable',503);
  const parts=String(signature??'').split(','); const time=parts.find(x=>x.startsWith('t='))?.slice(2);
  if(!/^\d+$/.test(time??'')||Math.abs(now-Number(time))>300)throw new Problem('invalid_signature');
  const h=createHmac('sha256',secret).update(time+'.'+raw).digest('hex');
  if(!parts.filter(x=>x.startsWith('v1=')).some(x=>equal(x.slice(3),h)))throw new Problem('invalid_signature');
  try{return JSON.parse(raw);}catch{throw new Problem('invalid_json');}
}
export function forecast(points){
  if(!Array.isArray(points)||points.some(x=>!Number.isFinite(x)||x<0))throw new Problem('invalid_series');
  // An explicit pilot rule: >=12 COMPLETE consecutive weeks; not a universal statistical threshold.
  if(points.length<12)return {status:'insufficient_data',requiredCompleteWeeks:12,availableWeeks:points.length};
  const holdout=Math.min(4,Math.floor(points.length/3)),start=points.length-holdout;
  let rolling=0,naive=0;for(let i=start;i<points.length;i++){const mean=points.slice(i-4,i).reduce((a,b)=>a+b,0)/4;rolling+=Math.abs(points[i]-mean);naive+=Math.abs(points[i]-points[i-1]);}
  const method=rolling<naive?'four_week_mean':'last_week'; const value=method==='last_week'?points.at(-1):points.slice(-4).reduce((a,b)=>a+b,0)/4;
  const mae=Math.min(rolling,naive)/holdout;
  return {status:'baseline_only',method,nextWeek:value,holdoutWeeks:holdout,mae,naiveMAE:naive/holdout,rollingMAE:rolling/holdout,planningRange:[Math.max(0,value-2*mae),value+2*mae],rangeMeaning:'Heuristic planning range, not a calibrated confidence interval. Validate capacity and holidays manually.'};
}
