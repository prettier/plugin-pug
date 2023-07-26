import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should consider tabWidth when using useTabs', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      formatOptions: {
        useTabs: true,
        tabWidth: 8,
      },
    });
    expect(actual).toBe(expected);
  });
});
