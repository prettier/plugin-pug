import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from '../../../src/index';

describe('Frameworks', () => {
	const consoleSpy: jest.SpyInstance<void, Parameters<Console['warn']>> = jest.spyOn(console, 'warn');

	describe('formatText:warnings', () => {
		beforeEach(() => {
			consoleSpy.mockClear();
		});

		test("should warn for 'Bindings should not contain assignments'", () => {
			const code: string = readFileSync(
				resolve(__dirname, 'bindings-should-not-contain-assignments.pug'),
				'utf8'
			);
			format(code, { parser: 'pug', plugins: [plugin] });
			const expected: string[] = [
				'[PugPrinter:formatText]: Bindings should not contain assignments:',
				'code: `...`'
			];
			expect(consoleSpy).toHaveBeenCalledTimes(1);
			expect(consoleSpy).toHaveBeenLastCalledWith(...expected);
			expect(consoleSpy.mock.calls).toEqual([expected]);
		});

		test("should warn for 'Unexpected token '(''", () => {
			const code: string = readFileSync(
				resolve(__dirname, 'found-unexpected-token-open-parentheses.pug'),
				'utf8'
			);
			format(code, {
				parser: 'pug',
				plugins: [plugin],

				// @ts-expect-error
				pugFramework: 'angular'
			});
			const expected: string[] = [
				'[PugPrinter:formatText]: Found unexpected token `(`.',
				'code: `issueDate | dateFormat("DD MMM YYYY")`'
			];
			expect(consoleSpy).toHaveBeenCalledTimes(1);
			expect(consoleSpy).toHaveBeenLastCalledWith(...expected);
			expect(consoleSpy.mock.calls).toEqual([expected]);
		});

		test("should warn for 'Missing expected `)`'", () => {
			const code: string = readFileSync(resolve(__dirname, 'missing-expected-close-parentheses.pug'), 'utf8');
			format(code, {
				parser: 'pug',
				plugins: [plugin],

				// @ts-expect-error
				pugFramework: 'angular'
			});
			const expected: string[] = ['[PugPrinter:formatText]: Missing expected `)`.', 'code: `...`'];
			expect(consoleSpy).toHaveBeenCalledTimes(1);
			expect(consoleSpy).toHaveBeenLastCalledWith(...expected);
			expect(consoleSpy.mock.calls).toEqual([expected]);
		});

		test("should warn for 'Missing expected `:`'", () => {
			const code: string = readFileSync(resolve(__dirname, 'missing-expected-colon.pug'), 'utf8');
			format(code, {
				parser: 'pug',
				plugins: [plugin],

				// @ts-expect-error
				pugFramework: 'angular'
			});
			const expected: string[] = ['[PugPrinter:formatText]: Missing expected `:`.', 'code: `...`'];
			expect(consoleSpy).toHaveBeenCalledTimes(1);
			expect(consoleSpy).toHaveBeenLastCalledWith(...expected);
			expect(consoleSpy.mock.calls).toEqual([expected]);
		});
	});
});
