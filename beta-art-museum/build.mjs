import {cp, mkdir, rm, stat} from 'node:fs/promises';
const root = new URL('./', import.meta.url), output = new URL('dist/', root);
const paths = ['index.html','contact.html','faq.html','license-terms.html','mark.html','cookie-demo.html','privacy.html','404.html','robots.txt','assets'];
for (const path of paths) await stat(new URL(path, root));
await rm(output, {recursive:true, force:true});
await mkdir(output, {recursive:true});
for (const path of paths) await cp(new URL(path,root), new URL(path,output), {recursive:true});
console.log('BETA ART museum preview built.');
