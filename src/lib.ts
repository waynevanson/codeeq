import { io as IO } from "fp-ts"
import { Endomorphism, Lazy, tuple } from "fp-ts/lib/function"
import * as React from "react"

export type HTMLProps = {
  className?: string
  style?: React.CSSProperties
}

export const indexAsKey = <K, A extends object>(key: K, a: A) =>
  Object.assign({}, a, { key }) as A & { key: K }

export type UseState<A> = [A, React.Dispatch<React.SetStateAction<A>>]

// global state is the actual document title.
export function useTitle(initialValue?: string) {
  const [title, titleSet] = React.useState(initialValue)

  React.useEffect(() => {
    if (initialValue !== undefined) {
      document.title = initialValue
    }
  }, [])

  const externalTitleSet = (newTitle: string) => {
    document.title = newTitle
  }

  React.useEffect(() => {
    if (title === document.title) return
    titleSet(document.title)
  })

  return [title, externalTitleSet] as const
}

export function capitalize(s: string) {
  return s.slice(0, 1).toUpperCase() + s.slice(1)
}

export function lowercase(s: string) {
  return s.toLowerCase()
}

export type UseFunctionalStateSet<A> = (f: Endomorphism<A>) => IO.IO<void>
export type UseFunctionalState<A> = [A, UseFunctionalStateSet<A>]

export function useFunctionalState<A>(lazy: Lazy<A>): UseFunctionalState<A> {
  const [state, stateSet] = React.useState(lazy)

  const stateSetExternal: UseFunctionalStateSet<A> = React.useCallback(
    (endomorphism) => () => {
      stateSet(endomorphism)
    },
    [state, stateSet]
  )

  return [state, stateSetExternal]
}
