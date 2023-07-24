import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should handle multiline inline script', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      formatOptions: {
        printWidth: 120,
        endOfLine: 'auto',
      },
    });
    expect(actual).toBe(expected);
  });
});
