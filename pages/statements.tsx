import { Grid } from "@material-ui/core"
import { array as A, readonlyRecord as RC } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import { NextPageContext } from "next"
import * as React from "react"
import { LanguageSwitches } from "../components/language-switches"
import { StatementMini } from "../components/statement-mini"
import * as data from "../data"
import * as lib from "../lib"
import * as d from "io-ts/Decoder"

export const availableLanguagesRecord = pipe(
  data.languages,
  A.reduce(RC.empty as RC.ReadonlyRecord<string, boolean>, (b, a) =>
    pipe(b, RC.insertAt(a, false))
  )
)

export interface StatementsProps extends NextPageContext {}

export const Statements: React.FC<StatementsProps> = () => {
  lib.useTitle("Statements")

  const stateLanguageSelected = lib.useStateLocalStorage(
    "languageSelected",
    () => "javascript",
    d.string
  )

  const stateLanguagesChosen = lib.useStateLocalStorage(
    "languagesChosen",
    () => availableLanguagesRecord,
    d.record(d.boolean)
  )

  return (
    <>
      <LanguageSwitches stateCheckboxes={stateLanguagesChosen} />
      <Grid spacing={2} container>
        {pipe(
          data.statements,
          A.map((statement) => (
            <Grid key={statement.name} item>
              <StatementMini
                {...{
                  stateLanguageSelected,
                  stateLanguagesChosen,
                  ...statement,
                }}
              />
            </Grid>
          ))
        )}
      </Grid>
    </>
  )
}

export default Statements
