import { ChangeEvent, useState } from "react"

import { ArrowRightCircleIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"

import { HeaderBar } from "~/components/layout/header-bar/header-bar"
import { HeaderBarTitle } from "~/components/layout/header-bar/header-bar-title"
import { InformationCard } from "~/routes/home_.students-only/information-card"
import { LiveEmbed } from "~/routes/home_.students-only/live-embed"

export default function Page() {
  const [isLogined, setIsLogined] = useState(false)
  const [isPasswordCorrect, setIsPasswordCorrect] = useState(false)
  const handleClick = () => {
    if (isPasswordCorrect) {
      setIsLogined(true)
    }
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsPasswordCorrect(
      event.target.value === import.meta.env.VITE_STUDENTS_ONLY_PASSWORD
    )
  }
  return (
    <>
      <header className="sticky top-0 z-30">
        <HeaderBar>
          <HeaderBarTitle>高校生徒限定</HeaderBarTitle>
        </HeaderBar>
      </header>
      <main className="space-y-5 px-5">
        {isLogined ? (
          <>
            <InformationCard>
              前夜祭のライブ配信を27日(金)の18時~19時で行います。生徒以外のご視聴はご遠慮ください。
            </InformationCard>
            <LiveEmbed videoId={import.meta.env.VITE_EVE_LIVE_VIDEO_ID} />
          </>
        ) : (
          <div className="space-y-5">
            <InformationCard>
              木曜日に生徒の皆さんに配布したチラシにある、合言葉を入力してください
            </InformationCard>
            <input
              onChange={handleChange}
              placeholder="password"
              className="w-full rounded-sm border border-primary-300 bg-dark-200 px-4 py-3 font-mono text-white focus:outline-none"
            />
            <button
              type="button"
              onClick={handleClick}
              className={clsx(
                "flex w-full items-center justify-center gap-3 rounded-sm p-3.5",
                isPasswordCorrect
                  ? "bg-primary-100 font-semibold text-white"
                  : "bg-dark-300 text-dark-400"
              )}
            >
              <ArrowRightCircleIcon className="size-7" />
              <p className="text-lg">限定エリアへ入場する</p>
            </button>
          </div>
        )}
      </main>
    </>
  )
}
