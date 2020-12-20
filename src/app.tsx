import * as React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import { PageTemplate } from "./components/page-template"
import * as D from "./domain"
import { Home } from "./pages/home"
import { Statement } from "./pages/statement"
import { Statements } from "./pages/statements"

export const App: React.FC = () => {
  const languageSelected = React.useState<D.Language>("typescript")
  const languages = React.useState<Array<D.Language>>(["typescript"])

  return (
    <BrowserRouter>
      <PageTemplate>
        <Switch>
          <Route path="/" exact component={Home} />
          {/* search params for filters */}
          <Route
            path="/statements"
            exact
            render={() => Statements({ languages, languageSelected })}
          />
          <Route path="/statements/:statement" component={Statement} />
        </Switch>
      </PageTemplate>
    </BrowserRouter>
  )
}
