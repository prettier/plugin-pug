export const CATEGORY_PUG: string = 'Pug';

export type AttributeSeparator = 'always' | 'as-needed';
export type ClosingBracketPosition = 'new-line' | 'last-line';
export type CommentPreserveSpaces = 'keep-all' | 'keep-leading' | 'trim-all';

export interface PugParserOptions {
	attributeSeparator: AttributeSeparator;
	closingBracketPosition: ClosingBracketPosition;
	commentPreserveSpaces: CommentPreserveSpaces;
}

export function resolveAttributeSeparatorOption(attributeSeparator: AttributeSeparator): boolean {
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

export function formatCommentPreserveSpaces(
	input: string,
	commentPreserveSpaces: CommentPreserveSpaces,
	pipeless: boolean = false
): string {
	switch (commentPreserveSpaces) {
		case 'keep-leading': {
			let result: string = '';
			let firstNonSpace = 0;
			for (firstNonSpace; firstNonSpace < input.length && input[firstNonSpace] === ' '; firstNonSpace++) {
				result += ' ';
			}
			result += input.slice(firstNonSpace).trim().replace(/\s\s+/g, ' ');
			return result;
		}
		case 'trim-all': {
			let result: string = input.trim();
			result = result.replace(/\s\s+/g, ' ');
			if (!pipeless && input[0] === ' ') {
				result = ` ${result}`;
			}
			return result;
		}
		case 'keep-all':
		default:
			// Don't touch comment
			return input;
	}
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
	},
	closingBracketPosition: {
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
	},
	commentPreserveSpaces: {
		since: '1.1.0',
		category: CATEGORY_PUG,
		type: 'choice',
		default: 'keep-all',
		description: 'Change behavior of spaces within comments.',
		choices: [
			{
				value: 'keep-all',
				description: 'Keep all spaces within comments. Example: `//    this  is   a   comment`'
			},
			{
				value: 'keep-leading',
				description: 'Keep leading spaces within comments. Example: `//    this is a comment`'
			},
			{
				value: 'trim-all',
				description: 'Trim all spaces within comments. Example: `// this is a comment`'
			}
		]
	}
};
