import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Text-Html', () => {
  it('should handle text-html token', () => {
    const { expected, actual } = compareFiles(__dirname);
    expect(actual).toBe(expected);
  });
});
