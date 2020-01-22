export function isAngularExpression(name: string): boolean {
	return (
		name.length >= 3 &&
		// eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
		((name[0] === '(' && name[name.length - 1] === ')') || (name[0] === '[' && name[name.length - 1] === ']'))
	);
}

export function isAngularDirective(name: string): boolean {
	// eslint-disable-next-line @typescript-eslint/prefer-string-starts-ends-with
	return name.length >= 2 && name[0] === '*';
}

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
