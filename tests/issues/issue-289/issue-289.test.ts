import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../src/index';

describe('Issues', () => {
	test('should handle vue slot shorthand syntax', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		const actual: string = format(code, { parser: 'pug', plugins: [plugin] });

		expect(actual).toBe(expected);
	});

	test('should handle vue slot shorthand syntax in vue file', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted.vue'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.vue'), 'utf8');
		const actual: string = format(code, {
			parser: 'vue',
			plugins: [plugin],
			printWidth: 120,
			singleQuote: true,
			trailingComma: 'all',

			pugAttributeSeparator: 'none',
			pugFramework: 'vue',
			pugSingleFileComponentIndentation: true,
			pugSingleQuote: false
		});

		expect(actual).toBe(expected);
	});
});
