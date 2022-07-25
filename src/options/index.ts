import type { SupportOptions } from 'prettier';
import {
  PUG_SORT_ATTRIBUTES_BEGINNING_OPTION,
  PUG_SORT_ATTRIBUTES_END_OPTION,
  PUG_SORT_ATTRIBUTES_OPTION,
} from './attribute-sorting';
import {
  PUG_ARROW_PARENS_OPTION,
  PUG_BRACKET_SAME_LINE_OPTION,
  PUG_BRACKET_SPACING_OPTION,
  PUG_PRINT_WIDTH_OPTION,
  PUG_SEMI_OPTION,
  PUG_SINGLE_QUOTE_OPTION,
  PUG_TAB_WIDTH_OPTION,
  PUG_USE_TABS_OPTION,
} from './common';
import {
  PUG_EMPTY_ATTRIBUTES_FORCE_QUOTES_OPTION,
  PUG_EMPTY_ATTRIBUTES_OPTION,
} from './empty-attributes';
import { PUG_ATTRIBUTE_SEPARATOR_OPTION } from './pug-attribute-separator';
import { PUG_CLASS_LOCATION } from './pug-class-location';
import { PUG_CLASS_NOTATION } from './pug-class-notation';
import { PUG_COMMENT_PRESERVE_SPACES_OPTION } from './pug-comment-preserve-spaces';
import { PUG_EXPLICIT_DIV } from './pug-explicit-div';
import { PUG_FRAMEWORK } from './pug-framework';
import { PUG_ID_NOTATION } from './pug-id-notation';
import { PUG_PRESERVE_ATTRIBUTE_BRACKETS } from './pug-preserve-attribute-brackets';
import { PUG_SINGLE_FILE_COMPONENT_INDENTATION } from './pug-single-file-component-indentation';
import {
  PUG_WRAP_ATTRIBUTES_PATTERN,
  PUG_WRAP_ATTRIBUTES_THRESHOLD,
} from './pug-wrap-attributes';

/**
 * All supported options by `@prettier/plugin-pug`.
 */
export const options: SupportOptions = {
  pugPrintWidth: PUG_PRINT_WIDTH_OPTION,
  pugSingleQuote: PUG_SINGLE_QUOTE_OPTION,
  pugTabWidth: PUG_TAB_WIDTH_OPTION,
  pugUseTabs: PUG_USE_TABS_OPTION,
  pugBracketSpacing: PUG_BRACKET_SPACING_OPTION,
  pugArrowParens: PUG_ARROW_PARENS_OPTION,
  pugSemi: PUG_SEMI_OPTION,
  pugBracketSameLine: PUG_BRACKET_SAME_LINE_OPTION,
  pugAttributeSeparator: PUG_ATTRIBUTE_SEPARATOR_OPTION,
  pugCommentPreserveSpaces: PUG_COMMENT_PRESERVE_SPACES_OPTION,
  pugSortAttributes: PUG_SORT_ATTRIBUTES_OPTION,
  pugSortAttributesBeginning: PUG_SORT_ATTRIBUTES_BEGINNING_OPTION,
  pugSortAttributesEnd: PUG_SORT_ATTRIBUTES_END_OPTION,
  pugWrapAttributesThreshold: PUG_WRAP_ATTRIBUTES_THRESHOLD,
  pugWrapAttributesPattern: PUG_WRAP_ATTRIBUTES_PATTERN,
  pugEmptyAttributes: PUG_EMPTY_ATTRIBUTES_OPTION,
  pugClassNotation: PUG_CLASS_NOTATION,
  pugIdNotation: PUG_ID_NOTATION,
  pugClassLocation: PUG_CLASS_LOCATION,
  pugExplicitDiv: PUG_EXPLICIT_DIV,
  pugEmptyAttributesForceQuotes: PUG_EMPTY_ATTRIBUTES_FORCE_QUOTES_OPTION,
  pugSingleFileComponentIndentation: PUG_SINGLE_FILE_COMPONENT_INDENTATION,
  pugFramework: PUG_FRAMEWORK,
  pugPreserveAttributeBrackets: PUG_PRESERVE_ATTRIBUTE_BRACKETS,
};

export { CATEGORY_PUG } from './constants';
export type { PugParserOptions } from './types';
