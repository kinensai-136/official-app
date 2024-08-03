type Props = {
  children: string
}

export function HeaderBarTitle({ children }: Props) {
  return <h1 className="px-1 text-2xl font-semibold text-white">{children}</h1>
}
