---
prev: /guide/
---

# Configuration

## Standard Prettier overrides

By default, the same formatting options are used as configured through the standard prettier options. By using versions of these standard options prefixed with `pug`, you can override pug formatting options even when using pug embedded in other files, e.g. vue single-file components:

### Bracket Spacing

[pugBracketSpacing](https://prettier.io/docs/en/options.html#bracket-spacing)

Print spaces between brackets in object literals.

### Print Width

[pugPrintWidth](https://prettier.io/docs/en/options.html#print-width)

Specify the line length that the printer will wrap on.

### Semicolons

[pugSemi](https://prettier.io/docs/en/options.html#semicolons)

Print semicolons at the ends of code statements.

### Quotes

[pugSingleQuote](https://prettier.io/docs/en/options.html#quotes)

Use single quotes instead of double quotes.  
Please note that the opposite setting will be used automatically for inlined JavaScript.

### Tab Width

[pugTabWidth](https://prettier.io/docs/en/options.html#tab-width)

Use spaces for indentation and specify the number of spaces per indentation-level.

### Tabs

[pugUseTabs](https://prettier.io/docs/en/options.html#tabs)

Indent lines with tabs instead of spaces.  
Overrides `pugTabWidth`

### Arrow Function Parentheses

[pugArrowParens](https://prettier.io/docs/en/options.html#arrow-function-parentheses)

Include parentheses around a sole arrow function parameter.

## Pug specific options

These additional options are specific to pug templates and can be configured in your global .prettierrc file:

### Attribute Separator

- [pugAttributeSeparator](./pug-specific-options/pugAttributeSeparator.md)

### Closing Bracket Position

- [pugClosingBracketPosition](./pug-specific-options/pugClosingBracketPosition.md)

### Comment Preserve Spaces

- [pugCommentPreserveSpaces](./pug-specific-options/pugCommentPreserveSpaces.md)

### Sort Attributes

- [pugSortAttributes](./pug-specific-options/pugSortAttributes.md)
- [pugSortAttributesBeginning](./pug-specific-options/pugSortAttributesBeginning.md)
- [pugSortAttributesEnd](./pug-specific-options/pugSortAttributesEnd.md)

### Wrap Attributes

- [pugWrapAttributesPattern](./pug-specific-options/pugWrapAttributesPattern.md)
- [pugWrapAttributesThreshold](./pug-specific-options/pugWrapAttributesThreshold.md)

### Single File Component Indentation

- [pugSingleFileComponentIndentation](./pug-specific-options/pugSingleFileComponentIndentation.md)

### Empty Attributes

- [pugEmptyAttributes](./pug-specific-options/pugEmptyAttributes.md)
- [pugEmptyAttributesForceQuotes](./pug-specific-options/pugEmptyAttributesForceQuotes.md)

### Notation

- [pugClassNotation](./pug-specific-options/pugClassNotation.md)
- [pugIdNotation](./pug-specific-options/pugIdNotation.md)
