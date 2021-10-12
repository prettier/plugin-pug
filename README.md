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
- [Configuration](#configuration)
- [Workarounds / Known Issues](#workarounds--known-issues)
- [Integration with editors](#integration-with-editors)
- [Implementation details](#implementation-details)
- [Contributing](#contributing)
- [Credits](#credits)

## Getting started

Simply install `prettier` and `@prettier/plugin-pug` as your project’s `devDependencies`:

```bash
npm add --save-dev prettier @prettier/plugin-pug
# or
yarn add --dev prettier @prettier/plugin-pug
# or
pnpm add --save-dev prettier @prettier/plugin-pug
```

## Usage

```bash
npx prettier --write "**/*.pug"
# or
yarn prettier --write "**/*.pug"
# or
pnpm prettier --write "**/*.pug"
```

## Configuration

See [documentation](https://prettier.github.io/plugin-pug/guide)

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
- Execute `pnpm install`.
- Execute `pnpm run lint` to make sure that the code passes formatting and linting.
- Execute `pnpm run test` to make sure that TypeScript successfully compiles into JavaScript and all unit tests pass.

## Credits

This project was inspired by https://github.com/gicentre/prettier-plugin-elm.  
Many thanks also to [@j-f1](https://github.com/j-f1), [@lipis](https://github.com/lipis) and [@azz](https://github.com/azz) for the help in transferring this repository to the prettier organization.

Thanks to [@Peilonrayz](https://github.com/Peilonrayz), who gave me the [idea](https://codereview.stackexchange.com/a/236031/128216) to rewrite the printer into a [class](https://github.com/prettier/plugin-pug/commit/a6e3a4b776ce67f0d5d763aaf1f88c0c860c6ed3) and thus make the code a lot more maintainable.

Thanks to [@lehni](https://github.com/lehni) and [@SkyaTura](https://github.com/SkyaTura) for the massive contribution and the introduction of many new features into the project.
