import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { URL, fileURLToPath } from 'node:url';
import type { Options } from 'prettier';
import { format } from 'prettier';
import { plugin } from 'src/index';
import { describe, expect, it } from 'vitest';

const __dirname: string = fileURLToPath(new URL('.', import.meta.url));

describe('Options', () => {
  describe('pugExplicitDiv', () => {
    const code: string = readFileSync(
      resolve(__dirname, 'unformatted.pug'),
      'utf8',
    );
    const commonOptions: Options = {
      parser: 'pug',
      plugins: [plugin],

      // use this common options in all tests to force specific wrapping

      pugAttributeSeparator: 'none',
      pugPrintWidth: 80,
    };

    it('should handle unspecified pugExplicitDiv', async () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'formatted-implicit-div.pug'),
        'utf8',
      );
      const actual: string = await format(code, {
        ...commonOptions,
      });

      expect(actual).toBe(expected);
    });

    it('should handle pugExplicitDiv:false', async () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'formatted-implicit-div.pug'),
        'utf8',
      );
      const actual: string = await format(code, {
        ...commonOptions,

        pugExplicitDiv: false,
      });

      expect(actual).toBe(expected);
    });

    it('should handle pugExplicitDiv:true', async () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'formatted-explicit-div.pug'),
        'utf8',
      );
      const actual: string = await format(code, {
        ...commonOptions,

        pugExplicitDiv: true,
      });

      expect(actual).toBe(expected);
    });
  });
});
