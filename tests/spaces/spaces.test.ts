import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Spaces', () => {
  it('should strip spaces', async () => {
    const { expected, actual } = await compareFiles(import.meta.url);
    expect(actual).toBe(expected);
  });
});
