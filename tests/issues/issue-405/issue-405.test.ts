import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should preserve script tag after prettier-ignore', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      source: 'unformatted.vue',
      target: 'formatted.vue',
      formatOptions: {
        parser: 'vue',
        pugFramework: 'vue',
        pugClassNotation: 'attribute',
        pugExplicitDiv: true,
      },
    });
    expect(actual).toBe(expected);
  });
});
