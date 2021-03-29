---
title: pugAttributeSeparator
prev: /configuration/
---

# pugAttributeSeparator

## Description

Change when attributes are separated by commas in tags.

## Options

**Type:** `choice`  
**Default:** `'always'`

### `'always'`

Always separate attributes with commas.

```pug
button(type="submit", (click)="play()", disabled)
```

### `'as-needed'`

Only add commas between attributes where required.

```pug
button(type="submit", (click)="play()" disabled)
```

### `'none'`

Never add commas between attributes.

```pug
button(type="submit" @click="play()" :style="style" disabled)
```

::: warning
Please note that while this option will process Angular syntax (e.g. `(click)="play()"`), the resulting pug file will throw a syntax error when parsed: `Syntax Error: Assigning to rvalue`
:::
