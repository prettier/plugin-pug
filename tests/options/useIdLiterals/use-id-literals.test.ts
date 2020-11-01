import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../src/index';

describe('Options', () => {
	describe('useIdLiterals', () => {
		test('should keep classes as attribute', () => {
			const expected: string = readFileSync(resolve(__dirname, 'formatted-attribute.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted-attribute.pug'), 'utf8');
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],
				// @ts-expect-error
				pugUseClassLiterals: false
			});

			expect(actual).toBe(expected);
		});
		test('should keep classes as literals', () => {
			const expected: string = readFileSync(resolve(__dirname, 'formatted-literal.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted-literal.pug'), 'utf8');
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],
				// @ts-expect-error
				pugUseClassLiterals: true
			});

			expect(actual).toBe(expected);
		});
		test('should keep classes as literals by default', () => {
			const expected: string = readFileSync(resolve(__dirname, 'formatted-literal.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted-literal.pug'), 'utf8');
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin]
			});

			expect(actual).toBe(expected);
		});
	});
});
