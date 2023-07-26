import { format } from 'prettier';
import { plugin } from 'src/index';
import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should respect printWidth and pugClassLocation with pugSortAttributesEnd', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      formatOptions: {
        printWidth: 120,

        pugSortAttributesEnd: ['^@click'],
        pugClassLocation: 'after-attributes',
      },
    });
    expect(actual).toBe(expected);
  });

  it('should keep same format after two runs with printWidth and pugClassLocation', async () => {
    const { code, expected } = await compareFiles(import.meta.url, {
      formatOptions: {
        printWidth: 120,

        pugClassLocation: 'after-attributes',
      },
    });

    const run2: string = await format(code, {
      parser: 'pug',
      plugins: [plugin],

      printWidth: 120,

      pugClassLocation: 'after-attributes',
    });

    expect(run2).toBe(expected);
  });
});
