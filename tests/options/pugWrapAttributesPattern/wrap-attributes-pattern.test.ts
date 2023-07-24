import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugWrapAttributesPattern', () => {
    it('should always wrap elements with attributes matching provided pattern', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        formatOptions: { pugWrapAttributesPattern: '^v-(if|else|for)' },
      });

      expect(actual).toBe(expected);
    });
  });
});
