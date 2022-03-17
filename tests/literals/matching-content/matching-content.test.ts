import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Attributes', () => {
  it('should not replace matching literal strings in text content', () => {
    const { expected, actual } = compareFiles(__dirname);
    expect(actual).toBe(expected);
  });
});
