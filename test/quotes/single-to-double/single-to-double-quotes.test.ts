import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../src/index';

describe('Quotes', () => {
	test('should format single to double quotes', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf-8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf-8');
		const actual: string = format(code, {
			parser: 'pug' as any,
			plugins: [plugin]
		});

		expect(actual).toBe(expected);
	});
});
