import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should handle pugClassNotation as-is', () => {
    const { expected, actual } = compareFiles(__dirname, {
      formatOptions: {
        pugFramework: 'vue',
        pugClassNotation: 'as-is',
      },
    });
    expect(actual).toBe(expected);
  });

  it('should handle pugClassNotation as-is in vue file', () => {
    const { actual, expected } = compareFiles(__dirname, {
      source: 'unformatted.vue',
      target: 'formatted.vue',
      formatOptions: {
        parser: 'vue',

        singleQuote: true,
        trailingComma: 'all',
        semi: true,
        printWidth: 120,

        pugClassNotation: 'as-is',
        pugIdNotation: 'as-is',
        pugFramework: 'vue',
        pugSingleQuote: false,
        pugAttributeSeparator: 'none',
        pugSortAttributes: 'asc',
        pugSortAttributesBeginning: [
          '^v-if$',
          '^v-else-if$',
          '^v-else$',
          '^v-for$',
          '^v-model',
          '^:is$',
          '^:key$',
          '^v-on$',
          '^v-bind$',
          '^ref$',
          '^name$',
          '^:?type$',
          '^:value$',
          '^:?label$',
          '^:?src$',
        ],
        pugSortAttributesEnd: ['^:id', '^id', '^@click', '^@'],
      },
    });
    expect(actual).toBe(expected);
  });
});
