import { Card, Tab, Tabs, Typography } from "@material-ui/core"
import { array as A, option as O } from "fp-ts"
import { pipe } from "fp-ts/lib/function"
import * as React from "react"
import * as dom from "../domain"
import * as lib from "../lib"
import { CodeBlock } from "./code-block"

const findTabIndex = (languageSelected: dom.Language) => (
  patterns: Array<dom.Pattern>
) =>
  pipe(
    patterns,
    A.findIndex((a) => a.language === languageSelected)
  )

export const Statement: React.FC<
  lib.HTMLProps &
    dom.Statement & {
      languages: lib.UseState<Array<dom.Language>>
      languageSelected: lib.UseState<dom.Language>
    }
> = ({
  patterns,
  style,
  className,
  description,
  name,
  languageSelected: [languageSelected, languageSelectedSet],
  languages: [languages, languagesSet],
}) => {
  const [tabIndex, tabIndexSet] = React.useState(() =>
    pipe(
      patterns,
      findTabIndex(languageSelected),
      O.getOrElse(() => -1)
    )
  )

  // change the tab index when the language changes
  React.useEffect(() => {
    pipe(
      patterns,
      findTabIndex(languageSelected),
      O.map((index) => () => tabIndexSet(() => index)),
      O.getOrElse(() => () => console.log("could not find index in the list"))
    )()
  }, [patterns, languageSelected])

  function handleTabChange(e: any, newIndex: number) {
    tabIndexSet(() => newIndex)
    pipe(
      patterns,
      A.lookup(newIndex),
      O.fold(
        () => () => console.log(`newIndex "${newIndex}" is not in the list`),
        ({ language }) => () => languageSelectedSet(language)
      )
    )()
  }

  return (
    <Card style={style} className={className}>
      <Typography variant="h4">{name}</Typography>
      <Typography variant="body1">{description}</Typography>
      {/* Selects the language */}
      <Tabs
        value={tabIndex}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}
        aria-label="language buttons"
      >
        {pipe(
          patterns,
          A.map(({ language }) => <Tab key={language} label={language} />)
        )}
      </Tabs>
      {pipe(
        patterns,
        A.mapWithIndex((index, props) => (
          <CodeBlock
            className="rounded-b-md"
            key={props.language}
            /* only display code block if selected */
            style={
              index !== tabIndex
                ? {
                    visibility: "hidden",
                    position: "absolute",
                  }
                : {}
            }
            {...props}
          />
        ))
      )}
    </Card>
  )
}
