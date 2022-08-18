import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Frameworks', () => {
  describe('Svelte', () => {
    it('should format svelte', async () => {
      const { actual, expected } = await compareFiles(__dirname, {
        formatOptions: { pugFramework: 'svelte' },
      });

      expect(actual).toBe(expected);
    });
  });
});
