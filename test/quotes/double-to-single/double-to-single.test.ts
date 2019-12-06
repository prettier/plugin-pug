import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../src/index';

describe('Quotes', () => {
	test('should format double to single quotes', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		const actual: string = format(code, {
			parser: 'pug' as any,
			plugins: [plugin],
			//@ts-ignore
			attributeSingleQuote: true
		});

		expect(actual).toBe(expected);
	});
});
