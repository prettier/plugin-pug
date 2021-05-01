import { isQuoted, isWrappedWith } from './common';

/**
 * Indicates whether the attribute value is a Svelte interpolation.
 *
 * ---
 *
 * Example interpolation:
 * ```
 * a(href="{ cat.id }")
 * ```
 *
 * In this case `val` is `"{ cat.id }"`.
 *
 * ---
 *
 * @param val Value of tag attribute.
 * @returns `true` if `val` passes the svelte interpolation check, otherwise `false`.
 */
export function isSvelteInterpolation(val: string): boolean {
	return val.length >= 3 && isQuoted(val) && isWrappedWith(val, '{', '}', 1) && !val.includes('{', 2);
}
