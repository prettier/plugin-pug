import { AttributeToken } from 'pug-lexer';
import { ChoiceSupportOption, PathArraySupportOption } from 'prettier';
import { CATEGORY_PUG } from '.';

// eslint-disable-next-line @typescript-eslint/typedef
export const PUG_EMPTY_ATTRIBUTES_OPTION: ChoiceSupportOption = {
	since: '1.9.0',
	category: CATEGORY_PUG,
	type: 'choice',
	default: 'as-is',
	description: 'Change behavior of spaces within comments.',
	choices: [
		{
			value: 'as-is',
			description: ''
		},
		{
			value: 'none',
			description: ''
		},
		{
			value: 'all',
			description: ''
		}
	]
};

// eslint-disable-next-line @typescript-eslint/typedef
export const PUG_EMPTY_ATTRIBUTES_FORCE_QUOTES_OPTION: PathArraySupportOption = {
	since: '1.9.0',
	category: CATEGORY_PUG,
	type: 'path',
	default: ([{ value: [] }] as unknown) as string[],
	array: true,
	description: ''
};

export type PugEmptyAttributes = 'as-is' | 'none' | 'all';
export type PugEmptyAttributesForceQuotes = string[];

////////////////////////////////////////////////////////////////////////////////

const emptyValues: [boolean, string, string] = [true, '""', "''"];

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

	if (pugEmptyAttributes === 'as-is' || !emptyValues.includes(val)) {
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
