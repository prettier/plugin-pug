import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../src/index';

describe('Issues', () => {
	test('should not break attribute wrapping in interpolated tags', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		const actual: string = format(code, {
			parser: 'pug',
			plugins: [plugin],

			arrowParens: 'avoid',
			bracketSpacing: true,
			endOfLine: 'lf',
			printWidth: 80,
			semi: false,
			singleQuote: true,
			trailingComma: 'es5',

			// @ts-expect-error
			pugAttributeSeparator: 'always',
			pugClosingBracketPosition: 'new-line',
			pugSingleQuote: false,
			pugSortAttributes: 'asc',
			pugWrapAttributesPattern: '0',
			pugWrapAttributesThreshold: 1
		});

		expect(actual).toBe(expected);
	});
});
