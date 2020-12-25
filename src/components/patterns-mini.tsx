import { Grid } from "@material-ui/core"
import { array as A, record as RC } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as React from "react"
import * as domain from "../domain/"
import { PatternMini } from "./pattern-mini"

export interface PatternsMiniProps {
  patternsByLanguage: Record<string, Array<domain.Pattern>>
  languageSelected: string
}

export const PatternsMini: React.FC<PatternsMiniProps> = ({
  patternsByLanguage,
  languageSelected,
}) => (
  <Grid container direction="column">
    {pipe(
      patternsByLanguage,
      RC.collect((_, patterns) =>
        pipe(
          patterns,
          A.map((pattern) => (
            <PatternMini languageSelected={languageSelected} {...pattern} />
          ))
        )
      )
    )}
  </Grid>
)