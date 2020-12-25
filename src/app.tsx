import { console as C, either, io as IO, option as O } from "fp-ts"
import * as ls from "fp-ts-local-storage"
import { flow, pipe } from "fp-ts/lib/function"
import * as React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { PageTemplate } from "./components/page-template"
import * as data from "./data"
import { Home } from "./pages/home"
import { Statement } from "./pages/statement"
import { Statements } from "./pages/statements"
import * as t from "io-ts"

export const localStorageGetOrElse = (key: string, defaultValue: string) =>
  pipe(
    ls.getItem(key),
    IO.chain(
      O.fold(
        () =>
          pipe(
            ls.setItem(key, defaultValue),
            IO.map(() => defaultValue)
          ),
        IO.of
      )
    )
  )

export const getLanguageSelected = localStorageGetOrElse(
  "languageSelected",
  "javascript"
)

export const getLanguagesChosen = pipe(
  localStorageGetOrElse("languagesChosen", JSON.stringify(["javascript"])),
  IO.map((a) =>
    pipe(
      either.parseJSON(a, (e) => e as TypeError),
      either.chainW(t.array(t.string).decode)
    )
  ),
  IO.chainFirst(either.fold(C.error, IO.of)),
  IO.map(O.fromEither)
)

export const App: React.FC = () => {
  const languageSelected = React.useState(getLanguageSelected)
  const languagesChosen = React.useState(getLanguagesChosen)

  return (
    <BrowserRouter>
      <PageTemplate>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/statements"
            exact
            render={() => Statements({ languagesChosen, languageSelected })}
          />
          <Route path="/statements/:statement" component={Statement} />
        </Switch>
      </PageTemplate>
    </BrowserRouter>
  )
}
