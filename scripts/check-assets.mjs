import { readFile, stat } from 'node:fs/promises';
import { resolve, sep } from 'node:path';
const root=resolve(import.meta.dirname,'../public');
const m=JSON.parse(await readFile(resolve(root,'assets/manifest.json'),'utf8'));
if(m.version!==1 || !m.scenery || typeof m.scenery!=='object' || Array.isArray(m.scenery)) throw new Error('Invalid manifest v1');
for(const key of Object.keys(m.scenery)) if(!['tree','rock','house','chest'].includes(key)) throw new Error(`Unknown scenery key ${key}`);
for (const spec of Object.values(m.scenery)) if(!spec?.collider || ![spec.collider.width,spec.collider.depth,spec.collider.height].every(v => Number.isFinite(v) && v > 0)) throw new Error('Scenery requires positive collider width/depth/height');
for(const spec of [...Object.values(m.scenery),...(m.character?[m.character]:[])]) {
 if(!spec || typeof spec.url!=='string' || !/^\/assets\/[A-Za-z0-9_./-]+\.glb$/.test(spec.url) || spec.url.includes('..') || !Number.isFinite(spec.height) || spec.height<=0) throw new Error('Invalid model spec');
 const file=resolve(root,'.'+spec.url);
 if(!file.startsWith(root+sep) || !(await stat(file)).isFile()) throw new Error(`Missing asset ${spec.url}`);
}
if(m.character && (!m.character.clips?.idle || !m.character.clips.walk)) throw new Error('Character needs idle and walk clip names');
console.log(`Asset configuration OK (${m.character?'custom':'procedural'} character, ${Object.keys(m.scenery).length} custom scenery types)`);
