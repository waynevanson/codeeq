import { array as A, option, reader as R } from "fp-ts"
import { pipe } from "fp-ts/lib/pipeable"
import * as RT from "../fp-ts-react"
import * as data from "../data"
import { useLocation } from "react-router-dom"

export const Statement = pipe(
  RT.htmlProps<"div">(),
  RT.remap("path", () => useLocation().pathname),
  RT.remap("children", ({ path }) =>
    pipe(
      data.statements,
      A.findFirst((a) => a.name === path),
      option.getOrElseW(() => "cooked")
    )
  ),
  RT.intersect<{ penis: string }>(),
  R.map(RT.createFactory("div"))
)
