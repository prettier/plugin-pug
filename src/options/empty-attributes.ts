import { AttributeToken } from 'pug-lexer';
import { CATEGORY_PUG } from '.';

// eslint-disable-next-line @typescript-eslint/typedef
export const PUG_EMPTY_ATTRIBUTES_OPTION = {
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
export const PUG_EMPTY_ATTRIBUTES_EXCEPTIONS_OPTION = {
	since: '1.9.0',
	category: CATEGORY_PUG,
	type: 'path',
	default: [{ value: [] }],
	array: true,
	description: ''
};

export type PugEmptyAttributes = 'as-is' | 'none' | 'all';
export type PugEmptyAttributesExceptions = string[];

const emptyValues: [boolean, string, string] = [true, '""', "''"];

export function formatEmptyAttribute(
	token: AttributeToken,
	pugEmptyAttributes: PugEmptyAttributes,
	pugEmptyAttributesExceptions: PugEmptyAttributesExceptions
): void {
	const { val, name } = token;
	if (pugEmptyAttributes === 'as-is' || !emptyValues.includes(val)) {
		return;
	}

	const patterns: RegExp[] = pugEmptyAttributesExceptions.map((pattern) => new RegExp(pattern));
	const isException: boolean = patterns.some((pattern) => pattern.test(name));
	if (isException) {
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
		default:
			break;
	}
}
