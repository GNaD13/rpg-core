import { randomBytes } from 'node:crypto';
import { access, mkdir, writeFile } from 'node:fs/promises';

await mkdir('.cache', { recursive: true });
try {
  await access('.cache/local.env');
} catch {
  const password = randomBytes(24).toString('hex');
  await writeFile(
    '.cache/local.env',
    `NODE_ENV=development\nRPG_WORLD=placeholder\nREALM_NAME=RPGLocal\nPORT=8788\nHOST=127.0.0.1\nRPG_DB_PORT=55482\nRPG_POSTGRES_PASSWORD=${password}\nDATABASE_URL=postgres://rpg_admin:${password}@127.0.0.1:55482/rpg_core\nALLOW_DEV_COMMANDS=0\nREQUIRE_WEB_LOGIN=0\nWALLET_ENABLED=0\nWOC_MARKET_ENABLED=0\n`,
    { mode: 0o600 },
  );
  console.log('Created ignored local environment for isolated RPG Core database.');
}
