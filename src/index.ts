import {
	Doc,
	FastPath,
	Options,
	Parser,
	ParserOptions,
	Plugin,
	Printer,
	RequiredOptions,
	SupportLanguage,
	SupportOptions
} from 'prettier';
import * as lex from 'pug-lexer';
import { Token } from 'pug-lexer';
import { createLogger, Logger, LogLevel } from './logger';
import { options as pugOptions, PugParserOptions } from './options';
import { convergeOptions } from './options/converge';
import { PugPrinter, PugPrinterOptions } from './printer';

const logger: Logger = createLogger(console);
if (process.env.NODE_ENV === 'test') {
	logger.setLogLevel(LogLevel.DEBUG);
}

type FastPathStackEntry = {
	content: string;
	tokens: Token[];
};

export const plugin: Plugin = {
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
			vscodeLanguageIds: ['jade', 'pug']
		}
	],
	parsers: {
		pug: {
			parse(text: string, parsers: { [parserName: string]: Parser }, options: ParserOptions): FastPathStackEntry {
				logger.debug('[parsers:pug:parse]:', { text });

				let trimmedAndAlignedContent: string = text.replace(/^\s*\n/, '');
				const contentIndentation: RegExpExecArray | null = /^\s*/.exec(trimmedAndAlignedContent);
				if (contentIndentation?.[0]) {
					const contentIndentationRegex: RegExp = new RegExp(`(^|\\n)${contentIndentation[0]}`, 'g');
					trimmedAndAlignedContent = trimmedAndAlignedContent.replace(contentIndentationRegex, '$1');
				}
				const content: string = trimmedAndAlignedContent;

				const tokens: lex.Token[] = lex(content);
				// logger.debug('[parsers:pug:parse]: tokens', JSON.stringify(tokens, undefined, 2));
				// const ast: AST = parse(tokens, {});
				// logger.debug('[parsers:pug:parse]: ast', JSON.stringify(ast, undefined, 2));
				return { content, tokens };
			},
			astFormat: 'pug-ast',
			hasPragma(text: string): boolean {
				return text.startsWith('//- @prettier\n') || text.startsWith('//- @format\n');
			},
			locStart(node: unknown): number {
				logger.debug('[parsers:pug:locStart]:', { node });
				return 0;
			},
			locEnd(node: unknown): number {
				logger.debug('[parsers:pug:locEnd]:', { node });
				return 0;
			},
			preprocess(text: string, options: ParserOptions): string {
				logger.debug('[parsers:pug:preprocess]:', { text });
				return text;
			}
		}
	},
	printers: {
		'pug-ast': {
			print(path: FastPath, options: ParserOptions & PugParserOptions, print: (path: FastPath) => Doc): Doc {
				const entry: FastPathStackEntry = path.stack[0];
				const { content, tokens } = entry;
				const pugOptions: PugPrinterOptions = convergeOptions(options);
				const printer: PugPrinter = new PugPrinter(content, tokens, pugOptions);
				const result: string = printer.build();
				logger.debug('[printers:pug-ast:print]:', result);
				return result;
			},
			embed(
				path: FastPath,
				print: (path: FastPath) => Doc,
				textToDoc: (text: string, options: Options) => Doc,
				options: ParserOptions
			): Doc | null {
				// logger.debug('[printers:pug-ast:embed]:', JSON.stringify(path, undefined, 2));
				return null;
			},
			insertPragma(text: string): string {
				return `//- @prettier\n${text}`;
			}
		}
	},
	options: pugOptions,
	defaultOptions: {}
};

export const languages: SupportLanguage[] | undefined = plugin.languages;
export const parsers: { [parserName: string]: Parser } | undefined = plugin.parsers;
export const printers: { [astFormat: string]: Printer } | undefined = plugin.printers;
export const options: SupportOptions | undefined = plugin.options;
export const defaultOptions: Partial<RequiredOptions> | undefined = plugin.defaultOptions;
