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
 * Checks for: `v-bind`, `v-slot`, `v-model`, `v-on`, `v-if`, `v-else-if`,
 * `v-for`, `v-text` and `v-html`.
 *
 * Also shorthands like `:*` and `@*` are checked.
 *
 * ---
 *
 * @param name Name of tag attribute
 */
export function isVueExpression(name: string): boolean {
	return /^((v-(bind|slot))?:|v-(model|on|if|for|else-if|text|html)|@).*/.test(name);
}
