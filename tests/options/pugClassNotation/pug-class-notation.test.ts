import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from 'src/index';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugClassNotation', () => {
    it('should keep classes as is', () => {
      const code: string = readFileSync(
        resolve(__dirname, 'unformatted.pug'),
        'utf8',
      );
      const actual: string = format(code, {
        parser: 'pug',
        plugins: [plugin],

        pugClassNotation: 'as-is',
      });

      expect(actual).toBe(code);
    });
    it('should keep classes as literals', () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'formatted-literal.pug'),
        'utf8',
      );
      const code: string = readFileSync(
        resolve(__dirname, 'unformatted.pug'),
        'utf8',
      );
      const actual: string = format(code, {
        parser: 'pug',
        plugins: [plugin],

        pugClassNotation: 'literal',
      });

      expect(actual).toBe(expected);
    });
    it('should keep classes as attributes', () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'formatted-attribute.pug'),
        'utf8',
      );
      const code: string = readFileSync(
        resolve(__dirname, 'unformatted.pug'),
        'utf8',
      );
      const actual: string = format(code, {
        parser: 'pug',
        plugins: [plugin],

        pugClassNotation: 'attribute',
      });

      expect(actual).toBe(expected);
    });
    it('should keep classes as literals by default', () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'formatted-literal.pug'),
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
});
