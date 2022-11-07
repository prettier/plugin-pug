import { compareFiles } from 'tests/common';
import type { SpyInstance } from 'vitest';
import { describe, expect, it, vi } from 'vitest';

describe('Issues', () => {
  it('should log a warning when passing inline object literal to custom vue directive and pugFramework is not set', () => {
    const spyConsoleWarn: SpyInstance<
      [message?: any, ...optionalParams: any[]],
      void
    > = vi.spyOn(console, 'warn');

    const { expected, actual } = compareFiles(__dirname);
    expect(actual).toBe(expected);

    expect(spyConsoleWarn).toHaveBeenCalledWith(
      'The following expression could not be formatted correctly. Please try to fix it yourself and if there is a problem, please open a bug issue:',
      'disabled: !!selectedTopic',
    );

    spyConsoleWarn.mockRestore();
  });

  it('should not log a warning when passing inline object literal to custom vue directive and pugFramework is set to vue', () => {
    const spyConsoleWarn: SpyInstance<
      [message?: any, ...optionalParams: any[]],
      void
    > = vi.spyOn(console, 'warn');

    const { expected, actual } = compareFiles(__dirname, {
      formatOptions: { pugFramework: 'vue' },
    });
    expect(actual).toBe(expected);

    expect(spyConsoleWarn).not.toHaveBeenCalled();

    spyConsoleWarn.mockRestore();
  });
});
