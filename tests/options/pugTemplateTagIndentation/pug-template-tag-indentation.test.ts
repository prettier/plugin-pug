import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../src/index';

describe('Options', () => {
	describe('pugTemplateTagIndentation', () => {
		test('should indent', () => {
			const expected: string = readFileSync(resolve(__dirname, 'indented.vue'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'not-indented.vue'), 'utf8');
			const actual: string = format(code, {
				parser: 'vue',
				plugins: [plugin],
				// @ts-expect-error
				pugTemplateTagIndentation: true
			});

			expect(actual).toBe(expected);
		});

		test('should not indent', () => {
			const expected: string = readFileSync(resolve(__dirname, 'not-indented.vue'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'indented.vue'), 'utf8');
			const actual: string = format(code, {
				parser: 'vue',
				plugins: [plugin],
				// @ts-expect-error
				pugTemplateTagIndentation: false
			});

			expect(actual).toBe(expected);
		});

		test('should not indent by default', () => {
			const expected: string = readFileSync(resolve(__dirname, 'not-indented.vue'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'indented.vue'), 'utf8');
			const actual: string = format(code, { parser: 'vue', plugins: [plugin] });

			expect(actual).toBe(expected);
		});

		test('should not affect markdown', () => {
			const expected: string = readFileSync(resolve(__dirname, 'not-indented.md'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'not-indented.md'), 'utf8');
			const actual: string = format(code, {
				parser: 'markdown',
				plugins: [plugin],
				// @ts-expect-error
				pugTemplateTagIndentation: true
			});

			expect(actual).toBe(expected);
		});
	});
});
