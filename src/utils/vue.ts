export function isVueExpression(name: string): boolean {
	return /^((v-bind|v-on|v-slot)?:|v-model|v-on|@).*/.test(name);
}
