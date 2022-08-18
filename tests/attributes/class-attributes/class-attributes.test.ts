import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Attributes', () => {
  it('should handle class attributes', async () => {
    const { actual, expected } = await compareFiles(__dirname, {
      formatOptions: { semi: false },
    });
    expect(actual).toBe(expected);
  });
});
