import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should consistently format quotes', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      formatOptions: {
        semi: false,
        singleQuote: true,
        trailingComma: 'none',
        arrowParens: 'avoid',

        pugAttributeSeparator: 'as-needed',
      },
    });
    expect(actual).toBe(expected);
  });
});
