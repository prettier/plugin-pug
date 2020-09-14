import { ParserOptions } from 'prettier';
import { PugParserOptions } from '.';
import { PugPrinterOptions } from '../printer';

export function convergeOptions(options: ParserOptions & PugParserOptions): PugPrinterOptions {
	return {
		printWidth: options.pugPrintWidth ?? options.printWidth,
		singleQuote: options.pugSingleQuote ?? options.singleQuote,
		tabWidth: options.pugTabWidth ?? options.tabWidth,
		useTabs: options.pugUseTabs ?? options.useTabs,
		bracketSpacing: options.pugBracketSpacing ?? options.bracketSpacing,
		semi: options.pugSemi ?? options.semi,
		attributeSeparator: options.pugAttributeSeparator ?? options.attributeSeparator,
		closingBracketPosition: options.pugClosingBracketPosition ?? options.closingBracketPosition,
		commentPreserveSpaces: options.pugCommentPreserveSpaces ?? options.commentPreserveSpaces
	};
}
