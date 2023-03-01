import type { BooleanSupportOption } from 'prettier';
import { CATEGORY_PUG } from './constants';

/** Pug default div tag. */
export const PUG_EXPLICIT_DIV: BooleanSupportOption = {
  category: CATEGORY_PUG,
  type: 'boolean',
  default: false,
  description: 'Include `div` tag when followed by literal class or id syntax',
};
