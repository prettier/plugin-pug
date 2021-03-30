---
title: pugSortAttributes
prev: /configuration/
---

# pugSortAttributes

## Description

Sort attributes that are not on _beginning_ and _end_ patterns.

## Options

**Type:** `choice`  
**Default:** `'as-is'`

### `'as-is'`

Keep the attributes untouched.

```pug
Foo(a c d b)
```

### `'asc'`

Sort attributes ascending.

```pug
Foo(a b c d)
```

### `'desc'`

Sort attributes descending.

```pug
Foo(d c b a)
```

## See also

- [pugSortAttributesBeginning](./pugSortAttributesBeginning.md)
- [pugSortAttributesEnd](./pugSortAttributesEnd.md)
