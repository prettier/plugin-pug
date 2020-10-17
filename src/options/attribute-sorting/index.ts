import { ChoiceSupportOption, PathArraySupportOption } from 'prettier';
import { CATEGORY_PUG } from '..';

const pugSortAttributesOption: PathArraySupportOption = {
	since: '1.7.0',
	category: CATEGORY_PUG,
	type: 'path',
	array: true,
	default: [{ value: [] }],
	description: ''
};

export const PUG_SORT_ATTRIBUTES_BEGINNING_OPTION: PathArraySupportOption = {
	...pugSortAttributesOption,
	description: 'Define a list of patterns for attributes that are sorted to the beginning.'
};

export const PUG_SORT_ATTRIBUTES_END_OPTION: PathArraySupportOption = {
	...pugSortAttributesOption,
	description: 'Define a list of patterns for attributes that are sorted at the end.'
};

export const PUG_SORT_ATTRIBUTES_OPTION: ChoiceSupportOption<SortAttributes> = {
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

export type SortAttributes = 'asc' | 'desc' | 'as-is';
