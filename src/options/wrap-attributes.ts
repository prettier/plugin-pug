import type { IntSupportOption, PathSupportOption } from 'prettier';
import { CATEGORY_PUG } from '.';

/** Wrap attributes threshold. */
export const PUG_WRAP_ATTRIBUTES_THRESHOLD: IntSupportOption = {
	since: '1.8.0',
	category: CATEGORY_PUG,
	type: 'int',
	default: -1,
	description: 'The maximum amount of attributes that an element can appear with on one line before it gets wrapped.',
	range: { start: -1, end: Infinity, step: 1 }
};

/** Wrap attributes pattern. */
export const PUG_WRAP_ATTRIBUTES_PATTERN: PathSupportOption = {
	since: '1.8.0',
	category: CATEGORY_PUG,
	type: 'path',
	default: '',
	description: 'Regex pattern to match attributes against that should always trigger wrapping.'
};
