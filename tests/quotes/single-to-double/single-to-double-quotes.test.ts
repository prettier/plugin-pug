import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../src/index';

describe('Quotes', () => {
	test('should format single to double quotes', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		const actual: string = format(code, { parser: 'pug', plugins: [plugin], singleQuote: false });

		expect(actual).toBe(expected);
	});
	test('should use double quotes by default', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		const actual: string = format(code, { parser: 'pug', plugins: [plugin] });

		expect(actual).toBe(expected);
	});
});
