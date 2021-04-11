import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from '../../../src/index';

/**
 * Mocked console.warn calls.
 */
type Call = Parameters<Console['warn']>;

const DEFAULT_LOG_PREFIX: string = '[PugPrinter:formatText]: ';

/**
 * Return all warning messages.
 *
 * @param calls `console.warn` calls.
 * @param logPrefix Prefix of the log message.
 * @returns Return array of warning messages.
 */
function getFormatWarnings(calls: Call[], logPrefix: string = DEFAULT_LOG_PREFIX): string[] {
	return calls
		.map((params) => params.join(''))
		.filter((message) => typeof message === 'string' && message.startsWith(logPrefix))
		.map((message) => message.slice(logPrefix.length));
}

describe('Frameworks', () => {
	describe('Angular', () => {
		test('should warn for missing parentheses', () => {
			// this test is not completed yet
			const consoleSpy: jest.SpyInstance<void, Call> = jest.spyOn(console, 'warn');
			const code: string = readFileSync(resolve(__dirname, 'missing-expected-close-parentheses.pug'), 'utf8');
			format(code, {
				parser: 'pug',
				plugins: [plugin],

				// @ts-expect-error
				pugFramework: 'angular'
			});
			const expected: string = 'SyntaxError: Missing expected )\n';
			const thrownWarnings: string[] = getFormatWarnings(consoleSpy.mock.calls);
			const hasWarning: boolean = thrownWarnings.some((warning) => warning.startsWith(expected));

			expect(hasWarning).toBe(true);
		});
	});
});
