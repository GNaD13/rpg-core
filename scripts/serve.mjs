// Local static host plus REST/WS proxy to the original authoritative game server.
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
const root=resolve(import.meta.dirname,'../dist');
const icon='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><rect width="128" height="128" rx="18" fill="#244e48"/><circle cx="64" cy="64" r="30" fill="#cce5c1"/></svg>';
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.txt':'text/plain','.glb':'model/gltf-binary','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.ogg':'audio/ogg','.mp3':'audio/mpeg'};
const port=Number(process.env.PORT || 5182);
const apiTarget = new URL(process.env.GAME_SERVER_URL || 'http://127.0.0.1:8788');
function proxyUrl(raw) {
 const incoming=new URL(raw,'http://localhost');const target=new URL(apiTarget);
 target.pathname=incoming.pathname;target.search=incoming.search;return target;
}
function proxyHeaders(req) {
 const headers={...req.headers,host:apiTarget.host,'x-forwarded-for':req.socket.remoteAddress || '127.0.0.1','x-forwarded-proto':'http'};
 delete headers['x-real-ip'];delete headers['forwarded'];return headers;
}
const server = http.createServer(async(req,res)=>{
 let path;
 try { path=decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch {res.writeHead(400);res.end();return;}
 res.setHeader('Cache-Control','no-store');
 res.setHeader('Content-Security-Policy',"default-src 'self' data: blob:; script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' blob:; style-src 'self' 'unsafe-inline'; connect-src 'self' blob:; img-src 'self' data: blob:; worker-src 'self' blob:");
 if(['/api/', '/admin/api/', '/oauth/', '/internal/'].some(prefix => path.startsWith(prefix))) {
  const upstream = http.request(proxyUrl(req.url), {method:req.method,headers:proxyHeaders(req)}, response => {
   res.writeHead(response.statusCode || 502, response.headers); response.pipe(res);
  });
  upstream.on('error', () => { if(!res.headersSent) res.writeHead(502,{'Content-Type':'application/json'}); res.end('{"error":"game_server_unavailable"}'); });
  req.pipe(upstream);return;
 }
 const file=resolve(root,'.'+(['/', '/play', '/index.html'].includes(path)?'/index.html':path === '/editor' ? '/editor.html' : path === '/admin' ? '/admin.html' :path));
 if(!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
 try {const bytes=await readFile(file);res.setHeader('Content-Type',types[extname(file)]||'application/octet-stream');res.end(bytes);}
 catch {
  // Legacy art requests receive NEW geometric placeholders only. Missing owned assets must fail visibly.
  if(!path.startsWith('/assets/') && /\.(webp|png|jpe?g|svg|ico)$/i.test(path)){res.setHeader('Content-Type','image/svg+xml');res.end(icon);return;}
  if(!path.startsWith('/assets/') && /\.(mp3|ogg|wav|mp4)$/i.test(path)){res.writeHead(204);res.end();return;}
  res.writeHead(404);res.end('Not found');
 }
});
server.on('upgrade', (req, socket, head) => {
 if(new URL(req.url,'http://localhost').pathname !== '/ws') { socket.destroy();return; }
 const upstream = http.request(proxyUrl(req.url), {headers:proxyHeaders(req)});
 upstream.on('upgrade',(response, peer, peerHead) => {
  socket.write('HTTP/1.1 101 Switching Protocols\r\n' + Object.entries(response.headers).map(([k,v])=>`${k}: ${v}`).join('\r\n') + '\r\n\r\n');
  if(peerHead.length) socket.write(peerHead);
  if(head.length) peer.write(head);
  peer.pipe(socket);socket.pipe(peer);
  peer.on('error',()=>socket.destroy()); socket.on('error',()=>peer.destroy());
  peer.on('close',()=>socket.destroy()); socket.on('close',()=>peer.destroy());
 });
 upstream.on('response', response => {socket.end(`HTTP/1.1 ${response.statusCode || 502} Rejected\r\nConnection: close\r\nContent-Length: 0\r\n\r\n`);response.resume();});
 upstream.on('error',()=>socket.destroy());socket.on('close',()=>upstream.destroy());upstream.end();
});
server.listen(port,'127.0.0.1',()=>console.log(`RPG Core: http://127.0.0.1:${port} -> ${apiTarget.origin}`));
