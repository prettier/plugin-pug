import type { ChoiceSupportOption } from 'prettier';
import { CATEGORY_PUG } from '.';

/** Pug class notation. */
export const PUG_CLASS_NOTATION: ChoiceSupportOption = {
	since: '1.13.0',
	category: CATEGORY_PUG,
	type: 'choice',
	default: 'literal',
	description: 'Define how classes should be formatted.',
	choices: [
		{ value: 'literal', description: 'Forces all valid classes to be printed as literals.' },
		{ value: 'attribute', description: 'Forces all valid classes to be printed in class attribute.' },
		{ value: 'as-is', description: 'Disables class formatting.' }
	]
};

/** Pug class notation. */
export type PugClassNotation = 'literal' | 'attribute' | 'as-is';
