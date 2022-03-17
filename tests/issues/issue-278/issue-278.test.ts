import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { describe, expect, it } from 'vitest';
import { plugin } from './../../../src/index';

describe('Issues', () => {
  it('should trim indentations', () => {
    const expected: string = readFileSync(
      resolve(__dirname, 'formatted.pug'),
      'utf8',
    );
    const code: string = readFileSync(
      resolve(__dirname, 'unformatted.pug'),
      'utf8',
    );
    const actual: string = format(code, {
      parser: 'pug',
      plugins: [plugin],
      singleQuote: true,
      useTabs: true,
      tabWidth: 4,
    });

    expect(actual).toBe(expected);
  });
});
