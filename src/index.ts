import type {
  Parser,
  ParserOptions,
  Plugin,
  Printer,
  RequiredOptions,
  SupportLanguage,
  SupportOptions,
} from 'prettier';
import type { Token } from 'pug-lexer';
import lex from 'pug-lexer';
import { logger } from './logger';
import type { PugParserOptions } from './options';
import { options as pugOptions } from './options';
import { convergeOptions } from './options/converge';
import type { PugPrinterOptions } from './printer';
import { PugPrinter } from './printer';

/** Ast path stack entry. */
interface AstPathStackEntry {
  content: string;
  tokens: Token[];
}

/** The plugin object that is picked up by prettier. */
export const plugin: Plugin<AstPathStackEntry> = {
  languages: [
    {
      name: 'Pug',
      parsers: ['pug'],
      tmScope: 'text.jade',
      aceMode: 'jade',
      codemirrorMode: 'pug',
      codemirrorMimeType: 'text/x-pug',
      extensions: ['.jade', '.pug'],
      linguistLanguageId: 179,
      vscodeLanguageIds: ['jade', 'pug'],
    },
  ],
  /* eslint-disable jsdoc/require-jsdoc */
  parsers: {
    pug: {
      parse(text, options) {
        logger.debug('[parsers:pug:parse]:', { text });

        let trimmedAndAlignedContent: string = text.replace(/^\s*\n/, '');
        const contentIndentation: RegExpExecArray | null = /^\s*/.exec(
          trimmedAndAlignedContent,
        );
        if (contentIndentation?.[0]) {
          const contentIndentationRegex: RegExp = new RegExp(
            `(^|\\n)${contentIndentation[0]}`,
            'g',
          );
          trimmedAndAlignedContent = trimmedAndAlignedContent.replace(
            contentIndentationRegex,
            '$1',
          );
        }

        const content: string = trimmedAndAlignedContent;

        const tokens: Token[] = lex(content);
        // logger.debug('[parsers:pug:parse]: tokens', JSON.stringify(tokens, undefined, 2));
        // const ast: AST = parse(tokens, {});
        // logger.debug('[parsers:pug:parse]: ast', JSON.stringify(ast, undefined, 2));
        return { content, tokens };
      },

      astFormat: 'pug-ast',

      hasPragma(text) {
        return (
          text.startsWith('//- @prettier\n') || text.startsWith('//- @format\n')
        );
      },

      locStart(node) {
        logger.debug('[parsers:pug:locStart]:', { node });
        return 0;
      },

      locEnd(node) {
        logger.debug('[parsers:pug:locEnd]:', { node });
        return 0;
      },

      preprocess(text, options) {
        logger.debug('[parsers:pug:preprocess]:', { text });
        return text;
      },
    },
  },
  printers: {
    'pug-ast': {
      // @ts-expect-error: Prettier allow it to be async if we don't do recursively print
      async print(path, options: ParserOptions & PugParserOptions) {
        const entry: AstPathStackEntry = path.stack[0]!;
        const { content, tokens } = entry;
        const pugOptions: PugPrinterOptions = convergeOptions(options);
        const printer: PugPrinter = new PugPrinter(content, tokens, pugOptions);
        const result: string = await printer.build();
        logger.debug('[printers:pug-ast:print]:', result);
        return result;
      },

      insertPragma(text: string): string {
        return `//- @prettier\n${text}`;
      },
    },
  },
  /* eslint-enable jsdoc/require-jsdoc */
  options: pugOptions,
  defaultOptions: {},
};

/** The languages that are picked up by prettier. */
export const languages: SupportLanguage[] | undefined = plugin.languages;
/** The parsers object that is picked up by prettier. */
export const parsers: { [parserName: string]: Parser } | undefined =
  plugin.parsers;
/** The printers object that is picked up by prettier. */
export const printers: { [astFormat: string]: Printer } | undefined =
  plugin.printers;
/** The options object that is picked up by prettier. */
export const options: SupportOptions | undefined = plugin.options;
/** The default options object that is picked up by prettier. */
export const defaultOptions: Partial<RequiredOptions> | undefined =
  plugin.defaultOptions;

export { createLogger, Logger, logger, LogLevel } from './logger';
export type { ILogger } from './logger';
