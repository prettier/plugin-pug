import { AST, Doc, FastPath, Plugin } from 'prettier';
// @ts-ignore
import * as lex from 'pug-lexer';
import { Token } from './pug-token';

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
				// console.log('[parsers:pug:parse]: tokens', JSON.stringify(tokens, undefined, 2));
				// const ast: AST = parse(tokens, {});
				// console.log('[parsers:pug:parse]: ast', JSON.stringify(ast, undefined, 2));
				return tokens;
			},
			astFormat: 'pug-ast',
			hasPragma(text: string): boolean {
				return text.startsWith('//- @prettier\n') || text.startsWith('//- @format\n');
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
			print(path: FastPath, options: object, print: (path: FastPath) => Doc): Doc {
				// console.log('[printers:pug-ast:print]:', JSON.stringify(path, undefined, 2));
				// console.log('[printers:pug-ast:print]:', { path, options, print });
				const tokens: Token[] = path.stack[0];

				let result: string = '';
				let indentLevel: number = 1;

				for (let index: number = 0; index < tokens.length; index++) {
					const token: Token = tokens[index];
					const previousToken = tokens[index - 1];
					const nextToken = tokens[index + 1];
					console.log('[printers:pug-ast:print]:', JSON.stringify(token));
					switch (token.type) {
						case 'tag':
							if (!(token.val === 'div' && nextToken.type === 'class')) {
								result += token.val;
							}
							break;
						case 'start-attributes':
							if (nextToken && nextToken.type === 'attribute') {
								result += '(';
							}
							break;
						case 'attribute':
							if (
								token.name === 'class' &&
								typeof token.val === 'string' &&
								(token.val.startsWith('"') || token.val.startsWith("'"))
							) {
								// Handle class attribute
								let val = token.val;
								val = val.trim();
								val = val.replace(/\s\s+/g, ' ');
								val = val.substring(1, val.length - 1);
								const classes: string[] = val.split(' ');
								const specialClasses: string[] = [];
								const validClassNameRegex: RegExp = /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;
								for (const className of classes) {
									if (!validClassNameRegex.test(className)) {
										specialClasses.push(className);
										continue;
									}
									// Write css-class in front of attributes
									const position = result.lastIndexOf('(');
									result = [result.slice(0, position), `.${className}`, result.slice(position)].join(
										''
									);
								}
								if (specialClasses.length > 0) {
									token.val = `"${specialClasses.join(' ')}"`;
								} else {
									break;
								}
							}

							if (previousToken && previousToken.type === 'attribute') {
								result += `, `;
							}

							result += `${token.name}`;
							if (typeof token.val === 'boolean') {
								if (token.val !== true) {
									result += `=${token.val}`;
								}
							} else {
								let val = token.val;
								if (val.startsWith("'")) {
									// Swap single and double quotes
									val = val.replace(/[\'\"]/g, (match) => (match === '"' ? "'" : '"'));
								} else if (val === 'true') {
									// The value is exactly true and is not quoted
									break;
								} else {
									// The value is not quoted and may be js-code
									val = val.trim().replace(/\s\s+/g, ' ');
									if (val.startsWith('{ ')) {
										val = `{${val.substring(2, val.length)}`;
									}
								}
								result += `=${val}`;
							}
							break;
						case 'end-attributes':
							if (result.charAt(result.length - 1) === '(') {
								// There were no attributes
								result = result.substring(0, result.length - 1);
							} else if (previousToken && previousToken.type === 'attribute') {
								result += ')';
							}
							if (nextToken && nextToken.type === 'text') {
								result += ' ';
							}
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
							// result += `\n`;
							break;
						case 'comment':
							result += `//-${token.val}`;
							break;
						case 'newline':
							result += '\n';
							break;
						case 'text':
							if (previousToken && previousToken.type === 'newline') {
								result += '|';
							}

							result += `${token.val.replace(/\s\s+/g, ' ')}`;
							break;
						case 'interpolated-code':
							result += `#{${token.val}}`;
							break;
						case 'code':
							result += `- ${token.val}`;
							break;
						default:
							throw new Error('Unhandled token: ' + JSON.stringify(token));
					}
				}

				return result;
			},
			embed(
				path: FastPath,
				print: (path: FastPath) => Doc,
				textToDoc: (text: string, options: object) => Doc,
				options: object
			): Doc | null {
				// console.log('[printers:pug-ast:embed]:', JSON.stringify(path, undefined, 2));
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
