import { Tab, Tabs } from "@material-ui/core"
import { array as A, option as O } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as React from "react"
import * as lib from "../lib"

export interface LanguageSelectorProps {
  languages: Array<string>
  stateLanguageSelected: lib.UseFunctionalState<string>
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  stateLanguageSelected: [languageSelected, languageSelectedSet],
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
      onChange={(e, newLanguageSelected) =>
        languageSelectedSet(() => newLanguageSelected)()
      }
      aria-label="language buttons"
    >
      {pipe(
        languages,
        A.map((language) => (
          <Tab value={language} key={language} label={language} />
        ))
      )}
    </Tabs>
  )
}
