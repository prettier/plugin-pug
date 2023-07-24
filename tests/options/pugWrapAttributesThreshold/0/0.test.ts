import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugWrapAttributesThreshold', () => {
    it('should never allow an attribute without being wrapped', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        formatOptions: { pugWrapAttributesThreshold: 0 },
      });

      expect(actual).toBe(expected);
    });
  });
});
