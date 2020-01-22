import { format } from 'prettier';
import { AttributeToken, Token } from 'pug-lexer';

export function previousNormalAttributeToken(tokens: Token[], index: number): AttributeToken | undefined {
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

export function printIndent(previousToken: Token, indent: string, indentLevel: number): string {
	switch (previousToken?.type) {
		case 'newline':
		case 'outdent':
			return indent.repeat(indentLevel);
		case 'indent':
			return indent;
	}
	return '';
}

export function formatText(text: string, singleQuote: boolean): string {
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

export function unwrapLineFeeds(value: string): string {
	return value.includes('\n')
		? value
				.split('\n')
				.map((part) => part.trim())
				.join('')
		: value;
}

export function isQuoted(val: string): boolean {
	return /^["'](.*)["']$/.test(val);
}
