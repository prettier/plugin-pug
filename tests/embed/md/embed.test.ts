import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Embedded', () => {
  it('should format when embedded in markdown', () => {
    const { actual, expected } = compareFiles(__dirname, {
      source: 'unformatted.md',
      target: 'formatted.md',
      formatOptions: { parser: 'markdown' },
    });
    expect(actual).toBe(expected);
  });
});
