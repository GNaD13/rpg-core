// Original procedural testing assets. MIT, copyright (c) 2026 gnad.
import * as THREE from 'three';
import type { PreparedVisual } from '../render/characters/assets';
import type { LoadedGltf } from '../render/assets/loader';
import { ownedCharacter, ownedCharacterDefinition } from '../product/owned_assets';
export const MIT_TEST = true;
export function testBody(): THREE.Group {
  const own = ownedCharacter();
  if (own) return own;
  const root = new THREE.Group();
  const materials = [new THREE.MeshLambertMaterial({ color: 0x3584bd }),new THREE.MeshLambertMaterial({ color: 0xf0c7a0 }),new THREE.MeshLambertMaterial({ color: 0x263d50 })];
  const parts = [ [.65,.8,.35,0,1.1,0,0,'Character_Body'],[.45,.45,.43,0,1.74,0,1,'head'],[.2,.72,.24,-.45,1.08,0,0,'arm_l'],[.2,.72,.24,.45,1.08,0,0,'arm_r'],[.24,.7,.28,-.18,.36,0,2,'leg_l'],[.24,.7,.28,.18,.36,0,2,'leg_r'] ];
  for(const [w,h,d,x,y,z,m,name] of parts) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w as number,h as number,d as number),materials[m as number]);
    mesh.position.set(x as number,y as number,z as number); mesh.name=name as string; root.add(mesh);
  }
  return root;
}
export function testPrepared(key: string): PreparedVisual {
  const own = ownedCharacterDefinition();
  if (own) {
    const c = own.spec.clips;
    return {key,def:{url:own.spec.url,height:own.spec.height,clips:{idle:c.idle,walk:c.walk,run:c.run ?? c.walk,attack:[c.attack ?? c.walk],death:c.death ?? c.idle}},normScale:1,yOffset:0,clips:new Map(own.clips.map(clip => [clip.name,clip])),idleGeo:null,shadowGeo:null,idleSrcMats:[],idleSrcIsBody:[],clickRadius:.5};
  }
  const idle = new THREE.AnimationClip('Idle',1,[]);
  const walk = new THREE.AnimationClip('Walk',.7,[
    new THREE.NumberKeyframeTrack('leg_l.rotation[x]',[0,.175,.35,.525,.7],[0,.5,0,-.5,0]),
    new THREE.NumberKeyframeTrack('leg_r.rotation[x]',[0,.175,.35,.525,.7],[0,-.5,0,.5,0]),
    new THREE.NumberKeyframeTrack('arm_l.rotation[x]',[0,.175,.35,.525,.7],[0,-.4,0,.4,0]),
    new THREE.NumberKeyframeTrack('arm_r.rotation[x]',[0,.175,.35,.525,.7],[0,.4,0,-.4,0]),
  ]);
  return {key,def:{ url:'mit-test:body',height:2,clips:{idle:'Idle',walk:'Walk',run:'Walk',attack:['Walk'],death:'Idle'} },normScale:1,yOffset:0,clips:new Map([['Idle',idle],['Walk',walk]]),idleGeo:null,shadowGeo:null,idleSrcMats:[],idleSrcIsBody:[],clickRadius:.5};
}
const textures = new Map<string, THREE.CanvasTexture>();
export function testTexture(url = '', opts: { srgb?: boolean; repeat?: boolean } = {}): THREE.CanvasTexture {
  const key = `${url}|${opts.srgb ? 's' : 'l'}|${opts.repeat ? 'r' : 'c'}`;
  const cached = textures.get(key);
  if (cached) return cached;
  const canvas=document.createElement('canvas'); canvas.width=canvas.height=4;
  const ctx=canvas.getContext('2d')!; ctx.fillStyle='#a0b587'; ctx.fillRect(0,0,4,4);
  const tex=new THREE.CanvasTexture(canvas);
  tex.colorSpace=opts.srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  if (opts.repeat) tex.wrapS=tex.wrapT=THREE.RepeatWrapping;
  textures.set(key,tex); tex.addEventListener('dispose',()=>textures.delete(key));
  return tex;
}
export function testGltf(): LoadedGltf { const scene=testBody(); return { scene,scenes:[scene],animations:[],cameras:[],asset:{version:'2.0'},userData:{} }; }
