import { Tab, Tabs } from "@material-ui/core"
import { array as A, either as E, option as O, record as RC } from "fp-ts"
import { identity, pipe } from "fp-ts/lib/function"
import * as React from "react"
import * as lib from "../lib"

export interface LanguageSelectorProps {
  languages: Array<string>
  stateLanguagesChosen: lib.UseFunctionalState<Record<string, boolean>>
  stateLanguageSelected: lib.UseFunctionalState<string>
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  stateLanguageSelected: [languageSelected, languageSelectedSet],
  stateLanguagesChosen: [languagesChosen],
  languages,
}) => {
  return (
    <Tabs
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
        ({ right }) =>
          pipe(
            right,
            A.map((language) => (
              <Tab value={language} key={language} label={language} />
            ))
          )
      )}
    </Tabs>
  )
}
