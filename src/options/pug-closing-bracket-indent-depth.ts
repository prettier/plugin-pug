import type { ChoiceSupportOption } from 'prettier';
import { CATEGORY_PUG } from './constants';

/** Pug bracket same line option. */
export const PUG_CLOSING_BRACKET_INDENT_DEPTH_OPTION: ChoiceSupportOption<PugClosingBracketIndentDepth> =
  {
    // since: '3.1.0',
    category: CATEGORY_PUG,
    type: 'choice',
    default: 0,
    description:
      'Determines the indent level of closing brackets when wrapping attributes.',
    choices: [
      {
        value: 0,
        description: `
			Closing bracket aligns with the element.
			Example:
			input(
				type='text',
				value='my_value',
				name='my_name',
				alt='my_alt',
				autocomplete='on'
			)
			`,
      },
      {
        value: 1,
        description: `
			Closing bracket aligns with the element's attributes.
			Example:
			input(
				type='text',
				value='my_value',
				name='my_name',
				alt='my_alt',
				autocomplete='on'
				)
			`,
      },
    ],
  };

/** Pug closing bracket indent depth. */
export type PugClosingBracketIndentDepth = 0 | 1;
