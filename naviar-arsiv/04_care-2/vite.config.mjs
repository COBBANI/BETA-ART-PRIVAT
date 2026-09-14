import {defineConfig} from 'vite';
import {api} from './server/operations.mjs';
// Development-only UI review. Authentication and providers remain unconfigured;
// the same production API rejects protected requests rather than faking sign-in.
export default defineConfig({
  root:'dist', appType:'mpa',
  server:{host:'0.0.0.0',allowedHosts:['terminal.local'],port:4173,strictPort:true},
  plugins:[{name:'care-preview-api',configureServer(server){
    server.middlewares.use(async (req,res,next)=>{
      if(req.url?.startsWith('/__review/mobile')){
        const w=new URL(req.url,'http://terminal.local').searchParams.get('width')==='320'?320:390;
        res.setHeader('Content-Type','text/html; charset=utf-8');
        res.end(`<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>Development mobile review</title></head><body style="margin:0;padding:24px;background:#dce4dc"><iframe title="Mobile 390px" src="/tr/" width="${w}" height="850" style="border:0;background:white"></iframe></body></html>`);return;
      }
      if(!req.url?.startsWith('/api/'))return next();
      try{
        const chunks=[];for await(const chunk of req)chunks.push(chunk);
        const bytes=Buffer.concat(chunks),method=req.method||'GET';
        const request=new Request(new URL(req.url,'http://terminal.local:4173'),{
          method,headers:req.headers,...(!['GET','HEAD'].includes(method)?{body:bytes}:{}),
        });
        const response=await api(request,{});
        res.statusCode=response.status;response.headers.forEach((v,k)=>res.setHeader(k,v));
        res.end(Buffer.from(await response.arrayBuffer()));
      }catch{res.statusCode=503;res.setHeader('Content-Type','application/json');res.end('{"error":"generic"}');}
    });
  }}],
});
