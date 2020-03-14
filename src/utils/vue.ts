/**
 * Indicates whether the attribute name is a Vue expression
 *
 * ---
 *
 * Example expression:
 * ```
 * v-btn(@click="doSomething") Do Something
 * ```
 *
 * In this case `name` is `@click`
 *
 * ---
 *
 * Checks for: `v-bind`, `v-slot`, `v-model` and `v-on`.
 *
 * Also shorthands like `:*` and `@*` are checked.
 *
 * ---
 *
 * @param name Name of tag attribute
 */
export function isVueExpression(name: string): boolean {
	return /^((v-bind|v-slot)?:|v-model|v-on|@).*/.test(name);
}
