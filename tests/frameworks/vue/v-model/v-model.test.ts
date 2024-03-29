import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Frameworks', () => {
  describe('Vue', () => {
    it('should format v-model', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        formatOptions: { pugFramework: 'vue' },
      });

      expect(actual).toBe(expected);
    });
  });
});
