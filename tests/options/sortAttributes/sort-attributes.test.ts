import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { AttributeToken } from 'pug-lexer';
import { compareAttributeToken } from '../../../src/options/attribute-sorting/utils';
import { plugin } from './../../../src/index';

function createAttributeToken(name: string): AttributeToken {
	return {
		name,
		val: 'dummy',
		mustEscape: false,
		type: 'attribute',
		loc: {
			start: { line: 0, column: 0 },
			end: { line: 0, column: 0 }
		}
	};
}

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

	describe('sort utilities', () => {
		test('compare 1', () => {
			const expected: ReadonlyArray<string> = ['v-for', ':key', 'src', 'alt'];
			const code: string[] = ['alt', ':key', 'v-for', 'src'];
			const actual: string[] = code.sort((a, b) =>
				compareAttributeToken(createAttributeToken(a), createAttributeToken(b), ['v-for', ':key', 'src', 'alt'])
			);

			expect(actual).toStrictEqual(expected);
		});
		test('compare 2', () => {
			const expected: ReadonlyArray<string> = ['v-for', ':key', 'src', 'alt', '@click', ':disabled'];
			const code: string[] = ['v-for', ':disabled', ':key', '@click', 'src', 'alt'];
			const actual: string[] = code.sort((a, b) =>
				compareAttributeToken(createAttributeToken(a), createAttributeToken(b), ['@click', ':disabled'], true)
			);

			expect(actual).toStrictEqual(expected);
		});
	});
});
