export const CATEGORY_PUG: string = 'Pug';

export interface PugParserOptions {
	attributeSeparator: 'always' | 'as-needed';
}

export function resolveAttributeSeparatorOption(attributeSeparator: 'always' | 'as-needed'): boolean {
	switch (attributeSeparator) {
		case 'always':
			return true;
		case 'as-needed':
			return false;
	}
	throw new Error(
		`Invalid option for pug attributeSeparator. Found '${attributeSeparator}'. Possible options: 'always' or 'as-needed'`
	);
}

export const options = {
	attributeSeparator: {
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
			}
		]
	}
};
