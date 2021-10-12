import type { AttributeToken, TagToken, Token } from 'pug-lexer';
import type { Logger } from '../logger';
import type { PugFramework } from '../options/pug-framework';

/**
 * Returns the previous tag token if there was one.
 *
 * @param tokens The token array.
 * @param index The current index within the token array..
 * @returns Previous tag token if there was one.
 */
export function previousTagToken(tokens: ReadonlyArray<Token>, index: number): TagToken | undefined {
	for (let i: number = index - 1; i >= 0; i--) {
		const token: Token | undefined = tokens[i];
		if (!token) {
			return;
		}
		if (token.type === 'tag') {
			return token;
		}
	}
	return;
}

/**
 * Returns the previous attribute token between the current token and the last occurrence of a `start-attributes` token.
 *
 * @param tokens A reference to the whole token array.
 * @param index The current index on which the cursor is in the token array.
 * @returns Previous attribute token if there was one.
 */
export function previousNormalAttributeToken(tokens: ReadonlyArray<Token>, index: number): AttributeToken | undefined {
	for (let i: number = index - 1; i > 0; i--) {
		const token: Token | undefined = tokens[i];
		if (!token || token.type === 'start-attributes') {
			return;
		}
		if (token.type === 'attribute') {
			if (token.name !== 'class' && token.name !== 'id') {
				return token;
			}
		}
	}
	return;
}

/**
 * Returns the previous type attribute token or undefined if no attribute is present.
 *
 * @param tokens A reference to the whole token array.
 * @param index The current index on which the cursor is in the token array.
 * @returns Previous attribute token if there was one.
 */
export function previousTypeAttributeToken(tokens: ReadonlyArray<Token>, index: number): AttributeToken | undefined {
	for (let i: number = index - 1; i > 0; i--) {
		const token: Token | undefined = tokens[i];
		if (!token || token.type === 'start-attributes' || token.type === 'tag') {
			return;
		}
		if (token.type === 'attribute') {
			if (token.name === 'type') {
				return token;
			}
		}
	}
	return;
}

/**
 * Unwraps line feeds from a given value.
 *
 * @param value The value to unwrap.
 * @returns The unwrapped result.
 */
export function unwrapLineFeeds(value: string): string {
	return value.includes('\n')
		? value
				.split('\n')
				.map((part) => part.trim())
				.map((part) => (part[0] === '.' ? '' : ' ') + part)
				.join('')
				.trim()
		: value;
}

/**
 * Indicates whether the attribute is a `style` normal attribute.
 *
 * ---
 *
 * Example style tag:
 * ```
 * span(style="color: red")
 * ```
 *
 * In this case `name` is `style` and `val` is `"color: red"`.
 *
 * ---
 *
 * @param name Name of tag attribute.
 * @param val Value of `style` tag attribute.
 * @returns Whether it's a style attribute that is quoted or not.
 */
export function isStyleAttribute(name: string, val: string): boolean {
	return name === 'style' && isQuoted(val);
}

/**
 * Indicates whether the value is surrounded by the `start` and `end` parameters.
 *
 * @param val Value of a tag attribute.
 * @param start The left hand side of the wrapping.
 * @param end The right hand side of the wrapping.
 * @param offset The offset from left and right where to search from.
 * @returns Whether the value is wrapped wit start and end from the offset or not.
 */
export function isWrappedWith(val: string, start: string, end: string, offset: number = 0): boolean {
	return val.startsWith(start, offset) && val.endsWith(end, val.length - offset);
}

/**
 * Indicates whether the value is surrounded by quotes.
 *
 * ---
 *
 * Example with double quotes:
 * ```
 * a(href="#")
 * ```
 *
 * In this case `val` is `"#"`.
 *
 * ---
 *
 * Example with single quotes:
 * ```
 * a(href='#')
 * ```
 *
 * In this case `val` is `'#'`.
 *
 * ---
 *
 * Example with no quotes:
 * ```
 * - const route = '#';
 * a(href=route)
 * ```
 *
 * In this case `val` is `route`.
 *
 * ---
 *
 * Special cases:
 * ```
 * a(href='/' + '#')
 * a(href="/" + "#")
 * ```
 *
 * These cases should not be treated as quoted.
 *
 * ---
 *
 * @param val Value of tag attribute.
 * @returns Whether the value is quoted or not.
 */
export function isQuoted(val: string): boolean {
	if (/^(["'`])(.*)\1$/.test(val)) {
		// Regex for checking if there are any unescaped quotations.
		const regex: RegExp = new RegExp(`${val[0]}(?<!\\\\${val[0]})`);
		return !regex.test(val.slice(1, -1));
	}
	return false;
}

/**
 * Detects whether the given value is a single line interpolation or not.
 *
 * @param val The value to check.
 * @returns `true` if it's a single line interpolation, otherwise `false`.
 */
export function isSingleLineWithInterpolation(val: string): boolean {
	return /^`[\s\S]*`$/.test(val) && val.includes('${');
}

/**
 * Detects whether the given value is a multiline interpolation or not.
 *
 * @param val The value to check.
 * @returns `true` if it's a multiline interpolation, otherwise `false`.
 */
export function isMultilineInterpolation(val: string): boolean {
	return /^`[\s\S]*`$/m.test(val) && val.includes('\n');
}

/**
 * Encloses code in brackets and possibly spaces.
 *
 * @param bracketSpacing Specifies whether or not to insert spaces before and after the code.
 * @param code Code that is enclosed in brackets.
 * @param param2 Brackets.
 * @param param2."0" Opening brackets.
 * @param param2."1" Closing brackets.
 * @returns The handled string.
 */
export function handleBracketSpacing(bracketSpacing: boolean, code: string, [opening, closing] = ['{{', '}}']): string {
	return bracketSpacing ? `${opening} ${code} ${closing}` : `${opening}${code}${closing}`;
}

/**
 * Bakes a string.
 *
 * @param rawContent The raw string.
 * @param enclosingQuote Enclosing quote.
 * @param unescapeUnnecessaryEscapes Whether to unescape unnecessary escapes or not. Default: `false`.
 * @returns The baked string.
 * @see [copied from Prettier common util](https://github.com/prettier/prettier/blob/master/src/common/util.js#L647)
 */
export function makeString(
	rawContent: string,
	enclosingQuote: "'" | '"',
	unescapeUnnecessaryEscapes: boolean = false
): string {
	const otherQuote: "'" | '"' = enclosingQuote === '"' ? "'" : '"';
	const newContent: string = rawContent.replace(
		/\\([\s\S])|(['"])/g,
		(match, escaped: "'" | '"', quote: "'" | '"') => {
			if (escaped === otherQuote) {
				return escaped;
			}
			if (quote === enclosingQuote) {
				return `\\${quote}`;
			}
			if (quote) {
				return quote;
			}
			return unescapeUnnecessaryEscapes && /^[^\\nrvtbfux\r\n\u2028\u2029"'0-7]$/.test(escaped)
				? escaped
				: `\\${escaped}`;
		}
	);
	return enclosingQuote + newContent + enclosingQuote;
}

/**
 * See [issue #9](https://github.com/prettier/plugin-pug/issues/9) for more details.
 *
 * @param code Code that is checked.
 * @param quotes Quotes.
 * @param otherQuotes Opposite of quotes.
 * @param logger A logger.
 * @returns Whether dangerous quote combinations where detected or not.
 */
export function detectDangerousQuoteCombination(
	code: string,
	quotes: "'" | '"',
	otherQuotes: "'" | '"',
	logger: Logger
): boolean {
	// Index of primary quote
	const q1: number = code.indexOf(quotes);
	// Index of secondary (other) quote
	const q2: number = code.indexOf(otherQuotes);
	// Index of backtick
	const qb: number = code.indexOf('`');

	if (q1 >= 0 && q2 >= 0 && q2 > q1 && (qb < 0 || q1 < qb)) {
		logger.log({ code, quotes, otherQuotes, q1, q2, qb });
		return true;
	}

	return false;
}

/**
 * Try to detect used framework within the project by reading `process.env.npm_package_*`.
 *
 * @returns PugFramework.
 */
export function detectFramework(): PugFramework {
	try {
		const npmPackages: string[] = Object.keys(process.env)
			.filter((key) => key.startsWith('npm_package_'))
			.filter((key) => /(dev)?[Dd]ependencies_+/.test(key));
		if (npmPackages.some((pack) => pack.includes('vue') && !pack.includes('vuepress'))) {
			return 'vue';
		} else if (npmPackages.some((pack) => pack.includes('svelte'))) {
			return 'svelte';
		} else if (npmPackages.some((pack) => pack.includes('angular'))) {
			return 'angular';
		}
	} catch {
		return 'auto';
	}
	return 'auto';
}
