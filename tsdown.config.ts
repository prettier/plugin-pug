import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  clean: true,
  format: 'esm',
  platform: 'node',
  target: 'node22',
  fixedExtension: false,
  dts: { sourcemap: true },
  minify: true,
  sourcemap: true,
});
