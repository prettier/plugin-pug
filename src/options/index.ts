import { ParserOptions } from 'prettier';
import {
	AttributeSeparator,
	ATTRIBUTE_SEPARATOR_OPTION_DEFINITION,
	PUG_ATTRIBUTE_SEPARATOR_OPTION_DEFINITION
} from './attribute-separator';
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
	PUG_BRACKET_SPACING_OPTION,
	PUG_PRINT_WIDTH_OPTION,
	PUG_SEMI_OPTION,
	PUG_SINGLE_QUOTE_OPTION,
	PUG_TAB_WIDTH_OPTION,
	PUG_USE_TABS_OPTION
} from './common';

export const CATEGORY_PUG: string = 'Pug';

export interface PugParserOptions
	extends Pick<ParserOptions, 'printWidth' | 'singleQuote' | 'tabWidth' | 'useTabs' | 'bracketSpacing' | 'semi'> {
	pugPrintWidth?: number;
	pugSingleQuote?: boolean;
	pugTabWidth?: number;
	pugUseTabs?: boolean;
	pugBracketSpacing?: boolean;
	pugSemi?: boolean;

	attributeSeparator: AttributeSeparator;
	pugAttributeSeparator?: AttributeSeparator;

	closingBracketPosition: ClosingBracketPosition;
	pugClosingBracketPosition?: ClosingBracketPosition;

	commentPreserveSpaces: CommentPreserveSpaces;
	pugCommentPreserveSpaces?: CommentPreserveSpaces;
}

export const options = {
	pugPrintWidth: PUG_PRINT_WIDTH_OPTION,
	pugSingleQuote: PUG_SINGLE_QUOTE_OPTION,
	pugTabWidth: PUG_TAB_WIDTH_OPTION,
	pugUseTabs: PUG_USE_TABS_OPTION,
	pugBracketSpacing: PUG_BRACKET_SPACING_OPTION,
	pugSemi: PUG_SEMI_OPTION,
	attributeSeparator: ATTRIBUTE_SEPARATOR_OPTION_DEFINITION,
	pugAttributeSeparator: PUG_ATTRIBUTE_SEPARATOR_OPTION_DEFINITION,
	closingBracketPosition: CLOSING_BRACKET_POSITION_OPTION,
	pugClosingBracketPosition: PUG_CLOSING_BRACKET_POSITION_OPTION,
	commentPreserveSpaces: COMMENT_PRESERVE_SPACES_OPTION,
	pugCommentPreserveSpaces: PUG_COMMENT_PRESERVE_SPACES_OPTION
};
