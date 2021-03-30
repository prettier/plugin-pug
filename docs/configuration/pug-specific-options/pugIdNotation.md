---
title: pugIdNotation
prev: /configuration/
---

# pugIdNotation

## Description

Define how ids should be formatted.

## Options

**Type:** `choice`  
**Default:** `'literal'`

### `'literal'`

Forces all valid ids to be printed as literals.

```pug
foo#bar
```

### `'attribute'`

Forces all ids to be printed as attributes.

```pug
foo(id="bar")
```

::: warning
This option is not yet available  
If you would like to offer this option, please let us know here [#167](https://github.com/prettier/plugin-pug/issues/167)
:::

### `'as-is'`

Disables id formatting.

```pug
foo(id="bar")
```

## See also

- [pugClassNotation](./pugClassNotation.md)
