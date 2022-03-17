import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Yield', () => {
  it('should handle yield token', () => {
    const { expected, actual } = compareFiles(__dirname);
    expect(actual).toBe(expected);
  });
});
