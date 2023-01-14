import path from 'path';

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
    (from, to) => {
      const fixturesPath: string = path.join(__dirname, `${from}-${to}`);
      const options: CompareFilesOptions = {
        formatOptions: { semi: to === 'semi' },
      };

      const { expected, actual } = compareFiles(fixturesPath, options);

      expect(actual).toBe(expected);
    },
  );
});
