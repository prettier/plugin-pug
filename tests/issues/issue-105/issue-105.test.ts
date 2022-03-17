import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { describe, expect, it } from 'vitest';
import { plugin } from './../../../src/index';

describe('Issues', () => {
  it('should prefer pug aliased option', () => {
    const expected: string = readFileSync(
      resolve(__dirname, 'formatted.vue'),
      'utf8',
    );
    const code: string = readFileSync(
      resolve(__dirname, 'unformatted.vue'),
      'utf8',
    );
    const actual: string = format(code, {
      parser: 'vue',
      plugins: [plugin],
      trailingComma: 'none',
      semi: false,
      vueIndentScriptAndStyle: true,
      singleQuote: true,

      pugSingleQuote: false,
    });

    expect(actual).toBe(expected);
  });
});
