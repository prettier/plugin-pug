import { CATEGORY_PUG } from '.';

export const WRAP_ATTRIBUTES_THRESHOLD = {
	since: '1.8.0',
	category: CATEGORY_PUG,
	type: 'int',
	default: -1,
	description: 'The maximum amount of attributes that an element can appear with on one line before it gets wrapped.',
	range: { start: -1, end: Infinity, step: 1 }
};
