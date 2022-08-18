import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugWrapAttributesThreshold', () => {
    it('should not allow more than two attributes as one-liner', async () => {
      const { actual, expected } = await compareFiles(__dirname, {
        formatOptions: { pugWrapAttributesThreshold: 2 },
      });

      expect(actual).toBe(expected);
    });
  });
});
