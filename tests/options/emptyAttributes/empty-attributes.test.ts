import type { AttributeToken } from 'pug-lexer';
import type {
  PugEmptyAttributes,
  PugEmptyAttributesForceQuotes,
} from 'src/options/empty-attributes';
import { formatEmptyAttribute } from 'src/options/empty-attributes/utils';
import { compareFiles, createAttributeToken } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('emptyAttributes', () => {
    it('should remove empty quotes and keep attributes starting with #', () => {
      const { actual, expected } = compareFiles(__dirname, {
        formatOptions: {
          pugEmptyAttributes: 'none',
          pugEmptyAttributesForceQuotes: ['foo'],
        },
      });
      expect(actual).toBe(expected);
    });
  });

  describe('empty attributes utilities', () => {
    it('should format empty attributes as true', () => {
      const name: string = 'disabled';
      const pugEmptyAttributes: PugEmptyAttributes = 'none';
      const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = [];

      const expected: AttributeToken = createAttributeToken(name, true);
      const actual: AttributeToken = createAttributeToken(name, '""');

      formatEmptyAttribute(
        actual,
        pugEmptyAttributes,
        pugEmptyAttributesForceQuotes,
      );

      expect(actual).toStrictEqual(expected);
    });

    it('should work with single quotes', () => {
      const name: string = 'disabled';
      const pugEmptyAttributes: PugEmptyAttributes = 'none';
      const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = [];

      const expected: AttributeToken = createAttributeToken(name, true);
      const actual: AttributeToken = createAttributeToken(name, "''");

      formatEmptyAttribute(
        actual,
        pugEmptyAttributes,
        pugEmptyAttributesForceQuotes,
      );

      expect(actual).toStrictEqual(expected);
    });

    it('should format truthy boolean attributes as empty quotes', () => {
      const name: string = 'disabled';
      const pugEmptyAttributes: PugEmptyAttributes = 'all';
      const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = [];

      const expected: AttributeToken = createAttributeToken(name, '""');
      const actual: AttributeToken = createAttributeToken(name, true);

      formatEmptyAttribute(
        actual,
        pugEmptyAttributes,
        pugEmptyAttributesForceQuotes,
      );

      expect(actual).toStrictEqual(expected);
    });

    it('should do nothing if the option is "as-is" (boolean)', () => {
      const name: string = 'disabled';
      const val: boolean = true;
      const pugEmptyAttributes: PugEmptyAttributes = 'as-is';
      const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = [];

      const expected: AttributeToken = createAttributeToken(name, val);
      const actual: AttributeToken = createAttributeToken(name, val);

      formatEmptyAttribute(
        actual,
        pugEmptyAttributes,
        pugEmptyAttributesForceQuotes,
      );

      expect(actual).toStrictEqual(expected);
    });

    it('should do nothing if the option is "as-is" (quotes)', () => {
      const name: string = 'disabled';
      const val: string = '""';
      const pugEmptyAttributes: PugEmptyAttributes = 'as-is';
      const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = [];

      const expected: AttributeToken = createAttributeToken(name, val);
      const actual: AttributeToken = createAttributeToken(name, val);

      formatEmptyAttribute(
        actual,
        pugEmptyAttributes,
        pugEmptyAttributesForceQuotes,
      );

      expect(actual).toStrictEqual(expected);
    });

    it('should force quotes on attributes with name starting with #', () => {
      const name: string = '#boom';
      const pugEmptyAttributes: PugEmptyAttributes = 'none';
      const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = [
        '^#',
      ];

      const expected: AttributeToken = createAttributeToken(name, '""');
      const actual: AttributeToken = createAttributeToken(name, true);

      formatEmptyAttribute(
        actual,
        pugEmptyAttributes,
        pugEmptyAttributesForceQuotes,
      );

      expect(actual).toStrictEqual(expected);
    });

    it('should do nothing if the value is not empty', () => {
      const name: string = 'type';
      const val: string = 'text';
      const pugEmptyAttributes: PugEmptyAttributes = 'none';
      const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = [];

      const expected: AttributeToken = createAttributeToken(name, val);
      const actual: AttributeToken = createAttributeToken(name, val);

      formatEmptyAttribute(
        actual,
        pugEmptyAttributes,
        pugEmptyAttributesForceQuotes,
      );

      expect(actual).toStrictEqual(expected);
    });

    it('should do nothing if the forced quotes value is not empty', () => {
      const name: string = 'type';
      const val: string = 'text';
      const pugEmptyAttributes: PugEmptyAttributes = 'none';
      const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = [
        '^ty',
      ];

      const expected: AttributeToken = createAttributeToken(name, val);
      const actual: AttributeToken = createAttributeToken(name, val);

      formatEmptyAttribute(
        actual,
        pugEmptyAttributes,
        pugEmptyAttributesForceQuotes,
      );

      expect(actual).toStrictEqual(expected);
    });

    it('should do nothing if the value already boolean true', () => {
      const name: string = 'type';
      const pugEmptyAttributes: PugEmptyAttributes = 'none';
      const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = [];

      const expected: AttributeToken = createAttributeToken(name, true);
      const actual: AttributeToken = createAttributeToken(name, true);

      formatEmptyAttribute(
        actual,
        pugEmptyAttributes,
        pugEmptyAttributesForceQuotes,
      );

      expect(actual).toStrictEqual(expected);
    });

    it('should do nothing if the value already empty quotes', () => {
      const name: string = 'type';
      const pugEmptyAttributes: PugEmptyAttributes = 'all';
      const pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes = [];

      const expected: AttributeToken = createAttributeToken(name, '""');
      const actual: AttributeToken = createAttributeToken(name, '""');

      formatEmptyAttribute(
        actual,
        pugEmptyAttributes,
        pugEmptyAttributesForceQuotes,
      );

      expect(actual).toStrictEqual(expected);
    });
  });
});
