// a summary of many statements. highlights a few in desired languages
//
// select from language/s
//
//
import * as React from "react"
import * as lib from "../lib"
import * as dom from "../domain"
import { Grid } from "@material-ui/core"
import * as data from "../data"
import { pipe } from "fp-ts/lib/function"
import { array as A } from "fp-ts"
import { Statement } from "../components/statement"

// one pattern of code.
// ensure it'
const Pattern: React.FC<lib.HTMLProps & dom.Pattern> = ({
  code,
  details,
  language,
  name,
  className,
  style,
}) => {
  return <Grid className={className} style={style}></Grid>
}

export const Statements: React.FC<{
  languages: lib.UseState<Array<dom.Language>>
  languageSelected: lib.UseState<dom.Language>
}> = ({ languages, languageSelected }) => {
  lib.useTitle("Statements")

  return (
    <Grid container>
      {pipe(
        data.statements,
        A.map((props) => Statement({ ...props, languages, languageSelected }))
      )}
    </Grid>
  )
}
