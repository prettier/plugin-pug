import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should handle vue slot shorthand syntax', async () => {
    const { expected, actual } = await compareFiles(__dirname);
    expect(actual).toBe(expected);
  });

  it('should handle vue slot shorthand syntax in vue file', async () => {
    const { actual, expected } = await compareFiles(__dirname, {
      source: 'unformatted.vue',
      target: 'formatted.vue',
      formatOptions: {
        parser: 'vue',

        printWidth: 120,
        singleQuote: true,
        trailingComma: 'all',

        pugAttributeSeparator: 'none',
        pugFramework: 'vue',
        pugSingleFileComponentIndentation: true,
        pugSingleQuote: false,
      },
    });
    expect(actual).toBe(expected);
  });
});
