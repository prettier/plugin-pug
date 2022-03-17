import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should indent templates starting with literal class when using pugSingleFileComponentIndentation', () => {
    const { actual, expected } = compareFiles(__dirname, {
      source: 'class-not-indented.vue',
      target: 'class-indented.vue',
      formatOptions: {
        parser: 'vue',

        pugSingleFileComponentIndentation: true,
      },
    });
    expect(actual).toBe(expected);
  });

  it('should indent templates starting with literal ID when using pugSingleFileComponentIndentation', () => {
    const { actual, expected } = compareFiles(__dirname, {
      source: 'id-not-indented.vue',
      target: 'id-indented.vue',
      formatOptions: {
        parser: 'vue',

        pugSingleFileComponentIndentation: true,
      },
    });
    expect(actual).toBe(expected);
  });
});
