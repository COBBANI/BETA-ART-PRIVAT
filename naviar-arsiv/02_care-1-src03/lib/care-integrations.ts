import {verifyStripe} from './care-domain.mjs';
export {verifyStripe};
export type Integrations={STRIPE_SECRET_KEY?:string;STRIPE_WEBHOOK_SECRET?:string;RESEND_API_KEY?:string;MAIL_FROM?:string;MAIL_TEST_RECIPIENT?:string;APP_ORIGIN?:string;OPERATIONS_USER_ID?:string;OPERATIONS_EMAIL?:string};
export function paymentsReady(e:Integrations){return !!(e.STRIPE_SECRET_KEY?.startsWith('sk_test_')&&e.STRIPE_WEBHOOK_SECRET&&e.APP_ORIGIN?.startsWith('https://'));}
export function mailReady(e:Integrations){return !!(e.RESEND_API_KEY&&e.MAIL_FROM&&e.MAIL_TEST_RECIPIENT);}
const providerError=(code:string,status=502)=>Object.assign(new Error(code),{status});
export type Checkout={id:string;url:string|null;livemode:boolean;status:'open'|'complete'|'expired';amount_total:number;currency:string;metadata:{care_request_id:string}};
export async function createCheckout(e:Integrations,b:{id:string;lang:string;amount:number;attempt:string}){
 if(!paymentsReady(e))throw providerError('payments_unconfigured',503);
 const body=new URLSearchParams({mode:'payment','line_items[0][price_data][currency]':'nok','line_items[0][price_data][unit_amount]':String(b.amount),'line_items[0][price_data][product_data][name]':'NAVIAR CARE — TEST','line_items[0][quantity]':'1','metadata[care_request_id]':b.id,'metadata[payment_attempt]':b.attempt,client_reference_id:b.id,success_url:`${e.APP_ORIGIN}/${b.lang}/account?checkout=returned`,cancel_url:`${e.APP_ORIGIN}/${b.lang}/account?checkout=cancelled`});
 const r=await fetch('https://api.stripe.com/v1/checkout/sessions',{method:'POST',headers:{Authorization:`Bearer ${e.STRIPE_SECRET_KEY}`,'Content-Type':'application/x-www-form-urlencoded','Idempotency-Key':`care-checkout-${b.attempt}`},body});
 if(!r.ok)throw providerError('payment_provider_unavailable');
 const d=await r.json() as Checkout;if(d.livemode!==false||!d.id||!d.url?.startsWith('https://checkout.stripe.com/'))throw providerError('invalid_checkout');return d;
}
export async function retrieveCheckout(e:Integrations,id:string){
 if(!paymentsReady(e))throw providerError('payments_unconfigured',503);
 const r=await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(id)}`,{headers:{Authorization:`Bearer ${e.STRIPE_SECRET_KEY}`}});
 if(!r.ok)throw providerError('payment_provider_unavailable');const d=await r.json() as Checkout;
 if(d.livemode!==false||d.id!==id)throw providerError('invalid_checkout');return d;
}
export const emailCopy={nb:{subject:'NAVIAR CARE: testforespørselen er lagret',body:'Testforespørselen din er lagret. Ingen avtale er bekreftet. Logg inn i Naviar for å se status.'},en:{subject:'NAVIAR CARE: test request saved',body:'Your test request is saved. No appointment is confirmed. Sign in to Naviar to see its status.'},tr:{subject:'NAVIAR CARE: test talebi kaydedildi',body:'Test talebiniz kaydedildi. Randevu kesinleşmedi. Durumu görmek için Naviar hesabınıza giriş yapın.'}};
export async function sendReceipt(e:Integrations,b:{id:string;lang:string}){
 if(!mailReady(e))throw providerError('email_unconfigured',503);
 const c=emailCopy[b.lang as keyof typeof emailCopy]||emailCopy.nb;
 // Only the explicitly configured test recipient. No addresses, task details or health information.
 const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${e.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`care-receipt-${b.id}`},body:JSON.stringify({from:e.MAIL_FROM,to:[e.MAIL_TEST_RECIPIENT],subject:c.subject,text:c.body})});
 if(!r.ok)throw providerError('email_provider_unavailable');const d=await r.json() as {id:string};if(!d.id)throw providerError('invalid_email_response');return d;
}
export async function expireCheckout(e:Integrations,id:string){
 const current=await retrieveCheckout(e,id);
 if(current.status==='complete'||current.status==='expired')return {status:current.status};
 const r=await fetch(`https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(id)}/expire`,{method:'POST',headers:{Authorization:`Bearer ${e.STRIPE_SECRET_KEY}`,'Idempotency-Key':`care-expire-${id}`}});
 if(!r.ok){const latest=await retrieveCheckout(e,id);if(latest.status==='complete'||latest.status==='expired')return {status:latest.status};throw providerError('checkout_expiry_pending');}
 return {status:'expired'};
}
