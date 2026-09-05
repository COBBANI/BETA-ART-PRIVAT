import {build} from 'esbuild';
import {spawnSync} from 'node:child_process';
await build({entryPoints:['lib/care-api.ts'],outfile:'work/care-api.mjs',bundle:true,platform:'node',format:'esm'});
const result=spawnSync(process.execPath,['--test','tests/care/acceptance.test.mjs'],{stdio:'inherit'});
process.exit(result.status??1);
