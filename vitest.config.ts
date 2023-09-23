import { resolve } from 'node:path';
import { URL, fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const __dirname: string = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      src: resolve(__dirname, './src'),
      tests: resolve(__dirname, './tests'),
    },
  },
});
