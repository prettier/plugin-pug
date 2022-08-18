import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Slash', () => {
  it('should handle slash token', async () => {
    const { expected, actual } = await compareFiles(__dirname);
    expect(actual).toBe(expected);
  });
});
