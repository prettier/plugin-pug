import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should ignore escaping chars in vue prop', () => {
    const { actual, expected } = compareFiles(__dirname, {
      formatOptions: {
        singleQuote: true,

        pugSingleQuote: false,
      },
    });
    expect(actual).toBe(expected);
  });
});
