import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Text-Html', () => {
  it('should handle text-html token', async () => {
    const { expected, actual } = await compareFiles(import.meta.url);
    expect(actual).toBe(expected);
  });
});
