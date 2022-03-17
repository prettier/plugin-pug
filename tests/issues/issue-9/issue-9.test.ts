import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should escape quotes correctly in angular', () => {
    const { actual, expected } = compareFiles(__dirname, {
      formatOptions: {
        pugFramework: 'angular',
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        singleQuote: false,
        bracketSpacing: true,
      },
    });
    expect(actual).toBe(expected);
  });
});
