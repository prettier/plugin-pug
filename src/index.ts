import { AST, Doc, FastPath, Plugin } from 'prettier';
// @ts-ignore
import * as lex from 'pug-lexer';
// @ts-ignore
import * as parse from 'pug-parser';

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
			vscodeLanguageIds: ['jade']
		}
	],
	parsers: {
		pug: {
			parse(text: string, parsers: object, options: object): AST {
				console.log('[parsers:pug:parse]:', { text });
				const tokens = lex(text, {});
				console.log('[parsers:pug:parse]: tokens', JSON.stringify(tokens, undefined, 2));
				// const ast: AST = parse(tokens, {});
				// console.log('[parsers:pug:parse]: ast', JSON.stringify(ast, undefined, 2));
				return tokens;
			},
			// The name of the AST
			astFormat: 'pug-ast',
			hasPragma(text: string): boolean {
				console.log('[parsers:pug:hasPragma]:', { text });
				return false;
			},
			locStart(node: object): number {
				console.log('[parsers:pug:locStart]:', { node });
				return 0;
			},
			locEnd(node: object): number {
				console.log('[parsers:pug:locEnd]:', { node });
				return 0;
			},
			preprocess(text: string, options: object): string {
				console.log('[parsers:pug:preprocess]:', { text });
				return text;
			}
		}
	},
	printers: {
		'pug-ast': {
			print(
				// Path to the AST node to print
				path: FastPath,
				options: object,
				// Recursively print a child node
				print: (path: FastPath) => Doc
			): Doc {
				console.log('[printers:pug-ast:print]:', JSON.stringify(path, undefined, 2));
				// console.log('[printers:pug-ast:print]:', { path, options, print });
				const tokens = path.stack[0];

				let result: string = '';
				let indentLevel: number = 1;

				for (const token of tokens) {
					switch (token.type) {
						case 'tag':
							result += token.val;
							break;
						case 'start-attributes':
							result += '(';
							break;
						case 'attribute':
							const val: string = token.val;
							result += `${token.name}="${val.substring(1, val.length - 1)}"`;
							break;
						case 'end-attributes':
							result += ')';
							break;
						case 'indent':
							result += '\n';
							for (let index: number = 0; index < indentLevel; index++) {
								result += '  ';
							}
							indentLevel++;
							break;
						case 'outdent':
							result += '\n';
							indentLevel--;
							break;
						case 'class':
							result += `.${token.val}`;
							break;
						case 'eos':
							result += `\n`;
							break;
						default:
							throw new Error('Unhandled token-type: ' + token.type);
					}
				}

				return result;
			},
			embed(
				// Path to the current AST node
				path: FastPath,
				// Print a node with the current printer
				print: (path: FastPath) => Doc,
				// Parse and print some text using a different parser.
				// You should set `options.parser` to specify which parser to use.
				textToDoc: (text: string, options: object) => Doc,
				// Current options
				options: object
			): Doc | null {
				console.log('[printers:pug-ast:embed]:', JSON.stringify(path, undefined, 2));
				return null;
			},
			insertPragma(text: string): string {
				console.log('[printers:pug-ast:insertPragma]:', { text });
				return text;
			}
		}
	},
	options: [],
	defaultOptions: {}
};

export const languages = plugin.languages;
export const parsers = plugin.parsers;
export const printers = plugin.printers;
export const options = plugin.options;
export const defaultOptions = plugin.defaultOptions;
