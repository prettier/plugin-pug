import type { ChoiceSupportOption } from 'prettier';
import { CATEGORY_PUG } from '.';

/** Pug id notation. */
export const PUG_ID_NOTATION: ChoiceSupportOption = {
	since: '1.13.0',
	category: CATEGORY_PUG,
	type: 'choice',
	default: 'literal',
	description: 'Define how the id should be formatted.',
	choices: [
		{ value: 'literal', description: 'Forces all valid ids to be printed as literals.' },
		{ value: 'as-is', description: 'Disables id formatting.' }
	]
};

/** Pug id notation. */
export type PugIdNotation = 'literal' | 'as-is';
