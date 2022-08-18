import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Spaces', () => {
  it('should strip spaces', async () => {
    const { expected, actual } = await compareFiles(__dirname);
    expect(actual).toBe(expected);
  });
});
