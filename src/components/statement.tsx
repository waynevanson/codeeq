import { Card, Grid, Typography } from "@material-ui/core"
import { array as A, eq, option as O, ord, record as RC } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as React from "react"
import * as domain from "../domain/"
import * as lib from "../lib"
import { CodeBlock } from "./code-block"
import { LanguageSelector } from "./language-selector"

export interface PatternsMiniProps {
  patternsByLanguage: Record<string, Array<domain.Pattern>>
  languageSelected: string
}

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

export const PatternsMini: React.FC<PatternsMiniProps> = ({
  patternsByLanguage,
  languageSelected,
}) => (
  <Grid container>
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

// todo - rename props
export interface StatementProps extends lib.HTMLProps, domain.Statement {
  languagesChosen: lib.UseState<O.Option<Array<string>>>
  languageSelected: lib.UseState<string>
}

export const Statement: React.FC<StatementProps> = ({
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
      <PatternsMini
        patternsByLanguage={patternsByLanguage}
        languageSelected={languageSelected[0]}
      />
    </Card>
  )
}
