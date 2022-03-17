import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('useIdLiterals', () => {
    it('should keep classes as is', () => {
      const { actual, code } = compareFiles(__dirname, {
        source: 'formatted-attribute.pug',
        target: null,
        formatOptions: {
          pugIdNotation: 'as-is',
        },
      });
      expect(actual).toBe(code);
    });

    it('should keep classes as literals', () => {
      const { actual, expected } = compareFiles(__dirname, {
        source: 'formatted-attribute.pug',
        target: 'formatted-literal.pug',
        formatOptions: {
          pugIdNotation: 'literal',
        },
      });
      expect(actual).toBe(expected);
    });

    it('should keep classes as literals by default', () => {
      const { actual, expected } = compareFiles(__dirname, {
        source: 'formatted-attribute.pug',
        target: 'formatted-literal.pug',
      });
      expect(actual).toBe(expected);
    });
  });
});
