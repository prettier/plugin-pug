import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('printWidth', () => {
    it('should handle printWidth', async () => {
      const { actual, expected } = await compareFiles(__dirname, {
        formatOptions: {
          printWidth: 120,
        },
      });
      expect(actual).toBe(expected);
    });
  });
});
