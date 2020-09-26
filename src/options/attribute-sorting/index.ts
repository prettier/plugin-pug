import { CATEGORY_PUG } from '..';

const pugSortAttributesOption = {
	since: '1.7.0',
	category: CATEGORY_PUG,
	type: 'path',
	array: true,
	default: [],
	description: ''
};

export const PUG_SORT_ATTRIBUTES_BEGINNING_OPTION = {
	...pugSortAttributesOption,
	description: 'Define a list of patterns for attributes that are sorted to the beginning.'
};

export const PUG_SORT_ATTRIBUTES_END_OPTION = {
	...pugSortAttributesOption,
	description: 'Define a list of patterns for attributes that are sorted at the end.'
};
