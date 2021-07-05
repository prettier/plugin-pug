import type { BuiltInParserName } from 'prettier';
import type { AttributeToken } from 'pug-lexer';

// NOTE: XML would be useful, but it's not a default parser.
//       YAML is not official, but it costs nothing to support it right now.
const jsonSuffixRe: RegExp = /\+(json|yaml)$/i;
const wrappingQuotesRe: RegExp = /(^("|'|`))|(("|'|`)$)/g;

// Matches IANA media types to the required parser for them
// https://iana.org/assignments/media-types/media-types.xhtml
// Note: Don't need to put any suffixed types (+json, +xml) in here as it
//       will be handled separately
// Why using a Map: https://github.com/prettier/plugin-pug/pull/248#discussion_r663854854
const scriptTypeToParserMap: Map<string, BuiltInParserName> = new Map([
	['application/ecmascript', 'babel'],
	['application/javascript', 'babel'],
	['application/json', 'json'],
	['text/ecmascript', 'babel'],
	['text/javascript', 'babel'],
	['text/markdown', 'markdown'],
	['text/typescript', 'typescript'],
	['module', 'babel']
]);

/**
 * Decides which parser to format script contents with.
 *
 * @param typeAttrToken Type token of the.
 * @returns Parser name to parse contents with.
 */
export function getScriptParserName(typeAttrToken?: AttributeToken): BuiltInParserName | undefined {
	// Omission means Javascript
	if (!typeAttrToken) {
		return 'babel';
	}

	const typeRaw: string | boolean = typeAttrToken.val;
	// If it's not a string, best not do anything
	if (typeof typeRaw !== 'string') {
		return;
	}

	const type: string = typeRaw.replace(wrappingQuotesRe, '');

	// Empty type is equivalent to omission
	if (!type) {
		return 'babel';
	}

	const suffixExec: RegExpExecArray | null = jsonSuffixRe.exec(type);
	if (suffixExec) {
		return suffixExec[1] as unknown as 'json' | 'yaml';
	}

	return scriptTypeToParserMap.get(type);
}
