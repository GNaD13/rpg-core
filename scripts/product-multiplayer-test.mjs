// Test-only HTTP + WebSocket check of the original server. Refuses remote targets.
import assert from 'node:assert/strict';
import { randomBytes } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import WebSocket from 'ws';
import { worldAuthMessage } from './lib/world_auth.mjs';
const BASE=process.env.SERVER_URL || 'http://127.0.0.1:5182';
if(!['127.0.0.1','localhost'].includes(new URL(BASE).hostname)) throw new Error('Local disposable server only');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function api(path,body,token) {
 const response=await fetch(BASE+path,{method:body?'POST':'GET',headers:{'Content-Type':'application/json',...(token?{Authorization:`Bearer ${token}`}:{})},...(body?{body:JSON.stringify(body)}:{})});
 return {status:response.status,data:await response.json()};
}
const DELTA_SELF_KEYS = [
  'inv',
  'equip',
  'qlog',
  'qdone',
  'cds',
  'stats',
  'weapon',
  'party',
  'trade',
  'duel',
];
function mergeSelf(prev, next) {
  if (prev) for (const k of DELTA_SELF_KEYS) if (!(k in next)) next[k] = prev[k];
  return next;
}

// entity identity fields ride only in "full" records (first sight and
// changes); "lite" records inherit them from the previous state. Ids in
// snap.keep are alive but unchanged; anything absent from both is gone.
const ENTITY_IDENTITY_KEYS = ['k', 'tid', 'nm', 'lv', 'sc', 'c', 'dgn'];
function mergeEnts(prevEnts, snap) {
  const next = new Map();
  for (const w of snap.ents) {
    const prev = prevEnts.get(w.id);
    if (prev && w.k === undefined) {
      for (const key of ENTITY_IDENTITY_KEYS) if (key in prev) w[key] = prev[key];
    }
    next.set(w.id, w);
  }
  for (const id of snap.keep ?? []) {
    const prev = prevEnts.get(id);
    if (prev) next.set(id, prev);
  }
  return next;
}

class Client {
  constructor() {
    this.snapshots = [];
    this.events = [];
    this.self = null;
    this.pid = -1;
    this.entities = new Map();
  }

  connect(token, characterId) {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(`${BASE.replace(/^http/,'ws')}/ws`);
      const timeout = setTimeout(() => reject(new Error('connect timeout')), 8000);
      this.ws.on('open', () => {
        this.send(worldAuthMessage(token, characterId));
      });
      this.ws.on('message', (data) => {
        const msg = JSON.parse(String(data));
        if (msg.t === 'hello') {
          this.pid = msg.pid;
          clearTimeout(timeout);
          resolve(msg);
        } else if (msg.t === 'snap') {
          this.self = mergeSelf(this.self, msg.self);
          this.entities = mergeEnts(this.entities, msg);
          this.entities.set(this.self.id, this.self);
        } else if (msg.t === 'events') {
          this.events.push(...msg.list);
        } else if (msg.t === 'error') {
          clearTimeout(timeout);
          reject(new Error(msg.error));
        }
      });
      this.ws.on('error', (e) => {
        clearTimeout(timeout);
        reject(e);
      });
    });
  }

  send(obj) {
    this.ws.send(JSON.stringify(obj));
  }
  cmd(payload) {
    this.send({ t: 'cmd', ...payload });
  }
  input(mi, facing) {
    this.send({ t: 'input', mi, ...(facing !== undefined ? { facing } : {}) });
  }
  close() {
    this.ws?.close();
  }
}


const sockets=[];
async function connect(token,id) {const c=new Client();sockets.push(c);await c.connect(token,id);return c;}
async function waitFor(predicate,label) {for(let i=0;i<100;i++){if(predicate())return;await sleep(100);}throw new Error(label);}
async function provision(index) {
 const suffix=randomBytes(5).toString('hex');const username=`rpg_${suffix}_${index}`;
 const password=randomBytes(18).toString('hex');
 const result=await api('/api/register',{username,password,email:`${username}@example.invalid`});
 assert.equal(result.status,200,`register status ${result.status}`);
 const login=await api('/api/login',{username,password});assert.equal(login.status,200);
 const alpha=suffix.replace(/[0-9]/g,d=>'abcdefghij'[Number(d)]);
 const name=(index===1?'Raven':'Willow')+alpha;
 const created=await api('/api/characters',{name,class:index===1?'warrior':'mage',skin:0},login.data.token);
 assert.equal(created.status,200,`character status ${created.status}`);
 return {username,password,token:login.data.token,id:created.data.id,name};
}
try {
 if(process.argv.includes('--verify-restart')) {
  const saved=JSON.parse(await readFile('.cache/mp-session.json','utf8'));
  const a=await connect(saved.a.token,saved.a.id);await waitFor(()=>a.self,'restart snapshot');
  assert(Math.hypot(a.self.x-saved.pos.x,a.self.z-saved.pos.z)<.2,'saved position survived restart');
  console.log('PASS: real server restart restored persisted character position');
 } else {
  assert.equal((await api('/api/characters')).status,401);
  const aCred=await provision(1), bCred=await provision(2);
  const a=await connect(aCred.token,aCred.id),b=await connect(bCred.token,bCred.id);
  await waitFor(()=>a.entities.has(b.pid)&&b.entities.has(a.pid),'mutual visibility');
  assert.notEqual(a.pid,b.pid);
  const start={...b.entities.get(a.pid)};
  a.input({f:1},0);await sleep(600);a.input({});
  await waitFor(()=>Math.hypot(b.entities.get(a.pid).x-start.x,b.entities.get(a.pid).z-start.z)>1,'movement replicated');
  await sleep(200);const pos={x:a.self.x,z:a.self.z};
  const bad=new Client();sockets.push(bad);
  await assert.rejects(bad.connect(bCred.token,aCred.id));bad.close();
  const oldPid=a.pid;a.ws.terminate();await sleep(250);
  const resumed=await connect(aCred.token,aCred.id);await waitFor(()=>resumed.self,'resume snapshot');
  assert.equal(resumed.pid,oldPid,'linkdead resumes same entity');
  assert(Math.hypot(resumed.self.x-pos.x,resumed.self.z-pos.z)<.2);
  // Invoke existing authenticated takeover/leave to force the normal durable save path.
  resumed.close();b.close();await sleep(150);
  assert.equal((await api(`/api/characters/${aCred.id}/takeover`,{},aCred.token)).status,200);
  const rejoined=await connect(aCred.token,aCred.id);await waitFor(()=>rejoined.self,'rejoin');
  assert(Math.hypot(rejoined.self.x-pos.x,rejoined.self.z-pos.z)<.2);
  await writeFile('.cache/mp-session.json',JSON.stringify({a:aCred,b:bCred,pos}),{mode:0o600});
  console.log('PASS: register/login/create, two players, mutual visibility, authoritative movement, ownership rejection, reconnect, leave/save/rejoin');
 }
} finally {for(const c of sockets)c.ws?.terminate();}
