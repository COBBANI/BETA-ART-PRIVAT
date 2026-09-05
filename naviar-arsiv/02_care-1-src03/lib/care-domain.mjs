export const serviceIds=['shopping','company','walk','digital','home','outdoor'];
export const sharingLevels=['none','done','progress','overview'];
export const incidentOwners={no_show:'operations_coordinator',door_unanswered:'duty_coordinator',extra_work:'operations_coordinator',payment_dispute:'payments_lead'};
export const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
/** @returns {never} */
export function fail(code,status=400){throw Object.assign(new Error(code),{status});}
// Resolve the local wall clock by testing both Oslo offsets. Nonexistent and ambiguous DST times require a different time.
export function osloInstant(date,time,now=Date.now()){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||!/^\d{2}:\d{2}$/.test(time))fail('invalid_time');
 const base=Date.parse(`${date}T${time}:00Z`);if(!Number.isFinite(base))fail('invalid_time');
 const formatter=new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Oslo',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});
 const candidates=[base-3600000,base-7200000].filter(n=>formatter.format(new Date(n))===`${date} ${time}`);
 if(candidates.length!==1||candidates[0]<=now||candidates[0]>now+366*86400000)fail('invalid_time');return candidates[0];
}
export function validateRequest(d,now=Date.now()){
 if(!uuid.test(d.id)||!['nb','en','tr'].includes(d.lang)||!serviceIds.includes(d.service)||!['scheduled','today','recurring'].includes(d.timing)||![30,60,90,120].includes(d.duration)||!['self','other'].includes(d.forWhom)||typeof d.name!=='string'||!d.name.trim()||d.name.length>60||!/^\d{4}$/.test(d.postcode)||d.test!==true)fail('invalid_request');
 if(d.forWhom==='self'&&d.consent!==true)fail('recipient_consent_required');
 if(d.forWhom==='other'&&(d.consent===true||d.sharing!=='none'))fail('payer_cannot_consent');
 if(!sharingLevels.includes(d.sharing))fail('invalid_sharing');
 const startsAt=osloInstant(d.date,d.time,now);
 return {id:d.id,lang:d.lang,service:d.service,timing:d.timing,startsAt,duration:d.duration,forWhom:d.forWhom,name:d.name.trim(),postcode:d.postcode,consent:d.forWhom==='self'?1:0,sharing:d.forWhom==='self'?d.sharing:'none',status:d.forWhom==='self'?'requested':'consent_pending'};
}
export function authorise(request,actor,operator=false){if(!actor)fail('unauthenticated',401);if(request.owner!==actor&&!operator)fail('not_found',404);}
export function allowedAction(b,action,actor){authorise(b,actor);if(action==='sharing'&&b.for_whom!=='self')fail('payer_cannot_consent',403);if(['reschedule','cancel'].includes(action)&&!(['requested','consent_pending','quoted'].includes(b.status)||(b.status==='confirmed'&&b.payment_state==='unpaid'&&!b.checkout_id&&!b.checkout_started_at)))fail('invalid_transition',409);if(action==='accept'&&(b.status!=='quoted'||!b.consent||!b.amount))fail('invalid_transition',409);if(action==='checkout'&&(b.status!=='confirmed'||b.payment_state!=='unpaid'||!b.amount||!b.consent))fail('invalid_transition',409);}
export async function fingerprint(value){return [...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(value))))].map(x=>x.toString(16).padStart(2,'0')).join('');}
export async function verifyStripe(raw,signature,secret,now=Date.now()){
 const values=signature.split(',').map(v=>v.split('='));const time=Number(values.find(v=>v[0]==='t')?.[1]);const signatures=values.filter(v=>v[0]==='v1').map(v=>v[1]);
 if(!time||Math.abs(now/1000-time)>300)fail('invalid_signature',400);
 const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(secret),{name:'HMAC',hash:'SHA-256'},false,['sign']);
 const expected=[...new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(`${time}.${raw}`)))].map(x=>x.toString(16).padStart(2,'0')).join('');
 const valid=signatures.some(s=>{if(s.length!==expected.length)return false;let delta=0;for(let i=0;i<s.length;i++)delta|=s.charCodeAt(i)^expected.charCodeAt(i);return delta===0;});if(!valid)fail('invalid_signature',400);
 return JSON.parse(raw);
}
// Operations decision: next 7 daily request counts, aggregate only. Review version never calls this with demo data.
export function forecastDemand(daily,{isTest=true}={}){
 if(isTest||daily.length<84||daily.some((d,i)=>!Number.isInteger(d.count)||d.count<0||(i>0&&Date.parse(d.day)-Date.parse(daily[i-1].day)!==86400000)))return {status:'insufficient_data',forecast:null};
 const n=daily.length,errors=[],baseline=[];
 for(let i=n-28;i<n;i++){const pred=[1,2,3,4].reduce((a,k)=>a+daily[i-k*7].count,0)/4;errors.push(Math.abs(pred-daily[i].count));baseline.push(Math.abs(daily[i-7].count-daily[i].count));}
 const mae=errors.reduce((a,b)=>a+b)/28,baselineMae=baseline.reduce((a,b)=>a+b)/28,useAverage=mae<baselineMae;
 const next=Array.from({length:7},(_,k)=>{const point=useAverage?[1,2,3,4].reduce((a,w)=>a+daily[n+k-w*7].count,0)/4:daily[n+k-7].count;const range=2*(useAverage?mae:baselineMae);return {day:new Date(Date.parse(daily[n-1].day)+(k+1)*86400000).toISOString().slice(0,10),estimate:Math.round(point*10)/10,heuristicRange:[Math.max(0,point-range),point+range]};});
 return {status:'baseline_evaluated',method:useAverage?'four_week_weekday_mean':'seasonal_naive',holdoutDays:28,mae,baselineMae,rangeNote:'Heuristic error band, not a calibrated confidence interval',forecast:next};
}
