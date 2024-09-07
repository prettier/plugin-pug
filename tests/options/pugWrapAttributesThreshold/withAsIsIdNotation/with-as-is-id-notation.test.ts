import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugWrapAttributesThreshold', () => {
    it('should count attribute IDs toward wrapping if pugIdNotation === as-is', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        formatOptions: {
          pugWrapAttributesThreshold: 1,
          pugIdNotation: 'as-is',
        },
      });

      expect(actual).toBe(expected);
    });
  });
});
