import { ReactNode } from "react"

import { useWindowScroll } from "@uidotdev/usehooks"
import clsx from "clsx"

type Props = {
  children: ReactNode
}

export function HeaderBar({ children }: Props) {
  const [{ y: scrollY }] = useWindowScroll()
  return (
    <div
      className={clsx(
        "w-dvw border-b bg-dark-100/50 px-5 pb-4 pt-[calc(env(safe-area-inset-top)+24px)] backdrop-blur duration-200",
        scrollY != null && scrollY > 20
          ? "border-dark-300/100"
          : "border-dark-300/0"
      )}
    >
      {children}
    </div>
  )
}
