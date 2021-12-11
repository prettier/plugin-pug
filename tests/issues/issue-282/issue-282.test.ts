import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { describe, expect, test } from 'vitest';
import { plugin } from '../../../src/index';

describe('Issues', () => {
	test('should indent templates starting with literal class when using pugSingleFileComponentIndentation', () => {
		const expected: string = readFileSync(resolve(__dirname, 'class-indented.vue'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'class-not-indented.vue'), 'utf8');
		const actual: string = format(code, {
			parser: 'vue',
			plugins: [plugin],

			pugSingleFileComponentIndentation: true
		});

		expect(actual).toBe(expected);
	});

	test('should indent templates starting with literal ID when using pugSingleFileComponentIndentation', () => {
		const expected: string = readFileSync(resolve(__dirname, 'id-indented.vue'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'id-not-indented.vue'), 'utf8');
		const actual: string = format(code, {
			parser: 'vue',
			plugins: [plugin],

			pugSingleFileComponentIndentation: true
		});

		expect(actual).toBe(expected);
	});
});
