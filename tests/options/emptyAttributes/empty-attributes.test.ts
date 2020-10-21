// Import plugin first
import { plugin } from './../../../src/index';

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { AttributeToken } from 'pug-lexer';
import {
	formatEmptyAttribute,
	PugEmptyAttributes,
	PugEmptyAttributesForceQuotes
} from '../../../src/options/empty-attributes';
import { createAttributeToken } from '../../common';

describe('Options', () => {
	describe('emptyAttributes', () => {
		test('should remove empty quotes and keep attributes starting with #', () => {
			const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
			const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],
				// @ts-expect-error
				pugEmptyAttributes: 'none',
				pugEmptyAttributesForceQuotes: ['foo']
			});

			expect(actual).toBe(expected);
		});
	});

	describe('empty attributes utilities', () => {
		test('should format empty attributes as true', () => {
			const name: string = 'disabled';
			const pugEmptyAttributes: PugEmptyAttributes = 'none';
			const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = [];

			const expected: AttributeToken = createAttributeToken(name, true);
			const actual: AttributeToken = createAttributeToken(name, '""');

			formatEmptyAttribute(actual, pugEmptyAttributes, pugEmptyAttributesForceQuotes);

			expect(actual).toStrictEqual(expected);
		});
		test('should work with single quotes', () => {
			const name: string = 'disabled';
			const pugEmptyAttributes: PugEmptyAttributes = 'none';
			const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = [];

			const expected: AttributeToken = createAttributeToken(name, true);
			const actual: AttributeToken = createAttributeToken(name, "''");

			formatEmptyAttribute(actual, pugEmptyAttributes, pugEmptyAttributesForceQuotes);

			expect(actual).toStrictEqual(expected);
		});
		test('should format truthy boolean attributes as empty quotes', () => {
			const name: string = 'disabled';
			const pugEmptyAttributes: PugEmptyAttributes = 'all';
			const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = [];

			const expected: AttributeToken = createAttributeToken(name, '""');
			const actual: AttributeToken = createAttributeToken(name, true);

			formatEmptyAttribute(actual, pugEmptyAttributes, pugEmptyAttributesForceQuotes);

			expect(actual).toStrictEqual(expected);
		});
		test('should do nothing if the option is "as-is" (boolean)', () => {
			const name: string = 'disabled';
			const val: boolean = true;
			const pugEmptyAttributes: PugEmptyAttributes = 'as-is';
			const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = [];

			const expected: AttributeToken = createAttributeToken(name, val);
			const actual: AttributeToken = createAttributeToken(name, val);

			formatEmptyAttribute(actual, pugEmptyAttributes, pugEmptyAttributesForceQuotes);

			expect(actual).toStrictEqual(expected);
		});
		test('should do nothing if the option is "as-is" (quotes)', () => {
			const name: string = 'disabled';
			const val: string = '""';
			const pugEmptyAttributes: PugEmptyAttributes = 'as-is';
			const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = [];

			const expected: AttributeToken = createAttributeToken(name, val);
			const actual: AttributeToken = createAttributeToken(name, val);

			formatEmptyAttribute(actual, pugEmptyAttributes, pugEmptyAttributesForceQuotes);

			expect(actual).toStrictEqual(expected);
		});
		test('should force quotes on attributes with name starting with #', () => {
			const name: string = '#boom';
			const pugEmptyAttributes: PugEmptyAttributes = 'none';
			const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = ['^#'];

			const expected: AttributeToken = createAttributeToken(name, '""');
			const actual: AttributeToken = createAttributeToken(name, true);

			formatEmptyAttribute(actual, pugEmptyAttributes, pugEmptyAttributesForceQuotes);

			expect(actual).toStrictEqual(expected);
		});
		test('should do nothing if the value is not empty', () => {
			const name: string = 'type';
			const val: string = 'text';
			const pugEmptyAttributes: PugEmptyAttributes = 'none';
			const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = [];

			const expected: AttributeToken = createAttributeToken(name, val);
			const actual: AttributeToken = createAttributeToken(name, val);

			formatEmptyAttribute(actual, pugEmptyAttributes, pugEmptyAttributesForceQuotes);

			expect(actual).toStrictEqual(expected);
		});
		test('should do nothing if the forced quotes value is not empty', () => {
			const name: string = 'type';
			const val: string = 'text';
			const pugEmptyAttributes: PugEmptyAttributes = 'none';
			const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = ['^ty'];

			const expected: AttributeToken = createAttributeToken(name, val);
			const actual: AttributeToken = createAttributeToken(name, val);

			formatEmptyAttribute(actual, pugEmptyAttributes, pugEmptyAttributesForceQuotes);

			expect(actual).toStrictEqual(expected);
		});
		test('should do nothing if the value already boolean true', () => {
			const name: string = 'type';
			const pugEmptyAttributes: PugEmptyAttributes = 'none';
			const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = [];

			const expected: AttributeToken = createAttributeToken(name, true);
			const actual: AttributeToken = createAttributeToken(name, true);

			formatEmptyAttribute(actual, pugEmptyAttributes, pugEmptyAttributesForceQuotes);

			expect(actual).toStrictEqual(expected);
		});
		test('should do nothing if the value already empty quotes', () => {
			const name: string = 'type';
			const pugEmptyAttributes: PugEmptyAttributes = 'all';
			const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = [];

			const expected: AttributeToken = createAttributeToken(name, '""');
			const actual: AttributeToken = createAttributeToken(name, '""');

			formatEmptyAttribute(actual, pugEmptyAttributes, pugEmptyAttributesForceQuotes);

			expect(actual).toStrictEqual(expected);
		});
	});
});
