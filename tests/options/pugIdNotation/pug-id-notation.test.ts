import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('useIdLiterals', () => {
    it('should keep classes as is', async () => {
      const { actual, code } = await compareFiles(import.meta.url, {
        source: 'formatted-attribute.pug',
        target: null,
        formatOptions: {
          pugIdNotation: 'as-is',
        },
      });
      expect(actual).toBe(code);
    });

    it('should keep classes as literals', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        source: 'formatted-attribute.pug',
        target: 'formatted-literal.pug',
        formatOptions: {
          pugIdNotation: 'literal',
        },
      });
      expect(actual).toBe(expected);
    });

    it('should keep classes as literals by default', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        source: 'formatted-attribute.pug',
        target: 'formatted-literal.pug',
      });
      expect(actual).toBe(expected);
    });
  });
});
