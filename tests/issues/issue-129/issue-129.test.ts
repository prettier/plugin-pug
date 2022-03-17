import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { describe, expect, it } from 'vitest';
import { plugin } from './../../../src/index';

describe('Issues', () => {
  it("should handle vue's v-for with for...of style", () => {
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
    });

    expect(actual).toBe(expected);
  });
});
