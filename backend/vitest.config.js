import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';

export default defineConfig(({ mode }) => ({
  test: {
    setupFiles: ['./tests/setup.js'],
    env: loadEnv(mode, process.cwd(), ''),
    coverage: {
      reporter: ['text', 'html'],
    },
  },
}));
