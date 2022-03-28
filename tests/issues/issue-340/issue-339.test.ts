import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('Should handle nested quotes in properties', () => {
    const { actual, expected } = compareFiles(__dirname, {
      formatOptions: {
        singleQuote: false,
        pugSingleQuote: false,
      },
    });
    expect(actual).toBe(expected);
  });
});
