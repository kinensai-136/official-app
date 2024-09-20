import { ComponentType, ReactNode } from "react"

type Component = ComponentType<{ children: ReactNode }>

type Props = {
  providers: [Component, ...Component[]]
  children: ReactNode
}

export function MergedProvider({ providers, children }: Props) {
  const Providers = providers.reduce((A, B) => {
    return function C({ children }: { children: ReactNode }) {
      return (
        <A>
          <B>{children}</B>
        </A>
      )
    }
  })
  return <Providers>{children}</Providers>
}
