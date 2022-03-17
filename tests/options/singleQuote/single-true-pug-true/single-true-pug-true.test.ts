import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('singleQuote', () => {
    it('should handle singleQuote:true + pugSingleQuote:true', () => {
      const { actual, expected } = compareFiles(__dirname, {
        formatOptions: {
          singleQuote: true,
          pugSingleQuote: true,
        },
      });
      expect(actual).toBe(expected);
    });
  });
});
