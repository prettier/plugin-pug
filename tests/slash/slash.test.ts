import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Slash', () => {
  it('should handle slash token', () => {
    const { expected, actual } = compareFiles(__dirname);
    expect(actual).toBe(expected);
  });
});
