import { Card, makeStyles, Typography } from "@material-ui/core"
import { array as A, eq, ord, record as RC } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as React from "react"
import * as domain from "../domain"
import * as lib from "../lib"
import { LanguageSelector } from "./language-selector"
import { PatternsMini } from "./patterns-mini"

const useStyle = makeStyles((theme) => ({
  namedesc: {
    padding: theme.spacing(0, 2),
  },
}))

export interface StatementMiniProps extends lib.HTMLProps, domain.Statement {
  stateLanguagesChosen: lib.UseFunctionalState<Record<string, boolean>>
  stateLanguageSelected: lib.UseFunctionalState<string>
}

export const StatementMini: React.FC<StatementMiniProps> = ({
  patterns,
  style,
  className,
  description,
  name,
  stateLanguageSelected,
  stateLanguagesChosen,
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

  const classes = useStyle()

  return (
    <Card style={style} className={className}>
      <div className={classes.namedesc}>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="body1">{description}</Typography>
      </div>
      {/* todo - partition or only filter for displayed languages */}
      <LanguageSelector
        languages={languagesUnique}
        stateLanguageSelected={stateLanguageSelected}
        stateLanguagesChosen={stateLanguagesChosen}
      />
      <PatternsMini
        patternsByLanguage={patternsByLanguage}
        languageSelected={stateLanguageSelected[0]}
      />
    </Card>
  )
}
