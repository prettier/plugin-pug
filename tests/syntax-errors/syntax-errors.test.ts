import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { describe, expect, test } from 'vitest';
import { plugin } from './../../src/index';

describe('Syntax-Errors', () => {
  test('should not format if attributes is not closed', () => {
    const code: string = readFileSync(
      resolve(__dirname, 'attributes-not-closed.pug'),
      'utf8',
    );
    expect(() => {
      format(code, { parser: 'pug', plugins: [plugin] });
    }).toThrow();
  });
  test('should not format if pipeless script tag has syntax error', () => {
    const code: string = readFileSync(
      resolve(__dirname, 'pipeless-script-tag.pug'),
      'utf8',
    );
    expect(() => {
      format(code, { parser: 'pug', plugins: [plugin] });
    }).toThrow();
  });
  test('should format non-JS script without syntax error', () => {
    const code: string = readFileSync(
      resolve(__dirname, 'scripts-with-non-js-contents.pug'),
      'utf8',
    );
    expect(() => {
      format(code, { parser: 'pug', plugins: [plugin] });
    }).not.toThrow();
  });
});
