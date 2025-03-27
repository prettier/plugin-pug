import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should output correct whitespace for interpolation within piped text', async () => {
    const { expected, actual } = await compareFiles(import.meta.url);
    expect(actual).toBe(expected);
  });
});
