import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../src/index';

describe('Issues', () => {
	test('should sort more stabilized', () => {
		const expected: string = readFileSync(resolve(__dirname, 'formatted.pug'), 'utf8');
		const code: string = readFileSync(resolve(__dirname, 'unformatted.pug'), 'utf8');
		const actual: string = format(code, {
			parser: 'pug',
			plugins: [plugin],

			// @ts-expect-error
			pugSortAttributesBeginning: [
				'^v-else$',
				'^v-if$',
				'^v-else-if$',
				'^v-model',
				'^v-',
				'^v-for$', //v-for should be the last attribute which starts with v-
				'^:key$', // key binding should always follow v-for
				'^@',
				'^:', //any shortcut for v-bind
				'^ref$'
			],
			pugSortAttributes: 'asc'
		});

		expect(actual).toBe(expected);
	});
});
