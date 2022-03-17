import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { describe, expect, it } from 'vitest';
import { plugin } from './../../../src/index';

describe('Options', () => {
  describe('pugSingleFileComponentIndentation', () => {
    it('should indent', () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'indented.vue'),
        'utf8',
      );
      const code: string = readFileSync(
        resolve(__dirname, 'not-indented.vue'),
        'utf8',
      );
      const actual: string = format(code, {
        parser: 'vue',
        plugins: [plugin],

        pugSingleFileComponentIndentation: true,
      });

      expect(actual).toBe(expected);
    });

    it('should not indent', () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'not-indented.vue'),
        'utf8',
      );
      const code: string = readFileSync(
        resolve(__dirname, 'indented.vue'),
        'utf8',
      );
      const actual: string = format(code, {
        parser: 'vue',
        plugins: [plugin],

        pugSingleFileComponentIndentation: false,
      });

      expect(actual).toBe(expected);
    });

    it('should not indent by default', () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'not-indented.vue'),
        'utf8',
      );
      const code: string = readFileSync(
        resolve(__dirname, 'indented.vue'),
        'utf8',
      );
      const actual: string = format(code, {
        parser: 'vue',
        plugins: [plugin],
      });

      expect(actual).toBe(expected);
    });

    it('should not affect markdown', () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'not-indented.md'),
        'utf8',
      );
      const code: string = readFileSync(
        resolve(__dirname, 'not-indented.md'),
        'utf8',
      );
      const actual: string = format(code, {
        parser: 'markdown',
        plugins: [plugin],

        pugSingleFileComponentIndentation: true,
      });

      expect(actual).toBe(expected);
    });

    it('should not change two-div-not-indented-flat', () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'two-div-not-indented-flat.vue'),
        'utf8',
      );
      const code: string = readFileSync(
        resolve(__dirname, 'two-div-not-indented-flat.vue'),
        'utf8',
      );
      const actual: string = format(code, {
        parser: 'vue',
        plugins: [plugin],
      });

      expect(actual).toBe(expected);
    });

    it('should not change two-div-not-indented-tree', () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'two-div-not-indented-tree.vue'),
        'utf8',
      );
      const code: string = readFileSync(
        resolve(__dirname, 'two-div-not-indented-tree.vue'),
        'utf8',
      );
      const actual: string = format(code, {
        parser: 'vue',
        plugins: [plugin],
      });

      expect(actual).toBe(expected);
    });

    it('should not change two-div-indented-flat', () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'two-div-indented-flat.vue'),
        'utf8',
      );
      const code: string = readFileSync(
        resolve(__dirname, 'two-div-indented-flat.vue'),
        'utf8',
      );
      const actual: string = format(code, {
        parser: 'vue',
        plugins: [plugin],

        pugSingleFileComponentIndentation: true,
      });

      expect(actual).toBe(expected);
    });

    it('should not change two-div-indented-tree', () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'two-div-indented-tree.vue'),
        'utf8',
      );
      const code: string = readFileSync(
        resolve(__dirname, 'two-div-indented-tree.vue'),
        'utf8',
      );
      const actual: string = format(code, {
        parser: 'vue',
        plugins: [plugin],

        pugSingleFileComponentIndentation: true,
      });

      expect(actual).toBe(expected);
    });

    it('should indent two-div-not-indented-flat', () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'two-div-indented-flat.vue'),
        'utf8',
      );
      const code: string = readFileSync(
        resolve(__dirname, 'two-div-not-indented-flat.vue'),
        'utf8',
      );
      const actual: string = format(code, {
        parser: 'vue',
        plugins: [plugin],

        pugSingleFileComponentIndentation: true,
      });

      expect(actual).toBe(expected);
    });

    it('should indent two-div-not-indented-tree', () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'two-div-indented-tree.vue'),
        'utf8',
      );
      const code: string = readFileSync(
        resolve(__dirname, 'two-div-not-indented-tree.vue'),
        'utf8',
      );
      const actual: string = format(code, {
        parser: 'vue',
        plugins: [plugin],

        pugSingleFileComponentIndentation: true,
      });

      expect(actual).toBe(expected);
    });

    it('should not indent two-div-indented-flat', () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'two-div-not-indented-flat.vue'),
        'utf8',
      );
      const code: string = readFileSync(
        resolve(__dirname, 'two-div-indented-flat.vue'),
        'utf8',
      );
      const actual: string = format(code, {
        parser: 'vue',
        plugins: [plugin],
      });

      expect(actual).toBe(expected);
    });

    it('should not indent two-div-indented-tree', () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'two-div-not-indented-tree.vue'),
        'utf8',
      );
      const code: string = readFileSync(
        resolve(__dirname, 'two-div-indented-tree.vue'),
        'utf8',
      );
      const actual: string = format(code, {
        parser: 'vue',
        plugins: [plugin],
      });

      expect(actual).toBe(expected);
    });
  });
});
