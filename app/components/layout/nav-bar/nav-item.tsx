import { ReactNode } from "react"

import { Link, useLocation } from "@remix-run/react"
import clsx from "clsx"

type Props = {
  to: string
  label: string
  icon: ReactNode
  selectedIcon: ReactNode
}

export function NavItem({ to, label, icon, selectedIcon }: Props) {
  const pathname = useLocation().pathname
  const isSelected = pathname.startsWith(to)
  console.log(pathname)
  return (
    <Link
      to={to}
      className={clsx(
        "flex w-14 flex-col items-center gap-1 font-medium duration-100",
        isSelected ? "text-primary-300" : "text-dark-400"
      )}
    >
      <div className="size-7">{isSelected ? selectedIcon : icon}</div>
      <p className="text-[0.65rem]">{label}</p>
    </Link>
  )
}
