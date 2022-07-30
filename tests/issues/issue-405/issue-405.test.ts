import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should preserve script tag after prettier-ignore', () => {
    const { actual, expected } = compareFiles(__dirname, {
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
