import { AST, Doc, FastPath, format, Options, Parser, ParserOptions, Plugin, util } from 'prettier';
// @ts-ignore
import * as lex from 'pug-lexer';
import { createLogger, Logger, LogLevel } from './logger';
import { options as pugOptions, PugParserOptions, resolveAttributeSeparatorOption } from './options';
import { AttributeToken, EndAttributesToken, Token } from './pug-token';
import { DOCTYPE_SHORTCUT_REGISTRY } from './doctype-shortcut-registry';

const { makeString } = util;

const logger: Logger = createLogger(console);
if (process.env.NODE_ENV === 'test') {
	logger.setLogLevel(LogLevel.DEBUG);
}

function previousNormalAttributeToken(tokens: Token[], index: number): AttributeToken | undefined {
	for (let i: number = index - 1; i > 0; i--) {
		const token: Token = tokens[i];
		if (token.type === 'start-attributes') {
			return;
		}
		if (token.type === 'attribute') {
			if (token.name !== 'class' && token.name !== 'id') {
				return token;
			}
		}
	}
	return;
}

function printIndent(previousToken: Token, result: string, indent: string, indentLevel: number): string {
	if (previousToken) {
		switch (previousToken.type) {
			case 'newline':
			case 'outdent':
				result += indent.repeat(indentLevel);
				break;
			case 'indent':
				result += indent;
				break;
		}
	}
	return result;
}

function formatText(text: string, singleQuote: boolean): string {
	let result: string = '';
	while (text) {
		const start = text.indexOf('{{');
		if (start !== -1) {
			result += text.slice(0, start);
			text = text.substring(start + 2);
			const end = text.indexOf('}}');
			if (end !== -1) {
				let code = text.slice(0, end);
				code = code.trim();
				code = format(code, { parser: 'babel', singleQuote: !singleQuote, printWidth: 9000 });
				if (code.endsWith(';\n')) {
					code = code.slice(0, -2);
				}
				result += `{{ ${code} }}`;
				text = text.slice(end + 2);
			} else {
				result += '{{';
				result += text;
				text = '';
			}
		} else {
			result += text;
			text = '';
		}
	}
	return result;
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
			print(
				path: FastPath,
				{ printWidth, singleQuote, tabWidth, useTabs, attributeSeparator }: ParserOptions & PugParserOptions,
				print: (path: FastPath) => Doc
			): Doc {
				const tokens: Token[] = path.stack[0];

				let result: string = '';
				let indentLevel: number = 0;
				let indent: string = ' '.repeat(tabWidth);
				if (useTabs) {
					indent = '\t';
				}
				let pipelessText: boolean = false;

				const alwaysUseAttributeSeparator: boolean = resolveAttributeSeparatorOption(attributeSeparator);

				let startTagPosition: number = 0;
				let startAttributePosition: number = 0;
				let previousAttributeRemapped: boolean = false;
				let wrapAttributes: boolean = false;

				const codeInterpolationOptions = { singleQuote: !singleQuote, printWidth: 9000 };

				for (let index: number = 0; index < tokens.length; index++) {
					const token: Token = tokens[index];
					const previousToken: Token | undefined = tokens[index - 1];
					const nextToken: Token | undefined = tokens[index + 1];
					logger.debug('[printers:pug-ast:print]:', JSON.stringify(token));
					switch (token.type) {
						case 'tag':
							result = printIndent(previousToken, result, indent, indentLevel);
							if (!(token.val === 'div' && (nextToken.type === 'class' || nextToken.type === 'id'))) {
								result += token.val;
							}
							startTagPosition = result.length;
							break;
						case 'start-attributes':
							if (nextToken && nextToken.type === 'attribute') {
								previousAttributeRemapped = false;
								startAttributePosition = result.length;
								result += '(';
								const start: number = result.lastIndexOf('\n') + 1;
								let lineLength: number = result.substring(start).length;
								logger.debug(lineLength, printWidth);
								let tempToken: AttributeToken | EndAttributesToken = nextToken;
								let tempIndex: number = index + 1;
								while (tempToken.type === 'attribute') {
									lineLength += tempToken.name.length + 1 + tempToken.val.toString().length;
									logger.debug(lineLength, printWidth);
									tempToken = tokens[++tempIndex] as AttributeToken | EndAttributesToken;
								}
								if (lineLength > printWidth) {
									wrapAttributes = true;
								}
							}
							break;
						case 'attribute': {
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
									const position: number = startAttributePosition;
									result = [result.slice(0, position), `.${className}`, result.slice(position)].join(
										''
									);
									startAttributePosition += 1 + className.length;
									result = result.replace(/div\./, '.');
								}
								if (specialClasses.length > 0) {
									token.val = makeString(specialClasses.join(' '), singleQuote ? "'" : '"', false);
									previousAttributeRemapped = false;
								} else {
									previousAttributeRemapped = true;
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
								const position: number = startTagPosition;
								result = [result.slice(0, position), `#${val}`, result.slice(position)].join('');
								startAttributePosition += 1 + val.length;
								result = result.replace(/div#/, '#');
								if (previousToken.type === 'attribute' && previousToken.name !== 'class') {
									previousAttributeRemapped = true;
								}
								break;
							}

							const hasNormalPreviousToken: AttributeToken | undefined = previousNormalAttributeToken(
								tokens,
								index
							);
							if (
								previousToken &&
								previousToken.type === 'attribute' &&
								(!previousAttributeRemapped || hasNormalPreviousToken)
							) {
								if (alwaysUseAttributeSeparator || /^(\(|\[|:).*/.test(token.name)) {
									result += ',';
								}
								if (!wrapAttributes) {
									result += ' ';
								}
							}
							previousAttributeRemapped = false;

							if (wrapAttributes) {
								result += '\n';
								result += indent.repeat(indentLevel + 1);
							}

							result += `${token.name}`;
							if (typeof token.val === 'boolean') {
								if (token.val !== true) {
									result += `=${token.val}`;
								}
							} else {
								let val = token.val;
								if (/^((v-bind|v-on|v-slot)?:|v-model|v-on|@).*/.test(token.name)) {
									// Format Vue expression
									val = val.trim();
									val = val.slice(1, -1);
									val = format(val, {
										parser: '__vue_expression' as any,
										...codeInterpolationOptions
									});
									const quotes: "'" | '"' = singleQuote ? "'" : '"';
									val = `${quotes}${val}${quotes}`;
								} else if (/^(\(.*\)|\[.*\])$/.test(token.name)) {
									// Format Angular action or binding
									val = val.trim();
									val = val.slice(1, -1);
									val = format(val, {
										parser: '__ng_interpolation' as any,
										...codeInterpolationOptions
									});
									const quotes: "'" | '"' = singleQuote ? "'" : '"';
									val = `${quotes}${val}${quotes}`;
								} else if (/^\*.*$/.test(token.name)) {
									// Format Angular directive
									val = val.trim();
									val = val.slice(1, -1);
									val = format(val, { parser: '__ng_directive' as any, ...codeInterpolationOptions });
									const quotes: "'" | '"' = singleQuote ? "'" : '"';
									val = `${quotes}${val}${quotes}`;
								} else if (/^(["']{{)(.*)(}}["'])$/.test(val)) {
									// Format Angular interpolation
									val = val.slice(3, -3);
									val = val.trim();
									val = val.replace(/\s\s+/g, ' ');
									// val = format(val, {
									// 	parser: '__ng_interpolation' as any,
									// 	...codeInterpolationOptions
									// });
									const quotes: "'" | '"' = singleQuote ? "'" : '"';
									val = `${quotes}{{ ${val} }}${quotes}`;
								} else if (/^["'](.*)["']$/.test(val)) {
									val = makeString(val.slice(1, -1), singleQuote ? "'" : '"', false);
								} else if (val === 'true') {
									// The value is exactly true and is not quoted
									break;
								} else {
									// The value is not quoted and may be js-code
									val = val.trim();
									val = val.replace(/\s\s+/g, ' ');
									if (val.startsWith('{ ')) {
										val = `{${val.substring(2, val.length)}`;
									}
								}

								if (token.mustEscape === false) {
									result += '!';
								}

								result += `=${val}`;
							}
							break;
						}
						case 'end-attributes':
							if (wrapAttributes) {
								result += '\n';
								result += indent.repeat(indentLevel);
							}
							wrapAttributes = false;
							if (result.endsWith('(')) {
								// There were no attributes
								result = result.substring(0, result.length - 1);
							} else if (previousToken && previousToken.type === 'attribute') {
								result += ')';
							}
							if (nextToken && (nextToken.type === 'text' || nextToken.type === 'path')) {
								result += ' ';
							}
							break;
						case 'indent':
							result += '\n';
							result += indent.repeat(indentLevel);
							indentLevel++;
							break;
						case 'outdent':
							if (previousToken && previousToken.type !== 'outdent') {
								if (token.loc.start.line - previousToken.loc.end.line > 1) {
									// Insert one extra blank line
									result += '\n';
								}
								result += '\n';
							}
							indentLevel--;
							break;
						case 'class':
							result = printIndent(previousToken, result, indent, indentLevel);
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
							result += '\n';
							break;
						case 'comment':
							result = printIndent(previousToken, result, indent, indentLevel);
							result += `//${token.buffer ? '' : '-'}${token.val.replace(/\s\s+/g, ' ')}`;
							break;
						case 'newline':
							if (previousToken && token.loc.start.line - previousToken.loc.end.line > 1) {
								// Insert one extra blank line
								result += '\n';
							}
							result += '\n';
							break;
						case 'text': {
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
										result += indent;
										result += '|';
										if (/.*\S.*/.test(token.val)) {
											result += ' ';
										}
										break;
									case 'start-pipeless-text':
										result += indent;
										break;
									case 'interpolated-code':
									case 'end-pug-interpolation':
										if (/^ .+$/.test(val)) {
											result += ' ';
										}
										break;
								}
							}
							let needsTrailingWhitespace: boolean = false;
							if (nextToken && val.endsWith(' ')) {
								switch (nextToken.type) {
									case 'interpolated-code':
									case 'start-pug-interpolation':
										needsTrailingWhitespace = true;
										break;
								}
							}
							val = val.trim();
							val = formatText(val, singleQuote);
							if (previousToken && (previousToken.type === 'tag' || previousToken.type === 'id')) {
								val = ` ${val}`;
							}
							result += val;
							if (needsTrailingWhitespace) {
								result += ' ';
							}
							break;
						}
						case 'interpolated-code':
							if (previousToken) {
								switch (previousToken.type) {
									case 'tag':
									case 'end-attributes':
										result += ' ';
										break;
									case 'indent':
										result = printIndent(previousToken, result, indent, indentLevel);
										result += '| ';
										break;
								}
							}
							result += `#{${token.val}}`;
							break;
						case 'code':
							result = printIndent(previousToken, result, indent, indentLevel);
							result += token.buffer ? '=' : '-';
							result += ` ${token.val}`;
							break;
						case 'id': {
							// Handle id attribute
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
							if (previousToken) {
								switch (previousToken.type) {
									case 'newline':
									case 'outdent':
										_indent = indent.repeat(indentLevel);
										break;
									case 'indent':
										_indent = indent;
										break;
								}
							}
							result = [result.slice(0, position), _indent, `#${token.val}`, result.slice(position)].join(
								''
							);
							break;
						}
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
							result += 'doctype';
							if (token.val) {
								result += ` ${token.val}`;
							}
							break;
						case 'dot':
							result += '.';
							break;
						case 'block':
							result = printIndent(previousToken, result, indent, indentLevel);
							result += 'block ';
							if (token.mode !== 'replace') {
								result += token.mode;
							}
							result += token.val;
							break;
						case 'extends':
							result += 'extends ';
							break;
						case 'path':
							if (previousToken && previousToken.type === 'include') {
								result += ' ';
							}
							result += token.val;
							break;
						case 'start-pug-interpolation':
							result += '#[';
							break;
						case 'end-pug-interpolation':
							result += ']';
							break;
						case 'include':
							result = printIndent(previousToken, result, indent, indentLevel);
							result += 'include';
							break;
						case 'filter':
							result += `:${token.val}`;
							break;
						case 'call': {
							result = printIndent(previousToken, result, indent, indentLevel);
							result += `+${token.val}`;
							let args: string | null = token.args;
							if (args) {
								args = args.trim();
								args = args.replace(/\s\s+/g, ' ');
								result += `(${args})`;
							}
							break;
						}
						case 'mixin': {
							result = printIndent(previousToken, result, indent, indentLevel);
							result += `mixin ${token.val}`;
							let args: string | null = token.args;
							if (args) {
								args = args.trim();
								args = args.replace(/\s\s+/g, ' ');
								result += `(${args})`;
							}
							break;
						}
						case 'if':
							result = printIndent(previousToken, result, indent, indentLevel);
							result += `if ${token.val}`;
							break;
						case 'mixin-block':
							result = printIndent(previousToken, result, indent, indentLevel);
							result += 'block';
							break;
						case 'else':
							result = printIndent(previousToken, result, indent, indentLevel);
							result += 'else';
							break;
						case '&attributes':
							result += `&attributes(${token.val})`;
							break;
						case 'text-html':
							result = printIndent(previousToken, result, indent, indentLevel);
							const match: RegExpExecArray | null = /^<(.*?)>(.*)<\/(.*?)>$/.exec(token.val);
							logger.debug(match);
							if (match) {
								result += `${match[1]} ${match[2]}`;
								break;
							}
							const entry = Object.entries(DOCTYPE_SHORTCUT_REGISTRY).find(
								([key]) => key === token.val.toLowerCase()
							);
							if (entry) {
								result += entry[1];
								break;
							}
							result += token.val;
							break;
						case 'each':
							result = printIndent(previousToken, result, indent, indentLevel);
							result += `each ${token.val} in ${token.code}`;
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
	options: pugOptions as any,
	defaultOptions: {}
};

export const languages = plugin.languages;
export const parsers = plugin.parsers;
export const printers = plugin.printers;
export const options = plugin.options;
export const defaultOptions = plugin.defaultOptions;
