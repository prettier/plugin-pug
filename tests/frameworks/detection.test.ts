import { detectFramework } from '../../src/utils/common';

describe('Frameworks', () => {
	describe('Detection', () => {
		const backupProcessEnv: Record<string, string | undefined> = process.env;

		beforeEach(() => {
			process.env = { ...backupProcessEnv };
		});

		test('should fallback to none if no framework detected via process.env', () => {
			expect(detectFramework()).toBe('none');
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
