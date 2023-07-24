import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should trim trailing whitespace after tag', async () => {
    const { expected, actual } = await compareFiles(import.meta.url);
    expect(actual).toBe(expected);
  });

  it('should not change', async () => {
    const { expected, actual } = await compareFiles(import.meta.url, {
      source: 'formatted.pug',
    });
    expect(actual).toBe(expected);
  });
});
