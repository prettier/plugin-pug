import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { parsers, plugin } from './../../../../src/index';

describe('Options', () => {
	describe('attributeSeparator', () => {
		test('should never insert commas between attributes', () => {
			const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],
				// The `.length-test` elements are tested against a `printWidth` of 80 (currently also the default):
				printWidth: 80,
				// @ts-expect-error
				pugAttributeSeparator: 'none'
			});

			expect(actual).toBe(expected);
		});
		test("should work with 'none' option and angular syntax, but produce invalid output", () => {
			const expected: string = readFileSync(resolve(__dirname, 'angular-formatted.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'angular-unformatted.pug'), 'utf8');
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],
				// @ts-expect-error
				pugAttributeSeparator: 'none'
			});
			expect(actual).toBe(expected);
			expect(() => {
				// ts-jest needs the exclamation mark, so it does not have the impression that the variables are undefined
				/* eslint @typescript-eslint/no-non-null-assertion: off */
				parsers!.pug!.parse(actual, parsers!, null!);
			}).toThrow('Assigning to rvalue');
		});
	});
});
