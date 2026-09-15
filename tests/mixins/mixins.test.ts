import { format } from 'prettier';
import { plugin } from 'src/index';
import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Mixins', () => {
  it('should handle mixins', async () => {
    const { expected, actual } = await compareFiles(import.meta.url);
    expect(actual).toBe(expected);
  });

  it('should indent multiline call arguments relative to the call', async () => {
    const { expected, actual } = await compareFiles(import.meta.url, {
      source: 'multiline-calls.pug',
      target: 'multiline-calls.formatted.pug',
      // Match the configuration reported in #620.
      formatOptions: { pugPrintWidth: 100 },
    });
    expect(actual).toBe(expected);
  });

  it.each([
    ['multiline-calls', 100],
    ['interpolated-calls', 60],
    ['call-attributes', 60],
  ])('should keep formatted %s stable', async (fixture, pugPrintWidth) => {
    const { expected, actual } = await compareFiles(import.meta.url, {
      source: `${fixture}.formatted.pug`,
      target: `${fixture}.formatted.pug`,
      formatOptions: { pugPrintWidth },
    });
    expect(actual).toBe(expected);
  });

  it.each(['interpolated-calls', 'call-attributes'])(
    'should format %s at the requested width',
    async (fixture) => {
      const { expected, actual } = await compareFiles(import.meta.url, {
        source: `${fixture}.pug`,
        target: `${fixture}.formatted.pug`,
        formatOptions: { pugPrintWidth: 60 },
      });
      expect(actual).toBe(expected);
    },
  );

  it.each([13, 14, 15])(
    'should respect the call width boundary at %i columns',
    async (pugPrintWidth) => {
      const code: string = '+b({ a: "x" })\n';
      const actual: string = await format(code, {
        parser: 'pug',
        plugins: [plugin],
        pugPrintWidth,
      });
      expect(actual).toBe(pugPrintWidth < 14 ? '+b({\n  a: "x",\n})\n' : code);
    },
  );
});
