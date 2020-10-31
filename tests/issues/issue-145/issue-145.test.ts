import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../src/index';

describe('Issues', () => {
	test('should preserve multi-root nodes', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		const actual: string = format(code, { parser: 'pug', plugins: [plugin] });

		expect(actual).toBe(expected);
	});

	test('should preserve multi-root nodes with pugSingleFileComponentIndentation', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted.vue'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.vue'), 'utf8');
		const actual: string = format(code, {
			parser: 'vue',
			plugins: [plugin],
			// @ts-expect-error
			pugSingleFileComponentIndentation: true
		});

		expect(actual).toBe(expected);
	});

	test('should preserve multi-root nodes with pugSingleFileComponentIndentation for extends', () => {
		const expected: string = readFileSync(resolve(__dirname, 'extends-formatted.vue'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'extends-unformatted.vue'), 'utf8');
		const actual: string = format(code, {
			parser: 'vue',
			plugins: [plugin],
			tabWidth: 4,
			// @ts-expect-error
			pugSingleFileComponentIndentation: true
		});

		expect(actual).toBe(expected);
	});
});
