import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Issues', () => {
  it('should sort more stabilized', async () => {
    const { actual, expected } = await compareFiles(import.meta.url, {
      formatOptions: {
        pugSortAttributesBeginning: [
          '^v-else$',
          '^v-if$',
          '^v-else-if$',
          '^v-model',
          '^v-',
          '^v-for$', // v-for should be the last attribute which starts with v-
          '^:key$', // key binding should always follow v-for
          '^@',
          '^:(?!key)', // any shortcut for v-bind
          '^ref$',
        ],
        pugSortAttributes: 'asc',
      },
    });
    expect(actual).toBe(expected);
  });
});
