import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should handle singleQuote:true + pugSingleQuote:false in framework interpolation', async () => {
    const { actual, expected } = await compareFiles(__dirname, {
      source: 'double-quotes.pug',
      target: 'single-quotes.pug',
      formatOptions: {
        singleQuote: true,
        pugSingleQuote: false,
      },
    });
    expect(actual).toBe(expected);
  });

  it('should handle singleQuote:false + pugSingleQuote:true in framework interpolation', async () => {
    const { actual, expected } = await compareFiles(__dirname, {
      source: 'single-quotes.pug',
      target: 'double-quotes.pug',
      formatOptions: {
        singleQuote: false,
        pugSingleQuote: true,
      },
    });
    expect(actual).toBe(expected);
  });
});
