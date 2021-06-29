import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from '../../../src/index';

describe('Options', () => {
	describe('pugExplicitDiv', () => {
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		const commonOpts = {
			parser: 'pug',
			plugins: [plugin],
			// use this common options in all tests to force specific wrapping
			pugAttributeSeparator: 'none',
			pugPrintWidth: 80,
		}

		test('should handle unspecified pugExplicitDiv', () => {
			const expected: string = readFileSync(resolve(__dirname, 'formatted-implicit-div.pug'), 'utf8');
			const actual: string = format(code, {
				...commonOpts,
			});

			expect(actual).toBe(expected);
		});

		test('should handle pugExplicitDiv:false', () => {
			const expected: string = readFileSync(resolve(__dirname, 'formatted-implicit-div.pug'), 'utf8');
			const actual: string = format(code, {
				...commonOpts,
				// @ts-expect-error
				pugExplicitDiv: false,
			});

			expect(actual).toBe(expected);
		});

		test('should handle pugExplicitDiv:true', () => {
			const expected: string = readFileSync(resolve(__dirname, 'formatted-explicit-div.pug'), 'utf8');
			const actual: string = format(code, {
				...commonOpts,
				// @ts-expect-error
				pugExplicitDiv: true,
			});

			expect(actual).toBe(expected);
		});
	});
});
