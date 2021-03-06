import * as React from "react"
import { Grid } from "@material-ui/core"
import { Statement } from "./components/statement"
import * as D from "./domain"
import { array as A, option as O, readonlyRecord as R } from "fp-ts"
import { pipe } from "fp-ts/lib/function"

// select languages, with an order.
// state at top and simply set first,
// then advance with an order, with buttons to move them.
const statement: Array<D.Statement> = [
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

export const App: React.FC = () => {
  const language = React.useState<D.Language>("typescript")

  return (
    <Grid container spacing={2}>
      {pipe(
        statement,
        A.map((statement) => (
          <Grid item xs={4}>
            <Statement
              key={statement.name}
              language={language}
              {...statement}
            />
          </Grid>
        ))
      )}
    </Grid>
  )
}
