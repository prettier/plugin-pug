# Standard Prettier overrides

By default, the same formatting options are used as configured through the standard prettier options. By using versions of these standard options prefixed with `pug`, you can override pug formatting options even when using pug embedded in other files, e.g. vue single-file components:

## Bracket Spacing

[pugBracketSpacing](https://prettier.io/docs/en/options.html#bracket-spacing)

Print spaces between brackets in object literals.

## Print Width

[pugPrintWidth](https://prettier.io/docs/en/options.html#print-width)

Specify the line length that the printer will wrap on.

## Semicolons

[pugSemi](https://prettier.io/docs/en/options.html#semicolons)

Print semicolons at the ends of code statements.

## Quotes

[pugSingleQuote](https://prettier.io/docs/en/options.html#quotes)

Use single quotes instead of double quotes.  
Please note that the opposite setting will be used automatically for inlined JavaScript.

## Tab Width

[pugTabWidth](https://prettier.io/docs/en/options.html#tab-width)

Use spaces for indentation and specify the number of spaces per indentation-level.

## Tabs

[pugUseTabs](https://prettier.io/docs/en/options.html#tabs)

Indent lines with tabs instead of spaces.  
Overrides `pugTabWidth`

## Arrow Function Parentheses

[pugArrowParens](https://prettier.io/docs/en/options.html#arrow-function-parentheses)

Include parentheses around a sole arrow function parameter.
