import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should add two empty piped lines before and after link tag', async () => {
    const { expected, actual } = await compareFiles(import.meta.url, {
      formatOptions: { pugPreserveWhitespace: true },
    });
    expect(actual).toBe(expected);
  });
});
