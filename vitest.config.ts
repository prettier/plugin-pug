import { resolve } from 'node:path';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: resolve(import.meta.dirname, './src'),
      tests: resolve(import.meta.dirname, './tests'),
    },
  },
  test: {
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['clover', 'cobertura', 'json-summary', 'json', 'lcov', 'text'],
      include: ['src'],
      reportOnFailure: true,
      thresholds: {
        lines: 90,
        statements: 90,
        functions: 90,
        branches: 90,
      },
    },
    reporters: process.env.CI_PREFLIGHT
      ? ['default', 'github-actions']
      : [['default', { summary: false }]],
  },
});
