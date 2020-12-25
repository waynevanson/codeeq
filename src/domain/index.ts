import { option } from "fp-ts"

export interface Links
  extends Record<"wikipedia" | "mdn", option.Option<string>> {}

/**
 * The statement that's the main entry point, like a for loop or a switch statement.
 */
export interface Statement {
  name: string
  description: string
  patterns: Array<Pattern>
  links: Links
}

export interface CodeBlock {
  code: string
  language: string
}

// sort by language, with the selected at the front
export interface Pattern extends CodeBlock {
  name: string
  details: string
}
