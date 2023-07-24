import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should not log error', async () => {
    const { expected, actual } = await compareFiles(import.meta.url, {
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
