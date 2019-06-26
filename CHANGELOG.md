# Next

[diff](https://github.com/Shinigami92/prettier-plugin-pug/compare/1.0.0-alpha.1...master)

-   Correct some unnecessary blank lines

-   Correct a missing whitespace after `interpolated-code` token

-   Handle new Tokens

    -   [`block`](https://pugjs.org/language/inheritance.html#block-append-prepend)

-   Improve space formatting

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

    //- Output (next)
    v-btn(color="primary", name="save", @click="save", :disabled="saving", :loading="saving")
      v-icon save
      |
      | {{ $t('mylangkeys.crud.save') }}
    ```

# 1.0.0-alpha.1

[diff](https://github.com/Shinigami92/prettier-plugin-pug/compare/5fb671e3fbaa03be554c78f9be1ea53cfdadd78a...1.0.0-alpha.1)

-   Initial alpha release
