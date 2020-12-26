import { highlight } from "highlight.js"
import * as React from "react"
import * as dom from "../domain"
import * as lib from "../lib"

/**
 * @summary
 * Displays a block of code that's been formatted based on language.
 * @todo use prismjs instead of highlihgtjs, as it's overhead is huge.
 */
export const CodeBlock: React.FC<lib.HTMLProps & dom.CodeBlock> = ({
  code,
  language,
  style,
  className = "",
}) => {
  const ref = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    // feels like async speeds up load,
    // does it take it out of react?
    new Promise<void>((res) => {
      if (!ref.current) return
      const result = highlight(language, code)
      ref.current.innerHTML = new DOMParser().parseFromString(
        result.value,
        "text/html"
      ).body.innerHTML
      res()
    })
  }, [code])

  return (
    <pre className={className + ` hljs ${language}` + ""} style={style}>
      <code ref={ref}></code>
    </pre>
  )
}
