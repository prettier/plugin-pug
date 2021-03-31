---
next: /configuration/
---

# Guide

## Getting Started

Simply install `prettier` and `@prettier/plugin-pug` as your project’s npm `devDependencies`:

<code-group>
<code-block title="YARN" active>
```bash
yarn add --dev prettier @prettier/plugin-pug
```
</code-block>

<code-block title="NPM">
```bash
npm install --save-dev prettier @prettier/plugin-pug
```
</code-block>
</code-group>

## Usage

Format all pug files in your project:

<code-group>
<code-block title="YARN" active>
```bash
yarn prettier --write "**/*.pug"
```
</code-block>

<code-block title="NPM">
```bash
npx prettier --write "**/*.pug"
```
</code-block>
</code-group>

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
