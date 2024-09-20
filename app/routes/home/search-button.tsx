import { MagnifyingGlassIcon, ShoppingBagIcon } from "@heroicons/react/24/solid"
import { Link } from "@remix-run/react"

export function SearchButton() {
  return (
    <Link
      to="/home/search"
      className="flex items-center gap-4 rounded-full border border-dark-300 bg-white/5 p-1.5 text-dark-600"
    >
      <MagnifyingGlassIcon className="ml-5 size-6 shrink-0" />
      <p className="mr-auto">企画を検索する</p>
      <Link
        to="/map/booth"
        className="flex items-center gap-2 rounded-full bg-primary-100 px-6 py-2 text-white"
      >
        <ShoppingBagIcon className="size-6" />
        <p className="font-medium">模擬店</p>
      </Link>
    </Link>
  )
}
