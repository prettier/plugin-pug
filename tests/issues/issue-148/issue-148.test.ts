import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { describe, expect, test } from 'vitest';
import { plugin } from './../../../src/index';

describe('Issues', () => {
	test('should correctly format vue bracket interpolation with pugSingleFileComponentIndentation', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted.vue'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.vue'), 'utf8');
		const actual: string = format(code, {
			parser: 'vue',
			plugins: [plugin],

			pugSingleFileComponentIndentation: true
		});

		expect(actual).toBe(expected);
	});
});
