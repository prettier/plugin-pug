import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../src/index';

describe('Issues', () => {
	test('should ignore escaping chars in vue prop', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		const actual: string = format(code, {
			plugins: [plugin],
			arrowParens: 'avoid',
			singleQuote: true,
			tabWidth: 4,
			parser: 'pug'
		});

		expect(actual).toBe(expected);
	});
});
