import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('singleQuote', () => {
    it('should handle singleQuote:false + pugSingleQuote:true', async () => {
      const { actual, expected } = await compareFiles(__dirname, {
        formatOptions: {
          singleQuote: false,
          pugSingleQuote: true,
        },
      });
      expect(actual).toBe(expected);
    });
  });
});
