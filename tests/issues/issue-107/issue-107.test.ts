import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should not wrap pug in brackets into multi line', () => {
    const { actual, expected } = compareFiles(__dirname, {
      formatOptions: {
        printWidth: 80,
      },
    });
    expect(actual).toBe(expected);
  });
});
