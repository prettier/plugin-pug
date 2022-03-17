import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugClassLocation', () => {
    it('should position class literals before attributes', () => {
      const { actual, expected } = compareFiles(__dirname, {
        target: 'formatted-before.pug',
        formatOptions: {
          pugClassLocation: 'before-attributes',
        },
      });
      expect(actual).toBe(expected);
    });

    it('should position class literals after attributes', () => {
      const { actual, expected } = compareFiles(__dirname, {
        target: 'formatted-after.pug',
        formatOptions: {
          pugClassLocation: 'after-attributes',
        },
      });
      expect(actual).toBe(expected);
    });
  });
});
