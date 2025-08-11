# Next

[diff](https://github.com/prettier/plugin-pug/compare/3.4.0...main)

# 3.4.0

[diff](https://github.com/prettier/plugin-pug/compare/3.3.0...3.4.0)

- Handle TS syntax in vue context ([#365])
- Enhance quotation of variable formatting ([#512])
- Enhance quotation of vue v-bind ([#531])

[#365]: https://github.com/prettier/plugin-pug/issues/365
[#512]: https://github.com/prettier/plugin-pug/issues/512
[#531]: https://github.com/prettier/plugin-pug/issues/531

# 3.3.0

[diff](https://github.com/prettier/plugin-pug/compare/3.2.1...3.3.0)

- Add `pugPreserveWhitespace` option ([#567])

[#567]: https://github.com/prettier/plugin-pug/pull/567

# 3.2.1

[diff](https://github.com/prettier/plugin-pug/compare/3.2.0...3.2.1)

- Fix special case for escaped double quotes in Vue expressions ([#529])

[#529]: https://github.com/prettier/plugin-pug/pull/529

# 3.2.0

[diff](https://github.com/prettier/plugin-pug/compare/3.1.0...3.2.0)

- Multiple fixes for class attribute conversions ([#509])

[#509]: https://github.com/prettier/plugin-pug/pull/509

# 3.1.0

[diff](https://github.com/prettier/plugin-pug/compare/3.0.0...3.1.0)

- Add option to set indent depth of closing brackets ([#502])
- Fix class attributes not counting towards attribute wrapping ([#503])

[#502]: https://github.com/prettier/plugin-pug/pull/502
[#503]: https://github.com/prettier/plugin-pug/pull/503

# 3.0.0

[diff](https://github.com/prettier/plugin-pug/compare/2.5.2...3.0.0)

## BREAKING CHANGES

**Dropped support for Prettier v2 and CJS** ([#458])

If you are using Prettier v2 / CJS, you need to stay on `2.5.2`.

[#458]: https://github.com/prettier/plugin-pug/pull/458

# 2.5.2

[diff](https://github.com/prettier/plugin-pug/compare/2.5.1...2.5.2)

This version does not contain any changes to the plugin itself, but only internal changes to the docs, build and CI.

This might be the last version that supports Prettier v2 as well as CJS.  
The next version will probably the v3 release and will only support Prettier v3 and ESM.

# 2.5.1

[diff](https://github.com/prettier/plugin-pug/compare/2.5.0...2.5.1)

- Fix whitespace in interpolations ([#447])

[#447]: https://github.com/prettier/plugin-pug/issues/447

# 2.5.0

[diff](https://github.com/prettier/plugin-pug/compare/2.4.2...2.5.0)

## BREAKING CHANGES

- **Dropped support for node v14** ([#441])

## Other changes

- Fix trailing whitespace after class ([#442])

[#441]: https://github.com/prettier/plugin-pug/pull/441
[#442]: https://github.com/prettier/plugin-pug/pull/442

# 2.4.2

[diff](https://github.com/prettier/plugin-pug/compare/2.4.1...2.4.2)

- No changes, just an update to TypeScript v5 and therefore possibly better emitted code.

# 2.4.1

[diff](https://github.com/prettier/plugin-pug/compare/2.4.0...2.4.1)

- Omit leading semicolon in code expressions ([#428])

[#428]: https://github.com/prettier/plugin-pug/issues/428

# 2.4.0

[diff](https://github.com/prettier/plugin-pug/compare/2.3.0...2.4.0)

- Fix trailing whitespace after tag ([#425])
- Add `semi` code interpolation option ([#426])

[#425]: https://github.com/prettier/plugin-pug/issues/425
[#426]: https://github.com/prettier/plugin-pug/pull/426

# 2.3.0

[diff](https://github.com/prettier/plugin-pug/compare/2.2.0...2.3.0)

- Transform trailing whitespace to recommended way ([#417])

[#417]: https://github.com/prettier/plugin-pug/issues/417

# 2.2.0

[diff](https://github.com/prettier/plugin-pug/compare/2.1.1...2.2.0)

- Preserve script tag after `//- prettier-ignore` ([#402])
- Fix indent with `pugExplicitDiv` and `pugClassNotation=attribute` ([#405])
- Add `pugPreserveAttributeBrackets` option ([#404])
- Replace `trimRight` with `trimEnd` ([c955b9f])

[c955b9f]: https://github.com/prettier/plugin-pug/commit/c955b9f5935dc75f8cc9b50adf3de611e1e75499
[#402]: https://github.com/prettier/plugin-pug/issues/402
[#404]: https://github.com/prettier/plugin-pug/issues/404
[#405]: https://github.com/prettier/plugin-pug/issues/405

# 2.1.1

[diff](https://github.com/prettier/plugin-pug/compare/2.1.0...2.1.1)

- Avoid use `.` or circular dependency in `src/options` files ([#398])

[#398]: https://github.com/prettier/plugin-pug/issues/398

# 2.1.0

[diff](https://github.com/prettier/plugin-pug/compare/2.0.0...2.1.0)

- Rework logging ([#172])
- Update docs to VitePress v1 (alpha)
  - _Known issue_: The "Get Started" link is not working correctly right now.  
    Click on "Guide" in the upper right nav menu for now.

[#172]: https://github.com/prettier/plugin-pug/issues/172

# 2.0.0

[diff](https://github.com/prettier/plugin-pug/compare/1.20.1...2.0.0)

## BREAKING CHANGES

- **Dropped support for node v12** ([faf9f2e])

[faf9f2e]: https://github.com/prettier/plugin-pug/commit/faf9f2ebbc862b84d4646ecc7c6394cfe89c114d

# 1.20.1

[diff](https://github.com/prettier/plugin-pug/compare/1.20.0...1.20.1)

- Handle vue `v-` directives when framework is set to vue ([#362])

[#362]: https://github.com/prettier/plugin-pug/pull/362

# 1.20.0

[diff](https://github.com/prettier/plugin-pug/compare/1.19.3...1.20.0)

- Fix single quotes in framework interpolation ([#339])

[#339]: https://github.com/prettier/plugin-pug/issues/339

# 1.19.3

[diff](https://github.com/prettier/plugin-pug/compare/1.19.2...1.19.3)

- Add `funding` key to package.json ([#350])

[#350]: https://github.com/prettier/plugin-pug/pull/350

# 1.19.2

[diff](https://github.com/prettier/plugin-pug/compare/1.19.1...1.19.2)

- Handle nested Angular translations ([#329])  
  _at least don't fail for now_

[#329]: https://github.com/prettier/plugin-pug/issues/329

# 1.19.1

[diff](https://github.com/prettier/plugin-pug/compare/1.19.0...1.19.1)

- Handle colon token in combination with `pugClassLocation: 'after-attributes'` ([#326])

[#326]: https://github.com/prettier/plugin-pug/issues/326

# 1.19.0

[diff](https://github.com/prettier/plugin-pug/compare/1.18.0...1.19.0)

- New option `pugClassLocation` ([#313])

[#313]: https://github.com/prettier/plugin-pug/issues/313

# 1.18.0

[diff](https://github.com/prettier/plugin-pug/compare/1.17.3...1.18.0)

- Handle `singleQuote` option more precisely ([#45])
  - _for some configurations, this could be a "breaking" change_

[#45]: https://github.com/prettier/plugin-pug/issues/45

# 1.17.3

[diff](https://github.com/prettier/plugin-pug/compare/1.17.2...1.17.3)

- Treat `v-t` from vue-i18n as Vue expression ([#310])

[#310]: https://github.com/prettier/plugin-pug/issues/310

# 1.17.2

[diff](https://github.com/prettier/plugin-pug/compare/1.17.1...1.17.2)

- Fix indentation issue of inline javascript ([#307])

[#307]: https://github.com/prettier/plugin-pug/issues/307

# 1.17.1

[diff](https://github.com/prettier/plugin-pug/compare/1.17.0...1.17.1)

- Add type definitions that can be used in `.prettierrc.cjs`

# 1.17.0

[diff](https://github.com/prettier/plugin-pug/compare/1.16.7...1.17.0)

## BREAKING CHANGES

- Remove non prefixes options ([#295])  
  You now need to use e.g. `pugAttributeSeparator` instead of `attributeSeparator`
- Replace `pugClosingBracketPosition` with `pugBracketSameLine` ([#291])

## Other changes

- Preserve escaped quotes within bindings ([#303])

[#291]: https://github.com/prettier/plugin-pug/issues/291
[#295]: https://github.com/prettier/plugin-pug/pull/295
[#303]: https://github.com/prettier/plugin-pug/issues/303

# 1.16.7

[diff](https://github.com/prettier/plugin-pug/compare/1.16.6...1.16.7)

- Fix handling of `prettier-ignore` ([#292])

[#292]: https://github.com/prettier/plugin-pug/issues/292

# 1.16.6

[diff](https://github.com/prettier/plugin-pug/compare/1.16.5...1.16.6)

- Handle Vue slot shorthand formatting ([#289])

[#289]: https://github.com/prettier/plugin-pug/issues/289

# 1.16.5

[diff](https://github.com/prettier/plugin-pug/compare/1.16.4...1.16.5)

- Fix indentation of templates starting with class or ID when using `pugSingleFileComponentIndentation` ([#282])

[#282]: https://github.com/prettier/plugin-pug/issues/282

# 1.16.4

[diff](https://github.com/prettier/plugin-pug/compare/1.16.3...1.16.4)

- Fix trailing indentations after pipeless text ([#278])

[#278]: https://github.com/prettier/plugin-pug/issues/278

# 1.16.3

[diff](https://github.com/prettier/plugin-pug/compare/1.16.2...1.16.3)

- Use `pugTabWidth` for calculating line length ([#268])

[#268]: https://github.com/prettier/plugin-pug/issues/268

# 1.16.2

[diff](https://github.com/prettier/plugin-pug/compare/1.16.1...1.16.2)

- Preserve backticks for `class` and `id` attributes ([#261])
- Apply `useTabs` also for code interpolations ([#262])

[#261]: https://github.com/prettier/plugin-pug/issues/261
[#262]: https://github.com/prettier/plugin-pug/issues/262

# 1.16.1

[diff](https://github.com/prettier/plugin-pug/compare/1.16.0...1.16.1)

- Prevent wrong quotation ([#255])

[#255]: https://github.com/prettier/plugin-pug/issues/255

# 1.16.0

[diff](https://github.com/prettier/plugin-pug/compare/1.15.3...1.16.0)

- New option `pugExplicitDiv` ([#241])
- Ignore formatting for single line interpolated attributes ([#238])
- Handle non-JS script content ([#244])
- Fix corrupt attribute values on dynamically bound Vue props without quotes ([#250])

[#238]: https://github.com/prettier/plugin-pug/issues/238
[#241]: https://github.com/prettier/plugin-pug/issues/241
[#244]: https://github.com/prettier/plugin-pug/issues/244
[#250]: https://github.com/prettier/plugin-pug/issues/250

# 1.15.3

[diff](https://github.com/prettier/plugin-pug/compare/1.15.2...1.15.3)

- Upgrade to Prettier v2.3  
  _This fixes `pugSingleFileComponentIndentation` option in combination with prettier v2.3_

# 1.15.2

[diff](https://github.com/prettier/plugin-pug/compare/1.15.1...1.15.2)

- Handle `v-bind` expression separately ([4827855])

[4827855]: https://github.com/prettier/plugin-pug/commit/4827855ccd8130e787f684ff9a189e90f8a9ddf0

# 1.15.1

[diff](https://github.com/prettier/plugin-pug/compare/1.15.0...1.15.1)

- Same as `1.15.0` but with `dist` folder ([#211])

[#211]: https://github.com/prettier/plugin-pug/issues/211

# 1.15.0

[diff](https://github.com/prettier/plugin-pug/compare/1.14.0...1.15.0)

- Handle `svelte` syntax ([#201])
- Support bracket spacing for `interpolated-code` token ([#208])
- Fix invalid added `;` in front of template string ([#206])

[#201]: https://github.com/prettier/plugin-pug/issues/201
[#206]: https://github.com/prettier/plugin-pug/issues/206
[#208]: https://github.com/prettier/plugin-pug/pull/208

# 1.14.0

[diff](https://github.com/prettier/plugin-pug/compare/1.13.5...1.14.0)

- New [Documentation](https://prettier.github.io/plugin-pug) :memo:
- New `pugFramework` option ([#186])
- Add `'attribute'` choice to `pugClassNotation` ([#203])  
  _Useful for e.g. [Tailwind CSS](https://tailwindcss.com) / [Windi CSS](https://windicss.org)_
- Handle autocloseable tag with trailing text correctly ([#182])

[#182]: https://github.com/prettier/plugin-pug/issues/182
[#186]: https://github.com/prettier/plugin-pug/pull/186
[#203]: https://github.com/prettier/plugin-pug/pull/203

# 1.13.5

[diff](https://github.com/prettier/plugin-pug/compare/1.13.4...1.13.5)

- Handle `v-slot` expression correctly ([#180])

[#180]: https://github.com/prettier/plugin-pug/issues/180

# 1.13.4

[diff](https://github.com/prettier/plugin-pug/compare/1.13.3...1.13.4)

- Fix attribute interpolation using quotes ([#179])

[#179]: https://github.com/prettier/plugin-pug/pull/179

# 1.13.3

[diff](https://github.com/prettier/plugin-pug/compare/1.13.2...1.13.3)

- Handle `v-on` expression separately ([#176])

[#176]: https://github.com/prettier/plugin-pug/issues/176

# 1.13.2

[diff](https://github.com/prettier/plugin-pug/compare/1.13.1...1.13.2)

- Fix blank lines in inline syntax ([#171])

[#171]: https://github.com/prettier/plugin-pug/issues/171

# 1.13.1

[diff](https://github.com/prettier/plugin-pug/compare/1.13.0...1.13.1)

- Set `prettier` peer dependency to `>= 2.1.0` ([#168])
- Handle error thrown by interpolated code in pipeless script tag ([#169])

[#168]: https://github.com/prettier/plugin-pug/issues/168
[#169]: https://github.com/prettier/plugin-pug/issues/169

# 1.13.0

[diff](https://github.com/prettier/plugin-pug/compare/1.12.0...1.13.0)

- Option for disabling formatting of `class` and `id` literals ([#36])
- Switching from `master` to `main` branch ([#166])

[#36]: https://github.com/prettier/plugin-pug/issues/36
[#166]: https://github.com/prettier/plugin-pug/issues/166

# 1.12.0

[diff](https://github.com/prettier/plugin-pug/compare/1.11.0...1.12.0)

- Format value of `style` attribute in tags ([#162])

[#162]: https://github.com/prettier/plugin-pug/issues/162

# 1.11.0

[diff](https://github.com/prettier/plugin-pug/compare/1.10.1...1.11.0)

- Handle `for...of` in vue `v-for` ([#129])
- Support embedded formatting of inline `script` and `style` tags ([#158])  
  _If there are problems, please create an issue_

[#129]: https://github.com/prettier/plugin-pug/issues/129
[#158]: https://github.com/prettier/plugin-pug/issues/158

# 1.10.1

[diff](https://github.com/prettier/plugin-pug/compare/1.10.0...1.10.1)

- Fix handling of initial indentation for `pugSingleFileComponentIndentation` ([#145])
- Fix bracket interpolation in combination with `pugSingleFileComponentIndentation` ([#148])
- Do not wrap attributes in enclosed code interpolation ([#149])
- Print warning for parsed object shorthand notation ([#147])
- Add `'pug'` to `vscodeLanguageIds` ([#150])

[#145]: https://github.com/prettier/plugin-pug/issues/145
[#147]: https://github.com/prettier/plugin-pug/issues/147
[#148]: https://github.com/prettier/plugin-pug/issues/148
[#149]: https://github.com/prettier/plugin-pug/issues/149
[#150]: https://github.com/prettier/plugin-pug/issues/150

# 1.10.0

[diff](https://github.com/prettier/plugin-pug/compare/1.9.0...1.10.0)

- Implement `pugEmptyAttributes` and `pugEmptyAttributesForceQuotes` option ([#128])
- Improve warning message ([#143], [c0319bf])

[#128]: https://github.com/prettier/plugin-pug/issues/128
[#143]: https://github.com/prettier/plugin-pug/issues/143
[c0319bf]: https://github.com/prettier/plugin-pug/commit/c0319bf5220ac2aa5ecbc82a473552f76c07009d

# 1.9.0

[diff](https://github.com/prettier/plugin-pug/compare/1.8.1...1.9.0)

- Support indentation for SFC ([#140])
- Fix issues with plain-text and nesting ([#138])

[#140]: https://github.com/prettier/plugin-pug/issues/140
[#138]: https://github.com/prettier/plugin-pug/issues/138

# 1.8.1

[diff](https://github.com/prettier/plugin-pug/compare/1.8.0...1.8.1)

- Improve conversion of tags to literals ([#133])
- Handle plain-text tokens after outdent ([#135])

[#133]: https://github.com/prettier/plugin-pug/issues/133
[#135]: https://github.com/prettier/plugin-pug/issues/135

# 1.8.0

[diff](https://github.com/prettier/plugin-pug/compare/1.7.0...1.8.0)

- Implement `pugWrapAttributesThreshold` option ([#118])
- Implement `pugWrapAttributesPattern` option ([#126])
- Support `//- prettier-ignore` comments inside pug templates ([#125])
- Add middle attributes sorting ([#120])
- Fix counting of current line-length ([#121])
- Fix handling of literal attributes ([#130])
- Add [@lehni](https://github.com/lehni) and [@SkyaTura](https://github.com/SkyaTura) as contributors

[#118]: https://github.com/prettier/plugin-pug/issues/118
[#126]: https://github.com/prettier/plugin-pug/issues/126
[#125]: https://github.com/prettier/plugin-pug/pull/125
[#120]: https://github.com/prettier/plugin-pug/pull/120
[#121]: https://github.com/prettier/plugin-pug/pull/121
[#130]: https://github.com/prettier/plugin-pug/issues/130

# 1.7.0

[diff](https://github.com/prettier/plugin-pug/compare/1.6.1...1.7.0)

- Support sorting of attributes with `pugSortAttributesBeginning` and `pugSortAttributesEnd` ([#22])  
  [Example](https://github.com/prettier/plugin-pug/issues/22#issuecomment-699509995)  
  _This feature was planned since `1.2.0`, but it was always a bit unstable and opinionated._  
  _If there are any bugs, please report them._
- Pass more prettier code-interpolation options ([#117])
- Allow "none" as an option for attributeSeparator ([#102])
- Improve warning message ([03777f5])

[#22]: https://github.com/prettier/plugin-pug/issues/22
[#117]: https://github.com/prettier/plugin-pug/pull/117
[#102]: https://github.com/prettier/plugin-pug/issues/102
[03777f5]: https://github.com/prettier/plugin-pug/commit/03777f5a120f00ff93444f70dd26c8bb396f6f33

# 1.6.1

[diff](https://github.com/prettier/plugin-pug/compare/1.6.0...1.6.1)

- Fix wrapped attribute multiline code indentation ([5a6082c])

[5a6082c]: https://github.com/prettier/plugin-pug/commit/5a6082ca126c292673779bc02817390b526b9a97

# 1.6.0

[diff](https://github.com/prettier/plugin-pug/compare/1.5.1...1.6.0)

## Big Change

This plugin now supports alias options!  
You can configure pug embedded in vue with them :tada:

So instead of

```js
{
  "singleQuote": true,
  "overrides": [
    {
      "files": ["*.pug"],
      "options": {
        "singleQuote": false
      }
    }
  ]
}
```

you can now write

```js
{
  "singleQuote": true,
  "pugSingleQuote": false
}
```

Aliases added for:

- `pugPrintWidth`
- `pugSingleQuote`
- `pugTabWidth`
- `pugUseTabs`
- `pugBracketSpacing`
- `pugSemi`

Because prettier currently have something like a bug, you need to set e.g. `"pugSingleQuote": "true"` instead of `"pugSingleQuote": true`, if you want to set it to true  
This needs to be done only for boolean `true` values

If an alias is not set, the plugin will fallback to the non alias version  
And in the special case of `singleQuote` option will take the inverse as before  
So no breaking changes are introduced

## Other Changes

- Fix escape id for complex id values ([559ee6d])
- Fix indentation of objects in multiline class attributes ([#110])

[559ee6d]: https://github.com/prettier/plugin-pug/commit/559ee6d7f028e4eaba7768af70a9280d2190a2c2#diff-46bec2a2249807aa1515b246cc13ee93
[#110]: https://github.com/prettier/plugin-pug/issues/110
[#105]: https://github.com/prettier/plugin-pug/issues/105

# 1.5.1

[diff](https://github.com/prettier/plugin-pug/compare/1.5.0...1.5.1)

- Support `bracketSpacing` option for attributes ([#103])

[#103]: https://github.com/prettier/plugin-pug/issues/103

# 1.5.0

[diff](https://github.com/prettier/plugin-pug/compare/1.4.4...1.5.0)

- Support `bracketSpacing` option (only text-token) ([#98])

[#98]: https://github.com/prettier/plugin-pug/issues/98

# 1.4.4

[diff](https://github.com/prettier/plugin-pug/compare/1.4.3...1.4.4)

- Trim input on left side ([#97])

[#97]: https://github.com/prettier/plugin-pug/issues/97

# 1.4.3

[diff](https://github.com/prettier/plugin-pug/compare/1.4.2...1.4.3)

- Fix sorting of occurring id behind classes ([#95])

[#95]: https://github.com/prettier/plugin-pug/issues/95

# 1.4.2

[diff](https://github.com/prettier/plugin-pug/compare/1.4.1...1.4.2)

- Ignore formatting of interpolation attribute values ([#94])

[#94]: https://github.com/prettier/plugin-pug/pull/94

# 1.4.1

[diff](https://github.com/prettier/plugin-pug/compare/1.4.0...1.4.1)

- Fix indentation in multi-line blank lines ([#89])

[#89]: https://github.com/prettier/plugin-pug/issues/89

# 1.4.0

[diff](https://github.com/prettier/plugin-pug/compare/1.3.0...1.4.0)

- Fix semi in code interpolation ([#85])
- Upgrade `pug-lexer` to `5.0.0`  
  Support new token `eachOf`

[#85]: https://github.com/prettier/plugin-pug/issues/85

# 1.3.0

[diff](https://github.com/prettier/plugin-pug/compare/1.2.0...1.3.0)

- Introduce new option `closingBracketPosition` ([#82])  
  Possible values: `new-line` and `last-line`

[#82]: https://github.com/prettier/plugin-pug/issues/82

# 1.2.0

[diff](https://github.com/prettier/plugin-pug/compare/1.1.11...1.2.0)

- Support Prettier v2 (Prettier v1 is no longer supported, use [v1.1.11])

Minor change:

```pug
//- Input
v-btn(@click="toggle = !toggle")

//- Output (1.1.11)
v-btn(@click="(toggle = !toggle)")

//- Output (1.2.0)
v-btn(@click="toggle = !toggle")
```

[v1.1.11]: https://www.npmjs.com/package/@prettier/plugin-pug/v/1.1.11

# 1.1.11

[diff](https://github.com/prettier/plugin-pug/compare/1.1.10...1.1.11)

- Just a dependency update

# 1.1.10

[diff](https://github.com/prettier/plugin-pug/compare/1.1.9...1.1.10)

- Suppress formatting for Angular if there is more than one binding within an attribute value ([#78])
- Support more Vue expressions (`v-if`, `v-else-if`, `v-for`, `v-text`, `v-html`) ([b671027])

[#78]: https://github.com/prettier/plugin-pug/issues/78
[b671027]: https://github.com/prettier/plugin-pug/commit/b6710277003d7fec3ff139b0a6e69b52d17ebf47

# 1.1.9

[diff](https://github.com/prettier/plugin-pug/compare/1.1.8...1.1.9)

- Improve accuracy of `printWidth` ([0ffe395])

[0ffe395]: https://github.com/prettier/plugin-pug/commit/0ffe395feaa673cb1ae90bce958d9ff47cc27713

# 1.1.8

[diff](https://github.com/prettier/plugin-pug/compare/1.1.7...1.1.8)

- Calculate correct line width ([26fefff])
- Fix indentation for `doctype` ([51d3860])
- Handle Angular pipe with parameter ([#70])
- Handle space for indented `text` ([#74])

[#70]: https://github.com/prettier/plugin-pug/issues/70
[#74]: https://github.com/prettier/plugin-pug/issues/74
[26fefff]: https://github.com/prettier/plugin-pug/commit/26fefffbe85f3f698545dbdd68c16140f4afd38c
[51d3860]: https://github.com/prettier/plugin-pug/commit/51d386083eb1a24f57127267d6b486416b94b1c4

# 1.1.7

[diff](https://github.com/prettier/plugin-pug/compare/1.1.6...1.1.7)

- Fix handling of classes ([#72])

[#72]: https://github.com/prettier/plugin-pug/issues/72

# 1.1.6

[diff](https://github.com/prettier/plugin-pug/compare/1.1.5...1.1.6)

- Improve handling of Angular attribute values ([#67], [#68])
- Restructure internal code
- Add issue templates

[#67]: https://github.com/prettier/plugin-pug/issues/67
[#68]: https://github.com/prettier/plugin-pug/issues/68

# 1.1.5

[diff](https://github.com/prettier/plugin-pug/compare/1.1.4...1.1.5)

- Improve handling of `id` and `class` attributes ([#63])

- Some minor internal changes like
  - Optimize indent handling ([b734666], [15bec8e])
  - Target ES2018 with module CommonJS ([054b56f])
  - Move options to subdirectory ([f8ead13])

[#63]: https://github.com/prettier/plugin-pug/issues/63
[b734666]: https://github.com/prettier/plugin-pug/commit/b7346666f38f8323d72fdee84cd8aa6cd07760b4
[15bec8e]: https://github.com/prettier/plugin-pug/commit/15bec8e204482b08bcefc5c6620f783e00a43b58
[054b56f]: https://github.com/prettier/plugin-pug/commit/054b56fe33fa113c178b9a9f655e6ab35cf98c86
[f8ead13]: https://github.com/prettier/plugin-pug/commit/f8ead13d65c7f236091e8497ace25fcc71cd5bef

# 1.1.4

[diff](https://github.com/prettier/plugin-pug/compare/1.1.3...1.1.4)

- Fix wrapping of framework bindings ([#61])

[#61]: https://github.com/prettier/plugin-pug/issues/61

# 1.1.3

[diff](https://github.com/prettier/plugin-pug/compare/1.1.2...1.1.3)

- Fix valid backslash escaping ([#59])

[#59]: https://github.com/prettier/plugin-pug/issues/59

# 1.1.2

[diff](https://github.com/prettier/plugin-pug/compare/1.1.1...1.1.2)

- Transform only valid `id` attributes ([#51])
- Indent interpolated-code after outdent ([#52])
- Suggest workarounds in README.md ([8d69f1e], [58157f6])

[#51]: https://github.com/prettier/plugin-pug/issues/51
[#52]: https://github.com/prettier/plugin-pug/issues/52
[8d69f1e]: https://github.com/prettier/plugin-pug/commit/8d69f1ec795d918d69a1e65b8e70d060ab1c6eb5
[58157f6]: https://github.com/prettier/plugin-pug/commit/58157f6363fc354b97fd048e616735433c9e124a

# 1.1.1

[diff](https://github.com/prettier/plugin-pug/compare/1.1.0...1.1.1)

- Fix space after `id` followed by `interpolated` code ([#49])

[#49]: https://github.com/prettier/plugin-pug/issues/49

# 1.1.0

[diff](https://github.com/prettier/plugin-pug/compare/1.0.11...1.1.0)

- Introduce new option `commentPreserveSpaces` ([#47])  
  Possible values: `keep-all`, `keep-leading` and `trim-all`

[#47]: https://github.com/prettier/plugin-pug/issues/47

# 1.0.11

[diff](https://github.com/prettier/plugin-pug/compare/1.0.10...1.0.11)

- Handle `yield` token ([94fdc0c])
- Handle `slash` token ([194f103])
- Dont format `code` if formatter produces error ([e105bae])
- Dont format `code` is multiline ([49b4b4c])
- Fix code slicing ([8478562])
- Fix whitespace issues ([b7d26c7])
- Fix whitespace after `interpolation` and `call` ([7670ade])
- Fix whitespace after `filter` token ([4ac7812])
- Fix missing `key` for `each` token ([aff4969])
- Fix whitespace before `start-pug-interpolation`token ([09e96a3])
- Fix escaping of non-interpolated `text` ([e5c3944])
- Fix only text body ([c32a8d1])
- Fix indent after newline for `interpolated-code` token ([bfb90c6])
- Fix partial quoted surrounded `attribute` token ([20be986])

[94fdc0c]: https://github.com/prettier/plugin-pug/commit/94fdc0cd708ad011ee609908d1a3cfe53c796688
[194f103]: https://github.com/prettier/plugin-pug/commit/194f1036b0406a4844f921d122769b91d4d2f899
[e105bae]: https://github.com/prettier/plugin-pug/commit/e105bae5707fda5978317ba461c978f9b0be48d1
[49b4b4c]: https://github.com/prettier/plugin-pug/commit/49b4b4cdec7d3bdea079c8a801aece71524ce011
[8478562]: https://github.com/prettier/plugin-pug/commit/8478562a7401927a276f9d80f6db6c7b4ff7a27e
[b7d26c7]: https://github.com/prettier/plugin-pug/commit/b7d26c7692b1146cb2717175a092d48bf9673e1e
[7670ade]: https://github.com/prettier/plugin-pug/commit/7670adec9370cff64cbeda83f553988fbebd5b7f
[4ac7812]: https://github.com/prettier/plugin-pug/commit/4ac7812d0f98ad41431173e017ecf80577e5ea16
[aff4969]: https://github.com/prettier/plugin-pug/commit/aff4969872bd06f91db474ebaa7715200d82637b
[09e96a3]: https://github.com/prettier/plugin-pug/commit/09e96a38750f86f5de6fe31f4cd55a0f4ac76b4c
[e5c3944]: https://github.com/prettier/plugin-pug/commit/e5c3944e634906b10c641a801f1afeb301cf4a80
[c32a8d1]: https://github.com/prettier/plugin-pug/commit/c32a8d170604b8a308ba70730066d5c644487193
[bfb90c6]: https://github.com/prettier/plugin-pug/commit/bfb90c6a4c06b58fb1593255448bc403b375c2d4
[20be986]: https://github.com/prettier/plugin-pug/commit/20be986be4303c379f76acdd30d8b1a99bc2e30b

# 1.0.10

[diff](https://github.com/prettier/plugin-pug/compare/1.0.9...1.0.10)

- Handle `else if` token ([#38])
- Handle `interpolation` token ([#39])
- Handle `blockcode` token ([#40])
- Handle `mustEscape` for `interpolated-code` token ([d8f6446])
- Add support for `unless` ([ca0b537])
- Improve formatting of code attribute ([47c0355], [d6c896c])
- Apply semicolons correctly ([48c58b8])  
  This could lead to a slight change  
  You can override the `semi` attribute and set it to `false`, if semicolons are not wanted

[#38]: https://github.com/prettier/plugin-pug/issues/38
[#39]: https://github.com/prettier/plugin-pug/issues/39
[#40]: https://github.com/prettier/plugin-pug/issues/40
[d8f6446]: https://github.com/prettier/plugin-pug/commit/d8f64466114a5f13fef3363efa77fee6cdb62ebf
[ca0b537]: https://github.com/prettier/plugin-pug/commit/ca0b53722e25896ec09c49e11b42907162607ab9
[47c0355]: https://github.com/prettier/plugin-pug/commit/47c03551dc078665053c40c9c144bd5f584da55b
[48c58b8]: https://github.com/prettier/plugin-pug/commit/48c58b80dd1a9845572034f7e0082c51ad70e02c
[d6c896c]: https://github.com/prettier/plugin-pug/commit/d6c896c23a3ab6e081f9b92919172efa9fff2691

# 1.0.9

[diff](https://github.com/prettier/plugin-pug/compare/1.0.8...1.0.9)

- Move `prettier` to `devDependencies` ([#37])
- Some minor changes like
  - formatting
  - using TS 3.7 optional chaining
  - output test coverage

[#37]: https://github.com/prettier/plugin-pug/pull/37

# 1.0.8

[diff](https://github.com/prettier/plugin-pug/compare/1.0.7...1.0.8)

- Handle `while` and `case` token ([#34])

[#34]: https://github.com/prettier/plugin-pug/issues/34

# 1.0.7

[diff](https://github.com/prettier/plugin-pug/compare/1.0.6...1.0.7)

- Handle `mustEscape` for buffered `code` token ([#31])
- Updated README.md

[#31]: https://github.com/prettier/plugin-pug/issues/31

# 1.0.6

[diff](https://github.com/prettier/plugin-pug/compare/1.0.5...1.0.6)

- Handle `each` token ([#29])

[#29]: https://github.com/prettier/plugin-pug/issues/29

# 1.0.5

[diff](https://github.com/prettier/plugin-pug/compare/1.0.4...1.0.5)

- Fix handling with `interpolated-code` token ([#27])

[#27]: https://github.com/prettier/plugin-pug/issues/27

# 1.0.4

[diff](https://github.com/prettier/plugin-pug/compare/1.0.3...1.0.4)

- Handle `text-html` token ([#24])

[#24]: https://github.com/prettier/plugin-pug/issues/24

# 1.0.3

[diff](https://github.com/prettier/plugin-pug/compare/1.0.2...1.0.3)

- Format Vue `v-slot`

# 1.0.2

[diff](https://github.com/prettier/plugin-pug/compare/1.0.1...1.0.2)

- Fix spaces around interpolated tags ([#20])

[#20]: https://github.com/prettier/plugin-pug/issues/20

# 1.0.1

[diff](https://github.com/prettier/plugin-pug/compare/1.0.0...1.0.1)

- Fix indent for `include` ([#18])
- Fix space after `doctype` if there is no value

[#18]: https://github.com/prettier/plugin-pug/issues/18

# 1.0.0

[diff](https://github.com/prettier/plugin-pug/compare/1.0.0-alpha.11...1.0.0)

- No real changes to `1.0.0-alpha.11`

# 1.0.0-alpha.11

[diff](https://github.com/prettier/plugin-pug/compare/1.0.0-alpha.10...1.0.0-alpha.11)

- Fix preceding div if there is a _normal_ class attribute
- Improve interpolation in text and bindings
- Introduce new option `attributeSeparator` ([#13])  
  Possible values: `always` and `as-needed`

[#13]: https://github.com/prettier/plugin-pug/issues/13

# 1.0.0-alpha.10

[diff](https://github.com/prettier/plugin-pug/compare/1.0.0-alpha.9...1.0.0-alpha.10)

- Correct quotes for Angular attributes ([#10])

[#10]: https://github.com/prettier/plugin-pug/pull/10

# 1.0.0-alpha.9

[diff](https://github.com/prettier/plugin-pug/compare/1.0.0-alpha.8...1.0.0-alpha.9)

- Support mixins ([#11])
- Fix some issues with indentation
- Fix buffered attributes

[#11]: https://github.com/prettier/plugin-pug/issues/11

# 1.0.0-alpha.8

[diff](https://github.com/prettier/plugin-pug/compare/1.0.0-alpha.7...1.0.0-alpha.8)

- Suppress log output in production

# 1.0.0-alpha.7

[diff](https://github.com/prettier/plugin-pug/compare/1.0.0-alpha.6...1.0.0-alpha.7)

- Support for wrap after `printWidth` ([#8])  
  _Currently not very accurate, but works_

[#8]: https://github.com/prettier/plugin-pug/pull/8

# 1.0.0-alpha.6

[diff](https://github.com/prettier/plugin-pug/compare/1.0.0-alpha.5...1.0.0-alpha.6)

- Fix indentation for comments
- Improve indentation for tags
- Support `singleQuote` option
- Setup eslint with TypeScript configuration ([#4])
- Setup [Azure Pipelines](https://dev.azure.com/shinigami92/prettier-plugin-pug/_build?definitionId=1)

[#4]: https://github.com/prettier/plugin-pug/pull/4

# 1.0.0-alpha.5

[diff](https://github.com/prettier/plugin-pug/compare/1.0.0-alpha.4...1.0.0-alpha.5)

- Fix indentation of piped text

# 1.0.0-alpha.4

[diff](https://github.com/prettier/plugin-pug/compare/1.0.0-alpha.3...1.0.0-alpha.4)

- Fix indentation after `outdent`

# 1.0.0-alpha.3

[diff](https://github.com/prettier/plugin-pug/compare/1.0.0-alpha.2...1.0.0-alpha.3)

- Improvement of indents, empty lines and spaces

- Keep indent for `code` if wanted

  ```pug
  //- Input
  block page_meta
    - var page_title = "Markdown"
    - var page_description = "This is a page description."

  //- Output (1.0.0-alpha.2)
  block page_meta
  - var page_title = "Markdown"
  - var page_description = "This is a page description."

  //- Output (1.0.0-alpha.3)
  block page_meta
    - var page_title = "Markdown"
    - var page_description = "This is a page description."
  ```

# 1.0.0-alpha.2

[diff](https://github.com/prettier/plugin-pug/compare/1.0.0-alpha.1...1.0.0-alpha.2)

- Correct some unnecessary blank lines

- Correct a missing whitespace after `interpolated-code` token

- Handle new Tokens
  - [`block`](https://pugjs.org/language/inheritance.html#block-append-prepend)
  - [`extends`](https://pugjs.org/language/inheritance.html)
  - [`path`](https://pugjs.org/language/inheritance.html)
  - [`start-pug-interpolation`](https://pugjs.org/language/interpolation.html#tag-interpolation)
  - [`end-pug-interpolation`](https://pugjs.org/language/interpolation.html#tag-interpolation)
  - [`include`](https://pugjs.org/language/includes.html)
  - [`filter`](https://pugjs.org/language/filters.html)

- Improve space formatting

  Use recommended solutions [link](https://pugjs.org/language/plain-text.html#recommended-solutions)

  ```pug
  //- Input
  v-btn(color="primary", name="save", @click="save", :disabled="saving", :loading="saving")
    v-icon save
    |  {{ $t('mylangkeys.crud.save') }}

  //- Output (1.0.0-alpha.1)
  v-btn(color="primary", name="save", @click="save", :disabled="saving", :loading="saving")
    v-icon save
    | {{ $t('mylangkeys.crud.save') }}

  //- Output (1.0.0-alpha.2)
  v-btn(color="primary", name="save", @click="save", :disabled="saving", :loading="saving")
    v-icon save
    |
    | {{ $t('mylangkeys.crud.save') }}
  ```

# 1.0.0-alpha.1

[diff](https://github.com/prettier/plugin-pug/compare/5fb671e3fbaa03be554c78f9be1ea53cfdadd78a...1.0.0-alpha.1)

- Initial alpha release
