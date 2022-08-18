import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugAttributeSeparator', () => {
    it('should insert commas between attributes as-needed', async () => {
      const { actual, expected } = await compareFiles(__dirname, {
        formatOptions: {
          // The `.length-test` elements are tested against a `printWidth` of 80 (currently also the default):
          printWidth: 80,

          pugAttributeSeparator: 'as-needed',
        },
      });
      expect(actual).toBe(expected);
    });
  });
});
