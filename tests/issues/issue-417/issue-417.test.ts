import { compareFiles } from 'tests/common';
import { describe,expect,it } from 'vitest';

describe('Issues', () => {
  it('should add two empty piped lines before and after link tag.', () => {
    const { expected, actual } = compareFiles(__dirname);
    expect(actual).toBe(expected);
  });
});
