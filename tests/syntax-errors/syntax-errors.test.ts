import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { plugin } from './../../src/index';

describe('Syntax-Errors', () => {
	test('should not format if attributes is not closed', () => {
		const code: string = readFileSync(resolve(__dirname, 'attributes-not-closed.pug'), 'utf8');
		expect(() => {
			format(code, { parser: 'pug' as any, plugins: [plugin] });
		}).toThrow();
	});
});
