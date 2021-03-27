import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../src/index';

describe('Interpolations', () => {
	test('should handle Neutral interpolations', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted_none.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted_none.pug'), 'utf8');
		const actual: string = format(code, { parser: 'pug', plugins: [plugin] });

		expect(actual).toBe(expected);
	});
	test('should handle Angular interpolations', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted_angular.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted_angular.pug'), 'utf8');
		const actual: string = format(code, {
			parser: 'pug',
			plugins: [plugin],
			// @ts-expect-error
			pugFramework: 'angular'
		});

		expect(actual).toBe(expected);
	});
	test('should handle Vue interpolations', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted_vue.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted_vue.pug'), 'utf8');
		const actual: string = format(code, {
			parser: 'pug',
			plugins: [plugin],
			// @ts-expect-error
			pugFramework: 'vue'
		});

		expect(actual).toBe(expected);
	});
});
