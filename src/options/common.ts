import { ChoiceSupportOption, IntSupportOption } from 'prettier';
import { CATEGORY_PUG } from '.';

export const PUG_PRINT_WIDTH_OPTION: IntSupportOption = {
	since: '1.6.0',
	category: CATEGORY_PUG,
	type: 'int',
	default: -1,
	description: 'The line length where Prettier will try wrap.',
	range: { start: -1, end: Infinity, step: 1 }
};

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

export const PUG_TAB_WIDTH_OPTION: IntSupportOption = {
	since: '1.6.0',
	category: CATEGORY_PUG,
	type: 'int',
	default: -1,
	description: 'Number of spaces per indentation level.',
	range: { start: -1, end: Infinity, step: 1 }
};

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

export type ArrowParens = 'avoid' | 'always';
