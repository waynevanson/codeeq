// an extensive look at the statement. Why it's used, where it came from and common abstractions
import * as React from "react"
import { reader as R } from "fp-ts"
import { pipe } from "fp-ts/lib/pipeable"

export function remap<R, A, B, K extends string>(k: K, fab: (a: A) => B) {
  return (fa: R.Reader<R, A>): R.Reader<R, Omit<A, K> & Record<K, B>> =>
    pipe(
      fa,
      R.map((a) => Object.assign({}, a, { [k]: fab(a) }) as any)
    )
}

export function intersect<Q>() {
  return <R, A>(fa: R.Reader<R, A>): R.Reader<R & Q, A> => fa as any
}

export function htmlProps<K extends keyof JSX.IntrinsicElements>() {
  return <P extends JSX.IntrinsicElements[K]>(props = {} as P): P => props
}

export function createFactory<K extends keyof JSX.IntrinsicElements>(tag: K) {
  return ({ children, ...props }: JSX.IntrinsicElements[K]): JSX.Element =>
    React.createFactory(tag)(props, children)
}
