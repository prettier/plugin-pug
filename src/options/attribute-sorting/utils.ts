import { AttributeToken } from 'pug-lexer';

type CompareResult = -1 | 0 | 1;

function compareByIndex(leftIndex: number, rightIndex: number): CompareResult {
	if (leftIndex !== -1 && rightIndex === -1) {
		return -1;
	}
	if (leftIndex === -1 && rightIndex !== -1) {
		return 1;
	}
	const result = leftIndex - rightIndex;
	if (result <= -1) {
		return -1;
	}
	if (result >= 1) {
		return 1;
	}
	return 0;
}

export function compareAttributeToken(
	a: AttributeToken,
	b: AttributeToken,
	sortAttributes: string[],
	moveToEnd: boolean = false
): CompareResult {
	const sortPatterns: RegExp[] = sortAttributes.map((sort) => new RegExp(sort));

	const aName = a.name;
	const bName = b.name;

	let result: CompareResult = 0;

	if (result === 0) {
		let aIndex: number = moveToEnd ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
		let bIndex: number = moveToEnd ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
		let aFound = false;
		let bFound = false;
		for (let index = 0; index < sortPatterns.length; index++) {
			const pattern = sortPatterns[index];
			if (!aFound && pattern.test(aName)) {
				aIndex = index;
				aFound = true;
			}
			if (!bFound && pattern.test(bName)) {
				bIndex = index;
				bFound = true;
			}
			if (aFound && bFound) {
				break;
			}
		}

		result = compareByIndex(aIndex, bIndex);
	}

	return result;
}

export function partialSort<T>(arr: T[], start: number, end: number, compareFn?: (a: T, b: T) => number): T[] {
	const preSorted: T[] = arr.slice(0, start);
	const postSorted: T[] = arr.slice(end);
	const sorted: T[] = arr.slice(start, end).sort(compareFn);
	arr.length = 0;
	arr.push(...preSorted.concat(sorted).concat(postSorted));
	return arr;
}
