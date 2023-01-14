import path from 'path';

import type { CompareFilesOptions } from 'tests/common';
import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

const getName: (v: boolean) => string = (v) => (v ? 'semi' : 'none');

describe('semi handling', () => {
  const matrix: Array<{ from: boolean; to: boolean }> = [
    { from: true, to: true },
    { from: true, to: false },
    { from: false, to: true },
    { from: false, to: false },
  ];

  for (const { from, to } of matrix) {
    const _from: string = getName(from);
    const _to: string = getName(to);

    it(`it should format script tags with ${_from} inline code to ${_to}`, () => {
      const fixturesPath: string = path.join(__dirname, `${_from}-${_to}`);
      const options: CompareFilesOptions = { formatOptions: { semi: to } };

      const { expected, actual } = compareFiles(fixturesPath, options);

      expect(actual).toBe(expected);
    });
  }
});
