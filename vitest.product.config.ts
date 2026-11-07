import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
export default defineConfig({
  resolve: {
    alias: {
      '#bot-detector': fileURLToPath(new URL('./server/bot_detector/stub.ts', import.meta.url)),
    },
  },
  test: {
    environment: 'node',
    setupFiles: ['./tests/product-test-setup.ts', './tests/jsdom_local_storage_setup.ts'],
    env: {
      RPG_WORLD: '',
      DATABASE_URL: process.env.DATABASE_URL || 'postgres://test:test@127.0.0.1:55482/rpg_core',
    },
    maxWorkers: 2,
    include: ['tests/**/*.test.ts'],
    testTimeout: 30000,
  },
});
