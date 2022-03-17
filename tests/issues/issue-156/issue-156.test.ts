import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should handle multiline inline script', () => {
    const { actual, expected } = compareFiles(__dirname, {
      formatOptions: {
        printWidth: 120,
        endOfLine: 'auto',
      },
    });
    expect(actual).toBe(expected);
  });
});
