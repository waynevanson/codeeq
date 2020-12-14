export type Language = "Javascript" | "Typescript" | "Haskell"

export interface Pattern {
  name: string
  description: string
  codeblocks: Array<CodeBlock>
}

export interface CodeBlock {
  code: string
  id: string
  name: string
  language: Language
  description: string
}

// code block
// name of language radio button
// name of
