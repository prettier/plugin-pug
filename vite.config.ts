/// <reference types="vitest" />
import { resolve } from 'node:path';
import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname: string = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      // Needed for vitest
      src: resolve(__dirname, './src'),
      tests: resolve(__dirname, './tests'),
    },
  },
});
