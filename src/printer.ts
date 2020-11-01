import { format, RequiredOptions } from 'prettier';
import {
	AndAttributesToken,
	AttributeToken,
	BlockcodeToken,
	BlockToken,
	CallToken,
	CaseToken,
	ClassToken,
	CodeToken,
	ColonToken,
	CommentToken,
	DefaultToken,
	DoctypeToken,
	DotToken,
	EachOfToken,
	EachToken,
	ElseIfToken,
	ElseToken,
	EndAttributesToken,
	EndPipelessTextToken,
	EndPugInterpolationToken,
	EosToken,
	ExtendsToken,
	FilterToken,
	IdToken,
	IfToken,
	IncludeToken,
	IndentToken,
	InterpolatedCodeToken,
	InterpolationToken,
	LexTokenType,
	MixinBlockToken,
	MixinToken,
	NewlineToken,
	OutdentToken,
	PathToken,
	SlashToken,
	StartAttributesToken,
	StartPipelessTextToken,
	StartPugInterpolationToken,
	TagToken,
	TextHtmlToken,
	TextToken,
	Token,
	WhenToken,
	WhileToken,
	YieldToken
} from 'pug-lexer';
import { DoctypeShortcut, DOCTYPE_SHORTCUT_REGISTRY } from './doctype-shortcut-registry';
import { createLogger, Logger, LogLevel } from './logger';
import { AttributeSeparator, resolveAttributeSeparatorOption } from './options/attribute-separator';
import { SortAttributes } from './options/attribute-sorting';
import { compareAttributeToken, partialSort } from './options/attribute-sorting/utils';
import { ClosingBracketPosition, resolveClosingBracketPositionOption } from './options/closing-bracket-position';
import { CommentPreserveSpaces, formatCommentPreserveSpaces } from './options/comment-preserve-spaces';
import { ArrowParens } from './options/common';
import { PugEmptyAttributes, PugEmptyAttributesForceQuotes } from './options/empty-attributes';
import { formatEmptyAttribute } from './options/empty-attributes/utils';
import { isAngularAction, isAngularBinding, isAngularDirective, isAngularInterpolation } from './utils/angular';
import {
	handleBracketSpacing,
	isMultilineInterpolation,
	isQuoted,
	makeString,
	previousNormalAttributeToken,
	unwrapLineFeeds
} from './utils/common';
import { isVueEventBinding, isVueExpression } from './utils/vue';

const logger: Logger = createLogger(console);
if (process.env.NODE_ENV === 'test') {
	logger.setLogLevel(LogLevel.DEBUG);
}

export interface PugPrinterOptions {
	readonly printWidth: number;
	readonly pugPrintWidth: number;
	readonly singleQuote: boolean;
	readonly pugSingleQuote: boolean;
	readonly tabWidth: number;
	readonly pugTabWidth: number;
	readonly useTabs: boolean;
	readonly pugUseTabs: boolean;
	readonly bracketSpacing: boolean;
	readonly pugBracketSpacing: boolean;
	readonly arrowParens: ArrowParens;
	readonly pugArrowParens: ArrowParens;
	readonly semi: boolean;
	readonly pugSemi: boolean;
	readonly attributeSeparator: AttributeSeparator;
	readonly closingBracketPosition: ClosingBracketPosition;
	readonly commentPreserveSpaces: CommentPreserveSpaces;
	readonly pugSortAttributes: SortAttributes;
	readonly pugSortAttributesBeginning: string[];
	readonly pugSortAttributesEnd: string[];
	readonly pugWrapAttributesThreshold: number;
	readonly pugWrapAttributesPattern: string;
	readonly pugEmptyAttributes: PugEmptyAttributes;
	readonly pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes;
	readonly pugSingleFileComponentIndentation: boolean;
}

export class PugPrinter {
	private result: string = '';

	/**
	 * The index of the current token inside the `tokens` array
	 */
	// Start at -1, because `getNextToken()` increases it before retrieval
	private currentIndex: number = -1;
	private currentLineLength: number = 0;

	private readonly indentString: string;
	private indentLevel: number = 0;

	private readonly quotes: "'" | '"';
	private readonly otherQuotes: "'" | '"';

	private readonly alwaysUseAttributeSeparator: boolean;
	private readonly neverUseAttributeSeparator: boolean;
	private readonly closingBracketRemainsAtNewLine: boolean;
	private readonly wrapAttributesPattern: RegExp | null;
	/* eslint-disable @typescript-eslint/indent */
	private readonly codeInterpolationOptions: Pick<
		RequiredOptions,
		'singleQuote' | 'bracketSpacing' | 'arrowParens' | 'printWidth' | 'endOfLine'
	>;
	/* eslint-enable @typescript-eslint/indent */

	private currentTagPosition: number = 0;
	private possibleIdPosition: number = 0;
	private possibleClassPosition: number = 0;

	private previousAttributeRemapped: boolean = false;
	private wrapAttributes: boolean = false;

	private pipelessText: boolean = false;
	private pipelessComment: boolean = false;
	private currentlyInPugInterpolation: boolean = false;

	public constructor(
		private readonly content: string,
		private tokens: Token[],
		private readonly options: PugPrinterOptions
	) {
		this.indentString = options.pugUseTabs ? '\t' : ' '.repeat(options.pugTabWidth);
		if (options.pugSingleFileComponentIndentation) {
			this.indentLevel++;
		}

		this.quotes = this.options.pugSingleQuote ? "'" : '"';
		this.otherQuotes = this.options.pugSingleQuote ? '"' : "'";

		const attributeSeparator: AttributeSeparator = resolveAttributeSeparatorOption(options.attributeSeparator);
		this.alwaysUseAttributeSeparator = attributeSeparator === 'always';
		this.neverUseAttributeSeparator = attributeSeparator === 'none';

		this.closingBracketRemainsAtNewLine = resolveClosingBracketPositionOption(options.closingBracketPosition);

		const wrapAttributesPattern: string = options.pugWrapAttributesPattern;
		this.wrapAttributesPattern = wrapAttributesPattern ? new RegExp(wrapAttributesPattern) : null;

		const codeSingleQuote: boolean = !options.pugSingleQuote;
		this.codeInterpolationOptions = {
			singleQuote: codeSingleQuote,
			bracketSpacing: options.pugBracketSpacing ?? options.bracketSpacing,
			arrowParens: options.pugArrowParens ?? options.arrowParens,
			printWidth: 9000,
			endOfLine: 'lf'
		};
	}

	public build(): string {
		if (logger.isDebugEnabled()) {
			logger.debug('[PugPrinter]:', JSON.stringify(this.tokens));
		}

		const results: string[] = [];
		if (this.tokens[0]?.type === 'text') {
			results.push('| ');
		} else if (this.tokens[0]?.type === 'eos') {
			return '';
		}
		let token: Token | null = this.getNextToken();
		while (token) {
			logger.debug('[PugPrinter]:', JSON.stringify(token));
			try {
				switch (token.type) {
					case 'attribute':
					case 'class':
					case 'end-attributes':
					case 'id':
					case 'eos':
						// TODO: These tokens write directly into the result
						this.result = results.join('');
						// @ts-expect-error
						this[token.type](token);
						results.length = 0;
						results.push(this.result);
						break;
					case 'tag':
					case 'start-attributes':
					case 'interpolation':
					case 'call':
					case ':':
						// TODO: These tokens read the length of the result
						this.result = results.join('');
					// eslint-disable-next-line no-fallthrough
					default: {
						if (typeof this[token.type] !== 'function') {
							throw new Error('Unhandled token: ' + JSON.stringify(token));
						}
						// @ts-expect-error
						results.push(this[token.type](token));
						break;
					}
				}
			} catch (error) {
				throw new Error(error);
			}
			token = this.getNextToken();
		}
		return results.join('');
	}

	// ##     ## ######## ##       ########  ######## ########   ######
	// ##     ## ##       ##       ##     ## ##       ##     ## ##    ##
	// ##     ## ##       ##       ##     ## ##       ##     ## ##
	// ######### ######   ##       ########  ######   ########   ######
	// ##     ## ##       ##       ##        ##       ##   ##         ##
	// ##     ## ##       ##       ##        ##       ##    ##  ##    ##
	// ##     ## ######## ######## ##        ######## ##     ##  ######

	//#region Helpers

	private get computedIndent(): string {
		switch (this.previousToken?.type) {
			case 'newline':
			case 'outdent':
				return this.indentString.repeat(this.indentLevel);
			case 'indent':
				return this.indentString;
			case 'start-pug-interpolation':
				return '';
		}
		return this.options.pugSingleFileComponentIndentation ? this.indentString : '';
	}

	private get previousToken(): Token | undefined {
		return this.tokens[this.currentIndex - 1];
	}

	private get nextToken(): Token | undefined {
		return this.tokens[this.currentIndex + 1];
	}

	private getNextToken(): Token | null {
		this.currentIndex++;
		return this.tokens[this.currentIndex] ?? null;
	}

	private quoteString(val: string): string {
		return `${this.quotes}${val}${this.quotes}`;
	}

	private checkTokenType(token: Token | undefined, possibilities: LexTokenType[], invert: boolean = false): boolean {
		return !!token && possibilities.includes(token.type) !== invert;
	}

	private tokenNeedsSeparator(token: AttributeToken): boolean {
		return this.neverUseAttributeSeparator
			? false
			: this.alwaysUseAttributeSeparator || /^(\(|\[|:).*/.test(token.name);
	}

	private getUnformattedContentLines(firstToken: Token, lastToken: Token): string[] {
		const { start } = firstToken.loc;
		const { end } = lastToken.loc;
		const lines: string[] = this.content.split(/\r\n|\n|\r/);
		const startLine: number = start.line - 1;
		const endLine: number = end.line - 1;
		const parts: string[] = [];
		parts.push(lines[startLine].slice(start.column - 1));
		for (let line: number = startLine + 1; line < endLine; line++) {
			parts.push(lines[line]);
		}
		parts.push(lines[endLine].slice(0, end.column - 1));
		return parts;
	}

	private replaceTagWithLiteralIfPossible(search: RegExp, replace: string): void {
		const currentTagEnd: number = Math.max(this.possibleIdPosition, this.possibleClassPosition);
		const tag: string = this.result.slice(this.currentTagPosition, currentTagEnd);
		const replaced: string = tag.replace(search, replace);
		if (replaced !== tag) {
			const prefix: string = this.result.slice(0, this.currentTagPosition);
			const suffix: string = this.result.slice(currentTagEnd);
			this.result = `${prefix}${replaced}${suffix}`;
			// tag was replaced, so adjust possible positions as well
			const diff: number = tag.length - replaced.length;
			this.possibleIdPosition -= diff;
			this.possibleClassPosition -= diff;
		}
	}

	private formatDelegatePrettier(
		val: string,
		parser: '__vue_expression' | '__ng_binding' | '__ng_action' | '__ng_directive'
	): string {
		val = val.trim();
		val = val.slice(1, -1);
		val = format(val, { parser, ...this.codeInterpolationOptions });
		val = unwrapLineFeeds(val);
		return this.quoteString(val);
	}

	private formatText(text: string): string {
		let result: string = '';
		while (text) {
			const start: number = text.indexOf('{{');
			if (start !== -1) {
				result += text.slice(0, start);
				text = text.slice(start + 2);
				const end: number = text.indexOf('}}');
				if (end !== -1) {
					let code: string = text.slice(0, end);
					try {
						// Index of primary quote
						const q1: number = code.indexOf(this.quotes);
						// Index of secondary (other) quote
						const q2: number = code.indexOf(this.otherQuotes);
						// Index of backtick
						const qb: number = code.indexOf('`');
						if (q1 >= 0 && q2 >= 0 && q2 > q1 && (qb < 0 || q1 < qb)) {
							logger.log({
								code,
								quotes: this.quotes,
								otherQuotes: this.otherQuotes,
								q1,
								q2,
								qb
							});
							logger.warn(
								'The following expression could not be formatted correctly. Please try to fix it yourself and if there is a problem, please open a bug issue:',
								code
							);
							result += handleBracketSpacing(this.options.pugBracketSpacing, code);
							text = text.slice(end + 2);
							continue;
						} else {
							code = format(code, { parser: '__ng_interpolation', ...this.codeInterpolationOptions });
						}
					} catch (error: unknown) {
						if (typeof error === 'string') {
							if (error.includes('Unexpected token Lexer Error')) {
								if (!error.includes('Unexpected character [`]')) {
									logger.debug('[PugPrinter:formatText]: Using fallback strategy');
								}
							} else if (error.includes('Bindings cannot contain assignments')) {
								logger.warn(
									'[PugPrinter:formatText]: Bindings should not contain assignments:',
									`code: \`${code.trim()}\``
								);
							} else if (error.includes("Unexpected token '('")) {
								logger.warn(
									"[PugPrinter:formatText]: Found unexpected token '('. If you are using Vue, you can ignore this message.",
									`code: \`${code.trim()}\``
								);
							} else if (error.includes('Missing expected )')) {
								logger.warn(
									'[PugPrinter:formatText]: Missing expected ). If you are using Vue, you can ignore this message.',
									`code: \`${code.trim()}\``
								);
							} else if (error.includes('Missing expected :')) {
								logger.warn(
									'[PugPrinter:formatText]: Missing expected :. If you are using Vue, you can ignore this message.',
									`code: \`${code.trim()}\``
								);
							} else {
								logger.warn('[PugPrinter:formatText]: ', error);
							}
							// else ignore message
						} else {
							logger.warn('[PugPrinter:formatText]: ', error);
						}
						try {
							code = format(code, {
								parser: 'babel',
								...this.codeInterpolationOptions,
								semi: false
							});
							if (code[0] === ';') {
								code = code.slice(1);
							}
						} catch (error: unknown) {
							logger.warn(error);
						}
					}
					code = unwrapLineFeeds(code);
					result += handleBracketSpacing(this.options.pugBracketSpacing, code);
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

	private formatVueEventBinding(val: string): string {
		val = val.trim();
		val = val.slice(1, -1); // Remove quotes
		val = format(val, { parser: '__vue_event_binding', ...this.codeInterpolationOptions });
		val = unwrapLineFeeds(val);
		if (val[val.length - 1] === ';') {
			val = val.slice(0, -1);
		}
		return this.quoteString(val);
	}

	private formatVueExpression(val: string): string {
		return this.formatDelegatePrettier(val, '__vue_expression');
	}

	private formatAngularBinding(val: string): string {
		return this.formatDelegatePrettier(val, '__ng_binding');
	}

	private formatAngularAction(val: string): string {
		return this.formatDelegatePrettier(val, '__ng_action');
	}

	private formatAngularDirective(val: string): string {
		return this.formatDelegatePrettier(val, '__ng_directive');
	}

	private formatAngularInterpolation(val: string): string {
		val = val.slice(1, -1); // Remove quotes
		val = val.slice(2, -2); // Remove braces
		val = val.trim();
		if (val.includes(`\\${this.otherQuotes}`)) {
			logger.warn(
				'The following expression could not be formatted correctly. Please try to fix it yourself and if there is a problem, please open a bug issue:',
				val
			);
		} else {
			val = format(val, { parser: '__ng_interpolation', ...this.codeInterpolationOptions });
			val = unwrapLineFeeds(val);
		}
		val = handleBracketSpacing(this.options.pugBracketSpacing, val);
		return this.quoteString(val);
	}

	//#endregion

	// ########  #######  ##    ## ######## ##    ##    ########  ########   #######   ######  ########  ######   ######   #######  ########   ######
	//    ##    ##     ## ##   ##  ##       ###   ##    ##     ## ##     ## ##     ## ##    ## ##       ##    ## ##    ## ##     ## ##     ## ##    ##
	//    ##    ##     ## ##  ##   ##       ####  ##    ##     ## ##     ## ##     ## ##       ##       ##       ##       ##     ## ##     ## ##
	//    ##    ##     ## #####    ######   ## ## ##    ########  ########  ##     ## ##       ######    ######   ######  ##     ## ########   ######
	//    ##    ##     ## ##  ##   ##       ##  ####    ##        ##   ##   ##     ## ##       ##             ##       ## ##     ## ##   ##         ##
	//    ##    ##     ## ##   ##  ##       ##   ###    ##        ##    ##  ##     ## ##    ## ##       ##    ## ##    ## ##     ## ##    ##  ##    ##
	//    ##     #######  ##    ## ######## ##    ##    ##        ##     ##  #######   ######  ########  ######   ######   #######  ##     ##  ######

	//#region Token Processors

	private tag(token: TagToken): string {
		let val: string = token.val;
		if (val === 'div' && this.nextToken && (this.nextToken.type === 'class' || this.nextToken.type === 'id')) {
			val = '';
		}
		this.currentLineLength += val.length;
		const result: string = `${this.computedIndent}${val}`;
		logger.debug('tag', { result, val: token.val, length: token.val.length }, this.currentLineLength);
		this.currentTagPosition = this.result.length + this.computedIndent.length;
		this.possibleIdPosition = this.result.length + result.length;
		this.possibleClassPosition = this.result.length + result.length;
		return result;
	}

	private ['start-attributes'](token: StartAttributesToken): string {
		let result: string = '';
		if (this.nextToken?.type === 'attribute') {
			this.previousAttributeRemapped = false;
			this.possibleClassPosition = this.result.length;
			result = '(';
			logger.debug(this.currentLineLength);
			let tempToken: AttributeToken | EndAttributesToken = this.nextToken;
			let tempIndex: number = this.currentIndex + 1;
			// In pug, tags can have two kind of attributes: normal attributes that appear between parentheses,
			// and literals for ids and classes, prefixing the parentheses, e.g.: `#id.class(attribute="value")`
			// https://pugjs.org/language/attributes.html#class-literal
			// https://pugjs.org/language/attributes.html#id-literal
			// In the stream of attribute tokens, distinguish those that can be converted to literals,
			// and count those that cannot (normal attributes) to determine the resulting line length correctly.
			let hasLiteralAttributes: boolean = false;
			let numNormalAttributes: number = 0;
			while (tempToken.type === 'attribute') {
				if (
					!this.currentlyInPugInterpolation &&
					!this.wrapAttributes &&
					this.wrapAttributesPattern?.test(tempToken.name)
				) {
					this.wrapAttributes = true;
				}
				switch (tempToken.name) {
					case 'class':
					case 'id': {
						hasLiteralAttributes = true;
						const val: string = tempToken.val.toString();
						if (isQuoted(val)) {
							this.currentLineLength -= 2;
						}
						this.currentLineLength += 1 + val.length;
						logger.debug(
							{ tokenName: tempToken.name, length: tempToken.name.length },
							this.currentLineLength
						);
						break;
					}
					default: {
						this.currentLineLength += tempToken.name.length;
						if (numNormalAttributes > 0) {
							// This isn't the first normal attribute that will appear between parentheses,
							// add space and separator
							this.currentLineLength += 1;
							if (this.tokenNeedsSeparator(tempToken)) {
								this.currentLineLength += 1;
							}
						}
						logger.debug(
							{ tokenName: tempToken.name, length: tempToken.name.length },
							this.currentLineLength
						);
						const val: string = tempToken.val.toString();
						if (val.length > 0 && val !== 'true') {
							this.currentLineLength += 1 + val.length;
							logger.debug({ tokenVal: val, length: val.length }, this.currentLineLength);
						}
						numNormalAttributes++;
						break;
					}
				}
				tempToken = this.tokens[++tempIndex] as AttributeToken | EndAttributesToken;
			}
			logger.debug('after token', this.currentLineLength);
			if (hasLiteralAttributes) {
				// Remove div as it will be replaced with the literal for id and/or class
				if (this.previousToken?.type === 'tag' && this.previousToken.val === 'div') {
					this.currentLineLength -= 3;
				}
			}
			if (numNormalAttributes > 0) {
				// Add leading and trailing parentheses
				this.currentLineLength += 2;
			}
			logger.debug(this.currentLineLength);
			if (
				!this.currentlyInPugInterpolation &&
				!this.wrapAttributes &&
				(this.currentLineLength > this.options.pugPrintWidth ||
					(this.options.pugWrapAttributesThreshold >= 0 &&
						numNormalAttributes > this.options.pugWrapAttributesThreshold))
			) {
				this.wrapAttributes = true;
			}

			if (
				this.options.pugSortAttributes !== 'as-is' ||
				this.options.pugSortAttributesEnd.length > 0 ||
				this.options.pugSortAttributesBeginning.length > 0
			) {
				const startAttributesIndex: number = this.tokens.indexOf(token);
				const endAttributesIndex: number = tempIndex;
				if (endAttributesIndex - startAttributesIndex > 2) {
					this.tokens = partialSort(this.tokens, startAttributesIndex + 1, endAttributesIndex, (a, b) =>
						compareAttributeToken(
							a as AttributeToken,
							b as AttributeToken,
							this.options.pugSortAttributes,
							this.options.pugSortAttributesBeginning,
							this.options.pugSortAttributesEnd
						)
					);
				}
			}
		}
		return result;
	}

	private attribute(token: AttributeToken): void {
		formatEmptyAttribute(token, this.options.pugEmptyAttributes, this.options.pugEmptyAttributesForceQuotes);

		if (typeof token.val === 'string') {
			if (isQuoted(token.val)) {
				if (token.name === 'class') {
					// Handle class attribute
					const val: string = token.val.slice(1, -1).trim();
					const classes: string[] = val.split(/\s+/);
					const specialClasses: string[] = [];
					const normalClasses: string[] = [];
					const validClassNameRegex: RegExp = /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;
					for (const className of classes) {
						if (!validClassNameRegex.test(className)) {
							specialClasses.push(className);
						} else {
							normalClasses.push(className);
						}
					}
					if (normalClasses.length > 0) {
						// Write css-class in front of attributes
						const position: number = this.possibleClassPosition;
						this.result = [
							this.result.slice(0, position),
							'.',
							normalClasses.join('.'),
							this.result.slice(position)
						].join('');
						this.possibleClassPosition += 1 + normalClasses.join('.').length;
						this.replaceTagWithLiteralIfPossible(/div\./, '.');
					}
					if (specialClasses.length > 0) {
						token.val = makeString(specialClasses.join(' '), this.quotes);
						this.previousAttributeRemapped = false;
					} else {
						this.previousAttributeRemapped = true;
						return;
					}
				} else if (token.name === 'id') {
					// Handle id attribute
					let val: string = token.val;
					val = val.slice(1, -1);
					val = val.trim();
					const validIdNameRegex: RegExp = /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;
					if (!validIdNameRegex.test(val)) {
						val = makeString(val, this.quotes);
						this.result += 'id';
						if (token.mustEscape === false) {
							this.result += '!';
						}
						this.result += `=${val}`;
						return;
					}
					// Write css-id in front of css-classes
					const position: number = this.possibleIdPosition;
					const literal: string = `#${val}`;
					this.result = [this.result.slice(0, position), literal, this.result.slice(position)].join('');
					this.possibleClassPosition += literal.length;
					this.replaceTagWithLiteralIfPossible(/div#/, '#');
					this.previousAttributeRemapped = true;
					return;
				}
			}
		}

		const hasNormalPreviousToken: AttributeToken | undefined = previousNormalAttributeToken(
			this.tokens,
			this.currentIndex
		);
		if (this.previousToken?.type === 'attribute' && (!this.previousAttributeRemapped || hasNormalPreviousToken)) {
			if (this.tokenNeedsSeparator(token)) {
				this.result += ',';
			}
			if (!this.wrapAttributes) {
				this.result += ' ';
			}
		}
		this.previousAttributeRemapped = false;

		if (this.wrapAttributes) {
			this.result += '\n';
			this.result += this.indentString.repeat(this.indentLevel + 1);
		}

		this.result += `${token.name}`;
		if (typeof token.val === 'boolean') {
			if (token.val !== true) {
				this.result += `=${token.val}`;
			}
		} else {
			let val: string = token.val;
			if (isMultilineInterpolation(val)) {
				// do not reformat multiline strings surrounded by `
			} else if (isVueExpression(token.name)) {
				val = this.formatVueExpression(val);
			} else if (isVueEventBinding(token.name)) {
				val = this.formatVueEventBinding(val);
			} else if (isAngularBinding(token.name)) {
				val = this.formatAngularBinding(val);
			} else if (isAngularAction(token.name)) {
				val = this.formatAngularAction(val);
			} else if (isAngularDirective(token.name)) {
				val = this.formatAngularDirective(val);
			} else if (isAngularInterpolation(val)) {
				val = this.formatAngularInterpolation(val);
			} else if (isQuoted(val)) {
				val = makeString(val.slice(1, -1), this.quotes);
			} else if (val === 'true') {
				// The value is exactly true and is not quoted
				return;
			} else if (token.mustEscape) {
				val = format(val, { parser: '__js_expression', ...this.codeInterpolationOptions });

				const lines: string[] = val.split('\n');
				const codeIndentLevel: number = this.wrapAttributes ? this.indentLevel + 1 : this.indentLevel;
				if (lines.length > 1) {
					val = lines[0];
					for (let index: number = 1; index < lines.length; index++) {
						val += '\n';
						val += this.indentString.repeat(codeIndentLevel);
						val += lines[index];
					}
				}
			} else {
				// The value is not quoted and may be js-code
				val = val.trim();
				val = val.replace(/\s\s+/g, ' ');
				if (val[0] === '{' && val[1] === ' ') {
					val = `{${val.slice(2, val.length)}`;
				}
			}

			if (token.mustEscape === false) {
				this.result += '!';
			}

			this.result += `=${val}`;
		}
	}

	private ['end-attributes'](token: EndAttributesToken): void {
		if (this.wrapAttributes && this.result[this.result.length - 1] !== '(') {
			if (this.closingBracketRemainsAtNewLine) {
				this.result += '\n';
			}
			this.result += this.indentString.repeat(this.indentLevel);
		}
		this.wrapAttributes = false;
		if (this.result[this.result.length - 1] === '(') {
			// There were no attributes
			this.result = this.result.slice(0, -1);
		} else if (this.previousToken?.type === 'attribute') {
			if (!this.closingBracketRemainsAtNewLine) {
				this.result = this.result.trimRight();
			}
			this.result += ')';
		}
		if (this.nextToken?.type === 'text' || this.nextToken?.type === 'path') {
			this.result += ' ';
		}
	}

	private indent(token: IndentToken): string {
		const result: string = `\n${this.indentString.repeat(this.indentLevel)}`;
		this.indentLevel++;
		this.currentLineLength = result.length - 1 + 1 + this.indentString.length; // -1 for \n, +1 for non zero based
		logger.debug('indent', { result, indentLevel: this.indentLevel }, this.currentLineLength);
		return result;
	}

	private outdent(token: OutdentToken): string {
		let result: string = '';
		if (this.previousToken && this.previousToken.type !== 'outdent') {
			if (token.loc.start.line - this.previousToken.loc.end.line > 1) {
				// Insert one extra blank line
				result += '\n';
			}
			result += '\n';
		}
		this.indentLevel--;
		this.currentLineLength = 1 + this.indentString.repeat(this.indentLevel).length; // -1 for \n, +1 for non zero based
		logger.debug('outdent', { result, indentLevel: this.indentLevel }, this.currentLineLength);
		return result;
	}

	private class(token: ClassToken): void {
		const val: string = `.${token.val}`;
		this.currentLineLength += val.length;
		logger.debug('class', { val, length: val.length }, this.currentLineLength);
		switch (this.previousToken?.type) {
			case 'newline':
			case 'outdent':
			case 'indent': {
				this.possibleIdPosition = this.result.length + this.computedIndent.length;
				const result: string = `${this.computedIndent}${val}`;
				this.result += result;
				this.possibleClassPosition = this.result.length;
				break;
			}
			default: {
				const prefix: string = this.result.slice(0, this.possibleClassPosition);
				this.result = [prefix, val, this.result.slice(this.possibleClassPosition)].join('');
				this.possibleClassPosition += val.length;
				break;
			}
		}
		if (this.nextToken?.type === 'text') {
			this.currentLineLength += 1;
			this.result += ' ';
		}
	}

	private eos(token: EosToken): void {
		// Remove all newlines at the end
		while (this.result[this.result.length - 1] === '\n') {
			this.result = this.result.slice(0, -1);
		}
		// Insert one newline
		this.result += '\n';
	}

	private comment(commentToken: CommentToken): string {
		let result: string = this.computedIndent;
		// See if this is a `//- prettier-ignore` comment, which would indicate that the part of the template
		// that follows should be left unformatted. Support the same format as typescript-eslint is using for descriptions:
		// https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/ban-ts-comment.md#allow-with-description
		if (/^ prettier-ignore($|[: ])/.test(commentToken.val)) {
			// Use a separate token processing loop to find the end of the stream of tokens to be ignored by formatting,
			// and uses their `loc` properties to retrieve the original pug code to be used instead.
			let token: Token | null = this.getNextToken();
			if (token) {
				let skipNewline: boolean = token.type === 'newline';
				let ignoreLevel: number = 0;
				while (token) {
					const { type } = token;
					if (type === 'newline' && ignoreLevel === 0) {
						// Skip first newline after `prettier-ignore` comment
						if (skipNewline) {
							skipNewline = false;
						} else {
							break;
						}
					} else if (type === 'indent') {
						ignoreLevel++;
					} else if (type === 'outdent') {
						ignoreLevel--;
						if (ignoreLevel === 0) {
							break;
						}
					}
					token = this.getNextToken();
				}
				if (token) {
					const lines: string[] = this.getUnformattedContentLines(commentToken, token);
					// Trim the last line, since indentation of formatted pug is handled separately.
					const lastLine: string | undefined = lines.pop();
					if (lastLine !== undefined) {
						lines.push(lastLine.trimRight());
					}
					result += lines.join('\n');
				}
			}
		} else {
			if (this.checkTokenType(this.previousToken, ['newline', 'indent', 'outdent'], true)) {
				result += ' ';
			}
			result += '//';
			if (!commentToken.buffer) {
				result += '-';
			}
			result += formatCommentPreserveSpaces(commentToken.val, this.options.commentPreserveSpaces);
			if (this.nextToken?.type === 'start-pipeless-text') {
				this.pipelessComment = true;
			}
		}
		return result;
	}

	private newline(token: NewlineToken): string {
		let result: string = '';
		if (this.previousToken && token.loc.start.line - this.previousToken.loc.end.line > 1) {
			// Insert one extra blank line
			result += '\n';
		}
		result += '\n';
		this.currentLineLength = 1 + this.indentString.repeat(this.indentLevel).length; // -1 for \n, +1 for non zero based
		logger.debug('newline', { result, indentLevel: this.indentLevel }, this.currentLineLength);
		return result;
	}

	private text(token: TextToken): string {
		let result: string = '';
		let val: string = token.val;
		let needsTrailingWhitespace: boolean = false;

		if (this.pipelessText) {
			switch (this.previousToken?.type) {
				case 'newline':
					if (val.trim().length > 0) {
						result += this.indentString.repeat(this.indentLevel + 1);
					}
					break;
				case 'start-pipeless-text':
					result += this.indentString;
					break;
			}

			if (this.pipelessComment) {
				val = formatCommentPreserveSpaces(val, this.options.commentPreserveSpaces, true);
			}
		} else {
			if (this.nextToken && val[val.length - 1] === ' ') {
				switch (this.nextToken.type) {
					case 'interpolated-code':
					case 'start-pug-interpolation':
						needsTrailingWhitespace = true;
						break;
				}
			}

			val = val.replace(/\s\s+/g, ' ');

			switch (this.previousToken?.type) {
				case 'newline':
					result += this.indentString.repeat(this.indentLevel);
					if (/^ .+$/.test(val)) {
						result += '|\n';
						result += this.indentString.repeat(this.indentLevel);
					}
					result += '|';
					if (/.*\S.*/.test(token.val) || this.nextToken?.type === 'start-pug-interpolation') {
						result += ' ';
					}
					break;
				case 'indent':
				case 'outdent':
					result += this.computedIndent;
					if (/^ .+$/.test(val)) {
						result += '|\n';
						result += this.indentString.repeat(this.indentLevel);
					}
					result += '|';
					if (/.*\S.*/.test(token.val)) {
						result += ' ';
					}
					break;
				case 'interpolated-code':
				case 'end-pug-interpolation':
					if (/^ .+$/.test(val)) {
						result += ' ';
					}
					break;
			}

			val = val.trim();
			val = this.formatText(val);
			val = val.replace(/#(\{|\[)/g, '\\#$1');
		}

		if (this.checkTokenType(this.previousToken, ['tag', 'id', 'interpolation', 'call', '&attributes', 'filter'])) {
			val = ` ${val}`;
		}

		result += val;
		if (needsTrailingWhitespace) {
			result += ' ';
		}

		return result;
	}

	private ['interpolated-code'](token: InterpolatedCodeToken): string {
		let result: string = '';
		switch (this.previousToken?.type) {
			case 'tag':
			case 'class':
			case 'id':
			case 'end-attributes':
				result = ' ';
				break;
			case 'start-pug-interpolation':
				result = '| ';
				break;
			case 'indent':
			case 'newline':
			case 'outdent':
				result = this.computedIndent;
				result += this.pipelessText ? this.indentString : '| ';
				break;
		}
		result += token.mustEscape ? '#' : '!';
		result += `{${token.val}}`;
		return result;
	}

	private code(token: CodeToken): string {
		let result: string = this.computedIndent;
		if (!token.mustEscape && token.buffer) {
			result += '!';
		}
		result += token.buffer ? '=' : '-';
		let useSemi: boolean = this.options.pugSemi;
		if (useSemi && (token.mustEscape || token.buffer)) {
			useSemi = false;
		}
		let val: string = token.val;
		try {
			const valBackup: string = val;
			val = format(val, {
				parser: 'babel',
				...this.codeInterpolationOptions,
				semi: useSemi,
				// Always pass endOfLine 'lf' here to be sure that the next `val.slice(0, -1)` call is always working
				endOfLine: 'lf'
			});
			val = val.slice(0, -1);
			if (val[0] === ';') {
				val = val.slice(1);
			}
			if (val.includes('\n')) {
				val = valBackup;
			}
		} catch (error: unknown) {
			logger.warn('[PugPrinter]:', error);
		}
		result += ` ${val}`;
		return result;
	}

	private id(token: IdToken): void {
		const val: string = `#${token.val}`;
		this.currentLineLength += val.length;
		switch (this.previousToken?.type) {
			case 'newline':
			case 'outdent':
			case 'indent': {
				const result: string = `${this.computedIndent}${val}`;
				this.result += result;
				this.possibleClassPosition = this.result.length;
				break;
			}
			default: {
				const prefix: string = this.result.slice(0, this.possibleIdPosition);
				this.possibleClassPosition += val.length;
				this.result = [prefix, val, this.result.slice(this.possibleIdPosition)].join('');
				break;
			}
		}
	}

	private ['start-pipeless-text'](token: StartPipelessTextToken): string {
		this.pipelessText = true;
		return `\n${this.indentString.repeat(this.indentLevel)}`;
	}

	private ['end-pipeless-text'](token: EndPipelessTextToken): string {
		this.pipelessText = false;
		this.pipelessComment = false;
		return '';
	}

	private doctype(token: DoctypeToken): string {
		let result: string = `${this.computedIndent}doctype`;
		if (token.val) {
			result += ` ${token.val}`;
		}
		return result;
	}

	private dot(token: DotToken): string {
		return '.';
	}

	private block(token: BlockToken): string {
		let result: string = `${this.computedIndent}block `;
		if (token.mode !== 'replace') {
			result += `${token.mode} `;
		}
		result += token.val;
		return result;
	}

	private extends(token: ExtendsToken): string {
		const indent: string = this.options.pugSingleFileComponentIndentation ? this.indentString : '';
		return `${indent}extends `;
	}

	private path(token: PathToken): string {
		let result: string = '';
		if (this.checkTokenType(this.previousToken, ['include', 'filter'])) {
			result += ' ';
		}
		result += token.val;
		return result;
	}

	private ['start-pug-interpolation'](token: StartPugInterpolationToken): string {
		let result: string = '';
		if (
			this.tokens[this.currentIndex - 2]?.type === 'newline' &&
			this.previousToken?.type === 'text' &&
			this.previousToken.val.trim().length === 0
		) {
			result += this.indentString.repeat(this.indentLevel + 1);
		}
		this.currentlyInPugInterpolation = true;
		result += '#[';
		return result;
	}

	private ['end-pug-interpolation'](token: EndPugInterpolationToken): string {
		this.currentlyInPugInterpolation = false;
		return ']';
	}

	private interpolation(token: InterpolationToken): string {
		const result: string = `${this.computedIndent}#{${token.val}}`;
		this.currentLineLength += result.length;
		this.possibleIdPosition = this.result.length + result.length;
		this.possibleClassPosition = this.result.length + result.length;
		return result;
	}

	private include(token: IncludeToken): string {
		return `${this.computedIndent}include`;
	}

	private filter(token: FilterToken): string {
		return `${this.computedIndent}:${token.val}`;
	}

	private call(token: CallToken): string {
		let result: string = `${this.computedIndent}+${token.val}`;
		let args: string | null = token.args;
		if (args) {
			args = args.trim();
			args = args.replace(/\s\s+/g, ' ');
			result += `(${args})`;
		}
		this.currentLineLength += result.length;
		this.possibleIdPosition = this.result.length + result.length;
		this.possibleClassPosition = this.result.length + result.length;
		return result;
	}

	private mixin(token: MixinToken): string {
		let result: string = `${this.computedIndent}mixin ${token.val}`;
		let args: string | null = token.args;
		if (args) {
			args = args.trim();
			args = args.replace(/\s\s+/g, ' ');
			result += `(${args})`;
		}
		return result;
	}

	private if(token: IfToken): string {
		let result: string = this.computedIndent;
		const match: RegExpExecArray | null = /^!\((.*)\)$/.exec(token.val);
		logger.debug('[PugPrinter]:', match);
		result += !match ? `if ${token.val}` : `unless ${match[1]}`;
		return result;
	}

	private ['mixin-block'](token: MixinBlockToken): string {
		return `${this.computedIndent}block`;
	}

	private else(token: ElseToken): string {
		return `${this.computedIndent}else`;
	}

	private ['&attributes'](token: AndAttributesToken): string {
		const result: string = `&attributes(${token.val})`;
		this.currentLineLength += result.length;
		return result;
	}

	private ['text-html'](token: TextHtmlToken): string {
		const match: RegExpExecArray | null = /^<(.*?)>(.*)<\/(.*?)>$/.exec(token.val);
		logger.debug('[PugPrinter]:', match);
		if (match) {
			return `${this.computedIndent}${match[1]} ${match[2]}`;
		}
		const entry: [string, DoctypeShortcut] | undefined = Object.entries(DOCTYPE_SHORTCUT_REGISTRY).find(
			([key]) => key === token.val.toLowerCase()
		);
		if (entry) {
			return `${this.computedIndent}${entry[1]}`;
		}
		return `${this.computedIndent}${token.val}`;
	}

	private each(token: EachToken): string {
		let result: string = `${this.computedIndent}each ${token.val}`;
		if (token.key !== null) {
			result += `, ${token.key}`;
		}
		result += ` in ${token.code}`;
		return result;
	}

	private eachOf(token: EachOfToken): string {
		let value: string = token.value.trim();
		value = format(value, {
			parser: 'babel',
			...this.codeInterpolationOptions,
			semi: false
		});
		if (value[0] === ';') {
			value = value.slice(1);
		}
		value = unwrapLineFeeds(value);
		const code: string = token.code.trim();
		return `${this.computedIndent}each ${value} of ${code}`;
	}

	private while(token: WhileToken): string {
		return `${this.computedIndent}while ${token.val}`;
	}

	private case(token: CaseToken): string {
		return `${this.computedIndent}case ${token.val}`;
	}

	private when(token: WhenToken): string {
		return `${this.computedIndent}when ${token.val}`;
	}

	private [':'](token: ColonToken): string {
		this.possibleIdPosition = this.result.length + 2;
		this.possibleClassPosition = this.result.length + 2;
		return ': ';
	}

	private default(token: DefaultToken): string {
		return `${this.computedIndent}default`;
	}

	private ['else-if'](token: ElseIfToken): string {
		return `${this.computedIndent}else if ${token.val}`;
	}

	private blockcode(token: BlockcodeToken): string {
		return `${this.computedIndent}-`;
	}

	private yield(token: YieldToken): string {
		return `${this.computedIndent}yield`;
	}

	private slash(token: SlashToken): string {
		return '/';
	}

	//#endregion
}
