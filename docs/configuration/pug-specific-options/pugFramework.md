---
title: pugFramework
prev: /configuration/
tags:
  - framework
  - choice
  - vue
  - angular
  - svelte
---

# pugFramework

## Description

Specify the used framework within the project.  
If not set, or set to 'none', the plugin tries to find the correct framework by reading `process.env.npm_package_*`.

## Options

**Type:** `choice`  
**Default:** `'none'`

### `'none'`

Try to detect a framework by checking `process.env.npm_package_*`.  
If no framework could be detected, the default strategy will be used.

### `'vue'`

Set used framework to Vue.  
This may hide some unrelated warnings that only apply to Angular.

### `'svelte'`

Set used framework to Svelte.  
_Currently behaves the same as Vue._  
_If you found an issue with that, please open an [issue](https://github.com/prettier/plugin-pug/issues/new?template=bug-report.md)._

### `'angular'`

Set used framework to Angular.  
This uses a specific parser for text interpolation.
