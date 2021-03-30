---
title: pugClassNotation
prev: /configuration/
---

# pugClassNotation

## Description

Define how classes should be formatted.

## Options

**Type:** `choice`  
**Default:** `'literal'`

### `'literal'`

Forces all valid classes to be printed as literals.

```pug
foo.bar.baz
```

### `'attribute'`

Forces all classes to be printed as attributes.

```pug
foo(class="bar baz")
```

::: warning
This option is not yet available  
If you would like to offer this option, please let us know here [#167](https://github.com/prettier/plugin-pug/issues/167)
:::

### `'as-is'`

Disables class formatting.

```pug
foo.bar(class="baz")
```

## See also

- [pugIdNotation](./pugIdNotation.md)
