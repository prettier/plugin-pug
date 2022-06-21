import type { ChoiceSupportOption } from 'prettier';
import { CATEGORY_PUG } from './constants';

/** Pug class location. */
export const PUG_CLASS_LOCATION: ChoiceSupportOption = {
  since: '1.19.0',
  category: CATEGORY_PUG,
  type: 'choice',
  default: 'before-attributes',
  description: 'Define where classes be placed.',
  choices: [
    {
      value: 'before-attributes',
      description:
        'Forces all valid class literals to be placed before attributes.',
    },
    {
      value: 'after-attributes',
      description:
        'Forces all valid class literals to be placed after attributes.',
    },
  ],
};

/** Pug class location. */
export type PugClassLocation = 'before-attributes' | 'after-attributes';
