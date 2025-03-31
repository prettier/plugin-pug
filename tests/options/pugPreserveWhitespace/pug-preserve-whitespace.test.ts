import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugPreserveWhitespace', () => {
    it('should preserve whitespace', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        source: 'unformatted.pug',
        target: 'formatted-true.pug',
        formatOptions: {
          pugPreserveWhitespace: true,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not preserve whitespace', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        source: 'unformatted.pug',
        target: 'formatted-false.pug',
        formatOptions: {
          pugPreserveWhitespace: false,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should preserve whitespace by default', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        source: 'unformatted.pug',
        target: 'formatted-true.pug',
      });
      expect(actual).toBe(expected);
    });
  });
});
