// Supervised browser QA uses disposable in-memory test records.
import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {createStore} from './src/store.mjs';
import {application} from './server.mjs';
const args=process.argv.slice(2),portIndex=args.indexOf('--port');
const port=portIndex>=0?Number(args[portIndex+1]):4173;
const app=application(createStore(),{APP_ORIGIN:'http://terminal.local:'+port});
createServer(async(req,res)=>{
 if(new URL(req.url,'http://internal').pathname.replace(/\/$/,'')==='/demo'){
  res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'});
  return res.end(await readFile(new URL('./deliverables/NAVIAR-CARE_P-011_STUDIO_DEMO.html',import.meta.url)));
 }
 return app(req,res);
}).listen(port,'0.0.0.0',()=>console.log('NAVIAR CARE supervised preview on '+port));
