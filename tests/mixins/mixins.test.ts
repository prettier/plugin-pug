import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Mixins', () => {
  it('should handle mixins', async () => {
    const { expected, actual } = await compareFiles(import.meta.url);
    expect(actual).toBe(expected);
  });

  it('should indent multiline call arguments relative to the call', async () => {
    const { expected, actual } = await compareFiles(import.meta.url, {
      source: 'multiline-calls.pug',
      target: 'multiline-calls.formatted.pug',
      formatOptions: { pugPrintWidth: 100 },
    });
    expect(actual).toBe(expected);
  });
});
