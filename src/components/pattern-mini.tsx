import { Grid } from "@material-ui/core"
import { option as O } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as React from "react"
import * as domain from "../domain"
import { CodeBlock } from "./code-block"

export interface PatternMiniProps extends domain.Pattern {
  languageSelected: string
}

export const PatternMini: React.FC<PatternMiniProps> = ({
  code,
  language,
  languageSelected,
}) => (
  <Grid item>
    <CodeBlock
      className="rounded-b-md "
      key={language + code}
      /* only display code block if selected */
      style={pipe(
        language,
        O.fromPredicate((language) => language !== languageSelected),
        O.map(
          (): React.CSSProperties => ({
            visibility: "hidden",
            position: "absolute",
          })
        ),
        O.getOrElseW(() => ({ marginTop: "1rem" }))
      )}
      code={code}
      language={language}
    />
  </Grid>
)
