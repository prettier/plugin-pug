import type { BooleanSupportOption } from 'prettier';
import { CATEGORY_PUG } from '.';

/** Pug default div tag. */
export const PUG_EXPLICIT_DIV: BooleanSupportOption = {
	since: '1.16.0',
	category: CATEGORY_PUG,
	type: 'boolean',
	default: false,
	description: 'Include `div` tag when followed by literal class or id syntax'
};
