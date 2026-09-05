import {defineConfig} from 'vite';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync,readdirSync} from 'node:fs';
import worker from './dist/server/index.js';

// Development-only fixture. It never reads production credentials or databases.
// Production is built exclusively from src/worker.js by scripts/build.mjs.
export default defineConfig({
  server:{host:'0.0.0.0',allowedHosts:['terminal.local']},
  plugins:[{name:'naviar-worker-preview',configureServer(server){
    const sql=new DatabaseSync(':memory:');
    sql.exec('PRAGMA foreign_keys=ON');
    for(const file of readdirSync('drizzle').filter(f=>f.endsWith('.sql')).sort())sql.exec(readFileSync('drizzle/'+file,'utf8'));
    const DB={prepare(query){let args=[];const stmt={bind(...values){args=values;return stmt},async first(){return sql.prepare(query).get(...args)||null},async all(){return {results:sql.prepare(query).all(...args)}},async run(){return {meta:sql.prepare(query).run(...args)}}};return stmt},async batch(items){sql.exec('BEGIN');try{const result=[];for(const item of items)result.push(await item.run());sql.exec('COMMIT');return result}catch(error){sql.exec('ROLLBACK');throw error}}};
    const start=Date.now()+86400000;
    sql.prepare('INSERT INTO slots(id,start,end,demo,active) VALUES(?,?,?,?,1)').run('preview-slot',start,start+1200000,1);
    const env={DB,SITE_ORIGIN:'http://terminal.local:4173',ADMIN_EMAILS:'owner@example.test',RATE_LIMIT_SECRET:'local-fixture'};
    server.httpServer?.once('close',()=>sql.close());
    server.middlewares.use(async(req,res,next)=>{
      if(!req.url)return next();
      if(req.url.startsWith('/@')||req.url.includes('node_modules'))return next();
      try{
        const headers=new Headers();
        for(const [key,value] of Object.entries(req.headers))if(value)headers.set(key,Array.isArray(value)?value.join(','):value);
        headers.set('oai-authenticated-user-id','preview-user');
        headers.set('oai-authenticated-user-email','owner@example.test');
        const chunks=[];for await(const chunk of req)chunks.push(chunk);
        const body=chunks.length?Buffer.concat(chunks):undefined;
        const response=await worker.fetch(new Request(env.SITE_ORIGIN+req.url,{method:req.method,headers,body}),env,{waitUntil(p){p.catch(()=>{})}});
        res.statusCode=response.status;
        response.headers.forEach((value,key)=>res.setHeader(key,key==='set-cookie'?value.replace(/; Secure/g,''):value));
        // HTTP is used only by the isolated browser preview. Keep production cookies secure.
        let bytes=Buffer.from(await response.arrayBuffer());
        if(req.url==='/app.js')bytes=Buffer.from(bytes.toString().replace('; Secure; SameSite=Lax','; SameSite=Lax'));
        res.end(bytes);
      }catch(error){res.statusCode=500;res.end('Preview fixture failed.');server.config.logger.error(String(error));}
    });
  }}]
});
