import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should prefer pug aliased option', () => {
    const { actual, expected } = compareFiles(__dirname, {
      source: 'unformatted.vue',
      target: 'formatted.vue',
      formatOptions: {
        parser: 'vue',

        trailingComma: 'none',
        semi: false,
        vueIndentScriptAndStyle: true,
        singleQuote: true,

        pugSingleQuote: false,
      },
    });
    expect(actual).toBe(expected);
  });
});
