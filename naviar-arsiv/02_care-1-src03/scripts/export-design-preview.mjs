import {build} from 'esbuild';
import {readFile, writeFile, mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
const root = process.cwd();
await mkdir('work', {recursive:true});
await build({entryPoints:['lib/content.ts'],outfile:'work/preview-content.mjs',platform:'node',format:'esm',bundle:true});
const {copy, services} = await import('../work/preview-content.mjs');
const {previewCopy} = await import('../design-preview/preview-copy.mjs');
const dictionary = {...copy, ...previewCopy};
const escape = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const data = async (path,type) => `data:${type};base64,${(await readFile(path)).toString('base64')}`;
const compiled = await build({entryPoints:['design-preview/preview.js'],write:false,bundle:true,platform:'browser',format:'iife',target:'es2022',minify:true});
// Keep the published app's brand tokens and responsive layout, excluding build directives.
const sourceCss = (await readFile('app/globals.css','utf8')).replace(/^@import[^;]+;\s*/gm,'').replace(/@theme inline\{[^}]+\}/g,'');
let html = await readFile('design-preview/index.template.html','utf8');
const elements = {
  description: escape(copy.heroBody[0]),
  logo: await data('public/naviar-care.svg','image/svg+xml'),
  hero: await data('public/everyday-help.webp','image/webp'),
  heroAlt: escape(copy.heroAlt[0]),
  css: sourceCss + '\n' + await readFile('design-preview/preview.css','utf8'),
  promises: [1,2,3].map(n=>`<div><div><h2 data-copy="promise${n}"></h2><p data-copy="promise${n}Body"></p></div></div>`).join(''),
  services: services.map((s,i)=>`<a class="service-card" href="#request" data-pick-service="${s.id}"><span class="preview-card-number">0${i+1}</span><h3 data-service-title="${s.id}">${escape(s.title[0])}</h3><p data-service-body="${s.id}">${escape(s.body[0])}</p><span class="card-arrow" aria-hidden="true">↗</span></a>`).join(''),
  options: services.map(s=>`<option value="${s.id}" data-service-title="${s.id}">${escape(s.title[0])}</option>`).join(''),
  durations: [30,60,90,120].map(n=>`<option value="${n}"${n===60?' selected':''}>${n} min</option>`).join(''),
  steps: [1,2,3].map(n=>`<div><span class="number">0${n}</span><h3 data-copy="how${n}"></h3><p data-copy="how${n}Body"></p></div>`).join(''),
  safety: ['identity','reliability','competence'].map(k=>`<article><h3 data-copy="${k}"></h3><p data-copy="${k}Body"></p></article>`).join(''),
  faq: [1,2,3,4].map(n=>`<details><summary data-copy="faq${n}"></summary><p data-copy="faq${n}Body"></p></details>`).join(''),
  script: compiled.outputFiles[0].text.replaceAll('</script','<\\/script'),
};
html = html.replace(/\{\{(\w+)\}\}/g,(_,key)=>{if(!(key in elements))throw Error(`Missing slot ${key}`);return elements[key];});
html = html.replace(/(<[a-z0-9]+\b[^>]*\bdata-copy="([^"]+)"[^>]*>)(<\/)/g,(_,open,key,end)=>{
  if(!dictionary[key])throw Error(`Missing text ${key}`);
  return open + escape(dictionary[key][0]) + end;
});
html = html.replace(/data-app-link="([^"]*)"/g,(_,path)=>`href="https://naviar-care-src03.andersen-betul.chatgpt.site/nb${path}" data-app-link="${path}"`);
const target = resolve(process.argv[2] || 'outputs/NAVIAR-CARE_SRC03_Web-Tasarim.html');
await mkdir(resolve(target,'..'),{recursive:true});
await writeFile(target,html);
console.log(JSON.stringify({file:target,bytes:Buffer.byteLength(html),languages:3,services:services.length,mode:'local-summary-only'}));
