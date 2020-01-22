export function isAngularExpression(name: string): boolean {
	return /^(\(.*\)|\[.*\])$/.test(name);
}

export function isAngularDirective(name: string): boolean {
	return /^\*.*$/.test(name);
}

export function isAngularInterpolation(val: string): boolean {
	return /^(["']{{)(.*)(}}["'])$/.test(val);
}
