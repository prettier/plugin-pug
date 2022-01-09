import type { AttributeToken } from 'pug-lexer';

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
