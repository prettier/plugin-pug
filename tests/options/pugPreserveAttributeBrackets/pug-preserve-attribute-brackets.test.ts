import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugPreserveAttributeBrackets', () => {
    it('should preserve attribute brackets', async () => {
      const { actual, expected } = await compareFiles(__dirname, {
        source: 'unformatted.pug',
        target: 'formatted-true.pug',
        formatOptions: {
          pugPreserveAttributeBrackets: true,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not preserve attribute brackets', async () => {
      const { actual, expected } = await compareFiles(__dirname, {
        source: 'unformatted.pug',
        target: 'formatted-false.pug',
        formatOptions: {
          pugPreserveAttributeBrackets: false,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not preserve attribute brackets by default', async () => {
      const { actual, expected } = await compareFiles(__dirname, {
        source: 'unformatted.pug',
        target: 'formatted-false.pug',
      });
      expect(actual).toBe(expected);
    });
  });
});
