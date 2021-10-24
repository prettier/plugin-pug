import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../src/index';

describe('Options', () => {
	describe('bracketSameLine', () => {
		test('should handle bracketSameLine:true', () => {
			const expected: string = readFileSync(resolve(__dirname, 'same-line.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],
				bracketSameLine: true
			});

			expect(actual).toBe(expected);
		});

		test('should handle pugBracketSameLine:true', () => {
			const expected: string = readFileSync(resolve(__dirname, 'same-line.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],

				pugBracketSameLine: true
			});

			expect(actual).toBe(expected);
		});

		test('should handle bracketSameLine:false', () => {
			const expected: string = readFileSync(resolve(__dirname, 'new-line.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],
				bracketSameLine: false
			});

			expect(actual).toBe(expected);
		});

		test('should handle pugBracketSameLine:false', () => {
			const expected: string = readFileSync(resolve(__dirname, 'new-line.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],

				pugBracketSameLine: false
			});

			expect(actual).toBe(expected);
		});

		test('should handle default', () => {
			const expected: string = readFileSync(resolve(__dirname, 'new-line.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
			const actual: string = format(code, { parser: 'pug', plugins: [plugin] });

			expect(actual).toBe(expected);
		});
	});
});
