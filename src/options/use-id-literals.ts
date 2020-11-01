import { BooleanSupportOption } from 'prettier';
import { CATEGORY_PUG } from '.';

export const PUG_USE_ID_LITERALS: BooleanSupportOption = {
	since: '1.10.0',
	category: CATEGORY_PUG,
	type: 'boolean',
	default: true,
	description: ''
};

export type PugUseIdLiterals = boolean;
