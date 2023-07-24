import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should not reformat multiline interpolation strings', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      formatOptions: {
        semi: false,
        singleQuote: true,
      },
    });
    expect(actual).toBe(expected);
  });
});
