import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should consistently format quotes', () => {
    const { actual, expected } = compareFiles(__dirname, {
      formatOptions: {
        semi: false,
        singleQuote: true,
        trailingComma: 'none',
        arrowParens: 'avoid',

        pugAttributeSeparator: 'as-needed',
      },
    });
    expect(actual).toBe(expected);
  });
});
