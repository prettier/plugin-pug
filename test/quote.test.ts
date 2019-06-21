import { AST, BuiltInParser, BuiltInParserName, format, Options } from 'prettier';
import { plugin } from './../src/index';

describe('Quotes', () => {
	test('should format single to double quotes', () => {
		const expected: string = `div(id="test")
  div.a(
    color="primary"
  )

`;

		const code: string = `div(id='test')
  div.a(
    color='primary'
  )`;
		const actual: string = format(code, {
			parser: 'pug' as any,
			plugins: [plugin]
		});

		expect(actual).toBe(expected);
	});
});
