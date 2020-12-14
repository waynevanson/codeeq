import { highlightBlock } from "highlight.js"
import * as React from "react"

export const CodeBlock: React.FC<{
  code: string
  className?: string
  style?: React.CSSProperties
}> = ({ code }) => {
  const ref = React.useRef<HTMLPreElement>(null)

  // takes 352 seconds...
  React.useEffect(() => {
    if (!ref.current) return
    highlightBlock(ref.current)
  }, [code])

  return (
    <pre ref={ref}>
      <code>{code}</code>
    </pre>
  )
}
