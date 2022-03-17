import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Frameworks', () => {
  describe('Vue', () => {
    it('should format v-on', () => {
      const { actual, expected } = compareFiles(__dirname, {
        formatOptions: { pugFramework: 'vue' },
      });

      expect(actual).toBe(expected);
    });
  });
});
