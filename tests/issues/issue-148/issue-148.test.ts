import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should correctly format vue bracket interpolation with pugSingleFileComponentIndentation', () => {
    const { actual, expected } = compareFiles(__dirname, {
      source: 'unformatted.vue',
      target: 'formatted.vue',
      formatOptions: {
        parser: 'vue',

        pugSingleFileComponentIndentation: true,
      },
    });
    expect(actual).toBe(expected);
  });
});
