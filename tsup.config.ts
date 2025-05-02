import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  clean: true,
  format: 'esm',
  target: 'node20',
  dts: true,
  minify: true,
  sourcemap: true,
});
