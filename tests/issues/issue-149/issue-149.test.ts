import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should not break attribute wrapping in interpolated tags', () => {
    const { actual, expected } = compareFiles(__dirname, {
      formatOptions: {
        arrowParens: 'avoid',
        bracketSpacing: true,
        endOfLine: 'lf',
        printWidth: 80,
        semi: false,
        singleQuote: true,
        trailingComma: 'es5',

        pugAttributeSeparator: 'always',
        pugSingleQuote: false,
        pugSortAttributes: 'asc',
        pugWrapAttributesPattern: '0',
        pugWrapAttributesThreshold: 1,
      },
    });
    expect(actual).toBe(expected);
  });
});
