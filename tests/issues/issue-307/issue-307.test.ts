import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should set tab to 4 spaces', () => {
    const { actual, expected } = compareFiles(__dirname, {
      formatOptions: {
        arrowParens: 'avoid',
        singleQuote: true,
        tabWidth: 4,
      },
    });
    expect(actual).toBe(expected);
  });
});
