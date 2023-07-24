import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should format inline css styles', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      formatOptions: {
        useTabs: true,
      },
    });
    expect(actual).toBe(expected);
  });
});
