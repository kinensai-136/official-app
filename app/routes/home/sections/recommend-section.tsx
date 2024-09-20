import { useEffect, useState } from "react"

import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/solid"
import { Link } from "@remix-run/react"

import { ProgramCard } from "~/components/program/program-card"
import { Program } from "~/services/program/program.type"
import { useRecommend } from "~/services/recommend/recommend-hook"

export function RecommendSection() {
  const { recommendPrograms } = useRecommend()
  const [recommendProgram, setRecommendProgram] = useState<
    Program | undefined
  >()
  useEffect(() => {
    setRecommendProgram(
      recommendPrograms[Math.floor(Math.random() * recommendPrograms.length)]
    )
  }, [recommendPrograms])
  return (
    <section className="space-y-3">
      <h2 className="px-0.5 text-xl font-medium text-white">
        あなたへのおすすめ
      </h2>
      {recommendProgram ? (
        <div className="space-y-2">
          <div className="flex gap-2.5 rounded bg-dark-200 px-4 py-3 text-dark-600">
            <ChatBubbleOvalLeftEllipsisIcon className="size-6 shrink-0" />
            <p>{recommendProgram.introduction}</p>
          </div>
          <ProgramCard program={recommendProgram} />
        </div>
      ) : (
        <p className="w-full p-3 text-center text-dark-400">
          あなたへのおすすめがありません・・・
          <br />
          <Link to="/home/search" className="text-primary-300">
            企画を探して
          </Link>
          て、お気に入りを見つけよう
        </p>
      )}
    </section>
  )
}
