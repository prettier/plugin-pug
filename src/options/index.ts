import { ParserOptions } from 'prettier';
import { AttributeSeparator, ATTRIBUTE_SEPARATOR_OPTION_DEFINITION } from './attribute-separator';
import { ClosingBracketPosition, CLOSING_BRACKET_POSITION_OPTION } from './closing-bracket-position';
import { CommentPreserveSpaces, COMMENT_PRESERVE_SPACES_OPTION } from './comment-preserve-spaces';

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
	attributeSeparator: ATTRIBUTE_SEPARATOR_OPTION_DEFINITION,
	closingBracketPosition: CLOSING_BRACKET_POSITION_OPTION,
	commentPreserveSpaces: COMMENT_PRESERVE_SPACES_OPTION
};
