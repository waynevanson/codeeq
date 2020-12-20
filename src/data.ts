import { option as O, readonlyRecord as R } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as D from "./domain"

// select languages, with an order.
// state at top and simply set first,
// then advance with an order, with buttons to move them.
export const statements: Array<D.Statement> = [
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
        code: `a = map [1,2,3,4,5] /s -> log s`,
        name: "",
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
        code: `a = map [1,2,3,4,5] /s -> log s`,
        name: "",
        details: "",
      },
    ],
  },
]
