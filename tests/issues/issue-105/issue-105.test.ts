import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should prefer pug aliased option', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
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
