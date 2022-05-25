import { readdirSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { format } from 'prettier';
import { plugin } from 'src/index';
import { describe, expect, it } from 'vitest';

describe('Pug Tests', () => {
  const filenames: string[] = readdirSync(resolve(__dirname), 'utf8');

  const ignores: string[] = [
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
  ];

  for (const filename of filenames) {
    if (filename.endsWith('.formatted.pug')) {
      const unformattedFilename: string = filename.replace('.formatted', '');
      if (!ignores.includes(unformattedFilename)) {
        it(unformattedFilename, () => {
          const expected: string = readFileSync(
            resolve(__dirname, filename),
            'utf8',
          );
          const code: string = readFileSync(
            resolve(__dirname, unformattedFilename),
            'utf8',
          );
          const actual: string = format(code, {
            parser: 'pug',
            plugins: [plugin],
          });

          expect(actual).toBe(expected);
        });
      }
    }
  }
});
