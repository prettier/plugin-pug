import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { format } from 'prettier';
import { plugin } from 'src/index';
import { compareFiles } from 'tests/common';
import { afterEach, describe, expect, it } from 'vitest';

describe('Interpolations', () => {
  const backupProcessEnv: Record<string, string | undefined> = process.env;

  afterEach(() => {
    process.env = { ...backupProcessEnv };
  });

  it('should handle Neutral interpolations', () => {
    const { actual, expected } = compareFiles(__dirname, {
      source: 'unformatted_none.pug',
      target: 'formatted_none.pug',
    });
    expect(actual).toBe(expected);
  });

  it('should handle Angular interpolations', () => {
    const expected: string = readFileSync(
      resolve(__dirname, 'formatted_angular.pug'),
      'utf8',
    );
    const code: string = readFileSync(
      resolve(__dirname, 'unformatted_angular.pug'),
      'utf8',
    );

    // process.env should be ignored
    process.env.npm_package_dependencies_vue = 'some version';

    const actual: string = format(code, {
      parser: 'pug',
      plugins: [plugin],

      pugFramework: 'angular',
    });
    expect(actual).toBe(expected);
  });

  it('should handle Vue interpolations', () => {
    const expected: string = readFileSync(
      resolve(__dirname, 'formatted_vue.pug'),
      'utf8',
    );
    const code: string = readFileSync(
      resolve(__dirname, 'unformatted_vue.pug'),
      'utf8',
    );

    // process.env should be ignored
    process.env.npm_package_devDependencies_svelte = 'some version';

    const actual: string = format(code, {
      parser: 'pug',
      plugins: [plugin],

      pugFramework: 'vue',
    });
    expect(actual).toBe(expected);
  });
});
