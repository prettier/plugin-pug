import { Dirent, readdirSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../../src/index';

describe('Issues', () => {
	describe('should format as Applelo like it', () => {
		function isPugFile(dirent: Dirent): boolean {
			return dirent.isFile() && dirent.name.endsWith('.pug');
		}

		function testPugFile(relativeFilename: string): void {
			test(relativeFilename, () => {
				const expected: string = readFileSync(resolve(__dirname, relativeFilename), 'utf8');
				const code: string = expected;
				const actual: string = format(code, { parser: 'pug' as any, plugins: [plugin] });

				expect(actual).toBe(expected);
			});
		}

		const dirents: Dirent[] = readdirSync(resolve(__dirname), { encoding: 'utf8', withFileTypes: true });
		for (const dirent of dirents) {
			if (isPugFile(dirent)) {
				testPugFile(dirent.name);
			} else if (dirent.isDirectory()) {
				const subDirents: Dirent[] = readdirSync(resolve(__dirname, dirent.name), {
					encoding: 'utf8',
					withFileTypes: true
				});
				subDirents
					.filter(isPugFile)
					.map(({ name }) => `${dirent.name}/${name}`)
					.forEach(testPugFile);
			}
		}
	});
});
