import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { describe, expect, test } from 'vitest';
import { plugin } from './../../src/index';

describe('Indents', () => {
	test('should indent by default with 2 spaces', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted-2-spaces.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		const actual: string = format(code, { parser: 'pug', plugins: [plugin] });

		expect(actual).toBe(expected);
	});
	test('should indent with 2 spaces', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted-2-spaces.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		const actual: string = format(code, { parser: 'pug', plugins: [plugin], tabWidth: 2 });

		expect(actual).toBe(expected);
	});
	test('should indent with 3 spaces', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted-3-spaces.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		const actual: string = format(code, { parser: 'pug', plugins: [plugin], tabWidth: 3 });

		expect(actual).toBe(expected);
	});
	test('should indent with 4 spaces', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted-4-spaces.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		const actual: string = format(code, { parser: 'pug', plugins: [plugin], tabWidth: 4 });

		expect(actual).toBe(expected);
	});
	test('should indent with tabs', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted-tabs.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		const actual: string = format(code, { parser: 'pug', plugins: [plugin], useTabs: true });

		expect(actual).toBe(expected);
	});
});
