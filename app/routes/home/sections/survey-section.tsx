import { Browser } from "@capacitor/browser"
import { InboxIcon } from "@heroicons/react/24/solid"

export function SurveySection() {
  const handleClick = () => {
    Browser.open({ url: "https://forms.gle/zYEQGYHTF1M3qWT2A" })
  }
  return (
    <button
      onClick={handleClick}
      className="my-1.5 flex w-full items-center justify-center gap-2.5 rounded-full border border-primary-100 bg-dark-200 py-2.5 text-primary-100"
    >
      <InboxIcon className="size-7" />
      <p className="font-medium">アンケートにご協力ください</p>
    </button>
  )
}
