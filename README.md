<p align="center">
  &nbsp;&nbsp;<a href="https://prettier.io">
    <img alt="Prettier" src="https://cdn.rawgit.com/prettier/prettier-logo/master/images/prettier-icon-light.svg"><!--
  --></a>&nbsp;&nbsp;
  &nbsp;&nbsp;<a href="https://pugjs.org">
    <img alt="Pug" src="https://cdn.rawgit.com/pugjs/pug-logo/eec436cee8fd9d1726d7839cbe99d1f694692c0c/SVG/pug-final-logo-_-colour-128.svg" height="210"><!--
  --></a>&nbsp;&nbsp;
</p>

<h2 align="center">Prettier Pug plugin</h2>

<p align="center">
  <a href="https://github.com/prettier/plugin-pug/blob/master/LICENSE">
    <img alt="license: MIT" src="https://img.shields.io/github/license/prettier/plugin-pug.svg?style=flat-square"><!--
  --></a>
  <a href="https://www.npmjs.com/package/@prettier/plugin-pug">
    <img alt="NPM package" src="https://img.shields.io/npm/v/@prettier/plugin-pug.svg?style=flat-square"><!--
  --></a>
  <a href="https://www.npmjs.com/package/@prettier/plugin-pug">
    <img alt="downloads" src="https://img.shields.io/npm/dt/@prettier/plugin-pug.svg?style=flat-square"><!--
   --></a>
  <a href="#badge">
    <img alt="code style: Prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"><!--
  --></a>
  <a href="https://dev.azure.com/shinigami92/Prettier%20Pug%20plugin/_build/latest?definitionId=3&branchName=master">
    <img alt="Build Status" src="https://dev.azure.com/shinigami92/Prettier%20Pug%20plugin/_apis/build/status/prettier.plugin-pug?branchName=master"><!--
  --></a>
</p>

Please note that the [plugin ecosystem in Prettier](https://prettier.io/docs/en/plugins.html) is still beta, which may make <nobr>`@prettier/plugin-pug`</nobr> not ready for production use yet.

---

Plugin for Prettier to format pug code

You can disable code formatting for a particular code block by adding <nobr>`<!-- prettier-ignore -->`</nobr> before ` ```pug `.

````markdown
Pug code with custom formatting:

<!-- prettier-ignore -->
```pug
div.text( color =   "primary",  disabled  ="true"  )
```

Prettified code:

```pug
.text(color="primary", disabled)
```
````

## Getting started

Simply install `prettier` and `@prettier/plugin-pug` as your project’s npm devDependencies:

```bash
cd /path/to/project

## initialise an npm project if you haven’t done it yet
npm init
## or
yarn init

## add Prettier and its Pug plugin to project’s dev dependencies
npm install --dev prettier @prettier/plugin-pug
## or
yarn add --dev prettier @prettier/plugin-pug
```

## Usage

```bash
## format all pug files in your project
./node_modules/.bin/prettier --write "**/*.pug"
## or
yarn prettier --write "**/*.pug"
```

### Prettier Options

- `printWidth`  
  _Currently not very accurate, but works_
- `singleQuote`  
  If you want to configure different quotes for pug than for js code, you can use prettier's override.
  ```json
  {
    "singleQuote": true,
    "overrides": [
      {
        "files": "*.pug",
        "options": {
          "parser": "pug",
          "singleQuote": true
        }
      }
    ]
  }
  ```
- `tabWidth`  
  Use spaces for indentation
- `useTabs`  
  Use tab for indentation
  Overrides `tabWidth`

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
Many thanks also to [@j-f1](https://github.com/j-f1), [@lipis](https://github.com/lipis) and [@azz](https://github.com/azz) for the help in transferring this repos to the prettier orga.
