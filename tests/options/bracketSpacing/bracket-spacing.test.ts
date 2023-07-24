import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('bracketSpacing', () => {
    it('should handle bracketSpacing', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        formatOptions: {
          bracketSpacing: false,
        },
      });
      expect(actual).toBe(expected);
    });
  });
});
