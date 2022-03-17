import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('prettier-ignore', () => {
  it('should handle // prettier-ignore statements', () => {
    const { expected, actual } = compareFiles(__dirname);
    expect(actual).toBe(expected);
  });
});
