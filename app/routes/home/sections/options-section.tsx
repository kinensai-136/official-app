import { Browser } from "@capacitor/browser"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid"
import { Link } from "@remix-run/react"

export function OptionsSection() {
  return (
    <section className="space-y-3 py-2">
      <h2 className="px-0.5 text-xl font-medium text-white">各種オプション</h2>
      <div className="grid grid-cols-2 gap-1">
        <OfficialHPButton />
        <OfficialTwitterXButton />
        <OfficialInstagramButton />
        <StudentsOnlyButton />
        <SupportButton />
      </div>
    </section>
  )
}

function OfficialHPButton() {
  return (
    <Link
      to="https://kinensai.jp"
      className="flex items-center justify-between rounded-[0.8rem] bg-dark-200 px-5 py-2.5 text-dark-600"
    >
      ホームページ
      <ArrowTopRightOnSquareIcon className="size-5 text-dark-400" />
    </Link>
  )
}

function OfficialTwitterXButton() {
  return (
    <Link
      to="https://x.com/kinensai"
      className="flex items-center justify-between rounded-[0.8rem] bg-dark-200 px-5 py-2.5 text-dark-600"
    >
      X(旧Twitter)
      <ArrowTopRightOnSquareIcon className="size-5 text-dark-400" />
    </Link>
  )
}

function OfficialInstagramButton() {
  return (
    <Link
      to="https://instagram.com/tokaikinensai"
      className="flex items-center justify-between rounded-[0.8rem] bg-dark-200 px-5 py-2.5 text-dark-600"
    >
      Instagram
      <ArrowTopRightOnSquareIcon className="size-5 text-dark-400" />
    </Link>
  )
}

function StudentsOnlyButton() {
  return (
    <Link
      to="/home/students-only"
      className="rounded-[0.8rem] bg-dark-200 px-5 py-2.5 text-center text-dark-600"
    >
      高校生徒限定
    </Link>
  )
}

function SupportButton() {
  const handleClick = () => Browser.open({ url: "https://kinensai.jp/support" })
  return (
    <button
      onClick={handleClick}
      className="rounded-[0.8rem] bg-dark-200 px-5 py-2.5 text-center text-dark-600"
    >
      お問い合わせ
    </button>
  )
}
