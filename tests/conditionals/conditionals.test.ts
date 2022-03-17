import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Comments', () => {
  it('should handle conditionals', () => {
    const { expected, actual } = compareFiles(__dirname);
    expect(actual).toBe(expected);
  });
});
