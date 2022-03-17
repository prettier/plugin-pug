import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Attributes', () => {
  it('should handle no attributes', () => {
    const { expected, actual } = compareFiles(__dirname);
    expect(actual).toBe(expected);
  });
});
