import { build } from 'esbuild';
import { readFile, writeFile, copyFile, mkdir } from 'node:fs/promises';
await mkdir('dist',{recursive:true});
await build({entryPoints:['src/editor/main.ts'],bundle:true,splitting:true,format:'esm',platform:'browser',outdir:'dist',entryNames:'editor',chunkNames:'chunks/[name]-[hash]',external:['/models/*','/textures/*','/ui/*','/env/*','/fonts/*'],define:{'import.meta.env':JSON.stringify({DEV:true,PROD:false,BASE_URL:'/',MODE:'development',VITE_WALLET_DISABLED:'1',VITE_DISCORD_DISABLED:'1'}),'__APP_VERSION__':'"0.1.0"','__APP_BUILD_ID__':'"rpg-core"','__APP_BUILD_DATE__':JSON.stringify(new Date().toISOString().slice(0,10))},logLevel:'warning'});
let html=await readFile('editor.html','utf8');
html=html.replace('src="/src/editor/main.ts"','src="/editor.js"').replace('href="/src/styles/fonts.css"','href="/fonts.css"').replace('</head>','<link rel="stylesheet" href="/editor.css"></head>');
await writeFile('dist/editor.html',html);await copyFile('src/styles/fonts.css','dist/fonts.css');
