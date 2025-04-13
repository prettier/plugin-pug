import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Quotes', () => {
  it('should format single to double quotes', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      formatOptions: {
        singleQuote: false,
      },
    });
    expect(actual).toBe(expected);
  });

  it('should use double quotes by default', async () => {
    const { expected, actual } = await compareFiles(import.meta.url);
    expect(actual).toBe(expected);
  });
});
