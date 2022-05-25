import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import type { Options } from 'prettier';
import { format } from 'prettier';
import type { AttributeToken } from 'pug-lexer';
import { plugin } from 'src/index';

/**
 * Creates a fake attribute token.
 *
 * @param name Name of the attribute.
 * @param val Value of the attribute. Default `'dummy'`.
 * @returns A fake attribute token.
 */
export function createAttributeToken(
  name: string,
  val: string | boolean = 'dummy',
): AttributeToken {
  return {
    name,
    val,
    mustEscape: false,
    type: 'attribute',
    loc: {
      start: { line: 0, column: 0 },
      end: { line: 0, column: 0 },
    },
  };
}

/**
 * Options for `compareFiles`.
 */
export interface CompareFilesOptions {
  /**
   * Name of the source code file. Default `'unformatted.pug'`.
   */
  source?: string;
  /**
   * Name of the target code file. Default `'formatted.pug'`.
   *
   * Pass `null` to explicitly only check the given source.
   */
  target?: string | null;
  /**
   * Further format options.
   *
   * You can also override the `parser` and `plugins` key.
   *
   * @default { parser: 'pug', plugins: [plugin] }
   */
  formatOptions?: Options;
}

/**
 * Result of the comparison.
 */
export interface CompareFilesResult {
  /**
   * The code of the target file.
   *
   * `null` if target was also `null`.
   */
  readonly expected: string | null;
  /**
   * The code of the source file.
   */
  readonly code: string;
  /**
   * The actual formatted result.
   */
  readonly actual: string;
}

/**
 * Compare two files with each other and returns the result to be passed in expect calls.
 *
 * @param dirname Pass `__dirname`, so the function can relative resolve the files.
 * @param param1 Compare options.
 * @param param1.source The source file. Default `'unformatted.pug'`.
 * @param param1.target The target file. Default `'formatted.pug'`. Pass `null` to explicitly only check the given source.
 * @param param1.formatOptions Further format options. Default `{ parser: 'pug', plugins: [plugin] }`. You can also override the parser and plugins key.
 * @returns The result to be passed in expect calls.
 */
export function compareFiles(
  dirname: string,
  {
    source = 'unformatted.pug',
    target = 'formatted.pug',
    formatOptions = {},
  }: CompareFilesOptions = {},
): CompareFilesResult {
  const expected: string | null = target
    ? readFileSync(resolve(dirname, target), 'utf8')
    : null;
  const code: string = readFileSync(resolve(dirname, source), 'utf8');
  const actual: string = format(code, {
    parser: 'pug',
    plugins: [plugin],
    ...formatOptions,
  });

  return { expected, code, actual };
}
