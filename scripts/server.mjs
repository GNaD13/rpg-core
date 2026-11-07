import { existsSync } from 'node:fs';

// Production normally supplies DATABASE_URL directly. Local startup uses only this project's env.
if (!process.env.DATABASE_URL && existsSync('.cache/local.env'))
  process.loadEnvFile('.cache/local.env');
await import('./check-assets.mjs');
await import('./build_server.mjs');
const { spawn } = await import('node:child_process');
const child = spawn(process.execPath, ['dist-server/server.cjs'], {
  stdio: 'inherit',
  env: process.env,
});
process.once('SIGINT', () => child.kill('SIGINT'));
process.once('SIGTERM', () => child.kill('SIGTERM'));
child.once('exit', (code) => {
  process.exitCode = code ?? 1;
});
