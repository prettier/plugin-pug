import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Indents', () => {
  it('should indent by default with 2 spaces', () => {
    const { actual, expected } = compareFiles(__dirname, {
      target: 'formatted-2-spaces.pug',
    });
    expect(actual).toBe(expected);
  });

  it('should indent with 2 spaces', () => {
    const { actual, expected } = compareFiles(__dirname, {
      target: 'formatted-2-spaces.pug',
      formatOptions: {
        tabWidth: 2,
      },
    });
    expect(actual).toBe(expected);
  });

  it('should indent with 3 spaces', () => {
    const { actual, expected } = compareFiles(__dirname, {
      target: 'formatted-3-spaces.pug',
      formatOptions: {
        tabWidth: 3,
      },
    });
    expect(actual).toBe(expected);
  });

  it('should indent with 4 spaces', () => {
    const { actual, expected } = compareFiles(__dirname, {
      target: 'formatted-4-spaces.pug',
      formatOptions: {
        tabWidth: 4,
      },
    });
    expect(actual).toBe(expected);
  });

  it('should indent with tabs', () => {
    const { actual, expected } = compareFiles(__dirname, {
      target: 'formatted-tabs.pug',
      formatOptions: {
        useTabs: true,
      },
    });
    expect(actual).toBe(expected);
  });
});
