import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../src/index';

describe('Pug Tests', () => {
	const filenames = readdirSync(resolve(__dirname), 'utf8');
	for (const filename of filenames) {
		if (filename.endsWith('.formatted.pug')) {
			const unformattedFilename = filename.replace('.formatted', '');
			test(unformattedFilename, () => {
				const expected: string = readFileSync(resolve(__dirname, filename), 'utf8');
				const code: string = readFileSync(resolve(__dirname, unformattedFilename), 'utf8');
				const actual: string = format(code, { parser: 'pug' as any, plugins: [plugin] });

				expect(actual).toBe(expected);
			});
		}
	}
});
