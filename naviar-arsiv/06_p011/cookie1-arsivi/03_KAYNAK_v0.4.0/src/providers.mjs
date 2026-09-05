import {Problem} from './domain.mjs';
export function providerStatus(env){return{payment:Boolean(env.STRIPE_SECRET_KEY?.startsWith('sk_test_')&&env.STRIPE_WEBHOOK_SECRET),email:Boolean(env.RESEND_API_KEY&&env.MAIL_FROM&&env.MAIL_TEST_RECIPIENT),mode:'development'};}
export async function checkout(request,env,send=fetch){
 if(!providerStatus(env).payment)throw new Problem('payment_unavailable',503);
 if(!request.quote_approved||request.status!=='confirmed'||!Number.isSafeInteger(request.quote_amount))throw new Problem('quote_required',409);
 if(request.payment_status==='paid')throw new Problem('already_paid',409);
 const root=new URL(env.APP_ORIGIN);if(!['https:','http:'].includes(root.protocol))throw new Problem('invalid_origin');
 const body=new URLSearchParams({mode:'payment','line_items[0][price_data][currency]':'nok','line_items[0][price_data][unit_amount]':String(request.quote_amount),'line_items[0][price_data][product_data][name]':'NAVIAR CARE — approved test quote','line_items[0][quantity]':'1',client_reference_id:request.id,'metadata[request_id]':request.id,'success_url':root.origin+'/'+request.locale+'/?payment=return','cancel_url':root.origin+'/'+request.locale+'/?payment=cancel'});
 const res=await send('https://api.stripe.com/v1/checkout/sessions',{method:'POST',headers:{Authorization:'Bearer '+env.STRIPE_SECRET_KEY,'Content-Type':'application/x-www-form-urlencoded','Idempotency-Key':'care-'+request.id},body,signal:AbortSignal.timeout(15000)});
 const data=await res.json();if(!res.ok||!data.id||!data.url)throw new Problem('payment_provider_error',502);
 const url=new URL(data.url);if(url.protocol!=='https:'||url.hostname!=='checkout.stripe.com')throw new Problem('payment_provider_error',502);
 return{id:data.id,url:data.url};
}
export const emailCopy={nb:{subject:'NAVIAR CARE — testforespørsel mottatt',text:'Dette er en testbekreftelse. Ønsket dato er ikke en bekreftet avtale. Ingen hjelper er bestilt. Du får et konkret forslag etter en menneskelig vurdering når tjenesten åpner.'},en:{subject:'NAVIAR CARE — test request received',text:'This is a test confirmation. Your preferred date is not a confirmed appointment. No helper has been booked. A human review is needed before a concrete proposal when the service opens.'},tr:{subject:'NAVIAR CARE — deneme talebi alındı',text:'Bu bir test bildirimidir. Tercih ettiğiniz tarih kesinleşmiş randevu değildir. Yardımcı rezervasyonu yapılmadı. Hizmet açıldığında somut teklif için insan değerlendirmesi gerekir.'}};
export async function sendOutbox(item,env,send=fetch){
 if(!providerStatus(env).email)throw new Problem('email_unavailable',503);
 // Development build only sends to an operator-configured test recipient, never a submitted address.
 const copy=emailCopy[item.locale];const res=await send('https://api.resend.com/emails',{method:'POST',headers:{Authorization:'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json','Idempotency-Key':'care-'+item.id},body:JSON.stringify({from:env.MAIL_FROM,to:[env.MAIL_TEST_RECIPIENT],subject:copy.subject,text:copy.text+(env.MAIL_REPLY_TO?'\nReply: '+env.MAIL_REPLY_TO:'')}),signal:AbortSignal.timeout(15000)});
 const data=await res.json();if(!res.ok||!data.id)throw new Problem('email_provider_error',502);return{id:data.id};
}
