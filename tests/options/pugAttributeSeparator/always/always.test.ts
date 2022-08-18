import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugAttributeSeparator', () => {
    it('should always insert commas between attributes', async () => {
      const { actual, expected } = await compareFiles(__dirname, {
        formatOptions: {
          // The `.length-test` elements are tested against a `printWidth` of 80 (currently also the default):
          printWidth: 80,

          pugAttributeSeparator: 'always',
        },
      });
      expect(actual).toBe(expected);
    });

    it('should always insert commas between attributes by default', async () => {
      const { actual, expected } = await compareFiles(__dirname);
      expect(actual).toBe(expected);
    });
  });
});
