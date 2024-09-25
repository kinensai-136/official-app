import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline"
import { Link } from "@remix-run/react"

export function ReturnButton() {
  return (
    <Link
      to="/map"
      className="flex items-center gap-3 rounded-full bg-primary-100 px-5 py-2 text-white"
    >
      <ArrowUturnLeftIcon className="size-5 stroke-2" />
      <p className="font-medium">マップへ戻る</p>
    </Link>
  )
}
