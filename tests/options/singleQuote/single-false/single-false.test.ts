import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('singleQuote', () => {
    it('should handle singleQuote:false', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        formatOptions: { singleQuote: false },
      });

      expect(actual).toBe(expected);
    });
  });
});
