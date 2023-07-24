import { format } from 'prettier';
import { plugin } from 'src/index';
import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Pragma', () => {
  it('should insert pragma if option is set', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      source: 'no-pragma.pug',
      target: 'with-pragma.pug',
      formatOptions: {
        insertPragma: true,
        bracketSpacing: false,
      },
    });
    expect(actual).toBe(expected);
  });

  it('should not insert multiple pragma if option is set', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      source: 'no-pragma.pug',
      target: 'with-pragma.pug',
      formatOptions: {
        insertPragma: true,
        bracketSpacing: false,
      },
    });
    const actualSecondRun: string = await format(actual, {
      parser: 'pug',
      plugins: [plugin],

      insertPragma: true,
      bracketSpacing: false,
    });
    expect(actualSecondRun).toBe(expected);
  });

  it('should not insert pragma if option is not set', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      source: 'no-pragma.pug',
      target: 'no-pragma.pug',
      formatOptions: {
        bracketSpacing: false,
      },
    });
    expect(actual).toBe(expected);
  });
});
