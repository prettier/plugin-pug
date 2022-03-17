// @ts-check
const { defineConfig } = require('eslint-define-config');
const { readGitignoreFiles } = require('eslint-gitignore');

module.exports = defineConfig({
  ignorePatterns: [
    ...readGitignoreFiles(),
    '.eslintrc.js', // Skip self linting
  ],
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jsdoc/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
    'jsdoc',
    'spellcheck',
    'inclusive-language',
  ],
  rules: {
    curly: ['error'],
    'linebreak-style': ['error', 'unix'],
    'no-case-declarations': 'warn',
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],

    '@typescript-eslint/array-type': [
      'warn',
      { default: 'array-simple', readonly: 'generic' },
    ],
    '@typescript-eslint/ban-ts-comment': [
      'error',
      { 'ts-expect-error': 'allow-with-description' },
    ],
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/consistent-type-imports': 'error',
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
    '@typescript-eslint/lines-between-class-members': [
      'warn',
      'always',
      { exceptAfterSingleLine: true },
    ],
    '@typescript-eslint/member-ordering': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-call': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',
    '@typescript-eslint/prefer-optional-chain': 'warn',
    '@typescript-eslint/prefer-readonly': 'warn',
    '@typescript-eslint/prefer-reduce-type-parameter': 'warn',
    '@typescript-eslint/require-await': 'warn',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/typedef': [
      'warn',
      { memberVariableDeclaration: true, variableDeclaration: true },
    ],

    'jsdoc/match-description': [
      'warn',
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
      'warn',
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

    'spellcheck/spell-checker': [
      'warn',
      {
        minLength: 3,
        skipWords: [
          'ast',
          'autocloseable',
          'backtick',
          'blockcode',
          'codemirror',
          'coffeescript',
          'colno',
          'doctype',
          'ecmascript',
          'endregion',
          'eos',
          'fallthrough',
          'filenames',
          'frameset',
          'func',
          'href',
          'javascript',
          'jsdoc',
          'junit',
          'len',
          'lex',
          'lex',
          'lf',
          'lineno',
          'loc',
          'multiline',
          'multilines',
          'num',
          'outdent',
          'parens',
          'pipeless',
          'plist',
          'pragma',
          'prepend',
          'readdir',
          'readonly',
          'rvalue',
          'str',
          'tok',
          'typeof',
          'unescaped',
          'unformatted',
          'utf',
          'utf8',
          'vitest',
          'vscode',
          'vue',
          'vuepress',
          'whitespace',
          'xml',
          'yaml',
        ],
      },
    ],

    'inclusive-language/use-inclusive-words': [
      'warn',
      {
        allowedTerms: [
          {
            term: '/master',
            allowPartialMatches: true,
          },
        ],
        words: [
          {
            word: 'guys',
            suggestions: ['folks'],
          },
        ],
      },
    ],
  },
  settings: {
    jsdoc: {
      mode: 'typescript',
    },
  },
});
