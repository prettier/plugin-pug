import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Comments', () => {
  it('should handle conditionals', async () => {
    const { expected, actual } = await compareFiles(import.meta.url);
    expect(actual).toBe(expected);
  });
});
