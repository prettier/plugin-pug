import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should not reformat multiline interpolation strings', () => {
    const { actual, expected } = compareFiles(__dirname, {
      formatOptions: {
        semi: false,
        singleQuote: true,
      },
    });
    expect(actual).toBe(expected);
  });
});
