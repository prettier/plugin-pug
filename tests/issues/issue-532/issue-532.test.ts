import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  describe('issue #532', () => {
    it('should format style tags based on their type attribute', async () => {
      const { actual, expected } = await compareFiles(import.meta.url);
      expect(actual).toBe(expected);
    });
  });
});
