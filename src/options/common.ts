import type { ChoiceSupportOption, IntSupportOption } from 'prettier';
import { CATEGORY_PUG } from '.';

/** Pug print width option. */
export const PUG_PRINT_WIDTH_OPTION: IntSupportOption = {
	since: '1.6.0',
	category: CATEGORY_PUG,
	type: 'int',
	default: -1,
	description: 'The line length where Prettier will try wrap.',
	range: { start: -1, end: Infinity, step: 1 }
};

/** Pug single quote option. */
export const PUG_SINGLE_QUOTE_OPTION: ChoiceSupportOption<boolean | 'true' | null> = {
	since: '1.6.0',
	category: CATEGORY_PUG,
	type: 'choice',
	default: null,
	description: '',
	choices: [
		{
			value: null,
			description: 'Use `singleQuote` value.'
		},
		{
			value: true,
			description: 'Use single quotes instead of double quotes.'
		},
		{
			// Workaround, because prettier doesn't accept just `true` as choice value in CLI
			value: 'true',
			description: 'Use single quotes instead of double quotes.'
		},
		{
			value: false,
			description: 'Use double quotes instead of double quotes.'
		}
	]
};

/** Pug tab width option. */
export const PUG_TAB_WIDTH_OPTION: IntSupportOption = {
	since: '1.6.0',
	category: CATEGORY_PUG,
	type: 'int',
	default: -1,
	description: 'Number of spaces per indentation level.',
	range: { start: -1, end: Infinity, step: 1 }
};

/** Pug use tabs option. */
export const PUG_USE_TABS_OPTION: ChoiceSupportOption<boolean | 'true' | null> = {
	since: '1.6.0',
	category: CATEGORY_PUG,
	type: 'choice',
	default: null,
	description: '',
	choices: [
		{
			value: null,
			description: 'Use `useTabs` value.'
		},
		{
			value: true,
			description: 'Indent with tabs instead of spaces.'
		},
		{
			// Workaround, because prettier doesn't accept just `true` as choice value in CLI
			value: 'true',
			description: 'Indent with tabs instead of spaces.'
		},
		{
			value: false,
			description: 'Indent with spaces instead of tabs.'
		}
	]
};

/** Pug bracket spacing option. */
export const PUG_BRACKET_SPACING_OPTION: ChoiceSupportOption<boolean | 'true' | null> = {
	since: '1.6.0',
	category: CATEGORY_PUG,
	type: 'choice',
	default: null,
	description: '',
	choices: [
		{
			value: null,
			description: 'Use `bracketSpacing` value.'
		},
		{
			value: true,
			description: 'Print spaces between brackets.'
		},
		{
			// Workaround, because prettier doesn't accept just `true` as choice value in CLI
			value: 'true',
			description: 'Print spaces between brackets.'
		},
		{
			value: false,
			description: 'Do not print spaces between brackets.'
		}
	]
};

/** Pug semi option. */
export const PUG_SEMI_OPTION: ChoiceSupportOption<boolean | 'true' | null> = {
	since: '1.6.0',
	category: CATEGORY_PUG,
	type: 'choice',
	default: null,
	description: '',
	choices: [
		{
			value: null,
			description: 'Use `bracketSpacing` value.'
		},
		{
			value: true,
			description: 'Print semicolons.'
		},
		{
			// Workaround, because prettier doesn't accept just `true` as choice value in CLI
			value: 'true',
			description: 'Print semicolons.'
		},
		{
			value: false,
			description: 'Do not print semicolons, except at the beginning of lines which may need them.'
		}
	]
};

/** Pug arrow parens option. */
export const PUG_ARROW_PARENS_OPTION: ChoiceSupportOption<ArrowParens | null> = {
	since: '1.7.0',
	category: CATEGORY_PUG,
	type: 'choice',
	default: null,
	description: 'Include parentheses around a sole arrow function parameter.',
	choices: [
		{
			value: null,
			description: 'Use `arrowParens` value.'
		},
		{
			value: 'always',
			description: 'Always add parens. Example: `(x) => x`'
		},
		{
			value: 'avoid',
			description: 'Omit parens when possible. Example: `x => x`'
		}
	]
};

/** Arrow parens. */
export type ArrowParens = 'avoid' | 'always';

/** Pug bracket same line option. */
export const PUG_BRACKET_SAME_LINE_OPTION: ChoiceSupportOption<boolean | 'true' | null> = {
	since: '1.17.0',
	category: CATEGORY_PUG,
	type: 'choice',
	default: null,
	description: 'Determines position of closing bracket which wraps attributes.',
	choices: [
		{
			value: null,
			description: 'Use `bracketSameLine` value.'
		},
		{
			value: true,
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
		},
		{
			// Workaround, because prettier doesn't accept just `true` as choice value in CLI
			value: 'true',
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
		},
		{
			value: false,
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
		}
	]
};
