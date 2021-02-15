import type { BooleanSupportOption } from 'prettier';
import { CATEGORY_PUG } from '.';

/** Pug single file component indentation. */
export const PUG_SINGLE_FILE_COMPONENT_INDENTATION: BooleanSupportOption = {
	since: '1.9.0',
	category: CATEGORY_PUG,
	type: 'boolean',
	default: false,
	description: 'Indent pug in template tags in single file components such as from vue or svelte.'
};
