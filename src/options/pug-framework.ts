import type { ChoiceSupportOption } from 'prettier';
import { CATEGORY_PUG } from '.';

/** Pug Framework. */
export const PUG_FRAMEWORK: ChoiceSupportOption = {
	since: '1.14.0',
	category: CATEGORY_PUG,
	type: 'choice',
	default: 'none',
	description: 'Define which framework is used in the project.',
	choices: [
		{ value: 'none', description: 'No framework specifically.' },
		{ value: 'vue', description: 'Uses Vue.js.' },
		{ value: 'svelte', description: 'Uses Svelte.' },
		{ value: 'angular', description: 'Uses Angular.' }
	]
};

/** Pug class notation. */
export type PugFramework = 'none' | 'vue' | 'svelte' | 'angular';
