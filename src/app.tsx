import { console as C, either, io as IO, option as O } from "fp-ts"
import * as ls from "fp-ts-local-storage"
import { flow, pipe } from "fp-ts/lib/function"
import * as d from "io-ts/Decoder"
import * as React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { PageTemplate } from "./components/page-template"
import * as lib from "./lib"
import { Home } from "./pages/home"
import { Statement } from "./pages/statement"
import { Statements } from "./pages/statements"

export const App: React.FC = () => {
  const stateLanguageSelected = lib.useStateLocalStorage(
    "languageSelected",
    "javascript",
    d.string
  )

  const stateLanguagesChosen = lib.useStateLocalStorage(
    "languagesChosen",
    ["javascript"],
    d.array(d.string)
  )

  return (
    <BrowserRouter>
      <PageTemplate>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route
            path="/statements"
            exact
            render={() =>
              Statements({ stateLanguagesChosen, stateLanguageSelected })
            }
          />
          <Route path="/statements/:statement" component={Statement} />
        </Switch>
      </PageTemplate>
    </BrowserRouter>
  )
}
