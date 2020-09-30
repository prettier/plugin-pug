import { ParserOptions } from 'prettier';
import { AttributeSeparator, ATTRIBUTE_SEPARATOR_OPTION, PUG_ATTRIBUTE_SEPARATOR_OPTION } from './attribute-separator';
import {
	SortAttributes,
	PUG_SORT_ATTRIBUTES_OPTION,
	PUG_SORT_ATTRIBUTES_BEGINNING_OPTION,
	PUG_SORT_ATTRIBUTES_END_OPTION
} from './attribute-sorting';
import {
	ClosingBracketPosition,
	CLOSING_BRACKET_POSITION_OPTION,
	PUG_CLOSING_BRACKET_POSITION_OPTION
} from './closing-bracket-position';
import {
	CommentPreserveSpaces,
	COMMENT_PRESERVE_SPACES_OPTION,
	PUG_COMMENT_PRESERVE_SPACES_OPTION
} from './comment-preserve-spaces';
import {
	ArrowParens,
	PUG_ARROW_PARENS_OPTION,
	PUG_BRACKET_SPACING_OPTION,
	PUG_PRINT_WIDTH_OPTION,
	PUG_SEMI_OPTION,
	PUG_SINGLE_QUOTE_OPTION,
	PUG_TAB_WIDTH_OPTION,
	PUG_USE_TABS_OPTION
} from './common';

export const CATEGORY_PUG: string = 'Pug';

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
}

export const options = {
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
	pugSortAttributesEnd: PUG_SORT_ATTRIBUTES_END_OPTION
};
