import type { ParserOptions } from 'prettier';
import type { PugParserOptions } from '.';
import type { PugPrinterOptions } from '../printer';

/**
 * Convert and merge options from Prettier and `pug`-specific options into one option object with normalized default values.
 *
 * @param options Options passed into the plugin by Prettier.
 * @returns The converged options.
 */
export function convergeOptions(options: ParserOptions & PugParserOptions): PugPrinterOptions {
	return {
		// Prettier base options
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
		bracketSameLine: options.bracketSameLine,
		pugBracketSameLine: options.pugBracketSameLine ?? options.bracketSameLine,

		// Pug specific options
		pugAttributeSeparator: options.pugAttributeSeparator,
		pugCommentPreserveSpaces: options.pugCommentPreserveSpaces,
		pugSortAttributes: options.pugSortAttributes,
		pugSortAttributesBeginning: options.pugSortAttributesBeginning,
		pugSortAttributesEnd: options.pugSortAttributesEnd,
		pugWrapAttributesThreshold: options.pugWrapAttributesThreshold,
		pugWrapAttributesPattern: options.pugWrapAttributesPattern,
		pugClassNotation: options.pugClassNotation,
		pugIdNotation: options.pugIdNotation,
		pugEmptyAttributes: options.pugEmptyAttributes,
		pugEmptyAttributesForceQuotes: options.pugEmptyAttributesForceQuotes,
		pugSingleFileComponentIndentation:
			options.pugSingleFileComponentIndentation && options.__embeddedInHtml === true,
		pugFramework: options.pugFramework,
		pugExplicitDiv: options.pugExplicitDiv
	};
}
