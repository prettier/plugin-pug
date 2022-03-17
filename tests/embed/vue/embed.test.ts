import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Embedded', () => {
  it('should format when embedded in vue', () => {
    const { actual, expected } = compareFiles(__dirname, {
      source: 'unformatted.vue',
      target: 'formatted.vue',
      formatOptions: {
        parser: 'vue',
      },
    });
    expect(actual).toBe(expected);
  });

  it('should format when embedded in vue html reference', () => {
    const { actual, expected } = compareFiles(__dirname, {
      source: 'unformatted-html-reference.vue',
      target: 'formatted-html-reference.vue',
      formatOptions: {
        parser: 'vue',
      },
    });
    expect(actual).toBe(expected);
  });

  it('should format when embedded in vue empty template', () => {
    const { actual, expected } = compareFiles(__dirname, {
      source: 'unformatted-empty-template.vue',
      target: 'formatted-empty-template.vue',
      formatOptions: {
        parser: 'vue',
      },
    });
    expect(actual).toBe(expected);
  });
});
