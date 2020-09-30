import { CATEGORY_PUG } from '.';

export const MAX_SINGLE_LINE_ATTRIBUTES_OPTION = {
	since: '1.8.0',
	category: CATEGORY_PUG,
	type: 'int',
	default: -1,
	description: 'The maximum amount of attributes that can appear on the first line of an element.',
	range: { start: -1, end: Infinity, step: 1 }
};
