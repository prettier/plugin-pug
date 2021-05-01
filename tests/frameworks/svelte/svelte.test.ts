import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../src/index';

describe('Frameworks', () => {
	describe('Svelte', () => {
		test('should format svelte', () => {
			const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],

				// @ts-expect-error
				pugFramework: 'svelte'
			});

			expect(actual).toBe(expected);
		});
	});
});
