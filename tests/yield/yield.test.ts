import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Yield', () => {
  it('should handle yield token', async () => {
    const { expected, actual } = await compareFiles(__dirname);
    expect(actual).toBe(expected);
  });
});
