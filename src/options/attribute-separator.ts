import { ChoiceSupportOption } from 'prettier';
import { CATEGORY_PUG } from '.';

export const ATTRIBUTE_SEPARATOR_OPTION: ChoiceSupportOption<AttributeSeparator> = {
	since: '1.0.0',
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

export const PUG_ATTRIBUTE_SEPARATOR_OPTION: ChoiceSupportOption<AttributeSeparator | null> = {
	...ATTRIBUTE_SEPARATOR_OPTION,
	since: '1.6.0',
	default: null,
	choices: [
		{
			value: null,
			description: 'Use `attributeSeparator` value.'
		},
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

export type AttributeSeparator = 'always' | 'as-needed' | 'none';

export function resolveAttributeSeparatorOption(attributeSeparator: AttributeSeparator): AttributeSeparator {
	switch (attributeSeparator) {
		case 'always':
		case 'as-needed':
		case 'none':
			return attributeSeparator;
	}
	throw new Error(
		`Invalid option for pug attributeSeparator. Found '${attributeSeparator}'. Possible options: 'always', 'as-needed' or 'none'`
	);
}
