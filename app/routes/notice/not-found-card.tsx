import { BellSlashIcon } from "@heroicons/react/24/solid"

export function NotFoundCard() {
  return (
    <div className="flex flex-col items-center gap-3 py-9 text-center text-dark-600">
      <BellSlashIcon className="size-12 text-dark-400" />
      <p>受信箱は空っぽのようです</p>
      <p>
        <span className="text-primary-300">しばらく待つ</span>
        と、新しいお知らせが届くかも？
      </p>
    </div>
  )
}
