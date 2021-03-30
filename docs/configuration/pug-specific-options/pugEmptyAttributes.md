---
title: pugEmptyAttributes
prev: /configuration/
---

# pugEmptyAttributes

## Description

coming soon

## Options

**Type:** `choice`  
**Default:** `'as-is'`

Change behavior of boolean attributes.

### `'as-is'`

Nothing is changed.

```pug
foo(a, b="", c)
```

### `'none'`

Every attribute with empty quotes will have them removed.

```pug
foo(a, b, c)
```

### `'all'`

Every boolean attribute will be expressed with empty quotes.

```pug
foo(a="", b="", c="")
```

## See also

- [pugEmptyAttributesForceQuotes](./pugEmptyAttributesForceQuotes.md)
