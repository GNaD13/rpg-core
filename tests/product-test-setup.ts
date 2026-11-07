// Node 20 has no global WebSocket; preserve the writable global expected by upstream harnesses.
import WebSocket from 'ws';

if (typeof globalThis.WebSocket === 'undefined') {
  Object.defineProperty(globalThis, 'WebSocket', {
    value: WebSocket,
    writable: true,
    configurable: true,
  });
}
