import 'prettier';
import type { PugParserOptions } from './options';

declare module 'prettier' {
	// eslint-disable-next-line jsdoc/require-jsdoc
	export interface Options {
		/**
		 * The line length where Prettier will try wrap.
		 *
		 * Default: Fallback to `printWidth`
		 */
		pugPrintWidth?: PugParserOptions['pugPrintWidth'];
		/**
		 * Use single quotes instead of double quotes.
		 *
		 * Default: Fallback to `singleQuote`
		 */
		pugSingleQuote?: PugParserOptions['pugSingleQuote'];
		/**
		 * Number of spaces per indentation level.
		 *
		 * Default: Fallback to `tabWidth`
		 */
		pugTabWidth?: PugParserOptions['pugTabWidth'];
		/**
		 * Indent lines with tabs instead of spaces.
		 *
		 * Default: Fallback to `useTabs`
		 */
		pugUseTabs?: PugParserOptions['pugUseTabs'];
		/**
		 * Print spaces between brackets in object literals.
		 *
		 * Default: Fallback to `bracketSpacing`
		 */
		pugBracketSpacing?: PugParserOptions['pugBracketSpacing'];
		/**
		 * Include parentheses around a sole arrow function parameter.
		 *
		 * Default: Fallback to `arrowParens`
		 */
		pugArrowParens?: PugParserOptions['pugArrowParens'];
		/**
		 * Print semicolons at the ends of statements.
		 *
		 * Default: Fallback to `semi`
		 */
		pugSemi?: PugParserOptions['pugSemi'];
		/**
		 * Put the `)` of a multi-line element at the end of the last line instead of being alone on the next line.
		 *
		 * Default: Fallback to `bracketSameLine`
		 */
		pugBracketSameLine?: PugParserOptions['pugBracketSameLine'];
		/**
		 * Change when attributes are separated by commas in tags.
		 *
		 * @default 'always'
		 */
		pugAttributeSeparator?: PugParserOptions['pugAttributeSeparator'];
		/**
		 * Change behavior of spaces within comments.
		 *
		 * @default 'keep-all'
		 */
		pugCommentPreserveSpaces?: PugParserOptions['pugCommentPreserveSpaces'];
		/**
		 * Sort attributes that are not on _beginning_ and _end_ patterns.
		 *
		 * @default 'as-is'
		 */
		pugSortAttributes?: PugParserOptions['pugSortAttributes'];
		/**
		 * Define a list of patterns for attributes that are sorted to the beginning.
		 *
		 * @default []
		 */
		pugSortAttributesBeginning?: PugParserOptions['pugSortAttributesBeginning'];
		/**
		 * Define a list of patterns for attributes that are sorted at the end.
		 *
		 * @default []
		 */
		pugSortAttributesEnd?: PugParserOptions['pugSortAttributesEnd'];
		/**
		 * The maximum amount of attributes that an element can appear with on one line before it gets wrapped.
		 *
		 * @default -1
		 */
		pugWrapAttributesThreshold?: PugParserOptions['pugWrapAttributesThreshold'];
		/**
		 * Regex pattern to match attributes against that should always trigger wrapping.
		 *
		 * @default []
		 */
		pugWrapAttributesPattern?: PugParserOptions['pugWrapAttributesPattern'];
		/**
		 * Define how classes should be formatted.
		 *
		 * @default 'literal'
		 */
		pugClassNotation?: PugParserOptions['pugClassNotation'];
		/**
		 * Define how the id should be formatted.
		 *
		 * @default 'literal'
		 */
		pugIdNotation?: PugParserOptions['pugIdNotation'];
		/**
		 * Include `div` tag when followed by literal class or id syntax.
		 *
		 * @default false
		 */
		pugExplicitDiv?: PugParserOptions['pugExplicitDiv'];
		/**
		 * Change behavior of boolean attributes.
		 *
		 * @default 'as-is'
		 */
		pugEmptyAttributes?: PugParserOptions['pugEmptyAttributes'];
		/**
		 * Change behavior of boolean attributes.
		 *
		 * @default 'as-is'
		 */
		pugEmptyAttributesForceQuotes?: PugParserOptions['pugEmptyAttributesForceQuotes'];
		/**
		 * Indent pug in template tags in single file components such as from vue or svelte.
		 *
		 * @default false
		 */
		pugSingleFileComponentIndentation?: PugParserOptions['pugSingleFileComponentIndentation'];
		/**
		 * Define which framework is used in the project.
		 *
		 * @default 'auto'
		 */
		pugFramework?: PugParserOptions['pugFramework'];
	}
}
