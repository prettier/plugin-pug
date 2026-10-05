import type { BuiltInParserName } from 'prettier';
import type { AttributeToken } from 'pug-lexer';

const wrappingQuotesRe: RegExp = /(^(["'`]))|((["'`])$)/g;

// Matches style types to the required parser for them
// Note: Types not listed here (e.g. `sass` or `stylus`) are left unformatted,
//       because there is no builtin prettier parser for them
const styleTypeToParserMap: Map<string, BuiltInParserName> = new Map([
  ['css', 'css'],
  ['text/css', 'css'],
  ['less', 'less'],
  ['text/less', 'less'],
  ['scss', 'scss'],
  ['text/scss', 'scss'],
]);

/**
 * Decides which parser to format style contents with.
 *
 * @param typeAttrToken Type token of the style tag.
 * @returns Parser name to parse contents with.
 */
export function getStyleParserName(
  typeAttrToken?: AttributeToken,
): BuiltInParserName | undefined {
  // Omission means CSS
  if (!typeAttrToken) {
    return 'css';
  }

  const typeRaw: string | boolean = typeAttrToken.val;
  // If it's not a string, best not do anything
  if (typeof typeRaw !== 'string') {
    return;
  }

  const type: string = typeRaw.replaceAll(wrappingQuotesRe, '').toLowerCase();

  // Empty type is equivalent to omission
  return type ? styleTypeToParserMap.get(type) : 'css';
}
