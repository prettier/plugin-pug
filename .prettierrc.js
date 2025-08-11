// @ts-check

/**
 * @type {import('prettier').Config}
 */
export default {
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-pkg'],
  singleQuote: true,
  trailingComma: 'all',
  overrides: [
    {
      files: '*.json5',
      options: {
        parser: 'json5',
        quoteProps: 'preserve',
        singleQuote: false,
        trailingComma: 'none',
      },
    },
    {
      files: '*.md',
      options: {
        // @ts-expect-error: known property
        organizeImportsSkipDestructiveCodeActions: true,
      },
    },
    {
      files: 'package.json',
      options: {
        packageSortOrderPreset: 'npm-plus',
        packageSortOrder: ['name', 'version', 'description', 'scripts'],
        packageIgnoreSort: ['scripts'],
      },
    },
  ],
};
