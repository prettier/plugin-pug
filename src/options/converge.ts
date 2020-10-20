import { ParserOptions } from 'prettier';
import { PugParserOptions } from '.';
import { PugPrinterOptions } from '../printer';

/**
 * Convert and merge options from Prettier and `pug`-specific options into one option object with normalized default values.
 *
 * @param options Options passed into the plugin by Prettier
 */
export function convergeOptions(options: ParserOptions & PugParserOptions): PugPrinterOptions {
	return {
		printWidth: options.printWidth,
		pugPrintWidth: options.pugPrintWidth !== -1 ? options.pugPrintWidth : options.printWidth,
		singleQuote: options.singleQuote,
		pugSingleQuote: options.pugSingleQuote ?? options.singleQuote,
		tabWidth: options.tabWidth,
		pugTabWidth: options.pugTabWidth !== -1 ? options.pugTabWidth : options.tabWidth,
		useTabs: options.useTabs,
		pugUseTabs: options.pugUseTabs ?? options.useTabs,
		bracketSpacing: options.bracketSpacing,
		pugBracketSpacing: options.pugBracketSpacing ?? options.bracketSpacing,
		arrowParens: options.arrowParens,
		pugArrowParens: options.pugArrowParens ?? options.arrowParens,
		semi: options.semi,
		pugSemi: options.pugSemi ?? options.semi,
		attributeSeparator: options.pugAttributeSeparator ?? options.attributeSeparator,
		closingBracketPosition: options.pugClosingBracketPosition ?? options.closingBracketPosition,
		commentPreserveSpaces: options.pugCommentPreserveSpaces ?? options.commentPreserveSpaces,
		pugSortAttributes: options.pugSortAttributes,
		pugSortAttributesBeginning: options.pugSortAttributesBeginning,
		pugSortAttributesEnd: options.pugSortAttributesEnd,
		pugWrapAttributesThreshold: options.pugWrapAttributesThreshold,
		pugWrapAttributesPattern: options.pugWrapAttributesPattern,
		pugEmptyAttributes: options.pugEmptyAttributes,
		pugEmptyAttributesForceQuotes: options.pugEmptyAttributesForceQuotes,
		pugSingleFileComponentIndentation: options.pugSingleFileComponentIndentation && options.embeddedInHtml
	};
}
