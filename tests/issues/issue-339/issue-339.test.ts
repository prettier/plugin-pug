import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from 'src/index';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should handle singleQuote:true + pugSingleQuote:false in framework interpolation', () => {
    const expected: string = readFileSync(
      resolve(__dirname, 'single-quotes.pug'),
      'utf8',
    );
    const code: string = readFileSync(
      resolve(__dirname, 'double-quotes.pug'),
      'utf8',
    );
    const actual: string = format(code, {
      parser: 'pug',
      plugins: [plugin],
      singleQuote: true,
      pugSingleQuote: false,
    });

    expect(actual).toBe(expected);
  });

  it('should handle singleQuote:false + pugSingleQuote:true in framework interpolation', () => {
    const expected: string = readFileSync(
      resolve(__dirname, 'double-quotes.pug'),
      'utf8',
    );
    const code: string = readFileSync(
      resolve(__dirname, 'single-quotes.pug'),
      'utf8',
    );
    const actual: string = format(code, {
      parser: 'pug',
      plugins: [plugin],
      singleQuote: false,
      pugSingleQuote: true,
    });

    expect(actual).toBe(expected);
  });
});
