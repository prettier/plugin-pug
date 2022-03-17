import type { PugSortAttributes } from 'src/options/attribute-sorting/index';
import {
  compareAttributeToken,
  stableSort,
} from 'src/options/attribute-sorting/utils';
import { describe, expect, it } from 'vitest';
import { compareFiles, createAttributeToken } from '../../common';

describe('Options', () => {
  describe('sortAttributes', () => {
    it('should sort attributes', () => {
      const { actual, expected } = compareFiles(__dirname, {
        formatOptions: {
          pugSortAttributesBeginning: ['v-for', ':key', 'src', 'alt'],
          pugSortAttributesEnd: ['@click'],
        },
      });
      expect(actual).toBe(expected);
    });
  });

  describe('sort utilities', () => {
    it('should sort only the beginning attributes', () => {
      const pugSortAttributes: PugSortAttributes = 'as-is';
      const pugSortAttributesBeginning: string[] = [
        'v-for',
        ':key',
        'src',
        'alt',
      ];
      const pugSortAttributesEnd: string[] = [];
      const expected: string[] = ['v-for', ':key', 'src', 'alt'];
      const code: string[] = ['alt', ':key', 'v-for', 'src'];
      const actual: string[] = stableSort(code, (a, b) =>
        compareAttributeToken(
          createAttributeToken(a),
          createAttributeToken(b),
          pugSortAttributes,
          pugSortAttributesBeginning,
          pugSortAttributesEnd,
        ),
      );

      expect(actual).toStrictEqual(expected);
    });

    it('should sort only the end attributes', () => {
      const pugSortAttributes: PugSortAttributes = 'as-is';
      const pugSortAttributesBeginning: string[] = [];
      const pugSortAttributesEnd: string[] = [
        'v-for',
        ':key',
        'src',
        'alt',
        '@click',
        ':disabled',
      ];
      const expected: string[] = [
        'v-for',
        ':key',
        'src',
        'alt',
        '@click',
        ':disabled',
      ];
      const code: string[] = [
        'v-for',
        ':disabled',
        ':key',
        '@click',
        'src',
        'alt',
      ];
      const actual: string[] = stableSort(code, (a, b) =>
        compareAttributeToken(
          createAttributeToken(a),
          createAttributeToken(b),
          pugSortAttributes,
          pugSortAttributesBeginning,
          pugSortAttributesEnd,
        ),
      );

      expect(actual).toStrictEqual(expected);
    });

    it('should sort both beginning and end, but keep middle attributes as is', () => {
      const pugSortAttributes: PugSortAttributes = 'as-is';
      const pugSortAttributesBeginning: string[] = ['^x$', '^y$', '^z$'];
      const pugSortAttributesEnd: string[] = [
        'v-for',
        ':key',
        'src',
        'alt',
        '@click',
        ':disabled',
      ];
      const expected: string[] = [
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
        ':disabled',
      ];
      const code: string[] = [
        'y',
        'c',
        'z',
        'a',
        ':disabled',
        'alt',
        'b',
        ':key',
        'v-for',
        '@click',
        'src',
        'x',
      ];
      const actual: string[] = stableSort(code, (a, b) =>
        compareAttributeToken(
          createAttributeToken(a),
          createAttributeToken(b),
          pugSortAttributes,
          pugSortAttributesBeginning,
          pugSortAttributesEnd,
        ),
      );

      expect(actual).toStrictEqual(expected);
    });

    it('should sort beginning, end, and middle should be sorted ascending', () => {
      const pugSortAttributes: PugSortAttributes = 'asc';
      const pugSortAttributesBeginning: string[] = ['^x$', '^y$', '^z$'];
      const pugSortAttributesEnd: string[] = [
        'v-for',
        ':key',
        'src',
        'alt',
        '@click',
        ':disabled',
      ];
      const expected: string[] = [
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
        ':disabled',
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
        'x',
      ];
      const actual: string[] = stableSort(code, (a, b) =>
        compareAttributeToken(
          createAttributeToken(a),
          createAttributeToken(b),
          pugSortAttributes,
          pugSortAttributesBeginning,
          pugSortAttributesEnd,
        ),
      );

      expect(actual).toStrictEqual(expected);
    });

    it('should sort beginning, end, and middle should be sorted descending', () => {
      const pugSortAttributes: PugSortAttributes = 'desc';
      const pugSortAttributesBeginning: string[] = ['^x$', '^y$', '^z$'];
      const pugSortAttributesEnd: string[] = [
        'v-for',
        ':key',
        'src',
        'alt',
        '@click',
        ':disabled',
      ];
      const expected: string[] = [
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
        ':disabled',
      ];
      const code: string[] = [
        'y',
        'c',
        'z',
        'a',
        ':disabled',
        'alt',
        'b',
        ':key',
        'v-for',
        '@click',
        'src',
        'x',
      ];
      const actual: string[] = stableSort(code, (a, b) =>
        compareAttributeToken(
          createAttributeToken(a),
          createAttributeToken(b),
          pugSortAttributes,
          pugSortAttributesBeginning,
          pugSortAttributesEnd,
        ),
      );

      expect(actual).toStrictEqual(expected);
    });

    it('should keep middle attributes untouched', () => {
      const pugSortAttributes: PugSortAttributes = 'as-is';
      const pugSortAttributesBeginning: string[] = ['a'];
      const pugSortAttributesEnd: string[] = ['b'];
      // eslint-disable-next-line spellcheck/spell-checker
      const expected: string[] = 'aedcfghilnb'.split('');
      // eslint-disable-next-line spellcheck/spell-checker
      const code: string[] = 'aedcfbghiln'.split('');
      const actual: string[] = stableSort(code, (a, b) =>
        compareAttributeToken(
          createAttributeToken(a),
          createAttributeToken(b),
          pugSortAttributes,
          pugSortAttributesBeginning,
          pugSortAttributesEnd,
        ),
      );

      expect(actual).toStrictEqual(expected);
    });

    it('should keep every attribute untouched', () => {
      const pugSortAttributes: PugSortAttributes = 'as-is';
      const pugSortAttributesBeginning: string[] = [];
      const pugSortAttributesEnd: string[] = [];
      // eslint-disable-next-line spellcheck/spell-checker
      const expected: string[] = 'aedcfghilnb'.split('');
      // eslint-disable-next-line spellcheck/spell-checker
      const code: string[] = 'aedcfghilnb'.split('');
      const actual: string[] = stableSort(code, (a, b) =>
        compareAttributeToken(
          createAttributeToken(a),
          createAttributeToken(b),
          pugSortAttributes,
          pugSortAttributesBeginning,
          pugSortAttributesEnd,
        ),
      );

      expect(actual).toStrictEqual(expected);
    });
  });
});
