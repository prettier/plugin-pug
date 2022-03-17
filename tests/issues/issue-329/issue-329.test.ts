import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should handle nested angular translations', () => {
    const { actual, expected } = compareFiles(__dirname, {
      formatOptions: {
        printWidth: 120,
        pugFramework: 'angular',
      },
    });
    expect(actual).toBe(expected);
  });
});
