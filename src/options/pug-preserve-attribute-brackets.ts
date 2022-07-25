import type { BooleanSupportOption } from 'prettier';
import { CATEGORY_PUG } from './constants';

/** Pug preserve attribute brackets. */
export const PUG_PRESERVE_ATTRIBUTE_BRACKETS: BooleanSupportOption = {
  since: '2.2.0',
  category: CATEGORY_PUG,
  type: 'boolean',
  default: false,
  description: 'Preserve attribute brackets.',
};
