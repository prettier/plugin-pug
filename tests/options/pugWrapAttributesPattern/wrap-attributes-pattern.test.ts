import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugWrapAttributesPattern', () => {
    it('should always wrap elements with attributes matching provided pattern', () => {
      const { actual, expected } = compareFiles(__dirname, {
        formatOptions: { pugWrapAttributesPattern: '^v-(if|else|for)' },
      });

      expect(actual).toBe(expected);
    });
  });
});
