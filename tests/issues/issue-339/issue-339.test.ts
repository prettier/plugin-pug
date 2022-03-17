import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { describe, expect, test } from 'vitest';
import { plugin } from './../../../src/index';

describe('Issue339', () => {
  test('should handle singleQuote:true + pugSingleQuote:false in framework interpolation', () => {
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
  test('should handle singleQuote:false + pugSingleQuote:true in framework interpolation', () => {
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
