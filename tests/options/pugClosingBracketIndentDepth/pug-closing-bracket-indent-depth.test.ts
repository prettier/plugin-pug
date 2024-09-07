import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugClosingBracketIndentDepth', () => {
    it('should handle pugClosingBracketIndentDepth:0', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        target: 'depth-0.pug',
        formatOptions: {
          pugBracketSameLine: false,
          pugClosingBracketIndentDepth: 0,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should handle pugClosingBracketIndentDepth:1', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        target: 'depth-1.pug',
        formatOptions: {
          pugBracketSameLine: false,
          pugClosingBracketIndentDepth: 1,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should default to 0', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        target: 'depth-0.pug',
        formatOptions: {
          pugBracketSameLine: false,
        },
      });
      expect(actual).toBe(expected);
    });
  });
});
