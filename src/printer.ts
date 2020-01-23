import { format, ParserOptions, RequiredOptions, util } from 'prettier';
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
import { DOCTYPE_SHORTCUT_REGISTRY } from './doctype-shortcut-registry';
import { createLogger, Logger, LogLevel } from './logger';
import { formatCommentPreserveSpaces, PugParserOptions, resolveAttributeSeparatorOption } from './options';
import { isAngularDirective, isAngularExpression, isAngularInterpolation } from './utils/angular';
import { formatText, isQuoted, previousNormalAttributeToken, unwrapLineFeeds } from './utils/common';
import { isVueExpression } from './utils/vue';

const logger: Logger = createLogger(console);
if (process.env.NODE_ENV === 'test') {
	logger.setLogLevel(LogLevel.DEBUG);
}

const { makeString } = util;

export class PugPrinter {
	private result: string = '';

	private currentIndex: number = 0;

	private readonly indentString: string;
	private indentLevel: number = 0;

	private readonly alwaysUseAttributeSeparator: boolean;
	private readonly codeInterpolationOptions: Pick<RequiredOptions, 'singleQuote' | 'printWidth' | 'endOfLine'>;

	private possibleIdPosition: number = 0;
	private possibleClassPosition: number = 0;

	private previousAttributeRemapped: boolean = false;
	private wrapAttributes: boolean = false;

	private pipelessText: boolean = false;
	private pipelessComment: boolean = false;

	public constructor(
		private readonly tokens: ReadonlyArray<Token>,
		/* eslint-disable @typescript-eslint/indent */
		private readonly options: Pick<
			ParserOptions & PugParserOptions,
			| 'printWidth'
			| 'singleQuote'
			| 'tabWidth'
			| 'useTabs'
			| 'attributeSeparator'
			| 'commentPreserveSpaces'
			| 'semi'
		> /* eslint-enable @typescript-eslint/indent */
	) {
		this.indentString = options.useTabs ? '\t' : ' '.repeat(options.tabWidth);
		this.alwaysUseAttributeSeparator = resolveAttributeSeparatorOption(options.attributeSeparator);
		this.codeInterpolationOptions = {
			singleQuote: !options.singleQuote,
			printWidth: 9000,
			endOfLine: 'lf'
		};
	}

	private get previousToken(): Token | undefined {
		return this.tokens[this.currentIndex - 1];
	}

	private get nextToken(): Token | undefined {
		return this.tokens[this.currentIndex + 1];
	}

	public build(): string {
		if (this.tokens[0]?.type === 'text') {
			this.result += '| ';
		}
		for (let index: number = 0; index < this.tokens.length; index++) {
			this.currentIndex = index;
			const token: Token = this.tokens[index];
			logger.debug('[PugPrinter]:', JSON.stringify(token));
			try {
				// @ts-ignore
				this[token.type](token);
			} catch (error) {
				throw new Error('Unhandled token: ' + JSON.stringify(token));
			}
		}
		return this.result;
	}

	// ##     ## ######## ##       ########  ######## ########   ######
	// ##     ## ##       ##       ##     ## ##       ##     ## ##    ##
	// ##     ## ##       ##       ##     ## ##       ##     ## ##
	// ######### ######   ##       ########  ######   ########   ######
	// ##     ## ##       ##       ##        ##       ##   ##         ##
	// ##     ## ##       ##       ##        ##       ##    ##  ##    ##
	// ##     ## ######## ######## ##        ######## ##     ##  ######

	private computeIndent(): string {
		switch (this.previousToken?.type) {
			case 'newline':
			case 'outdent':
				return this.indentString.repeat(this.indentLevel);
			case 'indent':
				return this.indentString;
		}
		return '';
	}

	private formatVueExpression(val: string): string {
		// Format Vue expression
		val = val.trim();
		val = val.slice(1, -1);
		val = format(val, {
			parser: '__vue_expression' as any,
			...this.codeInterpolationOptions
		});
		val = unwrapLineFeeds(val);
		const quotes: "'" | '"' = this.options.singleQuote ? "'" : '"';
		return `${quotes}${val}${quotes}`;
	}

	private formatAngularExpression(val: string): string {
		val = val.trim();
		val = val.slice(1, -1);
		val = format(val, {
			parser: '__ng_interpolation' as any,
			...this.codeInterpolationOptions
		});
		val = unwrapLineFeeds(val);
		const quotes: "'" | '"' = this.options.singleQuote ? "'" : '"';
		return `${quotes}${val}${quotes}`;
	}

	private formatAngularDirective(val: string): string {
		// Format Angular directive
		val = val.trim();
		val = val.slice(1, -1);
		val = format(val, {
			parser: '__ng_directive' as any,
			...this.codeInterpolationOptions
		});
		const quotes: "'" | '"' = this.options.singleQuote ? "'" : '"';
		return `${quotes}${val}${quotes}`;
	}

	private formatAngularInterpolation(val: string): string {
		// Format Angular interpolation
		val = val.slice(3, -3);
		val = val.trim();
		val = val.replace(/\s\s+/g, ' ');
		// val = format(val, {
		// 	parser: '__ng_interpolation' as any,
		// 	...codeInterpolationOptions
		// });
		const quotes: "'" | '"' = this.options.singleQuote ? "'" : '"';
		return `${quotes}{{ ${val} }}${quotes}`;
	}

	// ########  #######  ##    ## ######## ##    ##    ########  ########   #######   ######  ########  ######   ######   #######  ########   ######
	//    ##    ##     ## ##   ##  ##       ###   ##    ##     ## ##     ## ##     ## ##    ## ##       ##    ## ##    ## ##     ## ##     ## ##    ##
	//    ##    ##     ## ##  ##   ##       ####  ##    ##     ## ##     ## ##     ## ##       ##       ##       ##       ##     ## ##     ## ##
	//    ##    ##     ## #####    ######   ## ## ##    ########  ########  ##     ## ##       ######    ######   ######  ##     ## ########   ######
	//    ##    ##     ## ##  ##   ##       ##  ####    ##        ##   ##   ##     ## ##       ##             ##       ## ##     ## ##   ##         ##
	//    ##    ##     ## ##   ##  ##       ##   ###    ##        ##    ##  ##     ## ##    ## ##       ##    ## ##    ## ##     ## ##    ##  ##    ##
	//    ##     #######  ##    ## ######## ##    ##    ##        ##     ##  #######   ######  ########  ######   ######   #######  ##     ##  ######

	private tag(token: TagToken): void {
		this.result += this.computeIndent();
		if (
			!(
				token.val === 'div' &&
				this.nextToken &&
				(this.nextToken.type === 'class' || this.nextToken.type === 'id')
			)
		) {
			this.result += token.val;
		}
		this.possibleIdPosition = this.result.length;
		this.possibleClassPosition = this.result.length;
	}

	private ['start-attributes'](token: StartAttributesToken): void {
		if (this.nextToken?.type === 'attribute') {
			this.previousAttributeRemapped = false;
			this.possibleClassPosition = this.result.length;
			this.result += '(';
			const start: number = this.result.lastIndexOf('\n') + 1;
			let lineLength: number = this.result.substring(start).length;
			logger.debug('[PugPrinter]:', lineLength, this.options.printWidth);
			let tempToken: AttributeToken | EndAttributesToken = this.nextToken;
			let tempIndex: number = this.currentIndex + 1;
			while (tempToken.type === 'attribute') {
				lineLength += tempToken.name.length + 1 + tempToken.val.toString().length;
				logger.debug('[PugPrinter]:', lineLength, this.options.printWidth);
				tempToken = this.tokens[++tempIndex] as AttributeToken | EndAttributesToken;
			}
			if (lineLength > this.options.printWidth) {
				this.wrapAttributes = true;
			}
		}
	}

	private attribute(token: AttributeToken): void {
		if (typeof token.val === 'string') {
			if (isQuoted(token.val)) {
				if (token.name === 'class') {
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
						const position: number = this.possibleClassPosition;
						this.result = [
							this.result.slice(0, position),
							`.${className}`,
							this.result.slice(position)
						].join('');
						this.possibleClassPosition += 1 + className.length;
						this.result = this.result.replace(/div\./, '.');
					}
					if (specialClasses.length > 0) {
						token.val = makeString(specialClasses.join(' '), this.options.singleQuote ? "'" : '"', false);
						this.previousAttributeRemapped = false;
					} else {
						this.previousAttributeRemapped = true;
						return;
					}
				} else if (token.name === 'id') {
					// Handle id attribute
					let val = token.val;
					val = val.substring(1, val.length - 1);
					val = val.trim();
					const validIdNameRegex: RegExp = /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/;
					if (!validIdNameRegex.test(val)) {
						val = makeString(val, this.options.singleQuote ? "'" : '"', false);
						this.result += `id=${val}`;
						return;
					}
					// Write css-id in front of css-classes
					const position: number = this.possibleIdPosition;
					this.result = [this.result.slice(0, position), `#${val}`, this.result.slice(position)].join('');
					this.possibleClassPosition += 1 + val.length;
					this.result = this.result.replace(/div#/, '#');
					if (
						this.previousToken &&
						this.previousToken.type === 'attribute' &&
						this.previousToken.name !== 'class'
					) {
						this.previousAttributeRemapped = true;
					}
					return;
				}
			}
		}

		const hasNormalPreviousToken: AttributeToken | undefined = previousNormalAttributeToken(
			this.tokens,
			this.currentIndex
		);
		if (this.previousToken?.type === 'attribute' && (!this.previousAttributeRemapped || hasNormalPreviousToken)) {
			if (this.alwaysUseAttributeSeparator || /^(\(|\[|:).*/.test(token.name)) {
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
			let val = token.val;
			if (isVueExpression(token.name)) {
				val = this.formatVueExpression(val);
			} else if (isAngularExpression(token.name)) {
				val = this.formatAngularExpression(val);
			} else if (isAngularDirective(token.name)) {
				val = this.formatAngularDirective(val);
			} else if (isAngularInterpolation(val)) {
				val = this.formatAngularInterpolation(val);
			} else if (isQuoted(val)) {
				val = makeString(val.slice(1, -1), this.options.singleQuote ? "'" : '"', false);
			} else if (val === 'true') {
				// The value is exactly true and is not quoted
				return;
			} else if (token.mustEscape) {
				val = format(val, {
					parser: '__js_expression' as any,
					...this.codeInterpolationOptions
				});
			} else {
				// The value is not quoted and may be js-code
				val = val.trim();
				val = val.replace(/\s\s+/g, ' ');
				if (val.startsWith('{ ')) {
					val = `{${val.substring(2, val.length)}`;
				}
			}

			if (token.mustEscape === false) {
				this.result += '!';
			}

			this.result += `=${val}`;
		}
	}

	private ['end-attributes'](token: EndAttributesToken): void {
		if (this.wrapAttributes) {
			this.result += '\n';
			this.result += this.indentString.repeat(this.indentLevel);
		}
		this.wrapAttributes = false;
		if (this.result.endsWith('(')) {
			// There were no attributes
			this.result = this.result.substring(0, this.result.length - 1);
		} else if (this.previousToken?.type === 'attribute') {
			this.result += ')';
		}
		if (this.nextToken?.type === 'text' || this.nextToken?.type === 'path') {
			this.result += ' ';
		}
	}

	private indent(token: IndentToken): void {
		this.result += '\n';
		this.result += this.indentString.repeat(this.indentLevel);
		this.indentLevel++;
	}

	private outdent(token: OutdentToken): void {
		if (this.previousToken && this.previousToken.type !== 'outdent') {
			if (token.loc.start.line - this.previousToken.loc.end.line > 1) {
				// Insert one extra blank line
				this.result += '\n';
			}
			this.result += '\n';
		}
		this.indentLevel--;
	}

	private class(token: ClassToken): void {
		switch (this.previousToken?.type) {
			case 'newline':
			case 'outdent':
			case 'indent': {
				const prefix = this.result.slice(0, this.result.length);
				const _indent = this.computeIndent();
				const val = `.${token.val}`;
				this.result = [prefix, _indent, val, this.result.slice(this.result.length)].join('');
				this.possibleClassPosition = prefix.length + _indent.length + val.length;
				break;
			}
			default: {
				const prefix = this.result.slice(0, this.possibleClassPosition);
				const val = `.${token.val}`;
				this.result = [prefix, val, this.result.slice(this.possibleClassPosition)].join('');
				this.possibleClassPosition = prefix.length + val.length;
				break;
			}
		}
		if (this.nextToken?.type === 'text') {
			this.result += ' ';
		}
	}

	private eos(token: EosToken): void {
		// Remove all newlines at the end
		while (this.result.endsWith('\n')) {
			this.result = this.result.substring(0, this.result.length - 1);
		}
		// Insert one newline
		this.result += '\n';
	}

	private comment(token: CommentToken): void {
		this.result += this.computeIndent();
		if (this.previousToken && !['newline', 'indent', 'outdent'].includes(this.previousToken.type)) {
			this.result += ' ';
		}
		this.result += '//';
		if (!token.buffer) {
			this.result += '-';
		}
		this.result += formatCommentPreserveSpaces(token.val, this.options.commentPreserveSpaces);
		if (this.nextToken?.type === 'start-pipeless-text') {
			this.pipelessComment = true;
		}
	}

	private newline(token: NewlineToken): void {
		if (this.previousToken && token.loc.start.line - this.previousToken.loc.end.line > 1) {
			// Insert one extra blank line
			this.result += '\n';
		}
		this.result += '\n';
	}

	private text(token: TextToken): void {
		let val = token.val;
		let needsTrailingWhitespace: boolean = false;

		if (this.pipelessText) {
			switch (this.previousToken?.type) {
				case 'newline':
					this.result += this.indentString.repeat(this.indentLevel + 1);
					break;
				case 'start-pipeless-text':
					this.result += this.indentString;
					break;
			}

			if (this.pipelessComment) {
				val = formatCommentPreserveSpaces(val, this.options.commentPreserveSpaces, true);
			}
		} else {
			if (this.nextToken && val.endsWith(' ')) {
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
					this.result += this.indentString.repeat(this.indentLevel);
					if (/^ .+$/.test(val)) {
						this.result += '|\n';
						this.result += this.indentString.repeat(this.indentLevel);
					}
					this.result += '|';
					if (/.*\S.*/.test(token.val) || this.nextToken?.type === 'start-pug-interpolation') {
						this.result += ' ';
					}
					break;
				case 'indent':
					this.result += this.indentString;
					this.result += '|';
					if (/.*\S.*/.test(token.val)) {
						this.result += ' ';
					}
					break;
				case 'interpolated-code':
				case 'end-pug-interpolation':
					if (/^ .+$/.test(val)) {
						this.result += ' ';
					}
					break;
			}

			val = val.trim();
			val = formatText(val, this.options.singleQuote);

			val = val.replace(/#(\{|\[)/g, '\\#$1');
		}

		if (
			this.previousToken &&
			['tag', 'id', 'interpolation', 'call', '&attributes', 'filter'].includes(this.previousToken.type)
		) {
			val = ` ${val}`;
		}

		this.result += val;
		if (needsTrailingWhitespace) {
			this.result += ' ';
		}
	}

	private ['interpolated-code'](token: InterpolatedCodeToken): void {
		switch (this.previousToken?.type) {
			case 'tag':
			case 'class':
			case 'id':
			case 'end-attributes':
				this.result += ' ';
				break;
			case 'start-pug-interpolation':
				this.result += '| ';
				break;
			case 'indent':
			case 'newline':
			case 'outdent':
				this.result += this.computeIndent();
				this.result += '| ';
				break;
		}
		this.result += token.mustEscape ? '#' : '!';
		this.result += `{${token.val}}`;
	}

	private code(token: CodeToken): void {
		this.result += this.computeIndent();
		if (!token.mustEscape && token.buffer) {
			this.result += '!';
		}
		this.result += token.buffer ? '=' : '-';
		let useSemi = this.options.semi;
		if (useSemi && (token.mustEscape || token.buffer)) {
			useSemi = false;
		}
		let val = token.val;
		try {
			const valBackup = val;
			val = format(val, {
				parser: 'babel',
				...this.codeInterpolationOptions,
				semi: useSemi,
				endOfLine: 'lf'
			});
			val = val.slice(0, -1);
			if (val.includes('\n')) {
				val = valBackup;
			}
		} catch (error) {
			logger.warn('[PugPrinter]:', error);
		}
		this.result += ` ${val}`;
	}

	private id(token: IdToken): void {
		switch (this.previousToken?.type) {
			case 'newline':
			case 'outdent':
			case 'indent': {
				const prefix = this.result.slice(0, this.result.length);
				const _indent = this.computeIndent();
				const val = `#${token.val}`;
				this.result = [prefix, _indent, val, this.result.slice(this.result.length)].join('');
				this.possibleClassPosition = prefix.length + _indent.length + val.length;
				break;
			}
			default: {
				const prefix = this.result.slice(0, this.possibleIdPosition);
				const val = `#${token.val}`;
				this.result = [prefix, val, this.result.slice(this.possibleIdPosition)].join('');
				this.possibleClassPosition = prefix.length + val.length;
				break;
			}
		}
	}

	private ['start-pipeless-text'](token: StartPipelessTextToken): void {
		this.pipelessText = true;
		this.result += '\n';
		this.result += this.indentString.repeat(this.indentLevel);
	}

	private ['end-pipeless-text'](token: EndPipelessTextToken): void {
		this.pipelessText = false;
		this.pipelessComment = false;
	}

	private doctype(token: DoctypeToken): void {
		this.result += 'doctype';
		if (token.val) {
			this.result += ` ${token.val}`;
		}
	}

	private dot(token: DotToken): void {
		this.result += '.';
	}

	private block(token: BlockToken): void {
		this.result += this.computeIndent();
		this.result += 'block ';
		if (token.mode !== 'replace') {
			this.result += token.mode;
			this.result += ' ';
		}
		this.result += token.val;
	}

	private extends(token: ExtendsToken): void {
		this.result += 'extends ';
	}

	private path(token: PathToken): void {
		if (this.previousToken && ['include', 'filter'].includes(this.previousToken.type)) {
			this.result += ' ';
		}
		this.result += token.val;
	}

	private ['start-pug-interpolation'](token: StartPugInterpolationToken): void {
		this.result += '#[';
	}

	private ['end-pug-interpolation'](token: EndPugInterpolationToken): void {
		this.result += ']';
	}

	private interpolation(token: InterpolationToken): void {
		this.result += this.computeIndent();
		this.result += `#{${token.val}}`;
		this.possibleIdPosition = this.result.length;
		this.possibleClassPosition = this.result.length;
	}

	private include(token: IncludeToken): void {
		this.result += this.computeIndent();
		this.result += 'include';
	}

	private filter(token: FilterToken): void {
		this.result += this.computeIndent();
		this.result += `:${token.val}`;
	}

	private call(token: CallToken): void {
		this.result += this.computeIndent();
		this.result += `+${token.val}`;
		let args: string | null = token.args;
		if (args) {
			args = args.trim();
			args = args.replace(/\s\s+/g, ' ');
			this.result += `(${args})`;
		}
		this.possibleIdPosition = this.result.length;
		this.possibleClassPosition = this.result.length;
	}

	private mixin(token: MixinToken): void {
		this.result += this.computeIndent();
		this.result += `mixin ${token.val}`;
		let args: string | null = token.args;
		if (args) {
			args = args.trim();
			args = args.replace(/\s\s+/g, ' ');
			this.result += `(${args})`;
		}
	}

	private if(token: IfToken): void {
		this.result += this.computeIndent();
		const match = /^!\((.*)\)$/.exec(token.val);
		logger.debug('[PugPrinter]:', match);
		this.result += !match ? `if ${token.val}` : `unless ${match[1]}`;
	}

	private ['mixin-block'](token: MixinBlockToken): void {
		this.result += this.computeIndent();
		this.result += 'block';
	}

	private else(token: ElseToken): void {
		this.result += this.computeIndent();
		this.result += 'else';
	}

	private ['&attributes'](token: AndAttributesToken): void {
		this.result += `&attributes(${token.val})`;
	}

	private ['text-html'](token: TextHtmlToken): void {
		this.result += this.computeIndent();
		const match: RegExpExecArray | null = /^<(.*?)>(.*)<\/(.*?)>$/.exec(token.val);
		logger.debug('[PugPrinter]:', match);
		if (match) {
			this.result += `${match[1]} ${match[2]}`;
			return;
		}
		const entry = Object.entries(DOCTYPE_SHORTCUT_REGISTRY).find(([key]) => key === token.val.toLowerCase());
		if (entry) {
			this.result += entry[1];
			return;
		}
		this.result += token.val;
	}

	private each(token: EachToken): void {
		this.result += this.computeIndent();
		this.result += `each ${token.val}`;
		if (token.key !== null) {
			this.result += `, ${token.key}`;
		}
		this.result += ` in ${token.code}`;
	}

	private while(token: WhileToken): void {
		this.result += this.computeIndent();
		this.result += `while ${token.val}`;
	}

	private case(token: CaseToken): void {
		this.result += this.computeIndent();
		this.result += `case ${token.val}`;
	}

	private when(token: WhenToken): void {
		this.result += this.computeIndent();
		this.result += `when ${token.val}`;
	}

	private [':'](token: ColonToken): void {
		this.result += ': ';
		this.possibleIdPosition = this.result.length;
		this.possibleClassPosition = this.result.length;
	}

	private default(token: DefaultToken): void {
		this.result += this.computeIndent();
		this.result += 'default';
	}

	private ['else-if'](token: ElseIfToken): void {
		this.result += this.computeIndent();
		this.result += `else if ${token.val}`;
	}

	private blockcode(token: BlockcodeToken): void {
		this.result += this.computeIndent();
		this.result += '-';
	}

	private yield(token: YieldToken): void {
		this.result += this.computeIndent();
		this.result += 'yield';
	}

	private slash(token: SlashToken): void {
		this.result += '/';
	}
}
