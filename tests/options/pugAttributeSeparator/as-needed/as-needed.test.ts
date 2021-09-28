import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../../src/index';

describe('Options', () => {
	describe('attributeSeparator', () => {
		test('should insert commas between attributes as-needed', () => {
			const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],
				// The `.length-test` elements are tested against a `printWidth` of 80 (currently also the default):
				printWidth: 80,
				// @ts-expect-error
				pugAttributeSeparator: 'as-needed'
			});

			expect(actual).toBe(expected);
		});
	});
});
