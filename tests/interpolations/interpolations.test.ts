import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { afterEach, describe, expect, it } from 'vitest';
import { plugin } from './../../src/index';

describe('Interpolations', () => {
  const backupProcessEnv: Record<string, string | undefined> = process.env;

  afterEach(() => {
    process.env = { ...backupProcessEnv };
  });

  it('should handle Neutral interpolations', () => {
    const expected: string = readFileSync(
      resolve(__dirname, 'formatted_none.pug'),
      'utf8',
    );
    const code: string = readFileSync(
      resolve(__dirname, 'unformatted_none.pug'),
      'utf8',
    );
    const actual: string = format(code, {
      parser: 'pug',
      plugins: [plugin],
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
