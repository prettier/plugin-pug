import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should format inline css styles', () => {
    const { actual, expected } = compareFiles(__dirname, {
      formatOptions: {
        useTabs: true,
      },
    });
    expect(actual).toBe(expected);
  });
});
