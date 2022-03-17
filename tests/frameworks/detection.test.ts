import { detectFramework } from 'src/utils/common';
import { afterEach, describe, expect, it } from 'vitest';

describe('Frameworks', () => {
  describe('Detection', () => {
    const backupProcessEnv: Record<string, string | undefined> = process.env;

    afterEach(() => {
      process.env = { ...backupProcessEnv };
    });

    it('should fallback to auto if no framework detected via process.env', () => {
      expect(detectFramework()).toBe('auto');
    });

    it('should detect vue from process.env', () => {
      process.env.npm_package_dependencies_vue = 'some version';
      expect(detectFramework()).toBe('vue');
    });

    it('should detect svelte from process.env', () => {
      process.env.npm_package_devDependencies_svelte = 'some version';
      expect(detectFramework()).toBe('svelte');
    });

    it('should detect angular from process.env', () => {
      process.env.npm_package_dependencies__angular_core = 'some version';
      expect(detectFramework()).toBe('angular');
    });
  });
});
