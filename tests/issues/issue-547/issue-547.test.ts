import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should handle tag code while pugSingleFileComponentIndentation is enabled', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      source: 'unformatted.vue',
      target: 'formatted.vue',
      formatOptions: {
        parser: 'vue',
        pugFramework: 'vue',
        pugSingleFileComponentIndentation: true,
      },
    });
    expect(actual).toBe(expected);
  });
});
