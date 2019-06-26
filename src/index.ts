import { AST, Doc, FastPath, Options, Parser, ParserOptions, Plugin } from 'prettier';
// @ts-ignore
import * as lex from 'pug-lexer';
import { createLogger, Logger, LogLevel } from './logger';
import { Token } from './pug-token';

const logger: Logger = createLogger(console);
if (process.env.NODE_ENV === 'test') {
	logger.setLogLevel(LogLevel.DEBUG);
}

function quotationType(code: string): 'SINGLE' | 'DOUBLE' | undefined {
	const indexOfSingleQuote: number = code.indexOf("'");
	const indexOfDoubleQuote: number = code.indexOf('"');
	logger.debug({ code, indexOfSingleQuote, indexOfDoubleQuote });
	if (indexOfSingleQuote === -1 && indexOfDoubleQuote === -1) {
		return undefined;
	} else if (indexOfSingleQuote === -1 && indexOfDoubleQuote !== -1) {
		return 'DOUBLE';
	} else if (indexOfDoubleQuote === -1 && indexOfSingleQuote !== -1) {
		return 'SINGLE';
	} else if (indexOfSingleQuote < indexOfDoubleQuote) {
		return 'SINGLE';
	} else if (indexOfDoubleQuote < indexOfSingleQuote) {
		return 'DOUBLE';
	}
	return;
}

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
			parse(text: string, parsers: { [parserName: string]: Parser }, options: ParserOptions): AST {
				logger.debug('[parsers:pug:parse]:', { text });
				const tokens = lex(text, {});
				// logger.debug('[parsers:pug:parse]: tokens', JSON.stringify(tokens, undefined, 2));
				// const ast: AST = parse(tokens, {});
				// logger.debug('[parsers:pug:parse]: ast', JSON.stringify(ast, undefined, 2));
				return tokens;
			},
			astFormat: 'pug-ast',
			hasPragma(text: string): boolean {
				return text.startsWith('//- @prettier\n') || text.startsWith('//- @format\n');
			},
			locStart(node: any): number {
				logger.debug('[parsers:pug:locStart]:', { node });
				return 0;
			},
			locEnd(node: any): number {
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
			print(path: FastPath, options: ParserOptions, print: (path: FastPath) => Doc): Doc {
				// logger.debug('[printers:pug-ast:print]:', JSON.stringify(path, undefined, 2));
				// logger.debug('[printers:pug-ast:print]:', { path, options, print });
				let _options: ParserOptions = { ...options };
				for (const plugin of options.plugins) {
					if (typeof plugin !== 'string') {
						if (plugin.parsers && plugin.parsers.hasOwnProperty('pug')) {
							_options = { ..._options, ...plugin.defaultOptions, ...plugin.options };
						}
					}
				}

				const useTabs: boolean = _options.useTabs;
				const tabWidth: number = _options.tabWidth;
				const singleQuote: boolean = false;

				const tokens: Token[] = path.stack[0];

				let result: string = '';
				let indentLevel: number = 0;
				let indent: string = ' '.repeat(tabWidth);
				if (useTabs) {
					indent = '\t';
				}
				let pipelessText: boolean = false;

				for (let index: number = 0; index < tokens.length; index++) {
					const token: Token = tokens[index];
					const previousToken = tokens[index - 1];
					const nextToken = tokens[index + 1];
					logger.debug('[printers:pug-ast:print]:', JSON.stringify(token));
					switch (token.type) {
						case 'tag':
							if (previousToken) {
								if (previousToken.type !== 'indent') {
									result += indent.repeat(indentLevel);
								} else {
									result += indent;
								}
							}
							if (!(token.val === 'div' && (nextToken.type === 'class' || nextToken.type === 'id'))) {
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
								val = val.substring(1, val.length - 1);
								val = val.trim();
								val = val.replace(/\s\s+/g, ' ');
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
							} else if (
								token.name === 'id' &&
								typeof token.val === 'string' &&
								(token.val.startsWith('"') || token.val.startsWith("'"))
							) {
								// Handle id attribute
								let val = token.val;
								val = val.substring(1, val.length - 1);
								val = val.trim();
								// Write css-id in front of css-classes
								let lastPositionOfNewline = result.lastIndexOf('\n');
								if (lastPositionOfNewline === -1) {
									// If no newline was found, set position to zero
									lastPositionOfNewline = 0;
								}
								let position: number = result.indexOf('.', lastPositionOfNewline);
								const firstPositionOfStartAttributes: number = result.indexOf(
									'(',
									lastPositionOfNewline
								);
								if (
									position === -1 ||
									(firstPositionOfStartAttributes !== -1 && position > firstPositionOfStartAttributes)
								) {
									position = firstPositionOfStartAttributes;
								}
								result = [result.slice(0, position), `#${val}`, result.slice(position)].join('');
								result = result.replace(/div#/, '#');
								break;
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
								// Format Vue v-bind
								if (token.name.startsWith(':') || token.name.startsWith('v-bind:')) {
									// Expect js-code
									val = val.trim();
									val = val.replace(/\s\s+/g, ' ');
									val = val.replace('[ {', '[{').replace('} ]', '}]');
									val = val.replace('[ (', '[(').replace(') ]', ')]');
									val = val.replace('[ ', '[').replace(' ]', ']');
									if (quotationType(val) === 'SINGLE') {
										// Swap single and double quotes
										val = val.replace(/[\'\"]/g, (match) => (match === '"' ? "'" : '"'));
									}
								} else if (val.startsWith("'")) {
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
							result += indent.repeat(indentLevel);
							indentLevel++;
							break;
						case 'outdent':
							if (previousToken) {
								if (token.loc.start.line - previousToken.loc.end.line >= 1) {
									// Insert one extra blank line
									result += '\n';
								}
								if (
									previousToken.type !== 'text' &&
									previousToken.type !== 'outdent' &&
									previousToken.type !== 'tag'
								) {
									result += '\n';
								}
							}
							indentLevel--;
							break;
						case 'class':
							if (previousToken) {
								switch (previousToken.type) {
									case 'newline':
										result += indent.repeat(indentLevel);
										break;
									case 'indent':
										result += indent;
										break;
								}
							}
							result += `.${token.val}`;
							if (nextToken && nextToken.type === 'text') {
								result += ' ';
							}
							break;
						case 'eos':
							// Remove all newlines at the end
							while (result.endsWith('\n')) {
								result = result.substring(0, result.length - 1);
							}
							// Insert one newline
							result += `\n`;
							break;
						case 'comment':
							result += indent.repeat(indentLevel);
							result += `//${token.buffer ? '' : '-'}${token.val.replace(/\s\s+/g, ' ')}`;
							break;
						case 'newline':
							if (previousToken && token.loc.start.line - previousToken.loc.end.line > 1) {
								// Insert one extra blank line
								result += '\n';
							}
							result += '\n';
							break;
						case 'text':
							let val = token.val;
							val = val.replace(/\s\s+/g, ' ');
							if (previousToken) {
								switch (previousToken.type) {
									case 'newline':
										if (pipelessText === false) {
											result += indent.repeat(indentLevel);
											if (/^ .+$/.test(val)) {
												result += '|\n';
												result += indent.repeat(indentLevel);
											}
											result += '|';
											if (/.*\S.*/.test(token.val)) {
												result += ' ';
											}
										} else {
											result += indent.repeat(indentLevel);
											result += indent;
										}
										break;
									case 'indent':
										result += '| ';
										break;
									case 'start-pipeless-text':
										result += indent;
										break;
								}
							}
							val = val.trim();
							// Format mustache code like in Vue
							if (val.startsWith('{{') && val.endsWith('}}')) {
								let code: string = val.substring(2, val.length - 2);
								code = code.trim();
								if (quotationType(code) === 'DOUBLE') {
									val = '{{ ';
									val += code.replace(/[\'\"]/g, (match) => (match === '"' ? "'" : '"'));
									val += ' }}';
								}
							}
							if (previousToken && (previousToken.type === 'tag' || previousToken.type === 'id')) {
								val = ` ${val}`;
							}
							result += val;
							break;
						case 'interpolated-code':
							if (previousToken && previousToken.type === 'tag') {
								result += ' ';
							}
							result += `#{${token.val}}`;
							break;
						case 'code':
							result += `- ${token.val}`;
							break;
						case 'id':
							// Handle id attribute
							let idVal = token.val;
							// Write css-id in front of css-classes
							let lastPositionOfNewline = result.lastIndexOf('\n');
							if (lastPositionOfNewline === -1) {
								// If no newline was found, set position to zero
								lastPositionOfNewline = 0;
							}
							let position: number = result.indexOf('.', lastPositionOfNewline);
							if (position === -1) {
								position = result.length;
							}
							let _indent = '';
							if (previousToken && previousToken.type === 'newline') {
								_indent += indent.repeat(indentLevel);
							}
							result = [result.slice(0, position), _indent, `#${idVal}`, result.slice(position)].join('');
							break;
						case 'start-pipeless-text':
							pipelessText = true;
							result += '\n';
							result += indent.repeat(indentLevel);
							break;
						case 'end-pipeless-text':
							pipelessText = false;
							// result += '\n';
							break;
						case 'doctype':
							result += `doctype ${token.val}`;
							break;
						case 'dot':
							result += '.';
							break;
						case 'block':
							if (previousToken && previousToken.type === 'indent') {
								result += indent;
							}
							result += 'block ';
							if (token.mode !== 'replace') {
								result += token.mode;
							}
							result += token.val;
							break;
						default:
							throw new Error('Unhandled token: ' + JSON.stringify(token));
					}
				}

				logger.debug(result);
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
	options: [],
	defaultOptions: {}
};

export const languages = plugin.languages;
export const parsers = plugin.parsers;
export const printers = plugin.printers;
export const options = plugin.options;
export const defaultOptions = plugin.defaultOptions;
