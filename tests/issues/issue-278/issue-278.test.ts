import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should trim indentations', () => {
    const { actual, expected } = compareFiles(__dirname, {
      formatOptions: {
        singleQuote: true,
        useTabs: true,
        tabWidth: 4,
      },
    });
    expect(actual).toBe(expected);
  });
});
