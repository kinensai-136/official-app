import { ReactNode } from "react"

import { Link } from "@remix-run/react"
import clsx from "clsx"

type Props = {
  to: string
  label: string
  icon: ReactNode
  selectedIcon: ReactNode
  isSelected: boolean
  onClick: () => void
}

export function NavItem({
  to,
  label,
  icon,
  selectedIcon,
  isSelected,
  onClick,
}: Props) {
  return (
    <Link
      to={to}
      className={clsx(
        "flex w-14 flex-col items-center gap-1 font-medium duration-100",
        isSelected ? "text-primary-300" : "text-dark-400"
      )}
      onClick={onClick}
    >
      <div className="size-7">{isSelected ? selectedIcon : icon}</div>
      <p className="text-[0.65rem]">{label}</p>
    </Link>
  )
}
