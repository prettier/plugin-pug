import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should consider tabWidth when using useTabs', () => {
    const { actual, expected } = compareFiles(__dirname, {
      formatOptions: {
        useTabs: true,
        tabWidth: 8,
      },
    });
    expect(actual).toBe(expected);
  });
});
