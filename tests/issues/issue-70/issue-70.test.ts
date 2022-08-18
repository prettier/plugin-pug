import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should handle angular framework interpolation', async () => {
    const { actual, expected } = await compareFiles(__dirname, {
      formatOptions: { pugFramework: 'angular' },
    });
    expect(actual).toBe(expected);
  });
});
