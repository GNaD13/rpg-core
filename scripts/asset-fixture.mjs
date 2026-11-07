// Generates original test data into dist only; never copies upstream media.
import { writeFile } from 'node:fs/promises';
import { deflateSync } from 'node:zlib';
import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
class Reader {
 readAsArrayBuffer(blob) { blob.arrayBuffer().then(value=>{this.result=value;this.onloadend?.();}); }
 readAsDataURL(blob) { blob.arrayBuffer().then(value=>{this.result=`data:${blob.type};base64,${Buffer.from(value).toString('base64')}`;this.onloadend?.();}); }
}
globalThis.FileReader=Reader;
const root=new THREE.Group();
const mesh=new THREE.Mesh(new THREE.BoxGeometry(1,2,.6),new THREE.MeshStandardMaterial({color:0xeab54a}));
mesh.name='Character_Body';mesh.position.y=1;root.add(mesh);
const clip = new THREE.AnimationClip('Walk',1,[new THREE.QuaternionKeyframeTrack('Character_Body.quaternion',[0,.5,1],[0,0,0,1,0,0,Math.sin(.06),Math.cos(.06),0,0,0,1])]);
const idle=new THREE.AnimationClip('Idle',1,[new THREE.QuaternionKeyframeTrack('Character_Body.quaternion',[0,1],[0,0,0,1,0,0,0,1])]);
const glb=await new GLTFExporter().parseAsync(root,{binary:true,animations:[idle,clip]});
// Add an original 2x2 checker PNG embedded in the GLB binary.
function crc32(bytes) { let c=0xffffffff; for(const byte of bytes) { c ^= byte; for(let i=0;i<8;i++) c=(c>>>1)^((c&1)?0xedb88320:0); } return (c^0xffffffff)>>>0; }
function chunk(type,data) { const tag=Buffer.from(type);const b=Buffer.alloc(12+data.length);b.writeUInt32BE(data.length);tag.copy(b,4);data.copy(b,8);b.writeUInt32BE(crc32(Buffer.concat([tag,data])),8+data.length);return b; }
const ihdr=Buffer.alloc(13);ihdr.writeUInt32BE(2);ihdr.writeUInt32BE(2,4);ihdr[8]=8;ihdr[9]=6;
const png=Buffer.concat([Buffer.from([137,80,78,71,13,10,26,10]),chunk('IHDR',ihdr),chunk('IDAT',deflateSync(Buffer.from([0,240,140,40,255,30,150,220,255,0,30,150,220,255,240,140,40,255]))),chunk('IEND',Buffer.alloc(0))]);
const input=Buffer.from(glb), jsonLen=input.readUInt32LE(12);
const json=JSON.parse(input.subarray(20,20+jsonLen).toString());
const binStart=20+jsonLen+8;const originalBin=input.subarray(binStart);
json.bufferViews.push({buffer:0,byteOffset:originalBin.length,byteLength:png.length});
json.images=[{bufferView:json.bufferViews.length-1,mimeType:'image/png'}];json.textures=[{source:0}];
json.materials[0].pbrMetallicRoughness.baseColorTexture={index:0};
const pad=(bytes,fill=0)=>Buffer.concat([bytes,Buffer.alloc((4-bytes.length%4)%4,fill)]);
const binary=pad(Buffer.concat([originalBin,png]));json.buffers[0].byteLength=binary.length;
const jsonBytes=pad(Buffer.from(JSON.stringify(json)),32);
const header=Buffer.alloc(12);header.writeUInt32LE(0x46546c67);header.writeUInt32LE(2,4);header.writeUInt32LE(28+jsonBytes.length+binary.length,8);
const jh=Buffer.alloc(8);jh.writeUInt32LE(jsonBytes.length);jh.writeUInt32LE(0x4e4f534a,4);
const bh=Buffer.alloc(8);bh.writeUInt32LE(binary.length);bh.writeUInt32LE(0x004e4942,4);
await writeFile('dist/assets/fixture.glb',Buffer.concat([header,jh,jsonBytes,bh,binary]));
await writeFile('dist/assets/manifest.json',JSON.stringify({version:1,character:{url:'/assets/fixture.glb',height:2,clips:{idle:'Idle',walk:'Walk'}},scenery:{}}));
console.log('Original animated GLB fixture installed in dist only; pnpm build restores defaults.');
