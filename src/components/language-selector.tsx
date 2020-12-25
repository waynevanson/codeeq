import { Tab, Tabs } from "@material-ui/core"
import { array as A, io, option as O } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as React from "react"
import * as lib from "../lib"

export interface LanguageSelectorProps {
  languages: Array<string>
  stateLanguageSelected: lib.UseState<string>
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  stateLanguageSelected: [languageSelected, languageSelectedSet],
  languages,
}) => {
  const [oTabIndex, oTabIndexSet] = React.useState<number | false>(false)

  function handleTabChange(newIndex: number) {
    // change internal state
    oTabIndexSet(() => newIndex)
    // change language by looking up languages
    pipe(
      languages,
      A.lookup(newIndex),
      O.fold(
        () => () => console.log(`newIndex "${newIndex}" is not in the list`),
        (language) => () => languageSelectedSet(language)
      )
    )()
  }

  // change ther tab index when the language changes
  React.useEffect(() => {
    pipe(
      languages,
      A.findIndex((a) => a === languageSelected),
      io.of,
      io.map(O.getOrElseW((): false => false)),
      io.chainFirst((oindex) => () => oTabIndexSet(oindex))
    )()
  }, [languages, languageSelected])

  return (
    <Tabs
      value={oTabIndex}
      indicatorColor="primary"
      textColor="primary"
      onChange={(e, index) => handleTabChange(index)}
      aria-label="language buttons"
    >
      {pipe(
        languages,
        A.map((language) => <Tab key={language} label={language} />)
      )}
    </Tabs>
  )
}
