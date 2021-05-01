import { isQuoted, isWrappedWith } from './common';

/**
 * Indicates whether the attribute name is an Angular binding.
 *
 * ---
 *
 * Example binding:
 * ```
 * button([disabled]="isUnchanged") Save
 * ```
 *
 * In this case `name` is `[disabled]`.
 *
 * ---
 *
 * @param name Name of tag attribute.
 * @returns `true` if `name` passes the angular binding check, otherwise `false`.
 */
export function isAngularBinding(name: string): boolean {
	return name.length >= 3 && name[0] === '[' && name[name.length - 1] === ']';
}

/**
 * Indicates whether the attribute name is an Angular event.
 *
 * ---
 *
 * Example event:
 * ```
 * button((click)="onClickMe()") Click me!
 * ```
 *
 * In this case `name` is `(click)`.
 *
 * ---
 *
 * @param name Name of tag attribute.
 * @returns `true` if `name` passes the angular action check, otherwise `false`.
 */
export function isAngularAction(name: string): boolean {
	return name.length >= 3 && name[0] === '(' && name[name.length - 1] === ')';
}

/**
 * Indicates whether the attribute name is an Angular directive.
 *
 * ---
 *
 * Example directive:
 * ```
 * li(*ngFor="let customer of customers") {{ customer.name }}
 * ```
 *
 * In this case `name` is `*ngFor`.
 *
 * ---
 *
 * @param name Name of tag attribute.
 * @returns `true` if `name` passes the angular directive check, otherwise `false`.
 */
export function isAngularDirective(name: string): boolean {
	return name.length >= 2 && name[0] === '*';
}

/**
 * Indicates whether the attribute value is an Angular interpolation.
 *
 * ---
 *
 * Example interpolation:
 * ```
 * img(src="{{ itemImageUrl }}")
 * ```
 *
 * In this case `val` is `"{{ itemImageUrl }}"`.
 *
 * ---
 *
 * @param val Value of tag attribute.
 * @returns `true` if `val` passes the angular interpolation check, otherwise `false`.
 */
export function isAngularInterpolation(val: string): boolean {
	return val.length >= 5 && isQuoted(val) && isWrappedWith(val, '{{', '}}', 1) && !val.includes('{{', 3);
}
