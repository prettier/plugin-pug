import type { BooleanSupportOption } from 'prettier';
import { CATEGORY_PUG } from './constants';

/** Pug preserve whitespace. */
export const PUG_PRESERVE_WHITESPACE: BooleanSupportOption = {
  // since: '3.3.0',
  category: CATEGORY_PUG,
  type: 'boolean',
  default: false,
  description: 'Preserve additional whitespace in text.',
};
