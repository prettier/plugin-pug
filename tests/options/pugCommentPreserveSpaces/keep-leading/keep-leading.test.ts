import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { format } from 'prettier';
import { plugin } from 'src/index';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugCommentPreserveSpaces', () => {
    const expected: string = readFileSync(
      resolve(import.meta.dirname, 'formatted.pug'),
      'utf8',
    );
    const code: string = readFileSync(
      resolve(import.meta.dirname, 'unformatted.pug'),
      'utf8',
    );

    it('should keep leading spaces within comments', async () => {
      const actual: string = await format(code, {
        parser: 'pug',
        plugins: [plugin],

        pugCommentPreserveSpaces: 'keep-leading',
      });

      expect(actual).toBe(expected);
    });
  });
});
