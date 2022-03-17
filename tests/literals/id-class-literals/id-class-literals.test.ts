import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Attributes', () => {
  it('should handle id and class literals combined', () => {
    const { expected, actual } = compareFiles(__dirname);
    expect(actual).toBe(expected);
  });
});
