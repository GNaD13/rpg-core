import { build } from 'esbuild';
import { mkdir } from 'node:fs/promises';
await mkdir('.cache',{recursive:true});
await build({entryPoints:['tests/smoke.ts'],bundle:true,platform:'node',format:'esm',packages:'external',outfile:'.cache/smoke.mjs',logLevel:'warning'});
await import('../.cache/smoke.mjs?'+Date.now());
