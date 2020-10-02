import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { AttributeToken } from 'pug-lexer';
import { SortAttributes } from '../../../src/options/attribute-sorting/index';
import { compareAttributeToken, stableSort } from '../../../src/options/attribute-sorting/utils';
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
			const pugSortAttributes: SortAttributes = 'as-is';
			const pugSortAttributesBeginning: string[] = ['v-for', ':key', 'src', 'alt'];
			const pugSortAttributesEnd: string[] = [];
			const expected: ReadonlyArray<string> = ['v-for', ':key', 'src', 'alt'];
			const code: string[] = ['alt', ':key', 'v-for', 'src'];
			const actual: string[] = stableSort(code, (a, b) =>
				compareAttributeToken(
					createAttributeToken(a),
					createAttributeToken(b),
					pugSortAttributes,
					pugSortAttributesBeginning,
					pugSortAttributesEnd
				)
			);

			expect(actual).toStrictEqual(expected);
		});
		test('compare 2', () => {
			const pugSortAttributes: SortAttributes = 'as-is';
			const pugSortAttributesBeginning: string[] = [];
			const pugSortAttributesEnd = ['v-for', ':key', 'src', 'alt', '@click', ':disabled'];
			const expected: ReadonlyArray<string> = ['v-for', ':key', 'src', 'alt', '@click', ':disabled'];
			const code: string[] = ['v-for', ':disabled', ':key', '@click', 'src', 'alt'];
			const actual: string[] = stableSort(code, (a, b) =>
				compareAttributeToken(
					createAttributeToken(a),
					createAttributeToken(b),
					pugSortAttributes,
					pugSortAttributesBeginning,
					pugSortAttributesEnd
				)
			);

			expect(actual).toStrictEqual(expected);
		});
		test('compare 3', () => {
			const pugSortAttributes: SortAttributes = 'as-is';
			const pugSortAttributesBeginning: string[] = ['^x$', '^y$', '^z$'];
			const pugSortAttributesEnd: string[] = ['v-for', ':key', 'src', 'alt', '@click', ':disabled'];
			const expected: ReadonlyArray<string> = [
				'x',
				'y',
				'z',
				'c',
				'a',
				'b',
				'v-for',
				':key',
				'src',
				'alt',
				'@click',
				':disabled'
			];
			const code: string[] = ['y', 'c', 'z', 'a', ':disabled', 'alt', 'b', ':key', 'v-for', '@click', 'src', 'x'];
			const actual: string[] = stableSort(code, (a, b) =>
				compareAttributeToken(
					createAttributeToken(a),
					createAttributeToken(b),
					pugSortAttributes,
					pugSortAttributesBeginning,
					pugSortAttributesEnd
				)
			);

			expect(actual).toStrictEqual(expected);
		});
		test('compare 4', () => {
			const pugSortAttributes: SortAttributes = 'asc';
			const pugSortAttributesBeginning: string[] = ['^x$', '^y$', '^z$'];
			const pugSortAttributesEnd: string[] = ['v-for', ':key', 'src', 'alt', '@click', ':disabled'];
			const expected: ReadonlyArray<string> = [
				'x',
				'y',
				'z',
				'D',
				'a',
				'b',
				'c',
				'v-for',
				':key',
				'src',
				'alt',
				'@click',
				':disabled'
			];
			const code: string[] = [
				'y',
				'c',
				'z',
				'a',
				':disabled',
				'alt',
				'b',
				'D',
				':key',
				'v-for',
				'@click',
				'src',
				'x'
			];
			const actual: string[] = stableSort(code, (a, b) =>
				compareAttributeToken(
					createAttributeToken(a),
					createAttributeToken(b),
					pugSortAttributes,
					pugSortAttributesBeginning,
					pugSortAttributesEnd
				)
			);

			expect(actual).toStrictEqual(expected);
		});
		test('compare 5', () => {
			const pugSortAttributes: SortAttributes = 'desc';
			const pugSortAttributesBeginning: string[] = ['^x$', '^y$', '^z$'];
			const pugSortAttributesEnd: string[] = ['v-for', ':key', 'src', 'alt', '@click', ':disabled'];
			const expected: ReadonlyArray<string> = [
				'x',
				'y',
				'z',
				'c',
				'b',
				'a',
				'v-for',
				':key',
				'src',
				'alt',
				'@click',
				':disabled'
			];
			const code: string[] = ['y', 'c', 'z', 'a', ':disabled', 'alt', 'b', ':key', 'v-for', '@click', 'src', 'x'];
			const actual: string[] = stableSort(code, (a, b) =>
				compareAttributeToken(
					createAttributeToken(a),
					createAttributeToken(b),
					pugSortAttributes,
					pugSortAttributesBeginning,
					pugSortAttributesEnd
				)
			);

			expect(actual).toStrictEqual(expected);
		});
		test('compare 6', () => {
			const pugSortAttributes: SortAttributes = 'as-is';
			const pugSortAttributesBeginning: string[] = ['a'];
			const pugSortAttributesEnd: string[] = ['b'];
			const expected: ReadonlyArray<string> = 'aedcfghilnb'.split('');
			const code: string[] = 'aedcfbghiln'.split('');
			const actual: string[] = stableSort(code, (a, b) =>
				compareAttributeToken(
					createAttributeToken(a),
					createAttributeToken(b),
					pugSortAttributes,
					pugSortAttributesBeginning,
					pugSortAttributesEnd
				)
			);

			expect(actual).toStrictEqual(expected);
		});
		test('compare 7', () => {
			const pugSortAttributes: SortAttributes = 'as-is';
			const pugSortAttributesBeginning: string[] = [];
			const pugSortAttributesEnd: string[] = [];
			const expected: ReadonlyArray<string> = 'aedcfghilnb'.split('');
			const code: string[] = 'aedcfghilnb'.split('');
			const actual: string[] = stableSort(code, (a, b) =>
				compareAttributeToken(
					createAttributeToken(a),
					createAttributeToken(b),
					pugSortAttributes,
					pugSortAttributesBeginning,
					pugSortAttributesEnd
				)
			);

			expect(actual).toStrictEqual(expected);
		});
	});
});
