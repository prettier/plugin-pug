import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { format } from 'prettier';
import { plugin } from 'src/index';
import { describe, expect, it } from 'vitest';

describe('Syntax-Errors', () => {
  it('should not format if attributes is not closed', () => {
    const code: string = readFileSync(
      resolve(__dirname, 'attributes-not-closed.pug'),
      'utf8',
    );
    expect(() => {
      format(code, { parser: 'pug', plugins: [plugin] });
    }).toThrow();
  });

  it('should not format if pipeless script tag has syntax error', () => {
    const code: string = readFileSync(
      resolve(__dirname, 'pipeless-script-tag.pug'),
      'utf8',
    );
    expect(() => {
      format(code, { parser: 'pug', plugins: [plugin] });
    }).toThrow();
  });

  it('should format non-JS script without syntax error', () => {
    const code: string = readFileSync(
      resolve(__dirname, 'scripts-with-non-js-contents.pug'),
      'utf8',
    );
    expect(() => {
      format(code, { parser: 'pug', plugins: [plugin] });
    }).not.toThrow();
  });
});
