import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Parser } from 'prettier';
import { parsers } from 'src/index';
import { describe, expect, it } from 'vitest';

// ts-jest needs the exclamation mark, so it does not have the impression that the variables are undefined
const pugParser: Parser = parsers!.pug!;

describe('Pragma', () => {
  it('should detect pragma @prettier', () => {
    const code: string = readFileSync(
      resolve(import.meta.dirname, 'pragma-prettier.pug'),
      'utf8',
    );
    const actual: boolean = pugParser.hasPragma!(code);

    expect(actual).toBeTruthy();
  });

  it('should detect pragma @format', () => {
    const code: string = readFileSync(
      resolve(import.meta.dirname, 'pragma-format.pug'),
      'utf8',
    );
    const actual: boolean = pugParser.hasPragma!(code);

    expect(actual).toBeTruthy();
  });

  it('should detect no pragma ', () => {
    const code: string = readFileSync(
      resolve(import.meta.dirname, 'no-pragma.pug'),
      'utf8',
    );
    const actual: boolean = pugParser.hasPragma!(code);

    expect(actual).toBeFalsy();
  });
});
