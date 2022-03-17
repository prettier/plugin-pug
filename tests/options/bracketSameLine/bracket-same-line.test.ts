import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('bracketSameLine', () => {
    it('should handle bracketSameLine:true', () => {
      const { actual, expected } = compareFiles(__dirname, {
        target: 'same-line.pug',
        formatOptions: {
          bracketSameLine: true,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should handle pugBracketSameLine:true', () => {
      const { actual, expected } = compareFiles(__dirname, {
        target: 'same-line.pug',
        formatOptions: {
          pugBracketSameLine: true,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should handle bracketSameLine:false', () => {
      const { actual, expected } = compareFiles(__dirname, {
        target: 'new-line.pug',
        formatOptions: {
          bracketSameLine: false,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should handle pugBracketSameLine:false', () => {
      const { actual, expected } = compareFiles(__dirname, {
        target: 'new-line.pug',
        formatOptions: {
          pugBracketSameLine: false,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should handle default', () => {
      const { actual, expected } = compareFiles(__dirname, {
        target: 'new-line.pug',
      });
      expect(actual).toBe(expected);
    });
  });
});
