import {readFile,writeFile,mkdir} from 'node:fs/promises';
await mkdir('deliverables',{recursive:true});
const css=await readFile('public/styles.css','utf8');
const svg=await readFile('public/assets/naviar-care.svg','utf8');
const bundle=[];
for(const name of ['demo','content','journey','render','app']){
 let code=await readFile('public/'+name+'.js','utf8');
 code=code.replace(/^import .*?;\n/gm,'').replace(/export (const|function) /g,'$1 ');
 if(name==='app')code=code.replace('let cleanup=boot();','').replace("location.pathname.split('/')[1] in copy?location.pathname.split('/')[1]:'nb'","new URLSearchParams(location.search).get('lang') in copy?new URLSearchParams(location.search).get('lang'):'nb'");
 bundle.push(code);
}
const logo='data:image/svg+xml,'+encodeURIComponent(svg);
bundle.push(`let cleanup;function mountDemo(locale){if(cleanup)cleanup();cleanup=boot(locale);document.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href');if(/^\\/(nb|en|tr)\\/$/.test(href)){const target=href.split('/')[1];a.setAttribute('href','?lang='+target);a.onclick=e=>{e.preventDefault();mountDemo(target);document.querySelector('.languages a[aria-current]').focus();};}if(href==='/operations'){a.removeAttribute('href');a.textContent=({nb:'Drift krever kildepakken',en:'Operations requires the source package',tr:'Operasyon için kaynak paketi gerekir'})[locale];}});document.querySelector('.brand img').src=${JSON.stringify(logo)};}mountDemo(new URLSearchParams(location.search).get('lang')||'nb');`);

const script=bundle.join('\n').replace(/<\/script/gi,'<\\/script');
const html=`<!doctype html><html lang="nb" data-demo="true"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta name="description" content="NAVIAR CARE interactive demonstration"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'; form-action 'none'; base-uri 'none'"><title>NAVIAR CARE · Demo</title><style>${css}</style></head><body><div id="app"></div><noscript>JavaScript is needed for this interactive demonstration. No request has been sent.</noscript><script>${script}</script></body></html>`;
await writeFile('deliverables/NAVIAR-CARE_P-011_STUDIO_DEMO.html',html);
console.log('Portable demo built: no network connections or persistent request data.');
