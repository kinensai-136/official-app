import clsx from "clsx"

import { FavoriteButton } from "~/components/program/favorite-button"
import { Program } from "~/services/program/program.type"
import { useVote } from "~/services/vote/vote-hook"

type Props = {
  program: Program
}

export function VoteCard({ program }: Props) {
  const {
    votedStagePerformancePrograms,
    isVotedClassroomProgram,
    isVotedStagePerformanceProgram,
    voteClassroomProgram,
    voteStagePerformanceProgram,
    unvoteClassroomProgram,
    unvoteStagePerformanceProgram,
  } = useVote()
  const isVoted =
    isVotedClassroomProgram(program) || isVotedStagePerformanceProgram(program)
  const handleClick = async () => {
    if (program.category === "classroom") {
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
          await unvoteStagePerformanceProgram(votedStagePerformancePrograms[0])
        }
        await voteStagePerformanceProgram(program)
      }
    }
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "w-full",
        isVoted && "rounded p-1 outline outline-1 outline-primary-100"
      )}
    >
      <div className="flex justify-between gap-3 rounded-sm bg-dark-200 px-5 py-3 text-left">
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-3">
            <p className="text-sm text-dark-600">{program.organizer}</p>
            {isVoted && (
              <p className="rounded-full bg-dark-300 px-2.5 text-sm font-medium text-primary-500">
                投票中
              </p>
            )}
          </div>
          <h1 className="truncate text-lg font-semibold text-white">
            {program.title}
          </h1>
        </div>
        <FavoriteButton size="small" program={program} />
      </div>
    </button>
  )
}

/**

export function VoteCard({ program }: Props) {
  const { isFavoriteProgram } = useFavorite()
  const {
    isVotedClassroomProgram,
    isVotedStagePerformanceProgram,
    voteClassroomProgram,
    voteStagePerformanceProgram,
    unvoteClassroomProgram,
    unvoteStagePerformanceProgram,
  } = useVote()
  const isFavorite = isFavoriteProgram(program)
  const isVoted =
    isVotedClassroomProgram(program) || isVotedStagePerformanceProgram(program)
  const handleClick = () => {
    if (program.category === "classroom") {
      if (isVoted) {
        unvoteClassroomProgram()
      } else {
        voteClassroomProgram(program)
      }
    }
    if (
      program.category === "stage" &&
      program.tags.includes("パフォーマンス大会")
    ) {
      if (isVoted) {
        unvoteStagePerformanceProgram(program)
      } else {
        voteStagePerformanceProgram(program)
      }
    }
  }
  return (
    <button
      type="button"
      onClick={handleClick}
      className={clsx(
        "w-full",
        isVoted && "rounded p-1 outline outline-2 outline-primary-100"
      )}
    >
      <div className="space-y-1 rounded-sm bg-dark-200 px-4 py-3 text-left">
        <div className="flex justify-between">
          <p className="text-sm text-dark-600">{program.organizer}</p>
          {isFavorite && (
            <div className="flex gap-1 text-yellow">
              <BookmarkIcon className="size-5" />
              <p className="text-sm font-medium">お気に入り</p>
            </div>
          )}
        </div>
        <div className="flex items-end justify-between gap-3">
          <h1 className="truncate text-lg font-semibold text-white">
            {program.title}
          </h1>
          {isVoted && (
            <p className="whitespace-nowrap font-medium text-primary-200">
              投票中
            </p>
          )}
        </div>
      </div>
    </button>
  )
}

 */
