import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Inheritance', () => {
  it('should handle blocks', async () => {
    const { expected, actual } = await compareFiles(__dirname);
    expect(actual).toBe(expected);
  });
});
