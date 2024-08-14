import { FireIcon } from "@heroicons/react/24/solid"

export function NotFoundCard() {
  return (
    <div className="flex flex-col items-center gap-3 py-9 text-center text-dark-600">
      <FireIcon className="size-12 text-dark-400" />
      <p>お探しの企画が見つかりませんでした</p>
      <p>
        <span className="text-primary-300">タグ</span>
        で絞り込んだり、
        <br />
        <span className="text-primary-300">単語ごと</span>
        にすると見つかるかもしれません
      </p>
    </div>
  )
}
