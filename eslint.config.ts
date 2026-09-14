import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import eslintPluginVitest from '@vitest/eslint-plugin';
import eslintPluginJsdoc from 'eslint-plugin-jsdoc';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import { defineConfig, includeIgnoreFile } from 'eslint/config';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import tseslint from 'typescript-eslint';

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = dirname(__filename);
const gitignorePath: string = resolve(__dirname, '.gitignore');

export default defineConfig([
  //#region global
  includeIgnoreFile(gitignorePath),
  {
    ignores: [
      '.prettierrc.d.ts',
      '.prettierrc.js',
      'docs/.vitepress/config.ts',
      'docs/.vitepress/theme/index.ts',
    ],
  },
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
  //#endregion

  //#region eslint (js)
  eslint.configs.recommended,
  {
    rules: {
      curly: ['error'],
      'linebreak-style': ['error', 'unix'],
      'no-case-declarations': 'error',
      'no-restricted-globals': [
        'error',
        {
          name: '__dirname',
          message:
            "Use `fileURLToPath(new URL('.', import.meta.url))` instead.",
        },
      ],
      'no-useless-assignment': 'off',
      'preserve-caught-error': 'off',
      quotes: ['error', 'single', { avoidEscape: true }],
      semi: ['error', 'always'],
    },
  },
  //#endregion

  //#region typescript-eslint
  ...tseslint.configs.strictTypeChecked,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    languageOptions: {
      parserOptions: {
        project: true,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    rules: {
      '@typescript-eslint/array-type': [
        'error',
        { default: 'array-simple', readonly: 'generic' },
      ],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-expect-error': 'allow-with-description' },
      ],
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        { allowExpressions: true },
      ],
      '@typescript-eslint/explicit-member-accessibility': 'error',
      '@typescript-eslint/indent': [
        'error',
        2,
        {
          SwitchCase: 1,
          ignoredNodes: ['MemberExpression', 'TSTypeParameterInstantiation'],
        },
      ],
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-deprecated': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-misused-spread': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-readonly': 'error',
      '@typescript-eslint/prefer-reduce-type-parameter': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/restrict-template-expressions': 'off',
      '@typescript-eslint/typedef': [
        'error',
        { memberVariableDeclaration: true, variableDeclaration: true },
      ],
    },
  },
  //#endregion

  //#region stylistic
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@stylistic/padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: 'block-like', next: '*' },
      ],
    },
  },
  //#endregion

  //#region unicorn
  eslintPluginUnicorn.configs.recommended,
  {
    rules: {
      'unicorn/consistent-boolean-name': 'off',
      'unicorn/consistent-class-member-order': 'off',
      'unicorn/consistent-destructuring': 'off',
      'unicorn/filename-case': 'off',
      'unicorn/import-style': [
        'off',
        { styles: { 'node:path': { named: true } } },
      ],
      'unicorn/name-replacements': 'off',
      'unicorn/no-break-in-nested-loop': 'off',
      'unicorn/no-duplicate-if-branches': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-unsafe-string-replacement': 'off',
      'unicorn/no-useless-else': 'off',
      'unicorn/no-useless-switch-case': 'off',
      'unicorn/prefer-continue': 'off',
      'unicorn/prefer-global-number-constants': 'off',
      'unicorn/prefer-https': 'off',
      'unicorn/prefer-includes-over-repeated-comparisons': 'off',
      'unicorn/prefer-simple-condition-first': 'off',
      'unicorn/prefer-string-raw': 'off',
      'unicorn/prefer-unicode-code-point-escapes': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/single-line-block-comment-style': 'off',
    },
  },
  //#endregion

  //#region jsdoc
  eslintPluginJsdoc.configs['flat/recommended-typescript-error'],
  {
    files: ['src/**/*.ts'],
    rules: {
      'jsdoc/match-description': [
        'error',
        {
          mainDescription:
            '/^[A-Z`].+?(\\.|:)(\\n\\n.*((\\n{1,2}- .+)|(_.+_)|`.+`|\\n\\n---))?\\s?$/us',
          matchDescription: '^[A-Z`].+(\\.|`.+`)$',
          contexts: ['any'],
          tags: {
            param: true,
            returns: true,
          },
        },
      ],
      'jsdoc/no-types': 'error',
      'jsdoc/require-jsdoc': [
        'error',
        {
          contexts: [
            'ClassDeclaration',
            "ClassProperty:not([accessibility='private'])",
            'ExportNamedDeclaration:has(VariableDeclaration)',
            'FunctionExpression',
            "MethodDefinition:not([accessibility='private']) > FunctionExpression",
            'TSEnumDeclaration',
            'TSInterfaceDeclaration',
            'TSMethodSignature',
            // 'TSPropertySignature',
            'TSTypeAliasDeclaration',
          ],
        },
      ],
      'jsdoc/require-param-type': 'off',
      'jsdoc/require-returns-type': 'off',
      'jsdoc/tag-lines': 'off',
    },
    settings: {
      jsdoc: {
        mode: 'typescript',
      },
    },
  },
  {
    files: ['tests/**/*.ts'],
    rules: {
      'jsdoc/tag-lines': 'off',
    },
  },
  //#endregion

  //#region prettier
  eslintPluginPrettierRecommended,
  //#endregion,

  //#region overrides
  {
    files: ['test/**/*.spec.ts', 'test/**/*.spec.d.ts'],
    plugins: {
      vitest: eslintPluginVitest,
    },
    rules: {
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allowNumber: true,
          allowBoolean: true,
          allowAny: true,
        },
      ],

      ...eslintPluginVitest.configs.recommended.rules,

      'vitest/expect-expect': 'off',
      'vitest/no-alias-methods': 'error',
      'vitest/prefer-each': 'error',
      'vitest/prefer-to-have-length': 'error',
      'vitest/valid-expect': ['error', { maxArgs: 2 }],
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
  },
  //#endregion
]);
