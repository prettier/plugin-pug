import { afterEach, describe, expect, test } from 'vitest';
import { detectFramework } from '../../src/utils/common';

describe('Frameworks', () => {
  describe('Detection', () => {
    const backupProcessEnv: Record<string, string | undefined> = process.env;

    afterEach(() => {
      process.env = { ...backupProcessEnv };
    });

    test('should fallback to auto if no framework detected via process.env', () => {
      expect(detectFramework()).toBe('auto');
    });
    test('should detect vue from process.env', () => {
      process.env.npm_package_dependencies_vue = 'some version';
      expect(detectFramework()).toBe('vue');
    });
    test('should detect svelte from process.env', () => {
      process.env.npm_package_devDependencies_svelte = 'some version';
      expect(detectFramework()).toBe('svelte');
    });
    test('should detect angular from process.env', () => {
      process.env.npm_package_dependencies__angular_core = 'some version';
      expect(detectFramework()).toBe('angular');
    });
  });
});
