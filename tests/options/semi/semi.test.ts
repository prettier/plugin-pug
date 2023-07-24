import type { CompareFilesOptions } from 'tests/common';
import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('semi handling', () => {
  it.each([
    ['semi', 'semi'],
    ['semi', 'none'],
    ['none', 'semi'],
    ['none', 'none'],
  ] as const)(
    'should format script tags with %s inline code to %s',
    async (from, to) => {
      const options: CompareFilesOptions = {
        source: `${from}-${to}/unformatted.pug`,
        target: `${from}-${to}/formatted.pug`,
        formatOptions: { semi: to === 'semi' },
      };

      const { expected, actual } = await compareFiles(import.meta.url, options);

      expect(actual).toBe(expected);
    },
  );
});
