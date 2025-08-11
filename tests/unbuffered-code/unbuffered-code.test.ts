import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Unbuffered code', () => {
  it('should handle JS statements where the isolated line is only parseable when there is a another statement afterwards', async () => {
    const { expected, actual } = await compareFiles(import.meta.url);
    expect(actual).toBe(expected);
  });
});
