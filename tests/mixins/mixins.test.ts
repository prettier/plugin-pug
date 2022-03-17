import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Mixins', () => {
  it('should handle mixins', () => {
    const { expected, actual } = compareFiles(__dirname);
    expect(actual).toBe(expected);
  });
});
