// @ts-check
/// <reference types="./src/prettier" />

/**
 * @type {import('prettier').Options}
 */
module.exports = {
	plugins: [require.resolve('prettier-plugin-organize-imports')],
	arrowParens: 'always',
	bracketSpacing: true,
	printWidth: 120,
	semi: true,
	singleQuote: true,
	tabWidth: 4,
	trailingComma: 'none',
	useTabs: true,
	overrides: [
		{
			files: '*.md',
			options: {
				tabWidth: 2,
				useTabs: false
			}
		}
	]
};
