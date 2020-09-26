import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../../src/index';

describe('Options', () => {
	describe('sortAttributes', () => {
		test('should sort attributes', () => {
			const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
			const actual: string = format(code, {
				parser: 'pug' as any,
				plugins: [plugin],
				// @ts-ignore
				pugSortAttributesBeginning: ['v-for', ':key', 'src', 'alt'],
				// @ts-ignore
				pugSortAttributesEnd: ['@click']
			});

			expect(actual).toBe(expected);
		});
	});
});
