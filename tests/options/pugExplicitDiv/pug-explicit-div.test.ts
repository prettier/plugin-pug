import { format } from 'prettier';
import { plugin } from '../../../src/index';

describe('Options', () => {
	describe('pugExplicitDiv', () => {
		test('should handle pugExplicitDiv:true', () => {
			const expected: string = 'div.my-class\n';
			const code: string = 'div.my-class\n';
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],
				// @ts-expect-error
				pugExplicitDiv: true
			});

			expect(actual).toBe(expected);
		});

		test('should handle pugExplicitDiv:false', () => {
			const expected: string = '.my-class\n';
			const code: string = 'div.my-class\n';
			const actual: string = format(code, {
				parser: 'pug',
				plugins: [plugin],
				// @ts-expect-error
				pubExplicitDiv: false
			});

			expect(actual).toBe(expected);
		});
	});
});
