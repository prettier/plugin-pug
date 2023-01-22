import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should not log error', () => {
    const { expected, actual } = compareFiles(__dirname, {
      formatOptions: {
        semi: false,
        singleQuote: true,
        quoteProps: 'consistent',
        trailingComma: 'none',
        pugFramework: 'vue',
        pugSingleQuote: false,
        pugAttributeSeparator: 'none',
        pugWrapAttributesThreshold: 1,
        pugWrapAttributesPattern: '^(@|v-)',
      },
    });
    expect(actual).toBe(expected);
  });
});
