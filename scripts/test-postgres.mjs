import { spawn } from 'node:child_process';

process.loadEnvFile('.cache/local.env');
const url = new URL(process.env.DATABASE_URL);
if (!['127.0.0.1', 'localhost'].includes(url.hostname) || url.port !== '55482')
  throw new Error('Disposable RPG database only');
const child = spawn(
  process.execPath,
  [
    'node_modules/vitest/vitest.mjs',
    'run',
    '--config',
    'vitest.product.config.ts',
    'tests/shutdown_character_saves_pg_integration.test.ts',
    'tests/character_save_statement_pg_integration.test.ts',
  ],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'test',
      RPG_WORLD: '',
      TEST_DATABASE_URL: process.env.DATABASE_URL,
    },
  },
);
child.on('exit', (code) => {
  process.exitCode = code ?? 1;
});
