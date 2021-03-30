---
title: pugCommentPreserveSpaces
prev: /configuration/
---

# pugCommentPreserveSpaces

## Description

Change behavior of spaces within comments.

## Options

**Type:** `choice`  
**Default:** `'keep-all'`

### `'keep-all'`

Keep all spaces within comments.

```pug
// ___this _is __a __comment_
```

### `'keep-leading'`

Keep leading spaces within comments.

```pug
// ___this is a comment
```

### `'trim-all'`

Trim all spaces within comments.

```pug
// this is a comment
```
