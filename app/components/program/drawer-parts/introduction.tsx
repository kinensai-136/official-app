type Props = {
  children: string
}

export function Introduction({ children }: Props) {
  return <p className="rounded bg-dark-300 px-4 py-3">{children}</p>
}
