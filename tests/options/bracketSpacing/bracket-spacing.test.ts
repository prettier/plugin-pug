import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('bracketSpacing', () => {
    it('should handle bracketSpacing', () => {
      const { actual, expected } = compareFiles(__dirname, {
        formatOptions: {
          bracketSpacing: false,
        },
      });
      expect(actual).toBe(expected);
    });
  });
});
