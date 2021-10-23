import type { ChoiceSupportOption } from 'prettier';
import { CATEGORY_PUG } from '.';

/** Pug closing bracket position option. */
export const PUG_CLOSING_BRACKET_POSITION_OPTION: ChoiceSupportOption<PugClosingBracketPosition> = {
	since: '1.6.0',
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

/** Pug Closing bracket position. */
export type PugClosingBracketPosition = 'new-line' | 'last-line';

/**
 * Checks if the given `pugClosingBracketPosition` is valid.
 *
 * @param pugClosingBracketPosition The pugClosingBracketPosition.
 * @returns `true` if pugClosingBracketPosition was `'new-line'` or `false` if it was `'last-line'`.
 * @throws Error if the pugClosingBracketPosition was not valid.
 */
export function resolvePugClosingBracketPositionOption(pugClosingBracketPosition: PugClosingBracketPosition): boolean {
	switch (pugClosingBracketPosition) {
		case 'new-line':
			return true;
		case 'last-line':
			return false;
	}
	throw new Error(
		`Invalid option for pugClosingBracketPosition. Found '${pugClosingBracketPosition}'. Possible options: 'new-line' or 'last-line'`
	);
}
