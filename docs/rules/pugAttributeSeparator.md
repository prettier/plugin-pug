# pugAttributeSeparator

**Name:** `pugAttributeSeparator`  
**Type:** `choice`  
**Default:** `always`

## Description

Change when attributes are separated by commas in tags.

- `'always'`  
  Always separate attributes with commas.  
  Example: button(type="submit", (click)="play()", disabled)
- `'as-needed'`  
  Only add commas between attributes where required.  
  Example: button(type="submit", (click)="play()" disabled)
- `'none'`  
  Never add commas between attributes.  
  Example: button(type="submit" @click="play()" :style="style" disabled)  
  Please note that while this option will process Angular syntax (e.g. (click)="play()"),
  the resulting pug file will throw a syntax error when parsed: Syntax Error: Assigning to rvalue
