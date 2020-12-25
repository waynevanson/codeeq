import { Card, Snackbar, Tab, Tabs, Typography } from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { array as A, eq, io, option as O, ord, record as RC } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as React from "react"
import * as domain from "../domain/"
import * as lib from "../lib"
import { CodeBlock } from "./code-block"

export interface LanguageSelectorProps {
  languages: Array<string>
  stateLanguageSelected: lib.UseState<string>
}

// todo - add [X] as a tab to indicate that nothing is selectable
// or no x and deselect it all
export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  stateLanguageSelected: [languageSelected, languageSelectedSet],
  languages,
}) => {
  //   // find language
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
  const languagesUniq = React.useMemo(
    () =>
      pipe(
        patterns,
        A.map((a) => a.language),
        A.uniq(eq.eqString),
        A.sort(ord.ordString)
      ),
    [patterns]
  )

  return (
    <Card style={style} className={className}>
      <div className="px-2">
        <Typography variant="h4">{name}</Typography>
        <Typography variant="body1">{description}</Typography>
      </div>
      {/* Selects the language */}
      <LanguageSelector
        languages={languagesUniq}
        stateLanguageSelected={languageSelected}
      />
      {/* todo - convert to Record<string, dom.Pattern> */}
      {/* <Pattern patternsByLanguage={patterns} /> */}
    </Card>
  )
}
