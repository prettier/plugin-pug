import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Quotes', () => {
  it('should format single to double quotes', () => {
    const { actual, expected } = compareFiles(__dirname, {
      formatOptions: {
        singleQuote: false,
      },
    });
    expect(actual).toBe(expected);
  });

  it('should use double quotes by default', () => {
    const { expected, actual } = compareFiles(__dirname);
    expect(actual).toBe(expected);
  });
});
