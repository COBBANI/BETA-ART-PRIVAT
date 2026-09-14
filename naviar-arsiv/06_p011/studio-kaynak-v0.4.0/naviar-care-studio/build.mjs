import {mkdir,cp,readFile,writeFile} from 'node:fs/promises';
import {render} from './public/render.js';
import {copy} from './public/content.js';
await mkdir('dist',{recursive:true});await cp('public','dist',{recursive:true});
const template=await readFile('public/index.html','utf8');
for(const locale of ['nb','en','tr']){await mkdir('dist/'+locale,{recursive:true});const html=template.replace('{{CONTENT}}',render(locale)).replace('lang="nb"','lang="'+locale+'"').replace('<title>NAVIAR CARE</title>','<title>'+copy[locale].title+'</title>').replace('NAVIAR CARE utviklingsversjon',copy[locale].description);await writeFile('dist/'+locale+'/index.html',html);if(locale==='nb')await writeFile('dist/index.html',html);}
console.log('Static development preview built. APIs require the separate Node 24 server.');
