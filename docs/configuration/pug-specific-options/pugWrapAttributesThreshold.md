---
title: pugWrapAttributesThreshold
prev: /configuration/
tags:
  - wrap
  - attributes
  - threshold
  - choice
---

# pugWrapAttributesThreshold

## Description

Define the maximum amount of attributes that an element can appear with on one line before it gets wrapped.

## Options

**Type:** `choice`  
**Default:** `-1`

### `-1`

Only wrap attributes as needed.

```pug
input(type="text")
input(type="text", value="my_value", name="my_name")
```

### `0`

Always wrap attributes.

```pug
input(
  type="text"
)
input(
  type="text",
  value="my_value",
  name="my_name"
)
```

### `1`

Allow one unwrapped attribute, wrap two and more.

```pug
input(type="text")
input(
  type="text",
  value="my_value",
  name="my_name"
)
```

### `2 .. Infinity`

Same as above, just with different thresholds.

## See also

- [pugWrapAttributesPattern](./pugWrapAttributesPattern.md)
