import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../src/index';

describe('Issues', () => {
	test('should escape quotes correctly', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		const actual: string = format(code, {
			parser: 'pug',
			plugins: [plugin],

			printWidth: 120,
			tabWidth: 2,
			useTabs: false,
			singleQuote: false,
			bracketSpacing: true
		});

		expect(actual).toBe(expected);
	});
});
