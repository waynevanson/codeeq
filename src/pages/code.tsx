import * as React from "react"
import { Card, Button, ButtonGroup } from "@material-ui/core"
import { highlightBlock } from "highlight.js"
import { CodeBlock } from "../components/code-block"

// export const Pattern: React.FC<D.Pattern> = ({}) => {}

export const Code: React.FC = () => (
  <div>
    <Card className="px-3">
      {/* use this instead: https://material-ui.com/components/tabs/ */}
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button>Javascript</Button>
        <Button>Haskell</Button>
        <Button>Typescript</Button>
      </ButtonGroup>
      <CodeBlock code="const thunk = () => null" />
    </Card>
  </div>
)
