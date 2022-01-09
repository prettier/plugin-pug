// @ts-check
/// <reference types="./src/prettier" />

/**
 * @type {import('prettier').Options}
 */
module.exports = {
  plugins: [require.resolve('prettier-plugin-organize-imports')],
  singleQuote: true,
  trailingComma: 'all',
};
