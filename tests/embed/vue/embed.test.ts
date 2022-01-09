import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { describe, expect, test } from 'vitest';
import { plugin } from './../../../src/index';

describe('Embedded', () => {
  test('should format when embedded in vue', () => {
    const expected: string = readFileSync(
      resolve(__dirname, 'formatted.vue'),
      'utf8',
    );
    const code: string = readFileSync(
      resolve(__dirname, 'unformatted.vue'),
      'utf8',
    );
    const actual: string = format(code, {
      parser: 'vue',
      plugins: [plugin],
    });

    expect(actual).toBe(expected);
  });

  test('should format when embedded in vue html reference', () => {
    const expected: string = readFileSync(
      resolve(__dirname, 'formatted-html-reference.vue'),
      'utf8',
    );
    const code: string = readFileSync(
      resolve(__dirname, 'unformatted-html-reference.vue'),
      'utf8',
    );
    const actual: string = format(code, {
      parser: 'vue',
      plugins: [plugin],
    });

    expect(actual).toBe(expected);
  });

  test('should format when embedded in vue empty template', () => {
    const expected: string = readFileSync(
      resolve(__dirname, 'formatted-empty-template.vue'),
      'utf8',
    );
    const code: string = readFileSync(
      resolve(__dirname, 'unformatted-empty-template.vue'),
      'utf8',
    );
    const actual: string = format(code, {
      parser: 'vue',
      plugins: [plugin],
    });

    expect(actual).toBe(expected);
  });
});
