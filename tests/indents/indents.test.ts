/* eslint-disable jsdoc/require-jsdoc */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format, Options } from 'prettier';
import { plugin } from './../../src/index';

const unformatted: string = readFile('unformatted');

function comparisonTest(message: string, { output, settings }: { output: string; settings?: Options }): void {
	test(message, () => {
		const expected: string = readFile(output);
		const actual: string = format(unformatted, { parser: 'pug', plugins: [plugin], ...settings });

		expect(actual).toBe(expected);
	});
}

function readFile(fileName: string): string {
	return readFileSync(resolve(__dirname, fileName + '.pug'), 'utf8');
}

describe('Indents', () => {
	// Spaces
	comparisonTest('should indent by default with 2 spaces', {
		output: 'formatted-2-spaces',
		settings: { tabWidth: undefined }
	});
	comparisonTest('should indent with 2 spaces', { output: 'formatted-2-spaces', settings: { tabWidth: 2 } });
	comparisonTest('should indent with 3 spaces', { output: 'formatted-3-spaces', settings: { tabWidth: 3 } });
	comparisonTest('should indent with 4 spaces', { output: 'formatted-4-spaces', settings: { tabWidth: 4 } });
	comparisonTest('should indent with 8 spaces', { output: 'formatted-8-spaces', settings: { tabWidth: 8 } });

	// Tabs
	comparisonTest('should indent with tabs', {
		output: 'formatted-tabs-1-width',
		settings: { useTabs: true, tabWidth: 1 }
	});
});
