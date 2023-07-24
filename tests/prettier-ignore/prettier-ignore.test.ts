import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('prettier-ignore', () => {
  it('should handle // prettier-ignore statements', async () => {
    const { expected, actual } = await compareFiles(import.meta.url);
    expect(actual).toBe(expected);
  });
});
