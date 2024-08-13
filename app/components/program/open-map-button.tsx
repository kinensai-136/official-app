import { ArrowRightCircleIcon } from "@heroicons/react/24/solid"
import { Link } from "@remix-run/react"

export function OpenMapButton() {
  return (
    <Link
      to="/map"
      className="flex w-full items-center justify-center gap-3 rounded-sm bg-primary-100 p-3"
    >
      <ArrowRightCircleIcon className="size-8" />
      <p className="text-lg font-semibold">マップで開く</p>
    </Link>
  )
}
