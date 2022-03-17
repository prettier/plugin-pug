import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from 'src/index';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugClassLocation', () => {
    it('should position class literals before attributes', () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'formatted-before.pug'),
        'utf8',
      );
      const code: string = readFileSync(
        resolve(__dirname, 'unformatted.pug'),
        'utf8',
      );
      const actual: string = format(code, {
        parser: 'pug',
        plugins: [plugin],

        pugClassLocation: 'before-attributes',
      });

      expect(actual).toBe(expected);
    });
    it('should position class literals after attributes', () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'formatted-after.pug'),
        'utf8',
      );
      const code: string = readFileSync(
        resolve(__dirname, 'unformatted.pug'),
        'utf8',
      );
      const actual: string = format(code, {
        parser: 'pug',
        plugins: [plugin],

        pugClassLocation: 'after-attributes',
      });

      expect(actual).toBe(expected);
    });
  });
});
