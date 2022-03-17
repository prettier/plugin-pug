import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('singleQuote', () => {
    it('should handle singleQuote:false', () => {
      const { actual, expected } = compareFiles(__dirname, {
        formatOptions: { singleQuote: false },
      });

      expect(actual).toBe(expected);
    });
  });
});
