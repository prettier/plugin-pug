import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Embedded', () => {
  it('should format when embedded in markdown', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      source: 'unformatted.md',
      target: 'formatted.md',
      formatOptions: { parser: 'markdown' },
    });
    expect(actual).toBe(expected);
  });
});
