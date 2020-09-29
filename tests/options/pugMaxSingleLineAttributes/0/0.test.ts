import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../../src/index';

describe('Options', () => {
	describe('pugMaxSingleLineAttributes', () => {
		test('should not restrict the amount of attributes on the first line of an element', () => {
			const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
			const actual: string = format(code, {
				parser: 'pug' as any,
				plugins: [plugin],
				// @ts-expect-error
				pugMaxSingleLineAttributes: 0
			});

			expect(actual).toBe(expected);
		});
	});
});
