import { BookmarkIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"

import { useFavorite } from "~/services/favorite/favorite-hook"
import { Program } from "~/services/program/program.type"
import { useVote } from "~/services/vote/vote-hook"

type Props = {
  program: Program
}

export function VoteCard({ program }: Props) {
  const { isFavoriteProgram } = useFavorite()
  const { isVotedClassroomProgram, isVotedStagePerformanceProgram } = useVote()
  const isFavorite = isFavoriteProgram(program)
  const isVoted =
    isVotedClassroomProgram(program) || isVotedStagePerformanceProgram(program)
  const handleClick = async () => {
    /*if (program.category === "classroom") {
      if (isVoted) {
        await unvoteClassroomProgram()
      } else {
        await voteClassroomProgram(program)
      }
    }
    if (
      program.category === "stage" &&
      program.organizer === "パフォーマンス大会"
    ) {
      if (isVoted) {
        await unvoteStagePerformanceProgram(program)
      } else {
        if (votedStagePerformancePrograms.length >= 3) {
          const swappedProgram = votedStagePerformancePrograms[0]
          await voteStagePerformanceProgram(program, swappedProgram)
        } else {
          await voteStagePerformanceProgram(program)
        }
      }
    }*/
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "w-full rounded-sm bg-dark-200 px-5 py-3.5 text-left",
        isVoted && "rounded p-1 outline outline-1 outline-primary-200"
      )}
    >
      <div className="flex gap-2">
        <p className="text-sm text-dark-600">{program.organizer}</p>
        {isVoted && (
          <p className="rounded-full bg-primary-100 px-2.5 text-sm font-medium text-white">
            投票済
          </p>
        )}
        {isFavorite && (
          <div className="ml-auto flex gap-1 text-yellow">
            <BookmarkIcon className="size-5" />
            <p className="text-sm font-medium">お気に入り</p>
          </div>
        )}
      </div>
      <h1 className="mt-0.5 truncate text-lg font-semibold text-white">
        {program.title}
      </h1>
    </button>
  )
}
