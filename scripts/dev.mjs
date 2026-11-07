// One local stack, original server lifecycle. SIGINT/SIGTERM request graceful saves.
import { spawn } from 'node:child_process';

await import('./local-env.mjs');
process.loadEnvFile('.cache/local.env');
function run(command, args, env = process.env) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', env });
    child.once('error', reject);
    child.once('exit', (code) =>
      code === 0 ? resolve() : reject(new Error(`${command} exited ${code}`)),
    );
  });
}
await run('docker', [
  'compose',
  '-p',
  'rpg-core-local',
  '-f',
  'compose.local.yml',
  '--env-file',
  '.cache/local.env',
  'up',
  '-d',
  '--wait',
  'postgres',
]);
await import('./build.mjs');
await import('./build_server.mjs');
await import('./build-editor.mjs');
await run('pnpm', ['build:admin']);
const children = [
  spawn(process.execPath, ['dist-server/server.cjs'], { stdio: 'inherit', env: process.env }),
  spawn(process.execPath, ['scripts/serve.mjs'], {
    stdio: 'inherit',
    env: { ...process.env, PORT: '5182', GAME_SERVER_URL: 'http://127.0.0.1:8788' },
  }),
];
let stopping = false;
function stop(signal = 'SIGTERM') {
  if (stopping) return;
  stopping = true;
  for (const child of children) child.kill(signal);
}
process.once('SIGINT', () => stop('SIGINT'));
process.once('SIGTERM', () => stop());
for (const child of children)
  child.once('error', (error) => {
    console.error(error.message);
    process.exitCode = 1;
    stop();
  });
await Promise.all(
  children.map(
    (child) =>
      new Promise((resolve) =>
        child.once('exit', (code) => {
          if (!stopping) {
            process.exitCode = code || 1;
            stop();
          }
          resolve();
        }),
      ),
  ),
);
