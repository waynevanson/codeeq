import { console as C, either, io as IO, option as O } from "fp-ts"
import * as ls from "fp-ts-local-storage"
import { Endomorphism, flow, Lazy, pipe } from "fp-ts/lib/function"
import * as d from "io-ts/Decoder"
import * as React from "react"
import * as lib from "./lib"

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

export function useStateLocalStorage<A>(
  key: string,
  defaultValue: A,
  decoder: d.Decoder<string, A>
) {
  return lib.useFunctionalState(
    pipe(
      ls.getItem(key),
      IO.map(O.chain(flow(decoder.decode, O.fromEither))),
      IO.chain(
        flow(
          O.fold(
            () =>
              pipe(
                either.stringifyJSON(defaultValue, (e) => e),
                either.fold(
                  () => C.error(`failed to stringify "${defaultValue}"`),
                  (defaultValueString) =>
                    pipe(ls.setItem(key, defaultValueString))
                ),
                IO.map(() => defaultValue)
              ),
            IO.of
          )
        )
      )
    )
  )
}
