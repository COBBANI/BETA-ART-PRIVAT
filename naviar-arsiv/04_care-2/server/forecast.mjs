/** Aggregate content planning only. Input must exclude test traffic and partial weeks. */
export function forecastContent(weeks,{production=false}={}){
 if(!production)return {status:'insufficient_production_data'};
 if(!Array.isArray(weeks)||weeks.length<8||weeks.some(v=>!Number.isFinite(v)||v<0))return {status:'insufficient_history'};
 const training=weeks.slice(0,-2),holdout=weeks.slice(-2),mean=a=>a.reduce((s,v)=>s+v,0)/a.length;
 const baseline=mean(training.slice(-4));
 const mae=mean(holdout.map(v=>Math.abs(v-baseline))),naive=training.at(-1),naiveMae=mean(holdout.map(v=>Math.abs(v-naive)));
 const method=mae<=naiveMae?'four_week_mean':'last_week';
 const expected=method==='four_week_mean'?mean(weeks.slice(-4)):weeks.at(-1);
 return {status:'estimate',unit:'consented_page_views_per_week',method,expected:Math.round(expected),holdoutMAE:Math.round(Math.min(mae,naiveMae)),weeks:weeks.length,scope:'aggregate_content_only',causal:false};
}
