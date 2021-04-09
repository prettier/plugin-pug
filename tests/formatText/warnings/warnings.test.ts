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
		.map(
			([message]) =>
				// Assume the first argument is of type string, we filter it anyways in the next line
				message as string
		)
		.filter((message) => typeof message === 'string' && message.startsWith(logPrefix))
		.map((message) => message.slice(logPrefix.length));
}

describe('Frameworks', () => {
	describe('Angular', () => {
		test('foo-bar', () => {
			// this test is not completed yet
			const consoleSpy: jest.SpyInstance<void, Call> = jest.spyOn(console, 'warn');
			const code: string = readFileSync(resolve(__dirname, 'unexpected-end-of-expression.pug'), 'utf8');
			format(code, {
				parser: 'pug',
				plugins: [plugin],

				// @ts-expect-error
				pugFramework: 'angular'
			});
			const thrownWarnings: string[] = getFormatWarnings(consoleSpy.mock.calls);
			console.log(thrownWarnings);

			expect(thrownWarnings).toContain('');
		});
	});
});
