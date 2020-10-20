import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../../src/index';

describe('Options', () => {
	describe('closingBracketPosition', () => {
		test('should closing bracket of attributes ends with a new line', () => {
			const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],
				// @ts-expect-error
				closingBracketPosition: 'new-line'
			});

			expect(actual).toBe(expected);
		});
		test('should closing bracket of attributes ends with a new line by default', () => {
			const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
			const actual: string = format(code, { parser: 'pug', plugins: [plugin] });

			expect(actual).toBe(expected);
		});
	});
});
