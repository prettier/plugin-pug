import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should trim indentations', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      formatOptions: {
        singleQuote: true,
        useTabs: true,
        tabWidth: 4,
      },
    });
    expect(actual).toBe(expected);
  });
});
