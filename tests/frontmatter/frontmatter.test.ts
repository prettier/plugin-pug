import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Frontmatter', () => {
  it('should format yaml frontmatter', () => {
    const { actual, expected } = compareFiles(__dirname);
    expect(actual).toBe(expected);
  });
});
