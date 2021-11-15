/**
 * Indicates whether the attribute name is a Vue event binding.
 *
 * ---
 *
 * Example event binding:
 * ```
 * v-btn(@click="doSomething") Do Something
 * ```
 *
 * In this case `name` is `@click`.
 *
 * ---
 *
 * Checks for: `v-on:`.
 *
 * Also shorthands like `@*` are checked.
 *
 * ---
 *
 * @param name Name of tag attribute.
 * @returns `true` if `name` passes the vue event binding check, otherwise `false`.
 */
export function isVueEventBinding(name: string): boolean {
	return /^(v-on:|@).*/.test(name);
}

/**
 * Indicates whether the attribute name is a Vue expression.
 *
 * ---
 *
 * Example expression:
 * ```
 * v-text-field(v-model="value", :label="label") Do Something
 * ```
 *
 * In this case `name` is `v-model` and `:label`.
 *
 * ---
 *
 * Checks for: `v-bind`, `v-slot`, `v-model`, `v-if`, `v-else-if`, `v-for`,
 * `v-text`, `v-html` and `v-t`.
 *
 * Also shorthands like `:*` are checked.
 *
 * ---
 *
 * @param name Name of tag attribute.
 * @returns `true` if `name` passes the vue expression check, otherwise `false`.
 */
export function isVueExpression(name: string): boolean {
	return /^((v-(bind|slot))?:|v-(model|slot|if|for|else-if|text|html|t)|#).*/.test(name);
}

/**
 * Indicates whether the attribute name is a Vue v-for and includes a `of`.
 *
 * ---
 *
 * Example expression:
 * ```
 * tr(v-for="item of items", :key="item.id")
 * ```
 *
 * In this case `name` is `v-for` and it includes a `of`.
 *
 * ---
 *
 * Checks for: `v-for` and `of`.
 *
 * ---
 *
 * @param name Name of tag attribute.
 * @param val Value of tag attribute.
 * @returns `true` if `name` and `val` passes the vue `v-for` with `of` check, otherwise `false`.
 */
export function isVueVForWithOf(name: string, val: string): boolean {
	return 'v-for' === name && val.includes('of');
}

/**
 * Indicates whether the attribute name is a Vue v-bind.
 *
 * ---
 *
 * Example expression:
 * ```
 * v-btn(v-bind="$attrs")
 * ```
 *
 * In this case `name` is `v-bind`.
 *
 * ---
 *
 * Checks for: `v-bind`.
 *
 * ---
 *
 * @param name Name of tag attribute.
 * @returns `true` if `name` passes the vue `v-bind` check, otherwise `false`.
 */
export function isVueVBindExpression(name: string): boolean {
	return 'v-bind' === name;
}

/**
 * Indicates whether the attribute name is a Vue v-on.
 *
 * ---
 *
 * Example expression:
 * ```
 * v-btn(v-on="on")
 * ```
 *
 * In this case `name` is `v-on`.
 *
 * ---
 *
 * Checks for: `v-on`.
 *
 * ---
 *
 * @param name Name of tag attribute.
 * @returns `true` if `name` passes the vue `v-on` check, otherwise `false`.
 */
export function isVueVOnExpression(name: string): boolean {
	return 'v-on' === name;
}
