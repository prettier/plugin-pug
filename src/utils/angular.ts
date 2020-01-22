/**
 * Indicates whether the attribute name is an Angular binding or event
 *
 * ---
 *
 * Example binding:
 * ```
 * button([disabled]="isUnchanged") Save
 * ```
 *
 * In this case `name` is `[disabled]`
 *
 * ---
 *
 * Example event:
 * ```
 * button((click)="onClickMe()") Click me!
 * ```
 *
 * In this case `name` is `(click)`
 *
 * ---
 *
 * @param name Name of tag attribute
 */
export function isAngularExpression(name: string): boolean {
	return (
		name.length >= 3 &&
		// eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
		((name[0] === '(' && name[name.length - 1] === ')') || (name[0] === '[' && name[name.length - 1] === ']'))
	);
}

/**
 * Indicates whether the attribute name is an Angular directive
 *
 * ---
 *
 * Example directive:
 * ```
 * li(*ngFor="let customer of customers") {{ customer.name }}
 * ```
 *
 * In this case `name` is `*ngFor`
 *
 * ---
 *
 * @param name Name of tag attribute
 */
export function isAngularDirective(name: string): boolean {
	// eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
	return name.length >= 2 && name[0] === '*';
}

/**
 * Indicates whether the attribute value is an Angular interpolation
 *
 * ---
 *
 * Example interpolation:
 * ```
 * img(src="{{ itemImageUrl }}")
 * ```
 *
 * In this case `val` is `"{{ itemImageUrl }}"`
 *
 * ---
 *
 * @param name Name of tag attribute
 */
export function isAngularInterpolation(val: string): boolean {
	return (
		val.length >= 5 &&
		// eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
		((val[0] === '"' && val[val.length - 1] === '"') || (val[0] === "'" && val[val.length - 1] === "'")) &&
		val[1] === '{' &&
		val[2] === '{' &&
		val[val.length - 2] === '}' &&
		val[val.length - 3] === '}'
	);
}
