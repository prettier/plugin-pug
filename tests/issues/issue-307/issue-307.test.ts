import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from 'src/index';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should set tab to 4 spaces', () => {
    const expected: string = readFileSync(
      resolve(__dirname, 'formatted.pug'),
      'utf8',
    );
    const code: string = readFileSync(
      resolve(__dirname, 'unformatted.pug'),
      'utf8',
    );
    const actual: string = format(code, {
      plugins: [plugin],
      arrowParens: 'avoid',
      singleQuote: true,
      tabWidth: 4,
      parser: 'pug',
    });

    expect(actual).toBe(expected);
  });
});
