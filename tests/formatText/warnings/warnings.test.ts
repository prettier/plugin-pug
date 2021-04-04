import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from '../../../src/index';
import { LoggerListener } from '../../../src/logger';
import { loggerInstance } from '../../../src/printer';

const loggerListener: LoggerListener = jest.fn();

const getFormatWarnings = (): string[] =>
	loggerListener.mock.calls
		.filter((call) => call[0] === 3)
		.filter((call) => call[1].toString().startsWith('[PugPrinter:formatText]: '))
		.map((call) => call[1].toString().substring(25));

const getCode = (filename: string): string => readFileSync(resolve(__dirname, filename), 'utf8');

beforeAll(() => {
	loggerInstance.addListener(loggerListener);
});
beforeEach(() => {
	// Clear all instances and calls to constructor and all methods:
	loggerListener.mockClear();
});
afterAll(() => {
	loggerInstance.removeListener(loggerListener);
});

describe('Frameworks', () => {
	describe('Angular', () => {
		test('foo-bar', () => {
			// this test is not completed yet
			const code: string = getCode('unexpected-end-of-expression.pug');
			format(code, {
				parser: 'pug',
				plugins: [plugin],

				// @ts-expect-error
				pugFramework: 'angular'
			});
			const thrownWarnings: string[] = getFormatWarnings();

			expect(thrownWarnings).toContain('');
		});
	});
});
