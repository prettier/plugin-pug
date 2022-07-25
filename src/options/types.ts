import type { ParserOptions } from 'prettier';
import type { PugSortAttributes } from './attribute-sorting';
import type { ArrowParens } from './common';
import type {
  PugEmptyAttributes,
  PugEmptyAttributesForceQuotes,
} from './empty-attributes';
import type { PugAttributeSeparator } from './pug-attribute-separator';
import type { PugClassLocation } from './pug-class-location';
import type { PugClassNotation } from './pug-class-notation';
import type { PugCommentPreserveSpaces } from './pug-comment-preserve-spaces';
import type { PugFramework } from './pug-framework';
import type { PugIdNotation } from './pug-id-notation';

/**
 * Extended pug option object.
 */
export interface PugParserOptions
  extends Pick<
    ParserOptions,
    | 'printWidth'
    | 'singleQuote'
    | 'tabWidth'
    | 'useTabs'
    | 'bracketSpacing'
    | 'arrowParens'
    | 'semi'
    | 'bracketSameLine'
  > {
  pugPrintWidth: number;
  pugSingleQuote: boolean | null;
  pugTabWidth: number;
  pugUseTabs: boolean | null;
  pugBracketSpacing: boolean | null;
  pugArrowParens: ArrowParens | null;
  pugSemi: boolean | null;
  pugBracketSameLine: boolean | null;

  pugAttributeSeparator: PugAttributeSeparator;

  pugCommentPreserveSpaces: PugCommentPreserveSpaces;

  pugSortAttributes: PugSortAttributes;
  pugSortAttributesBeginning: string[];
  pugSortAttributesEnd: string[];

  pugWrapAttributesThreshold: number;
  pugWrapAttributesPattern: string;

  pugClassNotation: PugClassNotation;
  pugIdNotation: PugIdNotation;

  pugClassLocation: PugClassLocation;

  pugExplicitDiv: boolean;

  pugEmptyAttributes: PugEmptyAttributes;
  pugEmptyAttributesForceQuotes: PugEmptyAttributesForceQuotes;

  pugSingleFileComponentIndentation: boolean;

  pugFramework: PugFramework;

  pugPreserveAttributeBrackets: boolean;
}
