import type { AttributeToken, TagToken, Token } from 'pug-lexer';
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
	if (/^(["'])(.*)\1$/.test(val)) {
		// Regex for checking if there are any unescaped quotations.
		const regex: RegExp = new RegExp(`${val[0]}(?<!\\\\${val[0]})`);
		return !regex.test(val.slice(1, -1));
	}
	return false;
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
 * @returns The handled string.
 */
export function handleBracketSpacing(bracketSpacing: boolean, code: string): string {
	return bracketSpacing ? `{{ ${code} }}` : `{{${code}}}`;
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
 * Try to detect used framework within the project by reading `process.env.npm_package_*`.
 *
 * @returns PugFramework.
 */
export function detectFramework(): PugFramework {
	try {
		const npmPackages: string[] = Object.keys(process.env).filter((key) => key.startsWith('npm_package_'));
		if (npmPackages.some((pack) => pack.includes('_vue'))) {
			return 'vue';
		} else if (npmPackages.some((pack) => pack.includes('_svelte'))) {
			return 'svelte';
		} else if (npmPackages.some((pack) => pack.includes('_angular'))) {
			return 'angular';
		}
	} catch {
		return 'none';
	}
	return 'none';
}
