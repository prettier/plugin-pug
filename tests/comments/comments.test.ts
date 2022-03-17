import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Comments', () => {
  it('should handle comments', () => {
    const { actual, expected } = compareFiles(__dirname, {
      formatOptions: { pugCommentPreserveSpaces: 'trim-all' },
    });
    expect(actual).toBe(expected);
  });
});
