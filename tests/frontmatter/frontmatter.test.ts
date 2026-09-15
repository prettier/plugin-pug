import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Frontmatter', () => {
  it('should format yaml frontmatter', async () => {
    const { expected, actual } = await compareFiles(import.meta.url);
    expect(actual).toBe(expected);
  });
});
