import { Grid } from "@material-ui/core"
import { array as A, readonlyRecord as RC } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as React from "react"
import { LanguageSwitches } from "../components/language-switches"
import { StatementMini } from "../components/statement-mini"
import * as data from "../data"
import * as lib from "../lib"

export const availableLanguagesRecord = pipe(
  data.languages,
  A.reduce(RC.empty as RC.ReadonlyRecord<string, boolean>, (b, a) =>
    pipe(b, RC.insertAt(a, false))
  )
)

export interface StatementsProps {
  languagesChosen: lib.UseState<Array<string>>
  languageSelected: lib.UseState<string>
}

export const Statements: React.FC<StatementsProps> = (props) => {
  lib.useTitle("Statements")

  const stateCheckboxes = React.useState(() => availableLanguagesRecord)

  return (
    <>
      <LanguageSwitches stateCheckboxes={stateCheckboxes} />
      <Grid spacing={2} container>
        {pipe(
          data.statements,
          A.map((statement) => (
            <Grid item>
              <StatementMini {...statement} {...props} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  )
}
