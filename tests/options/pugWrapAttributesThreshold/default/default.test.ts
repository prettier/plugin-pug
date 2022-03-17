import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugWrapAttributesThreshold', () => {
    it('should not restrict the amount of attributes as one-liner', () => {
      const { actual, expected } = compareFiles(__dirname, {
        formatOptions: { pugWrapAttributesThreshold: -1 },
      });

      expect(actual).toBe(expected);
    });
  });
});
