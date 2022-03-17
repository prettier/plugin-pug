import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugWrapAttributesThreshold', () => {
    it('should not allow more than one attribute as one-liner', () => {
      const { actual, expected } = compareFiles(__dirname, {
        formatOptions: { pugWrapAttributesThreshold: 1 },
      });

      expect(actual).toBe(expected);
    });
  });
});
