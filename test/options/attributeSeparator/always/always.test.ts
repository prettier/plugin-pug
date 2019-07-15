import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../../src/index';

describe('Options', () => {
	describe('attributeSeparator', () => {
		test('should always insert commas between attriutes', () => {
			const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
			const actual: string = format(code, {
				parser: 'pug' as any,
				plugins: [plugin],
				// @ts-ignore
				attributeSeparator: 'always'
			});

			expect(actual).toBe(expected);
		});
		test('should always insert commas between attriutes by default', () => {
			const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
			const actual: string = format(code, { parser: 'pug' as any, plugins: [plugin] });

			expect(actual).toBe(expected);
		});
	});
});
