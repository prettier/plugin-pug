import type { ChoiceSupportOption } from 'prettier';
import { CATEGORY_PUG } from '.';

/** Pug Framework. */
export const PUG_FRAMEWORK: ChoiceSupportOption<PugFramework> = {
	since: '1.14.0',
	category: CATEGORY_PUG,
	type: 'choice',
	default: 'auto',
	description: 'Define which framework is used in the project.',
	choices: [
		{ value: 'auto', description: 'Try to identify used framework, if there is one.' },
		{ value: 'vue', description: 'Uses Vue.js.' },
		{ value: 'svelte', description: 'Uses Svelte.' },
		{ value: 'angular', description: 'Uses Angular.' }
	]
};

/** Pug class notation. */
export type PugFramework = 'auto' | 'vue' | 'svelte' | 'angular';
