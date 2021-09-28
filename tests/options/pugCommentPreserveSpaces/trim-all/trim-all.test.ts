import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../../src/index';

describe('Options', () => {
	describe('commentPreserveSpaces', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		test('should trim all spaces within comments', () => {
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],
				// @ts-expect-error
				pugCommentPreserveSpaces: 'trim-all'
			});

			expect(actual).toBe(expected);
		});
	});
});
