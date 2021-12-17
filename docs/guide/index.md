# Guide

## Getting Started

Simply install `prettier` and `@prettier/plugin-pug` as your project’s npm `devDependencies`:

```bash
npm add --save-dev prettier @prettier/plugin-pug
yarn add --dev prettier @prettier/plugin-pug
pnpm add --save-dev prettier @prettier/plugin-pug
```

## Usage

Format all pug files in your project:

```bash
npx prettier --write "**/*.pug"
yarn prettier --write "**/*.pug"
pnpm prettier --write "**/*.pug"
```

### Selectively ignoring automatic formatting

You can disable code formatting for a particular element by adding `//- prettier-ignore` comments in your pug templates:

```pug
div.text( color =   "primary",  disabled  ="true"  )
//- prettier-ignore
div.text( color =   "primary",  disabled  ="true"  )
//- prettier-ignore: because of reasons
div
  div.text( color =   "primary",  disabled  ="true"  )
```

Prettified output:

```pug
.text(color="primary", disabled)
//- prettier-ignore
div.text( color =   "primary",  disabled  ="true"  )
//- prettier-ignore: because of reasons
div
  div.text( color =   "primary",  disabled  ="true"  )
```

You can also disable code formatting in Markdown for a particular ` ```pug ` block by adding`<!-- prettier-ignore -->` before the block:

````markdown
Pug code with preserved custom formatting:

<!-- prettier-ignore -->
```pug
div.text( color =   "primary",  disabled  ="true"  )
```

Pug code with automatic formatting:

```pug
.text(color="primary", disabled)
```
````

## Type support in configuration file

You can write your `.prettierrc.cjs` like this to get fully type check support with documentation:

```js
// @ts-check
/// <reference types="@prettier/plugin-pug/src/prettier" />

/**
 * @type {import('prettier').Options}
 */
module.exports = {
  // `require.resolve` is needed for e.g. `pnpm`
  plugins: [require.resolve('@prettier/plugin-pug')],

  printWidth: 120,
  singleQuote: true,

  pugSingleQuote: false,
  // ... more pug* options
};
```
