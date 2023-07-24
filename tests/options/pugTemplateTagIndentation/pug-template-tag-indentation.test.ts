import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugSingleFileComponentIndentation', () => {
    it('should indent', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        source: 'not-indented.vue',
        target: 'indented.vue',
        formatOptions: {
          parser: 'vue',

          pugSingleFileComponentIndentation: true,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not indent', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        source: 'indented.vue',
        target: 'not-indented.vue',
        formatOptions: {
          parser: 'vue',

          pugSingleFileComponentIndentation: false,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not indent by default', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        source: 'indented.vue',
        target: 'not-indented.vue',
        formatOptions: {
          parser: 'vue',
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not affect markdown', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        source: 'not-indented.md',
        target: 'not-indented.md',
        formatOptions: {
          parser: 'markdown',

          pugSingleFileComponentIndentation: true,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not change two-div-not-indented-flat', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        source: 'two-div-not-indented-flat.vue',
        target: 'two-div-not-indented-flat.vue',
        formatOptions: {
          parser: 'vue',
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not change two-div-not-indented-tree', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        source: 'two-div-not-indented-tree.vue',
        target: 'two-div-not-indented-tree.vue',
        formatOptions: {
          parser: 'vue',
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not change two-div-indented-flat', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        source: 'two-div-indented-flat.vue',
        target: 'two-div-indented-flat.vue',
        formatOptions: {
          parser: 'vue',

          pugSingleFileComponentIndentation: true,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not change two-div-indented-tree', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        source: 'two-div-indented-tree.vue',
        target: 'two-div-indented-tree.vue',
        formatOptions: {
          parser: 'vue',

          pugSingleFileComponentIndentation: true,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should indent two-div-not-indented-flat', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        source: 'two-div-not-indented-flat.vue',
        target: 'two-div-indented-flat.vue',
        formatOptions: {
          parser: 'vue',

          pugSingleFileComponentIndentation: true,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should indent two-div-not-indented-tree', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        source: 'two-div-not-indented-tree.vue',
        target: 'two-div-indented-tree.vue',
        formatOptions: {
          parser: 'vue',

          pugSingleFileComponentIndentation: true,
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not indent two-div-indented-flat', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
        source: 'two-div-indented-flat.vue',
        target: 'two-div-not-indented-flat.vue',
        formatOptions: {
          parser: 'vue',
        },
      });
      expect(actual).toBe(expected);
    });

    it('should not indent two-div-indented-tree', async () => {
      const { actual, expected } = await compareFiles(import.meta.url, {
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
