import { parsers } from 'src/index';
import { compareFiles } from 'tests/common';
import { describe, expect, it } from 'vitest';

describe('Options', () => {
  describe('pugAttributeSeparator', () => {
    it('should never insert commas between attributes', () => {
      const { actual, expected } = compareFiles(__dirname, {
        formatOptions: {
          // The `.length-test` elements are tested against a `printWidth` of 80 (currently also the default):
          printWidth: 80,

          pugAttributeSeparator: 'none',
        },
      });
      expect(actual).toBe(expected);
    });

    it("should work with 'none' option and angular syntax, but produce invalid output", () => {
      const { actual, expected } = compareFiles(__dirname, {
        source: 'angular-unformatted.pug',
        target: 'angular-formatted.pug',
        formatOptions: {
          pugAttributeSeparator: 'none',
        },
      });
      expect(actual).toBe(expected);
      expect(() => {
        // ts-jest needs the exclamation mark, so it does not have the impression that the variables are undefined
        /* eslint @typescript-eslint/no-non-null-assertion: off */
        parsers!.pug!.parse(actual, parsers!, null!);
      }).toThrow('Assigning to rvalue');
    });
  });
});
