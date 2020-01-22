export function isVueExpression(name: string): boolean {
	return /^((v-bind|v-slot)?:|v-model|v-on|@).*/.test(name);
}
