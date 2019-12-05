export const CATEGORY_PUG: string = 'Pug';

export type CommentPreserveSpaces = 'keep-all' | 'keep-leading' | 'trim-all';

export interface PugParserOptions {
	attributeSeparator: 'always' | 'as-needed';
	commentPreserveSpaces: CommentPreserveSpaces;
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
			result += input.substring(firstNonSpace).replace(/\s\s+/g, ' ');
			return result;
		}
		case 'trim-all': {
			let result: string = input.trim();
			result = result.replace(/\s\s+/g, ' ');
			if (!pipeless && input.startsWith(' ')) {
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
