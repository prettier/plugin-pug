import type { ChoiceSupportOption } from 'prettier';
import { CATEGORY_PUG } from '.';

/** Closing bracket position option. */
export const CLOSING_BRACKET_POSITION_OPTION: ChoiceSupportOption<ClosingBracketPosition> = {
	since: '1.3.0',
	category: CATEGORY_PUG,
	type: 'choice',
	default: 'new-line',
	description: 'Determines position of closing bracket which wraps attributes.',
	choices: [
		{
			value: 'new-line',
			description: `
				Closing bracket ends with a new line.
				Example:
				input(
					type='text',
					value='my_value',
					name='my_name',
					alt='my_alt',
					autocomplete='on'
				)
				`
		},
		{
			value: 'last-line',
			description: `
			Closing bracket remains with last attribute's line.
			Example:
			input(
				type='text',
				value='my_value',
				name='my_name',
				alt='my_alt',
				autocomplete='on')
			`
		}
	]
};

/** Pug closing bracket position option. */
export const PUG_CLOSING_BRACKET_POSITION_OPTION: ChoiceSupportOption<ClosingBracketPosition | null> = {
	...CLOSING_BRACKET_POSITION_OPTION,
	since: '1.6.0',
	default: null,
	choices: [
		{
			value: null,
			description: 'Use `closingBracketPosition` value.'
		},
		{
			value: 'new-line',
			description: `
				Closing bracket ends with a new line.
				Example:
				input(
					type='text',
					value='my_value',
					name='my_name',
					alt='my_alt',
					autocomplete='on'
				)
				`
		},
		{
			value: 'last-line',
			description: `
			Closing bracket remains with last attribute's line.
			Example:
			input(
				type='text',
				value='my_value',
				name='my_name',
				alt='my_alt',
				autocomplete='on')
			`
		}
	]
};

/** Closing bracket position. */
export type ClosingBracketPosition = 'new-line' | 'last-line';

/**
 * Checks if the given `closingBracketPosition` is valid.
 *
 * @param closingBracketPosition The closingBracketPosition.
 * @returns `true` if closingBracketPosition was `'new-line'` or `false` if it was `'last-line'`.
 * @throws Error if the closingBracketPosition was not valid.
 */
export function resolveClosingBracketPositionOption(closingBracketPosition: ClosingBracketPosition): boolean {
	switch (closingBracketPosition) {
		case 'new-line':
			return true;
		case 'last-line':
			return false;
	}
	throw new Error(
		`Invalid option for pug closingBracketPosition. Found '${closingBracketPosition}'. Possible options: 'new-line' or 'last-line'`
	);
}
