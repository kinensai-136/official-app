import { Browser } from "@capacitor/browser"
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid"

export function PamphletSection() {
  const handleClick = () => {
    Browser.open({ url: "https://kinensai.jp/pamphlet" })
  }
  return (
    <button
      onClick={handleClick}
      className="my-1.5 flex w-full items-center justify-center gap-2.5 rounded-full border border-primary-200 bg-dark-200 py-2.5 text-primary-200"
    >
      <ArrowRightCircleIcon className="size-7" />
      <p className="font-medium">デジタルパンフレットはこちら</p>
    </button>
  )
}
