import type { ChoiceSupportOption, PathArraySupportOption } from 'prettier';
import { CATEGORY_PUG } from '..';

const pugSortAttributesOption: PathArraySupportOption = {
	since: '1.7.0',
	category: CATEGORY_PUG,
	type: 'path',
	array: true,
	default: [{ value: [] }],
	description: ''
};

/** Pug sort attributes beginning option. */
export const PUG_SORT_ATTRIBUTES_BEGINNING_OPTION: PathArraySupportOption = {
	...pugSortAttributesOption,
	description: 'Define a list of patterns for attributes that are sorted to the beginning.'
};

/** Pug sort attributes end option. */
export const PUG_SORT_ATTRIBUTES_END_OPTION: PathArraySupportOption = {
	...pugSortAttributesOption,
	description: 'Define a list of patterns for attributes that are sorted at the end.'
};

/** Pug sort attributes option. */
export const PUG_SORT_ATTRIBUTES_OPTION: ChoiceSupportOption<PugSortAttributes> = {
	since: '1.8.0',
	category: CATEGORY_PUG,
	type: 'choice',
	default: 'as-is',
	description: 'Change how the attributes between _beginning_ and _end_ should be sorted.',
	choices: [
		{ value: 'asc', description: 'Sort middle attributes ascending.' },
		{ value: 'desc', description: 'Sort middle attributes descending.' },
		{ value: 'as-is', description: 'Middle attributes are leave untouched.' }
	]
};

/** Sort attributes. */
export type PugSortAttributes = 'asc' | 'desc' | 'as-is';
