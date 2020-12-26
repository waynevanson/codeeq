import { makeStyles, Tab, Tabs } from "@material-ui/core"
import clsx from "clsx"
import {
  array as A,
  either as E,
  option as O,
  readonlyRecord as RC,
} from "fp-ts"
import { identity, pipe } from "fp-ts/lib/function"
import * as React from "react"
import * as lib from "../lib"

const useStyles = makeStyles((theme) => ({
  divider: { padding: theme.spacing(0.3), margin: "0.2rem 0.5rem" },
  selectedTab: { fontWeight: "bold" },
  deselectedTab: { fontWeight: "normal" },
}))

export interface LanguageSelectorProps {
  languages: Array<string>
  stateLanguagesChosen: lib.UseFunctionalState<Record<string, boolean>>
  stateLanguageSelected: lib.UseFunctionalState<string>
  className?: string
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  stateLanguageSelected: [languageSelected, languageSelectedSet],
  stateLanguagesChosen: [languagesChosen],
  languages,
  className,
}) => {
  const classes = useStyles()
  return (
    <Tabs
      className={clsx(className)}
      value={pipe(
        languages,
        A.findFirst((l: string) => l === languageSelected),
        O.getOrElseW(() => false)
      )}
      indicatorColor="primary"
      textColor="primary"
      onChange={(_, newLanguageSelected) =>
        languageSelectedSet(() => newLanguageSelected)()
      }
      aria-label="language buttons"
    >
      {pipe(
        languages,
        A.partitionMap((language) =>
          pipe(
            languagesChosen,
            RC.lookup(language),
            O.chain(O.fromPredicate(identity)),
            E.fromOption(() => language),
            E.map(() => language)
          )
        ),
        ({ left, right }) =>
          pipe(
            right,
            A.map((language) => (
              <Tab
                key={language}
                className={classes.selectedTab}
                value={language}
                label={language}
              />
            )),
            A.alt(() =>
              pipe(
                left,
                A.map((language) => (
                  <Tab
                    key={language}
                    className={classes.deselectedTab}
                    value={language}
                    label={language}
                  />
                ))
              )
            )
          )
      )}
    </Tabs>
  )
}
