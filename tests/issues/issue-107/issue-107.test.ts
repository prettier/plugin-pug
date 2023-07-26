import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should not wrap pug in brackets into multi line', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      formatOptions: {
        printWidth: 80,
      },
    });
    expect(actual).toBe(expected);
  });
});
