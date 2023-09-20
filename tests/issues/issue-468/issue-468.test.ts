import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should end with newline in svelte', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      source: 'unformatted.svelte',
      target: 'formatted.svelte',
      formatOptions: {
        pugFramework: 'svelte',
      },
    });
    expect(actual).toBe(expected);
  });
});
