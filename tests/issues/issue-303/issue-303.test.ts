import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should ignore escaping chars in vue prop', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      formatOptions: {
        singleQuote: true,

        pugSingleQuote: false,
      },
    });
    expect(actual).toBe(expected);
  });
});
