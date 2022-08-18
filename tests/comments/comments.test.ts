import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Comments', () => {
  it('should handle comments', async () => {
    const { actual, expected } = await compareFiles(__dirname, {
      formatOptions: { pugCommentPreserveSpaces: 'trim-all' },
    });
    expect(actual).toBe(expected);
  });
});
