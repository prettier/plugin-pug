import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { format } from 'prettier';
import { plugin } from 'src/index';
import { describe, expect, it } from 'vitest';

describe('Pug Tests', () => {
  const filenames: string[] = readdirSync(resolve(import.meta.dirname), 'utf8');

  const ignores: Set<string> = new Set([
    'attrs.pug',
    'attrs.js.pug',
    'comments.pug',
    'escaping-class-attribute.pug',
    'filters.coffeescript.pug',
    'filters.include.pug',
    'inheritance.extend.mixins.pug',
    'inline-block-comment.pug',
    'inline-tag.pug',
    'layout.append.without-block.pug',
    'layout.multi.append.prepend.block.pug',
    'layout.prepend.without-block.pug',
    'mixin.merge.pug',
    'tags.self-closing.pug',
    'template.pug',
    'text.pug',
  ]);

  for (const filename of filenames) {
    if (filename.endsWith('.formatted.pug')) {
      const unformattedFilename: string = filename.replace('.formatted', '');
      if (!ignores.has(unformattedFilename)) {
        it(unformattedFilename, async () => {
          const expected: string = readFileSync(
            resolve(import.meta.dirname, filename),
            'utf8',
          );
          const code: string = readFileSync(
            resolve(import.meta.dirname, unformattedFilename),
            'utf8',
          );
          const actual: string = await format(code, {
            parser: 'pug',
            plugins: [plugin],
          });

          expect(actual).toBe(expected);
        });
      }
    }
  }
});
