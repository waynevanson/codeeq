export type HTMLProps = {
  className?: string
  style?: React.CSSProperties
}

export const indexAsKey = <K, A extends object>(key: K, a: A) =>
  Object.assign({}, a, { key }) as A & { key: K }

export type UseState<A> = [A, React.Dispatch<React.SetStateAction<A>>]
