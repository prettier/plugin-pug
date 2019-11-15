export interface Loc {
	start: { line: number; column: number };
	end: { line: number; column: number };
}

export type LexTokenType =
	| 'tag'
	| 'start-attributes'
	| 'attribute'
	| 'end-attributes'
	| 'indent'
	| 'class'
	| 'outdent'
	| 'eos'
	| 'comment'
	| 'newline'
	| 'text'
	| 'interpolated-code'
	| 'code'
	| 'id'
	| 'start-pipeless-text'
	| 'end-pipeless-text'
	| 'doctype'
	| 'dot'
	| 'block'
	| 'extends'
	| 'path'
	| 'start-pug-interpolation'
	| 'end-pug-interpolation'
	| 'interpolation'
	| 'include'
	| 'filter'
	| 'call'
	| 'mixin'
	| 'if'
	| 'mixin-block'
	| 'else'
	| '&attributes'
	| 'text-html'
	| 'each'
	| 'while'
	| 'case'
	| 'when'
	| ':'
	| 'default'
	| 'else-if'
	| 'blockcode';

export interface LexToken<Type extends LexTokenType> {
	type: Type;
	loc: Loc;
}

export interface TagToken extends LexToken<'tag'> {
	val: string;
}

export type StartAttributesToken = LexToken<'start-attributes'>;

export interface AttributeToken extends LexToken<'attribute'> {
	name: string;
	val: string | boolean;
	mustEscape: boolean;
}

export type EndAttributesToken = LexToken<'end-attributes'>;

export interface IndentToken extends LexToken<'indent'> {
	val: number;
}

export interface ClassToken extends LexToken<'class'> {
	val: string;
}

export type OutdentToken = LexToken<'outdent'>;

export type EosToken = LexToken<'eos'>;

export interface CommentToken extends LexToken<'comment'> {
	val: string;
	buffer: boolean;
}

export type NewlineToken = LexToken<'newline'>;

export interface TextToken extends LexToken<'text'> {
	val: string;
}

export interface InterpolatedCodeToken extends LexToken<'interpolated-code'> {
	mustEscape: boolean;
	buffer: boolean;
	val: string;
}

export interface CodeToken extends LexToken<'code'> {
	val: string;
	mustEscape: boolean;
	buffer: boolean;
}

export interface IdToken extends LexToken<'id'> {
	val: string;
}

export type StartPipelessTextToken = LexToken<'start-pipeless-text'>;

export type EndPipelessTextToken = LexToken<'end-pipeless-text'>;

export interface DoctypeToken extends LexToken<'doctype'> {
	val: string;
}

export type DotToken = LexToken<'dot'>;

export interface BlockToken extends LexToken<'block'> {
	val: string;
	mode: 'replace' | 'prepend' | 'append';
}

export type ExtendsToken = LexToken<'extends'>;

export interface PathToken extends LexToken<'path'> {
	val: string;
}

export type StartPugInterpolationToken = LexToken<'start-pug-interpolation'>;

export type EndPugInterpolationToken = LexToken<'end-pug-interpolation'>;

export interface InterpolationToken extends LexToken<'interpolation'> {
	val: string;
}

export type IncludeToken = LexToken<'include'>;

export interface FilterToken extends LexToken<'filter'> {
	val: string;
}

export interface CallToken extends LexToken<'call'> {
	val: string;
	args: string;
}

export interface MixinToken extends LexToken<'mixin'> {
	val: string;
	args: string | null;
}

export interface IfToken extends LexToken<'if'> {
	val: string;
}

export type MixinBlockToken = LexToken<'mixin-block'>;

export interface ElseToken extends LexToken<'else'> {
	val: string;
}

export interface AndAttributesToken extends LexToken<'&attributes'> {
	val: string;
}

export interface TextHtmlToken extends LexToken<'text-html'> {
	val: string;
}

export interface EachToken extends LexToken<'each'> {
	val: string;
	key: null;
	code: string;
}

export interface WhileToken extends LexToken<'while'> {
	val: string;
}

export interface CaseToken extends LexToken<'case'> {
	val: string;
}

export interface WhenToken extends LexToken<'when'> {
	val: string;
}

export type ColonToken = LexToken<':'>;

export type DefaultToken = LexToken<'default'>;

export interface ElseIfToken extends LexToken<'else-if'> {
	val: string;
}

export type BlockcodeToken = LexToken<'blockcode'>;

export type Token =
	| TagToken
	| StartAttributesToken
	| AttributeToken
	| EndAttributesToken
	| IndentToken
	| ClassToken
	| OutdentToken
	| EosToken
	| CommentToken
	| NewlineToken
	| TextToken
	| InterpolatedCodeToken
	| CodeToken
	| IdToken
	| StartPipelessTextToken
	| EndPipelessTextToken
	| DoctypeToken
	| DotToken
	| BlockToken
	| ExtendsToken
	| PathToken
	| StartPugInterpolationToken
	| EndPugInterpolationToken
	| InterpolationToken
	| IncludeToken
	| FilterToken
	| CallToken
	| MixinToken
	| IfToken
	| MixinBlockToken
	| ElseToken
	| AndAttributesToken
	| TextHtmlToken
	| EachToken
	| WhileToken
	| CaseToken
	| WhenToken
	| ColonToken
	| DefaultToken
	| ElseIfToken
	| BlockcodeToken;
