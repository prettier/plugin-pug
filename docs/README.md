# @prettier/plugin-pug

<p align="center">
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://prettier.io" target="_blank">
    <img alt="Prettier" src="https://cdn.rawgit.com/prettier/prettier-logo/master/images/prettier-icon-light.svg">
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;
  &nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://pugjs.org" target="_blank">
    <img alt="Pug" src="https://cdn.rawgit.com/pugjs/pug-logo/eec436cee8fd9d1726d7839cbe99d1f694692c0c/SVG/pug-final-logo-_-colour-128.svg" height="210">
  </a>
  &nbsp;&nbsp;&nbsp;&nbsp;
</p>

<h2 align="center">Prettier Pug plugin</h2>

<p align="center">
  <a href="https://github.com/prettier/plugin-pug/blob/main/LICENSE">
    <img alt="license: MIT" src="https://img.shields.io/github/license/prettier/plugin-pug.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/@prettier/plugin-pug" target="_blank">
    <img alt="NPM package" src="https://img.shields.io/npm/v/@prettier/plugin-pug.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/@prettier/plugin-pug" target="_blank">
    <img alt="downloads" src="https://img.shields.io/npm/dt/@prettier/plugin-pug.svg?style=flat-square">
  </a>
  <a href="https://prettier.io" target="_blank">
    <img alt="Code Style: Prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
  <a href="https://github.com/prettier/plugin-pug/actions/workflows/ci.yml">
    <img alt="Build Status" src="https://github.com/prettier/plugin-pug/actions/workflows/ci.yml/badge.svg?branch=main">
  </a>
</p>

# Intro

Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

This plugin adds support for the Pug language to Prettier.

---

- [Getting started](#getting-started)
- [Usage](#usage)
  - [Selectively ignoring automatic formatting](#selectively-ignoring-automatic-formatting)
- [Configuration](#configuration)
  - [Pug versions of standard prettier options](#pug-versions-of-standard-prettier-options)
  - [Additional pug-specific options](#additional-pug-specific-options)
- [Workarounds / Known Issues](#workarounds--known-issues)
- [Integration with editors](#integration-with-editors)
- [Implementation details](#implementation-details)
- [Contributing](#contributing)
- [Credits](#credits)

## Getting started

Simply install `prettier` and `@prettier/plugin-pug` as your project’s npm devDependencies:

```bash
## add Prettier and its Pug plugin to project’s dev dependencies
npm install --save-dev prettier @prettier/plugin-pug
## or
yarn add --dev prettier @prettier/plugin-pug
```

## Usage

```bash
## format all pug files in your project
npx prettier --write "**/*.pug"
## or
yarn prettier --write "**/*.pug"
```

### Selectively ignoring automatic formatting

You can disable code formatting for a particular element by adding <span style="white-space: nowrap;">`//- prettier-ignore`</span> comments in your pug templates:

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

You can also disable code formatting in Markdown for a particular ` ```pug ` block by adding <span style="white-space: nowrap;">`<!-- prettier-ignore -->`</span> before the block:

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

## Configuration

### Pug versions of standard prettier options

By default, the same formatting options are used as configured through the standard prettier options.
By using versions of these standard options prefixed with `pug`, you can override pug formatting options even when using pug embedded in other files, e.g. vue single-file components:

| Name                | Description                                                                                                                             |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `pugBracketSpacing` | Print spaces between brackets in object literals.                                                                                       |
| `pugPrintWidth`     | Specify the line length that the printer will wrap on.                                                                                  |
| `pugSemi`           | Print semicolons at the ends of code statements.                                                                                        |
| `pugSingleQuote`    | Use single quotes instead of double quotes.<br>Please note that the opposite setting will be used automatically for inlined JavaScript. |
| `pugTabWidth`       | Use spaces for indentation and specify the number of spaces per indentation-level.                                                      |
| `pugUseTabs`        | Indent lines with tabs instead of spaces.<br>Overrides `pugTabWidth`                                                                    |
| `pugArrowParens`    | Include parentheses around a sole arrow function parameter.                                                                             |

### Additional pug-specific options

These additional options are specific to pug templates and can be configured in your global `.prettierrc` file:

| Name                                                   | Type    | Default      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------ | ------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pugAttributeSeparator`                                | choice  | `'always'`   | Change when attributes are separated by commas in tags.<ul><li>`'always'` -> Always separate attributes with commas.<br>Example: `button(type="submit", (click)="play()", disabled)`</li><li>`'as-needed'` -> Only add commas between attributes where required.<br>Example: `button(type="submit", (click)="play()" disabled)`</li><li>`'none'` -> Never add commas between attributes.<br>Example: `button(type="submit" @click="play()" :style="style" disabled)`<br>Please note that while this option will process Angular syntax (e.g. `(click)="play()"`),<br>the resulting pug file will throw a syntax error when parsed: `Syntax Error: Assigning to rvalue`</li></ul>                                                                                                  |
| `pugClosingBracketPosition`                            | choice  | `'new-line'` | Position of closing bracket of attributes.<ul><li>`'new-line'` -> Closing bracket ends with a new line.<br>Example:<pre>input(<br>&nbsp;&nbsp;type="text",<br>&nbsp;&nbsp;value="my_value",<br>&nbsp;&nbsp;name="my_name",<br>&nbsp;&nbsp;alt="my_alt",<br>&nbsp;&nbsp;autocomplete="on"<br>)</pre></li><li>`'last-line'` -> Closing bracket remains with last attribute's line.<br>Example:<pre>input(<br>&nbsp;&nbsp;type="text",<br>&nbsp;&nbsp;value="my_value",<br>&nbsp;&nbsp;name="my_name",<br>&nbsp;&nbsp;alt="my_alt",<br>&nbsp;&nbsp;autocomplete="on")</pre></li></ul>                                                                                                                                                                                                |
| `pugCommentPreserveSpaces`                             | choice  | `'keep-all'` | Change behavior of spaces within comments.<ul><li>`'keep-all'` -> Keep all spaces within comments.<br>Example: `// ___this _is __a __comment_`</li><li>`'keep-leading'` -> Keep leading spaces within comments.<br>Example: `// ___this is a comment`</li><li>`'trim-all'` -> Trim all spaces within comments.<br>Example: `// this is a comment`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `pugSortAttributesBeginning`<br>`pugSortAttributesEnd` | array   | `[]`         | Sort attributes by regex patterns to the beginning or the end.<br>&nbsp;[Example](https://github.com/prettier/plugin-pug/issues/22#issuecomment-699509995)<br>&nbsp;_This feature was planned since `1.2.0`, but it was always a bit unstable and opinionated._<br>&nbsp;_If there are any bugs, please report them._                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `pugSortAttributes`                                    | choice  | `'as-is'`    | Sort attributes that are not on _beginning_ and _end_ patterns.<ul><li>`'as-is'` -> Keep the attributes untouched.<br>Example: `Foo(a c d b)`</li><li>`'asc'` -> Sort attributes ascending.<br>Example: `Foo(a b c d)`</li><li>`'desc'` -> Sort attributes descending.<br>Example: `Foo(d c b a)`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `pugWrapAttributesThreshold`                           | choice  | `-1`         | Define the maximum amount of attributes that an element can appear with on one line before it gets wrapped.<ul><li>`-1` -> Only wrap attributes as needed.<br>Example:<pre>input(type="text")<br>input(type="text", value="my_value", name="my_name")</pre></li><li>`0` -> Always wrap attributes.<br>Example:<pre>input(<br>&nbsp;&nbsp;type="text"<br>)<br>input(<br>&nbsp;&nbsp;type="text",<br>&nbsp;&nbsp;value="my_value",<br>&nbsp;&nbsp;name="my_name"<br>)</pre></li><li>`1` -> Allow one unwrapped attribute, wrap two and more.<br>Example:<pre>input(type="text")<br>input(<br>&nbsp;&nbsp;type="text",<br>&nbsp;&nbsp;value="my_value",<br>&nbsp;&nbsp;name="my_name"<br>)</pre></li><li>`2 .. Infinity` -> Same as above, just with different thresholds.</li></ul> |
| `pugWrapAttributesPattern`                             | array   | `[]`         | Define a regex pattern to match attributes against that should always trigger wrapping.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `pugSingleFileComponentIndentation`                    | boolean | `false`      | Indent pug in template tags in single file components such as from vue or svelte.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `pugEmptyAttributes`                                   | choice  | `'as-is'`    | Change behavior of boolean attributes.<ul><li>`'as-is'` -> Nothing is changed.<br>Example: `foo(a, b="", c)`</li><li>`'none'` -> Every attribute with empty quotes will have them removed.<br>Example: `foo(a, b, c)`</li><li>`'all'` -> Every boolean attribute will be expressed with empty quotes.<br>Example: `foo(a="", b="", c="")`</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `pugEmptyAttributesForceQuotes`                        | array   | `[]`         | Define a list of patterns for attributes that will be forced to have empty quotes even with "none" selected.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `pugClassNotation`                                     | choice  | `'literal'`  | Define how classes should be formatted.<ul><li>`'literal'` -> Forces all valid classes to be printed as literals.<br>Example: `foo.bar.baz`</li><li>~`'attribute'` -> Forces all classes to be printed as attributes.~ _this option is [still in progress](https://github.com/prettier/plugin-pug/issues/167)_<br>Example: `foo(class="bar baz")`</li><li>`'as-is'` -> Disables class formatting.<br>Example: `foo.bar(class="baz")`</li></ul>                                                                                                                                                                                                                                                                                                                                    |
| `pugIdNotation`                                        | choice  | `'literal'`  | Define how ids should be formatted.<ul><li>`'literal'` -> Forces all valid ids to be printed as literals.<br>Example: `foo#bar`</li><li>~`'attribute'` -> Forces all ids to be printed as attributes.~<br>_this option is [still in progress](https://github.com/prettier/plugin-pug/issues/167)_<br>Example: `foo(id="bar")`</li><li>`'as-is'` -> Disables id formatting.<br>Example: `foo(id="bar")`</li></ul>                                                                                                                                                                                                                                                                                                                                                                  |

## Workaround / Known Issue

There are some code examples that are not formatted well with this plugin and can damage your code.  
But there are workarounds for it. These generate even better pug code!

### Example

[Issue 114](https://github.com/prettier/plugin-pug/issues/114)

If you have tags at the top/root that are indented, they will lose indentation due to a technical limitation of pug.  
Please check these before committing after running this plugin for the first time and fix them manually.

## Integration with editors

If you are using a text editor that supports Prettier integration (e.g. [Atom](https://atom.io/packages/prettier-atom)), you can have all Prettier perks for your Pug code too!

Use [VSCode extension](https://github.com/prettier/prettier-vscode) to get support for [VSCode](https://code.visualstudio.com).

In order to get `@prettier/plugin-pug` working in projects that do not have local npm dependencies, you can install this plugin globally:

```bash
npm install --global prettier @prettier/plugin-pug
```

In this case, you might need to check the settings of your editor’s Prettier extension to make sure that a globally installed Prettier is used when it is not found in project dependencies (i.e. `package.json`).

Nevertheless, it is recommended to rely on local copies of `prettier` and `@prettier/plugin-pug` as this reduces the chance of formatting conflicts between project collaborators.
This may happen if different global versions of Prettier or its Pug plugin are used.

Installing `@prettier/plugin-pug` either locally or globally may require you to restart the editor if formatting does not work right away.

## Implementation details

This plugin is written in TypeScript and its quality is maintained using Prettier and [Jest](https://jestjs.io).

## Contributing

If you’re interested in contributing to the development of Prettier for Pug, you can follow the [CONTRIBUTING guide from Prettier](https://github.com/prettier/prettier/blob/master/CONTRIBUTING.md), as it all applies to this repository too.

To run `@prettier/plugin-pug` locally:

- Clone this repository.
- Execute `yarn install`.
- Execute `yarn lint` to make sure that the code passes formatting and linting.
- Execute `yarn test` to make sure that TypeScript successfully compiles into JavaScript and and all unit tests pass.

## Credits

This project was inspired by https://github.com/gicentre/prettier-plugin-elm.  
Many thanks also to [@j-f1](https://github.com/j-f1), [@lipis](https://github.com/lipis) and [@azz](https://github.com/azz) for the help in transferring this repository to the prettier organization.

Thanks to [@Peilonrayz](https://github.com/Peilonrayz), who gave me the [idea](https://codereview.stackexchange.com/a/236031/128216) to rewrite the printer into a [class](https://github.com/prettier/plugin-pug/commit/a6e3a4b776ce67f0d5d763aaf1f88c0c860c6ed3) and thus make the code a lot more maintainable.

Thanks to [@lehni](https://github.com/lehni) and [@SkyaTura](https://github.com/SkyaTura) for the massive contribution and the introduction of many new features into the project.
