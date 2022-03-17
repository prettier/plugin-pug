import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Spaces', () => {
  it('should strip spaces', () => {
    const { expected, actual } = compareFiles(__dirname);
    expect(actual).toBe(expected);
  });
});
