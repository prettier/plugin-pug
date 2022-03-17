import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should preserve multi-root nodes', () => {
    const { expected, actual } = compareFiles(__dirname);
    expect(actual).toBe(expected);
  });

  it('should preserve multi-root nodes with pugSingleFileComponentIndentation', () => {
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

  it('should preserve multi-root nodes with pugSingleFileComponentIndentation for extends', () => {
    const { actual, expected } = compareFiles(__dirname, {
      source: 'extends-unformatted.vue',
      target: 'extends-formatted.vue',
      formatOptions: {
        parser: 'vue',
        tabWidth: 4,

        pugSingleFileComponentIndentation: true,
      },
    });
    expect(actual).toBe(expected);
  });
});
