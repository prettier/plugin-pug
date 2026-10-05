import type { Plugin } from 'prettier';
import { doc, format } from 'prettier';
import { parsers as babelParsers } from 'prettier/plugins/babel';
import { plugin } from 'src/index';
import { describe, expect, it } from 'vitest';

// A plugin that prints all JavaScript parsed by `babel` as `replaced`.
const replacePlugin: Plugin = {
  parsers: {
    babel: { ...babelParsers.babel, astFormat: 'replace' },
  },
  printers: {
    replace: { print: () => ['replaced', doc.builders.hardline] },
  },
};

describe('Options', () => {
  describe('plugins', () => {
    it('should format embedded code with the other plugins', async () => {
      const actual: string = await format('- const a = 1', {
        parser: 'pug',
        plugins: [plugin, replacePlugin],
      });
      expect(actual).toBe('- replaced\n');
    });
  });
});
