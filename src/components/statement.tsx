import { Card, Grid, Typography } from "@material-ui/core"
import { array as A, eq, option as O, ord, record as RC } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as React from "react"
import * as domain from "../domain/"
import * as lib from "../lib"
import { CodeBlock } from "./code-block"
import { LanguageSelector } from "./language-selector"

// export const Pattern = ({
//   patternsByLanguage,
// }: {
//   patternsByLanguage: Record<string, Array<domain.Pattern>>
// }) =>
//   pipe(
//     patternsByLanguage,
//     RC.collect((language, patterns) =>
//       pipe(
//         patterns,
//         A.map(({ code }) => (
//           <CodeBlock
//             className="rounded-b-md"
//             key={language + code}
//             /* only display code block if selected */
//             style={pipe(
//               oTabIndex,
//               O.chain(O.fromPredicate((tabIndex) => index === tabIndex)),
//               O.map(() => ({ visibility: "hidden", position: "absolute" })),
//               O.getOrElseW(() => ({}))
//             )}
//             code={code}
//             language={language}
//           />
//         ))
//       )
//     ),
//     A.flatten
//   )

export const Statement: React.FC<
  lib.HTMLProps &
    domain.Statement & {
      languagesChosen: lib.UseState<O.Option<Array<string>>>
      languageSelected: lib.UseState<string>
    }
> = ({
  patterns,
  style,
  className,
  description,
  name,
  languageSelected,
  // languagesChosen: [languages, languagesSet],
}) => {
  // todo - when times multiple selected patterns share a language,
  // make it match
  const patternsByLanguage = React.useMemo(
    () =>
      pipe(
        patterns,
        A.foldMap(RC.getMonoid(A.getMonoid<domain.Pattern>()))((pattern) =>
          RC.singleton(pattern.language, [pattern])
        ),
        RC.map(
          A.sort(ord.contramap((a: domain.Pattern) => a.name)(ord.ordString))
        )
      ),
    [patterns]
  )

  const languagesUnique = React.useMemo(
    () =>
      pipe(
        patternsByLanguage,
        RC.keys,
        A.uniq(eq.eqString),
        A.sort(ord.ordString)
      ),
    [patternsByLanguage]
  )

  return (
    <Card style={style} className={className}>
      <div className="px-2">
        <Typography variant="h4">{name}</Typography>
        <Typography variant="body1">{description}</Typography>
      </div>
      {/* todo - partition or only filter for displayed languages */}
      <LanguageSelector
        languages={languagesUnique}
        stateLanguageSelected={languageSelected}
      />
      {pipe(
        patternsByLanguage,
        RC.collect((language, patterns) =>
          pipe(
            patterns,
            A.map(({ code }) => (
              <Grid item>
                <CodeBlock
                  className="rounded-b-md"
                  key={language + code}
                  /* only display code block if selected */
                  style={pipe(
                    language,
                    O.fromPredicate(
                      (language) => language !== languageSelected[0]
                    ),
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
            ))
          )
        )
      )}
    </Card>
  )
}
