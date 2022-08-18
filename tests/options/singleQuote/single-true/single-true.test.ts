import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('singleQuote', () => {
    it('should handle singleQuote:true', async () => {
      const { actual, expected } = await compareFiles(__dirname, {
        formatOptions: { singleQuote: true },
      });

      expect(actual).toBe(expected);
    });
  });
});
