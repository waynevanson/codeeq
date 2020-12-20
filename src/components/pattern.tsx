import * as React from "react"
import * as lib from "../lib"
import * as dom from "../domain"
import { Grid } from "@material-ui/core"

// one pattern of code.
// ensure it'
export const Pattern: React.FC<lib.HTMLProps & dom.Pattern> = ({
  code,
  details,
  language,
  name,
  className,
  style,
}) => {
  return <Grid className={className} style={style}></Grid>
}
