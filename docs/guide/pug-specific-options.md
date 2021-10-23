# Pug specific options

These additional options are specific to pug templates and can be configured in your global .prettierrc file:

---

## Attribute Separator

`pugAttributeSeparator`

### Description

Choose when to use commas to separate attributes in tags.

### Options

**Type:** `choice`  
**Default:** `'always'`

#### `'always'`

Always separate attributes with commas.

```pug
button(type="submit", (click)="play()", disabled)
```

#### `'as-needed'`

Only add commas between attributes where required.

```pug
button(type="submit", (click)="play()" disabled)
```

#### `'none'`

Never add commas between attributes.

```pug
button(type="submit" @click="play()" :style="style" disabled)
```

::: warning
Please note that while this option will process Angular syntax (e.g. `(click)="play()"`), the resulting pug file will throw a syntax error when parsed: `Syntax Error: Assigning to rvalue`
:::

---

## Comment Preserve Spaces

`pugCommentPreserveSpaces`

### Description

Change behavior of spaces within comments.

### Options

**Type:** `choice`  
**Default:** `'keep-all'`

#### `'keep-all'`

Keep all spaces within comments.

```pug
// ___this _is __a __comment_
```

#### `'keep-leading'`

Keep leading spaces within comments.

```pug
// ___this is a comment
```

#### `'trim-all'`

Trim all spaces within comments.

```pug
// this is a comment
```

---

## Sort Attributes

`pugSortAttributes`

### Description

Sort attributes that are not on _beginning_ and _end_ patterns.

### Options

**Type:** `choice`  
**Default:** `'as-is'`

#### `'as-is'`

Keep the attributes untouched.

```pug
Foo(a c d b)
```

#### `'asc'`

Sort attributes ascending.

```pug
Foo(a b c d)
```

#### `'desc'`

Sort attributes descending.

```pug
Foo(d c b a)
```

---

`pugSortAttributesBeginning`

### Description

Sort attributes by regex patterns to the beginning.

### Options

**Type:** `array`  
**Default:** `[]`

---

`pugSortAttributesEnd`

### Description

Sort attributes by regex patterns to the end.

### Options

**Type:** `array`  
**Default:** `[]`

---

[Example](https://github.com/prettier/plugin-pug/issues/22#issuecomment-699509995)

---

## Wrap Attributes

`pugWrapAttributesPattern`

### Description

Define a regex pattern to match attributes against that should always trigger wrapping.

### Options

**Type:** `array`  
**Default:** `[]`

---

`pugWrapAttributesThreshold`

### Description

Define the maximum amount of attributes that an element can appear with on one line before it gets wrapped.

### Options

**Type:** `choice`  
**Default:** `-1`

#### `-1`

Only wrap attributes as needed.

```pug
input(type="text")
input(type="text", value="my_value")
input(type="text", value="my_value", name="my_name")
```

#### `0`

Always wrap attributes.

```pug
input(
  type="text"
)
input(
  type="text",
  value="my_value"
)
input(
  type="text",
  value="my_value",
  name="my_name"
)
```

#### `1`

Allow up to one attribute to remain in the same line. Wrap all attributes, if there are two or more attributes.

```pug
input(type="text")
input(
  type="text",
  value="my_value"
)
input(
  type="text",
  value="my_value",
  name="my_name"
)
```

#### `2 .. Infinity`

Same as above, just with different thresholds.

```pug
input(type="text")
input(type="text", value="my_value")
input(
  type="text",
  value="my_value",
  name="my_name"
)
```

---

## Framework specific

`pugFramework`

### Description

Specify the used framework within the project.  
If not set, or set to 'auto', the plugin tries to find the correct framework by reading `process.env.npm_package_*`.

### Options

**Type:** `choice`  
**Default:** `'auto'`

#### `'auto'`

Try to detect a framework by checking `process.env.npm_package_*`.  
If no framework could be detected, the default strategy will be used.

#### `'vue'`

Set used framework to Vue.  
This may hide some unrelated warnings that only apply to Angular.

#### `'svelte'`

Set used framework to Svelte.  
_Currently behaves the same as Vue._  
_If you found an issue with that, please open an [issue](https://github.com/prettier/plugin-pug/issues/new?template=bug-report.md)._

#### `'angular'`

Set used framework to Angular.  
This uses a specific parser for text interpolation.

---

`pugSingleFileComponentIndentation`

### Description

Indent pug in template tags in single file components such as from vue or svelte.

### Options

**Type:** `boolean`  
**Default:** `false`

---

## Empty Attributes

`pugEmptyAttributes`

### Description

Change behavior of boolean attributes.

### Options

**Type:** `choice`  
**Default:** `'as-is'`

#### `'as-is'`

Nothing is changed.

```pug
foo(a, b="", c)
```

#### `'none'`

Every attribute with empty quotes will have them removed.

```pug
foo(a, b, c)
```

#### `'all'`

Every boolean attribute will be expressed with empty quotes.

```pug
foo(a="", b="", c="")
```

---

`pugEmptyAttributesForceQuotes`

### Description

Define a list of patterns for attributes that will be forced to have empty quotes even with `pugEmptyAttributes` set to `'none'`.

### Options

**Type:** `array`  
**Default:** `[]`

---

## Notation

`pugClassNotation`

### Description

Define how classes should be formatted.

### Options

**Type:** `choice`  
**Default:** `'literal'`

#### `'literal'`

Forces all valid classes to be printed as literals.

```pug
foo.bar.baz
```

#### `'attribute'`

Forces all classes to be printed as attributes.

```pug
foo(class="bar baz")
```

#### `'as-is'`

Disables class formatting.

```pug
foo.bar(class="baz")
```

---

`pugIdNotation`

### Description

Define how ids should be formatted.

### Options

**Type:** `choice`  
**Default:** `'literal'`

#### `'literal'`

Forces all valid ids to be printed as literals.

```pug
foo#bar
```

#### `'attribute'`

Forces all ids to be printed as attributes.

```pug
foo(id="bar")
```

::: warning
This option is not yet available.  
If you would like to offer this option, please let us know here [#167](https://github.com/prettier/plugin-pug/issues/167)
:::

#### `'as-is'`

Disables id formatting.

```pug
foo(id="bar")
```

---

## Explicit div

`pugExplicitDiv`

### Description

Define if a `div` tag should _always_ be printed with literal class and id formatting.

### Options

**Type:** `boolean`  
**Default:** `false`

#### `false`

Input:

```pug
div.foo.bar
```

Output:

```pug
.foo.bar
```

#### `true`

Input:

```pug
.foo.bar
```

Output:

```pug
div.foo.bar
```
