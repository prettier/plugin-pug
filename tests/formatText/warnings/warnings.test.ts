import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from '../../../src/index';

/**
 * Mocked console.warn calls.
 */
type Call = [message?: any, ...optionalParams: any[]];

const getFormatWarnings: (calls: Call[]) => string[] = (calls) =>
	calls
		.map(([message]) => message)
		.filter((message) => typeof message === 'string')
		.filter((message) => message.startsWith('[PugPrinter:formatText]: '))
		.map((message) => message.substring(25));

const getCode: (filename: string) => string = (filename) => readFileSync(resolve(__dirname, filename), 'utf8');

describe('Frameworks', () => {
	describe('Angular', () => {
		test('foo-bar', () => {
			// this test is not completed yet
			const consoleSpy = jest.spyOn(console, 'warn');
			const code: string = getCode('unexpected-end-of-expression.pug');
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
