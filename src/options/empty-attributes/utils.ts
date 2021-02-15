import type { AttributeToken } from 'pug-lexer';
import type { PugEmptyAttributes, PugEmptyAttributesForceQuotes } from '.';

const EMPTY_VALUES: [boolean, string, string] = [true, '""', "''"];

/**
 * Formats the token's `val` if it's empty, based on the `pugEmptyAttributes` option.
 *
 * @param token The attribute token.
 * @param pugEmptyAttributes The option.
 * @param pugEmptyAttributesForceQuotes Array with string-patterns for attribute names that needs empty quotes.
 */
export function formatEmptyAttribute(
	token: AttributeToken,
	pugEmptyAttributes: PugEmptyAttributes,
	pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes
): void {
	const { val, name } = token;

	const forceQuotesPatterns: RegExp[] = pugEmptyAttributesForceQuotes.map((pattern) => new RegExp(pattern));
	const isForced: boolean = forceQuotesPatterns.some((pattern) => pattern.test(name));
	if (isForced) {
		if (token.val === true) {
			token.val = '""';
		}
		return;
	}

	if (pugEmptyAttributes === 'as-is' || !EMPTY_VALUES.includes(val)) {
		return;
	}

	switch (pugEmptyAttributes) {
		case 'all': {
			if (token.val === true) {
				token.val = '""';
			}
			break;
		}
		case 'none': {
			if (token.val === '""' || token.val === "''") {
				token.val = true;
			}
			break;
		}
	}
}
