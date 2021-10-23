import type { ChoiceSupportOption } from 'prettier';
import { CATEGORY_PUG } from '.';

/** Pug attribute separator option. */
export const PUG_ATTRIBUTE_SEPARATOR_OPTION: ChoiceSupportOption<PugAttributeSeparator> = {
	since: '1.6.0',
	category: CATEGORY_PUG,
	type: 'choice',
	default: 'always',
	description: 'Change when attributes are separated by commas in tags.',
	choices: [
		{
			value: 'always',
			description:
				'Always separate attributes with commas. Example: `button(type="submit", (click)="play()", disabled)`'
		},
		{
			value: 'as-needed',
			description:
				'Only add commas between attributes where required. Example: `button(type="submit", (click)="play()" disabled)`'
		},
		{
			value: 'none',
			description:
				'Never add commas between attributes. Example: `button(type="submit" @click="play()" :style="style" disabled)`'
		}
	]
};

/** Pug Attribute separator. */
export type PugAttributeSeparator = 'always' | 'as-needed' | 'none';

/**
 * Checks if the given `pugAttributeSeparator` is valid.
 *
 * @param pugAttributeSeparator The pugAttributeSeparator.
 * @returns The given `pugAttributeSeparator`.
 * @throws Error if the pugAttributeSeparator was not valid.
 */
export function resolvePugAttributeSeparatorOption(
	pugAttributeSeparator: PugAttributeSeparator
): PugAttributeSeparator {
	switch (pugAttributeSeparator) {
		case 'always':
		case 'as-needed':
		case 'none':
			return pugAttributeSeparator;
	}
	throw new Error(
		`Invalid option for pugAttributeSeparator. Found '${pugAttributeSeparator}'. Possible options: 'always', 'as-needed' or 'none'`
	);
}
