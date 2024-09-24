import { ShoppingBagIcon } from "@heroicons/react/24/solid"
import { Link } from "@remix-run/react"

export function BoothButton() {
  return (
    <Link
      to="/map/booth"
      className="flex items-center gap-3 rounded-full bg-primary-100 px-5 py-2 text-white"
    >
      <ShoppingBagIcon className="size-6" />
      <p className="font-medium">模擬店リスト</p>
    </Link>
  )
}
