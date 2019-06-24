import { readFileSync } from 'fs';
import { resolve } from 'path';
import { parsers } from './../../../src/index';
import { Parser } from 'prettier';

// ts-jest needs the exclamation mark, so it does not have the impression that the variables are undefined
const pugParser: Parser = parsers!.pug;

describe('Pragma', () => {
	test('should detect pragma @prettier', () => {
		const code: string = readFileSync(resolve(__dirname, 'pragma-prettier.pug'), 'utf8');
		const actual: boolean = pugParser.hasPragma!(code);

		expect(actual).toBeTruthy();
	});
	test('should detect pragma @format', () => {
		const code: string = readFileSync(resolve(__dirname, 'pragma-format.pug'), 'utf8');
		const actual: boolean = pugParser.hasPragma!(code);

		expect(actual).toBeTruthy();
	});
	test('should detect no pragma ', () => {
		const code: string = readFileSync(resolve(__dirname, 'no-pragma.pug'), 'utf8');
		const actual: boolean = pugParser.hasPragma!(code);

		expect(actual).toBeFalsy();
	});
});
