import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../../src/index';

describe('Options', () => {
	describe('attributeSeparator', () => {
		test('should always insert commas between attributes', () => {
			const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],
				// The `.length-test` elements are tested against a `printWidth` of 80 (currently also the default):
				printWidth: 80,
				// @ts-expect-error
				attributeSeparator: 'always'
			});

			expect(actual).toBe(expected);
		});
		test('should always insert commas between attributes by default', () => {
			const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
			const actual: string = format(code, { parser: 'pug', plugins: [plugin] });

			expect(actual).toBe(expected);
		});
	});
});
