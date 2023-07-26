import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should not add double "." when formatting class location', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      formatOptions: { pugClassLocation: 'after-attributes' },
    });
    expect(actual).toBe(expected);
  });
});
