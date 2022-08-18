import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Text-Html', () => {
  it('should handle text-html token', async () => {
    const { expected, actual } = await compareFiles(__dirname);
    expect(actual).toBe(expected);
  });
});
