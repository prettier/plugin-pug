import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should consider tabWidth when using useTabs', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      formatOptions: {
        useTabs: true,
        tabWidth: 8,
      },
    });
    expect(actual).toBe(expected);
  });

  it('should consider tabWidth for every indentation level when using useTabs', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      source: 'unformatted-nested.pug',
      target: 'formatted-nested.pug',
      formatOptions: {
        useTabs: true,
        tabWidth: 8,
      },
    });
    expect(actual).toBe(expected);
  });

  it('should wrap script content considering tabWidth when using useTabs', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      source: 'unformatted-script.pug',
      target: 'formatted-script-tabs.pug',
      formatOptions: {
        useTabs: true,
        tabWidth: 8,
      },
    });
    expect(actual).toBe(expected);
  });

  it('should wrap script content considering indentation when using spaces', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      source: 'unformatted-script.pug',
      target: 'formatted-script-spaces.pug',
      formatOptions: {
        useTabs: false,
        tabWidth: 8,
      },
    });
    expect(actual).toBe(expected);
  });
});
