---
title: pugClosingBracketPosition
prev: /configuration/
tags:
  - closing
  - bracket
  - position
  - choice
---

# pugClosingBracketPosition

## Description

Position of closing bracket of attributes.

## Options

**Type:** `choice`  
**Default:** `'new-line'`

### `'new-line'`

Closing bracket ends with a new line.

```pug
input(
  type="text",
  value="my_value",
  name="my_name",
  alt="my_alt",
  autocomplete="on"
)
```

### `'last-line'`

Closing bracket remains with last attribute's line.

```pug
input(
  type="text",
  value="my_value",
  name="my_name",
  alt="my_alt",
  autocomplete="on")
```
