import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugWrapAttributesThreshold', () => {
    it('should count attribute classes toward wrapping if pugClassNotation === attribute', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        formatOptions: {
          pugWrapAttributesThreshold: 1,
          pugClassNotation: 'attribute',
        },
      });

      expect(actual).toBe(expected);
    });
  });
});
