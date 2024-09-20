import { BellSlashIcon } from "@heroicons/react/24/solid"

export function NotFoundCard() {
  return (
    <div className="flex flex-col items-center gap-3 py-12 text-center text-dark-600">
      <BellSlashIcon className="size-12 text-dark-400" />
      <p>受信箱は空っぽのようです</p>
    </div>
  )
}
