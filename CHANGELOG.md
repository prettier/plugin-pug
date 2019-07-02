# Next

[diff](https://github.com/Shinigami92/prettier-plugin-pug/compare/1.0.0-alpha.8...master)

# 1.0.0-alpha.8

[diff](https://github.com/Shinigami92/prettier-plugin-pug/compare/1.0.0-alpha.7...1.0.0-alpha.8)

- Suppress log output in production

# 1.0.0-alpha.7

[diff](https://github.com/Shinigami92/prettier-plugin-pug/compare/1.0.0-alpha.6...1.0.0-alpha.7)

- Support for wrap after `printWidth` ([#8])  
  _Currently not very accurate, but works_

[#8]: https://github.com/Shinigami92/prettier-plugin-pug/pull/8

# 1.0.0-alpha.6

[diff](https://github.com/Shinigami92/prettier-plugin-pug/compare/1.0.0-alpha.5...1.0.0-alpha.6)

- Fix indentation for comments
- Improve indentation for tags
- Support `singleQuote` option
- Setup eslint with TypeScript configuration ([#4])
- Setup [Azure Pipelines](https://dev.azure.com/shinigami92/prettier-plugin-pug/_build?definitionId=1)

[#4]: https://github.com/Shinigami92/prettier-plugin-pug/pull/4

# 1.0.0-alpha.5

[diff](https://github.com/Shinigami92/prettier-plugin-pug/compare/1.0.0-alpha.4...1.0.0-alpha.5)

- Fix indentation of piped text

# 1.0.0-alpha.4

[diff](https://github.com/Shinigami92/prettier-plugin-pug/compare/1.0.0-alpha.3...1.0.0-alpha.4)

- Fix indentation after `outdent`

# 1.0.0-alpha.3

[diff](https://github.com/Shinigami92/prettier-plugin-pug/compare/1.0.0-alpha.2...1.0.0-alpha.3)

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

[diff](https://github.com/Shinigami92/prettier-plugin-pug/compare/1.0.0-alpha.1...1.0.0-alpha.2)

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

[diff](https://github.com/Shinigami92/prettier-plugin-pug/compare/5fb671e3fbaa03be554c78f9be1ea53cfdadd78a...1.0.0-alpha.1)

- Initial alpha release
