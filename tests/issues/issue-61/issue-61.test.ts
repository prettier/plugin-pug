import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should not wrap chained data-bindings', () => {
    const { actual, expected } = compareFiles(__dirname, {
      formatOptions: {
        semi: false,
        singleQuote: true,
      },
    });
    expect(actual).toBe(expected);
  });
});
