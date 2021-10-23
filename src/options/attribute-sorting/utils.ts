import type { AttributeToken } from 'pug-lexer';
import type { PugSortAttributes } from './index';

/** Compare result. */
type CompareResult = -1 | 0 | 1;
/** Compare function. */
type CompareFunction<T> = (a: T, b: T) => CompareResult;

/**
 * Compare two attributes with each other.
 *
 * @param a An attribute token.
 * @param b An attribute token.
 * @param sortAttributes How to sort attributes.
 * @param sortAttributesBeginning Attributes that should sorted to the beginning.
 * @param sortAttributesEnd Attributes that should sorted to the end.
 * @returns The compare result.
 */
export function compareAttributeToken(
	a: AttributeToken,
	b: AttributeToken,
	sortAttributes: PugSortAttributes,
	sortAttributesBeginning: string[],
	sortAttributesEnd: string[]
): CompareResult {
	const sortPatternsBeginning: RegExp[] = sortAttributesBeginning.map((sort) => new RegExp(sort)).reverse();
	const sortPatternsEnd: RegExp[] = sortAttributesEnd.map((sort) => new RegExp(sort));

	const aName: string = a.name;
	const bName: string = b.name;

	if (sortPatternsBeginning.length > 0) {
		const aBeginningIndex: number = sortPatternsBeginning.findIndex((pattern) => pattern.test(aName));
		const bBeginningIndex: number = sortPatternsBeginning.findIndex((pattern) => pattern.test(bName));

		const beginning: number = aBeginningIndex - bBeginningIndex;
		if (beginning > 0) {
			return -1;
		}
		if (beginning < 0) {
			return 1;
		}
	}

	if (sortPatternsEnd.length > 0) {
		const aEndIndex: number = sortPatternsEnd.findIndex((pattern) => pattern.test(aName));
		const bEndIndex: number = sortPatternsEnd.findIndex((pattern) => pattern.test(bName));

		const end: number = aEndIndex - bEndIndex;
		if (end > 0) {
			return 1;
		}
		if (end < 0) {
			return -1;
		}
	}

	switch (sortAttributes) {
		case 'asc': {
			if (aName > bName) {
				return 1;
			}
			if (aName < bName) {
				return -1;
			}
			break;
		}
		case 'desc': {
			if (aName > bName) {
				return -1;
			}
			if (aName < bName) {
				return 1;
			}
			break;
		}
	}

	return 0;
}

/**
 * Sort an array with a given compare function.
 *
 * @param array The array to sort.
 * @param compare A function for comparing the values.
 * @returns The sorted array.
 */
export function stableSort<T>(array: readonly T[], compare: CompareFunction<T>): T[] {
	const entries: Array<[T, number]> = array.map((value, index) => [value, index]);
	entries.sort((a, b) => {
		const order: CompareResult = compare(a[0], b[0]);
		// When order is 0, sort by index to make the sort stable
		return order !== 0 ? order : a[1] - b[1];
	});
	return entries.map(([value]) => value);
}

/**
 * Partially sorts an array.
 *
 * @param arr The array to sort.
 * @param start The start from where to sort.
 * @param end The end to where to sort.
 * @param compareFn A function for comparing the values.
 * @returns The sorted array.
 */
export function partialSort<T>(arr: readonly T[], start: number, end: number, compareFn: CompareFunction<T>): T[] {
	const preSort: T[] = arr.slice(0, start);
	const postSort: T[] = arr.slice(end);
	const attributes: T[] = arr.slice(start, end);
	const sorted: T[] = stableSort(attributes, compareFn);
	return [...preSort, ...sorted, ...postSort];
}
