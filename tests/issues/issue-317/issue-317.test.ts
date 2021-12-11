import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { describe, expect, test } from 'vitest';
import { plugin } from './../../../src/index';

describe('Issues', () => {
	test('should respect printWidth and pugClassLocation with pugSortAttributesEnd', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		const actual: string = format(code, {
			parser: 'pug',
			plugins: [plugin],

			printWidth: 120,

			pugSortAttributesEnd: ['^@click'],
			pugClassLocation: 'after-attributes'
		});

		expect(actual).toBe(expected);
	});

	test('should keep same format after two runs with printWidth and pugClassLocation', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		const run1: string = format(code, {
			parser: 'pug',
			plugins: [plugin],

			printWidth: 120,

			pugClassLocation: 'after-attributes'
		});

		const run2: string = format(run1, {
			parser: 'pug',
			plugins: [plugin],

			printWidth: 120,

			pugClassLocation: 'after-attributes'
		});

		expect(run2).toBe(expected);
	});
});
