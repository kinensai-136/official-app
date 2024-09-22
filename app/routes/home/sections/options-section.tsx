import { Browser } from "@capacitor/browser"

const buttonStyle =
  "rounded-[0.8rem] text-center bg-dark-200 p-2.5 text-dark-600"

export function OptionsSection() {
  return (
    <section className="space-y-3 py-2">
      <h2 className="px-0.5 text-xl font-medium text-white">各種オプション</h2>
      <div className="grid grid-cols-2 gap-1">
        <OfficialHPButton />
      </div>
    </section>
  )
}

function OfficialHPButton() {
  const handleClick = () => Browser.open({ url: "https://kinensai.jp" })
  return (
    <button onClick={handleClick} className={buttonStyle}>
      公式HP
    </button>
  )
}
