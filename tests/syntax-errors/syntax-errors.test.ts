import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { format } from 'prettier';
import { plugin } from 'src/index';
import { describe, expect, it } from 'vitest';

describe('Syntax-Errors', () => {
  it('should not format if attributes is not closed', async () => {
    const code: string = readFileSync(
      resolve(import.meta.dirname, 'attributes-not-closed.pug'),
      'utf8',
    );
    await expect(
      format(code, { parser: 'pug', plugins: [plugin] }),
    ).rejects.toThrow();
  });

  it('should not format if pipeless script tag has syntax error', async () => {
    const code: string = readFileSync(
      resolve(import.meta.dirname, 'pipeless-script-tag.pug'),
      'utf8',
    );
    await expect(
      format(code, { parser: 'pug', plugins: [plugin] }),
    ).rejects.toThrow();
  });

  it('should format non-JS script without syntax error', async () => {
    const code: string = readFileSync(
      resolve(import.meta.dirname, 'scripts-with-non-js-contents.pug'),
      'utf8',
    );
    await expect(
      format(code, { parser: 'pug', plugins: [plugin] }),
    ).resolves.not.toThrow();
  });
});
