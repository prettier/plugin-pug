import { AttributeToken } from 'pug-lexer';
import { SortAttributes } from './index';

type CompareResult = -1 | 0 | 1;
type CompareFunction = (a: any, b: any) => CompareResult;

export function compareAttributeToken(
	a: AttributeToken,
	b: AttributeToken,
	sortAttributes: SortAttributes,
	sortAttributesBeginning: string[],
	sortAttributesEnd: string[]
): CompareResult {
	const sortPatternsBeginning: RegExp[] = sortAttributesBeginning.map((sort) => new RegExp(sort)).reverse();
	const sortPatternsEnd: RegExp[] = sortAttributesEnd.map((sort) => new RegExp(sort));

	const aName = a.name;
	const bName = b.name;

	const aBeginningIndex: number = sortPatternsBeginning.findIndex((pattern) => pattern.test(aName));
	const bBeginningIndex: number = sortPatternsBeginning.findIndex((pattern) => pattern.test(bName));

	const beginning = aBeginningIndex - bBeginningIndex;
	if (beginning > 0) {
		return -1;
	}
	if (beginning < 0) {
		return 1;
	}

	const aEndIndex: number = sortPatternsEnd.findIndex((pattern) => pattern.test(aName));
	const bEndIndex: number = sortPatternsEnd.findIndex((pattern) => pattern.test(bName));

	const end = aEndIndex - bEndIndex;
	if (end > 0) {
		return 1;
	}
	if (end < 0) {
		return -1;
	}

	if (sortAttributes === 'asc') {
		if (aName > bName) {
			return 1;
		}
		if (aName < bName) {
			return -1;
		}
	} else if (sortAttributes === 'desc') {
		if (aName > bName) {
			return -1;
		}
		if (aName < bName) {
			return 1;
		}
	}

	return 0;
}

export function stableSort<T>(array: T[], compare: CompareFunction): any[] {
	const entries = array.map((value, index): [T, number] => [value, index]);
	entries.sort((a, b) => {
		const order = compare(a[0], b[0]);
		// When order is 0, sort by index to make the sort stable:
		return order != 0 ? order : a[1] - b[1];
	});
	return entries.map(([value]) => value);
}

export function partialSort<T>(arr: T[], start: number, end: number, compareFn: CompareFunction): T[] {
	const preSort: T[] = arr.slice(0, start);
	const postSort: T[] = arr.slice(end);
	const attributes: T[] = arr.slice(start, end);
	const sorted: T[] = stableSort(attributes, compareFn);
	return [...preSort, ...sorted, ...postSort];
}
