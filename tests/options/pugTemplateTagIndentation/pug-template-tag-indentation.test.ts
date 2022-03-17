import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugSingleFileComponentIndentation', () => {
    it('should indent', () => {
      const { actual, expected } = compareFiles(__dirname, {
        source: 'not-indented.vue',
        target: 'indented.vue',
        formatOptions: {
          parser: 'vue',

          pugSingleFileComponentIndentation: true,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not indent', () => {
      const { actual, expected } = compareFiles(__dirname, {
        source: 'indented.vue',
        target: 'not-indented.vue',
        formatOptions: {
          parser: 'vue',

          pugSingleFileComponentIndentation: false,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not indent by default', () => {
      const { actual, expected } = compareFiles(__dirname, {
        source: 'indented.vue',
        target: 'not-indented.vue',
        formatOptions: {
          parser: 'vue',
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not affect markdown', () => {
      const { actual, expected } = compareFiles(__dirname, {
        source: 'not-indented.md',
        target: 'not-indented.md',
        formatOptions: {
          parser: 'markdown',

          pugSingleFileComponentIndentation: true,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not change two-div-not-indented-flat', () => {
      const { actual, expected } = compareFiles(__dirname, {
        source: 'two-div-not-indented-flat.vue',
        target: 'two-div-not-indented-flat.vue',
        formatOptions: {
          parser: 'vue',
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not change two-div-not-indented-tree', () => {
      const { actual, expected } = compareFiles(__dirname, {
        source: 'two-div-not-indented-tree.vue',
        target: 'two-div-not-indented-tree.vue',
        formatOptions: {
          parser: 'vue',
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not change two-div-indented-flat', () => {
      const { actual, expected } = compareFiles(__dirname, {
        source: 'two-div-indented-flat.vue',
        target: 'two-div-indented-flat.vue',
        formatOptions: {
          parser: 'vue',

          pugSingleFileComponentIndentation: true,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not change two-div-indented-tree', () => {
      const { actual, expected } = compareFiles(__dirname, {
        source: 'two-div-indented-tree.vue',
        target: 'two-div-indented-tree.vue',
        formatOptions: {
          parser: 'vue',

          pugSingleFileComponentIndentation: true,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should indent two-div-not-indented-flat', () => {
      const { actual, expected } = compareFiles(__dirname, {
        source: 'two-div-not-indented-flat.vue',
        target: 'two-div-indented-flat.vue',
        formatOptions: {
          parser: 'vue',

          pugSingleFileComponentIndentation: true,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should indent two-div-not-indented-tree', () => {
      const { actual, expected } = compareFiles(__dirname, {
        source: 'two-div-not-indented-tree.vue',
        target: 'two-div-indented-tree.vue',
        formatOptions: {
          parser: 'vue',

          pugSingleFileComponentIndentation: true,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not indent two-div-indented-flat', () => {
      const { actual, expected } = compareFiles(__dirname, {
        source: 'two-div-indented-flat.vue',
        target: 'two-div-not-indented-flat.vue',
        formatOptions: {
          parser: 'vue',
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not indent two-div-indented-tree', () => {
      const { actual, expected } = compareFiles(__dirname, {
        source: 'two-div-indented-tree.vue',
        target: 'two-div-not-indented-tree.vue',
        formatOptions: {
          parser: 'vue',
        },
      });
      expect(actual).toBe(expected);
    });
  });
});
