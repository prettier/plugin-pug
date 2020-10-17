import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../../src/index';

describe('Options', () => {
	describe('commentPreserveSpaces', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		test('should keep all spaces within comments', () => {
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],
				// @ts-expect-error
				commentPreserveSpaces: 'keep-all'
			});

			expect(actual).toBe(expected);
		});
		test('should keep all spaces within comments by default', () => {
			const actual: string = format(code, { parser: 'pug', plugins: [plugin] });

			expect(actual).toBe(expected);
		});
	});
});
