/**
 * Think of this file as state that never changes.
 * A read only database.
 *
 * There are also other preran functions
 */

import { array as A, eq, option as O, readonlyRecord as R, record } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as domain from "./domain"

// select languages, with an order.
// state at top and simply set first,
// then advance with an order, with buttons to move them.
export const statements: Array<domain.Statement> = [
  {
    name: "for loop",
    description:
      "A for loop runs the coroutine over and over. We use the variables inside to control it.",
    links: pipe(
      {
        wikipedia: "https://en.wikipedia.org/wiki/For_loop",
        mdn:
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for",
      },
      R.map(O.some)
    ),
    patterns: [
      {
        language: "typescript",
        code: `for (let i=0; i<100; i++) {
  console.log(i)
}`,
        name: "pattern 1 name ts",
        details: "",
      },
      {
        language: "typescript",
        code: `[1, 2, 3, 4, 5].forEach((element) => console.log(element))`,
        name: "pattern 2 name ts",
        details: "",
      },

      {
        language: "haskell",
        code: `a = map [1,2,3,4,5] /s -> log s`,
        name: "pattern 1 name haskell",
        details: "",
      },
    ],
  },

  {
    name: "switch-case ",
    description:
      "A for loop runs the coroutine over and over. We use the variables inside to control it.",
    links: pipe(
      {
        wikipedia: "https://en.wikipedia.org/wiki/For_loop",
        mdn:
          "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for",
      },
      R.map(O.some)
    ),
    patterns: [
      {
        language: "typescript",
        code: `for (let i=0; i<100; i++) {
  console.log(i)
}`,
        name: "",
        details: "",
      },
      {
        language: "javascript",
        code: `for (let i=0; i<100; i++) {
  console.log(i)
}`,

        name: "",
        details: "",
      },
      {
        language: "haskell",
        code: `a = map [1,2,3,4,5] (/s -> log s)`,
        name: "",
        details: "",
      },
    ],
  },
]

export const languages = pipe(
  statements,
  A.chain((a) => a.patterns),
  A.map((a) => a.language),
  A.uniq(eq.eqString)
)

export const patternsByLanguage = pipe(
  statements,
  A.chain((a) => a.patterns),
  A.foldMap(record.getMonoid(A.getMonoid<domain.Pattern>()))((pattern) =>
    record.singleton(pattern.language, [pattern])
  )
)
