import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should handle angular framework interpolation', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      formatOptions: { pugFramework: 'angular' },
    });
    expect(actual).toBe(expected);
  });
});
