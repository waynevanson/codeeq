import { Card, Tab, Tabs, Typography } from "@material-ui/core"
import { array as A, io, option as O } from "fp-ts"
import { constVoid, pipe } from "fp-ts/lib/function"
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
  const [oTabIndex, oTabIndexSet] = React.useState<O.Option<number>>(() =>
    pipe(patterns, findTabIndex(languageSelected))
  )

  // change ther tab index when the language changes
  React.useEffect(() => {
    pipe(
      patterns,
      findTabIndex(languageSelected),
      io.of,
      io.chainFirst((oindex) => () => oTabIndexSet(() => oindex))
    )()
  }, [patterns, languageSelected])

  // todo - use Option structure
  function handleTabChange(newIndex: number) {
    oTabIndexSet(() => O.some(newIndex))
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
      <div className="px-2">
        <Typography variant="h4">{name}</Typography>
        <Typography variant="body1">{description}</Typography>
      </div>
      {/* Selects the language */}
      {/* todo - convert to Record<dom.Language, dom.Pattern> */}
      {/* We currently have dupicate language tabs */}
      {pipe(
        oTabIndex,
        O.map((tabIndex) => (
          <Tabs
            value={tabIndex}
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, index) => handleTabChange(index)}
            aria-label="language buttons"
          >
            {pipe(
              patterns,
              A.map(({ language }) => <Tab key={language} label={language} />)
            )}
          </Tabs>
        )),
        O.getOrElseW(() => "Not Available")
      )}
      {/* todo - convert to Record<dom.Language, dom.Pattern> */}
      {pipe(
        patterns,
        A.mapWithIndex((index, props) => (
          <CodeBlock
            className="rounded-b-md"
            key={props.language}
            /* only display code block if selected */
            style={pipe(
              oTabIndex,
              O.chain(O.fromPredicate((tabIndex) => index === tabIndex)),
              O.fold(
                () => ({ visibility: "hidden", position: "absolute" }),
                () => ({})
              )
            )}
            {...props}
          />
        ))
      )}
    </Card>
  )
}
