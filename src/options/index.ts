import type { ParserOptions, SupportOptions } from 'prettier';
import type { AttributeSeparator } from './attribute-separator';
import { ATTRIBUTE_SEPARATOR_OPTION, PUG_ATTRIBUTE_SEPARATOR_OPTION } from './attribute-separator';
import type { SortAttributes } from './attribute-sorting';
import {
	PUG_SORT_ATTRIBUTES_BEGINNING_OPTION,
	PUG_SORT_ATTRIBUTES_END_OPTION,
	PUG_SORT_ATTRIBUTES_OPTION
} from './attribute-sorting';
import type { ClosingBracketPosition } from './closing-bracket-position';
import { CLOSING_BRACKET_POSITION_OPTION, PUG_CLOSING_BRACKET_POSITION_OPTION } from './closing-bracket-position';
import type { CommentPreserveSpaces } from './comment-preserve-spaces';
import { COMMENT_PRESERVE_SPACES_OPTION, PUG_COMMENT_PRESERVE_SPACES_OPTION } from './comment-preserve-spaces';
import type { ArrowParens } from './common';
import {
	PUG_ARROW_PARENS_OPTION,
	PUG_BRACKET_SPACING_OPTION,
	PUG_PRINT_WIDTH_OPTION,
	PUG_SEMI_OPTION,
	PUG_SINGLE_QUOTE_OPTION,
	PUG_TAB_WIDTH_OPTION,
	PUG_USE_TABS_OPTION
} from './common';
import type { PugEmptyAttributes, PugEmptyAttributesForceQuotes } from './empty-attributes';
import { PUG_EMPTY_ATTRIBUTES_FORCE_QUOTES_OPTION, PUG_EMPTY_ATTRIBUTES_OPTION } from './empty-attributes';
import type { PugClassNotation } from './pug-class-notation';
import { PUG_CLASS_NOTATION } from './pug-class-notation';
import type { PugFramework } from './pug-framework';
import { PUG_FRAMEWORK } from './pug-framework';
import type { PugIdNotation } from './pug-id-notation';
import { PUG_ID_NOTATION } from './pug-id-notation';
import { PUG_SINGLE_FILE_COMPONENT_INDENTATION } from './pug-single-file-component-indentation';
import { WRAP_ATTRIBUTES_PATTERN, WRAP_ATTRIBUTES_THRESHOLD } from './wrap-attributes';

/**
 * Category for Prettier's CLI.
 */
export const CATEGORY_PUG: string = 'Pug';

/**
 * Extended pug option object.
 */
export interface PugParserOptions
	/* eslint-disable @typescript-eslint/indent */
	extends Pick<
		ParserOptions,
		'printWidth' | 'singleQuote' | 'tabWidth' | 'useTabs' | 'bracketSpacing' | 'arrowParens' | 'semi'
	> {
	/* eslint-enable @typescript-eslint/indent */
	pugPrintWidth: number;
	pugSingleQuote: boolean | null;
	pugTabWidth: number;
	pugUseTabs: boolean | null;
	pugBracketSpacing: boolean | null;
	pugArrowParens: ArrowParens | null;
	pugSemi: boolean | null;

	attributeSeparator: AttributeSeparator;
	pugAttributeSeparator: AttributeSeparator | null;

	closingBracketPosition: ClosingBracketPosition;
	pugClosingBracketPosition: ClosingBracketPosition | null;

	commentPreserveSpaces: CommentPreserveSpaces;
	pugCommentPreserveSpaces: CommentPreserveSpaces | null;

	pugSortAttributes: SortAttributes;
	pugSortAttributesBeginning: string[];
	pugSortAttributesEnd: string[];

	pugWrapAttributesThreshold: number;
	pugWrapAttributesPattern: string;

	pugClassNotation: PugClassNotation;
	pugIdNotation: PugIdNotation;

	pugEmptyAttributes: PugEmptyAttributes;
	pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes;

	pugSingleFileComponentIndentation: boolean;

	pugFramework: PugFramework;
}

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
	attributeSeparator: ATTRIBUTE_SEPARATOR_OPTION,
	pugAttributeSeparator: PUG_ATTRIBUTE_SEPARATOR_OPTION,
	closingBracketPosition: CLOSING_BRACKET_POSITION_OPTION,
	pugClosingBracketPosition: PUG_CLOSING_BRACKET_POSITION_OPTION,
	commentPreserveSpaces: COMMENT_PRESERVE_SPACES_OPTION,
	pugCommentPreserveSpaces: PUG_COMMENT_PRESERVE_SPACES_OPTION,
	pugSortAttributes: PUG_SORT_ATTRIBUTES_OPTION,
	pugSortAttributesBeginning: PUG_SORT_ATTRIBUTES_BEGINNING_OPTION,
	pugSortAttributesEnd: PUG_SORT_ATTRIBUTES_END_OPTION,
	pugWrapAttributesThreshold: WRAP_ATTRIBUTES_THRESHOLD,
	pugWrapAttributesPattern: WRAP_ATTRIBUTES_PATTERN,
	pugEmptyAttributes: PUG_EMPTY_ATTRIBUTES_OPTION,
	pugClassNotation: PUG_CLASS_NOTATION,
	pugIdNotation: PUG_ID_NOTATION,
	pugEmptyAttributesForceQuotes: PUG_EMPTY_ATTRIBUTES_FORCE_QUOTES_OPTION,
	pugSingleFileComponentIndentation: PUG_SINGLE_FILE_COMPONENT_INDENTATION,
	pugFramework: PUG_FRAMEWORK
};
