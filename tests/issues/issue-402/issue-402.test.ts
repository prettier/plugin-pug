import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should preserve script tag after prettier-ignore', async () => {
    const { actual, expected } = await compareFiles(import.meta.url);
    expect(actual).toBe(expected);
  });
});
