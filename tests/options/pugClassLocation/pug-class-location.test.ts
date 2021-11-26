/* eslint-disable quotes */
import { format } from 'prettier';
import { plugin } from './../../../src/index';

describe('Options', () => {
	describe('pugClassLocation', () => {
		test('should position class literals before attributes', () => {
			const expected: string = `.before-class.class.class-before(type="button", class=boolean ? "test" : "fact")= "type"\n`;
			const code: string = `div.before-class(type="button", class=boolean ? "test" : "fact").class.class-before= "type"`;
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],

				pugClassLocation: 'before-attributes'
			});

			expect(actual).toBe(expected);
		});
		test('should position class literals after attributes', () => {
			const expected: string = `(type="button", class=boolean ? "test" : "fact").class.class-before.after-class= "type"\n`;
			const code: string = `div.class.class-before(type="button", class=boolean ? "test" : "fact").after-class= "type"`;
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],

				pugClassLocation: 'after-attributes'
			});

			expect(actual).toBe(expected);
		});
		test('should position class attributes that can be literals before attributes', () => {
			const expected: string = `.test.place(type="button")= "type"\n`;
			const code: string = `div(type="button", class="test place")= "type"`;
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],

				pugClassLocation: 'before-attributes'
			});

			expect(actual).toBe(expected);
		});
		test('should position class attributes that can be literals after attributes', () => {
			const expected: string = `div(type="button").test.place= "type"\n`;
			const code: string = `div(type="button", class="test place")= "type"`;
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],

				pugClassLocation: 'after-attributes'
			});

			expect(actual).toBe(expected);
		});
	});
});
