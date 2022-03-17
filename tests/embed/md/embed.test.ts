import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from 'src/index';
import { describe, expect, it } from 'vitest';

describe('Embedded', () => {
  it('should format when embedded in markdown', () => {
    const expected: string = readFileSync(
      resolve(__dirname, 'formatted.md'),
      'utf8',
    );
    const code: string = readFileSync(
      resolve(__dirname, 'unformatted.md'),
      'utf8',
    );
    const actual: string = format(code, {
      parser: 'markdown',
      plugins: [plugin],
    });

    expect(actual).toBe(expected);
  });
});
