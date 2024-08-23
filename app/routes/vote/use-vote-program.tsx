import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { useFavorite } from "~/services/favorite/favorite-hook"
import { Program } from "~/services/program/program.type"
import { useProgram } from "~/services/program/program-hook"
import { useVote } from "~/services/vote/vote-hook"

type Props = {
  text: string
  setText: Dispatch<SetStateAction<Props["text"]>>
  mode: "classroom" | "stage-performance"
  setMode: Dispatch<SetStateAction<Props["mode"]>>
  programList: Program[]
}

export function useVoteProgram(): Props {
  const { programs } = useProgram()
  const { isFavoriteProgram } = useFavorite()
  const { isVotedClassroomProgram, isVotedStagePerformanceProgram } = useVote()
  const [text, setText] = useState<Props["text"]>("")
  const [mode, setMode] = useState<Props["mode"]>("classroom")
  const [programList, setProgramList] = useState<Props["programList"]>([])
  useEffect(() => {
    if (mode === "classroom") {
      setProgramList(
        search(programs.classroom, text)
          .filter((program) => !isVotedClassroomProgram(program))
          .sort(() => Math.random() - 0.5)
          .sort((a, b) =>
            !isFavoriteProgram(a) && isFavoriteProgram(b) ? 1 : -1
          )
      )
    }
    if (mode === "stage-performance") {
      setProgramList(
        search(programs.stage, text)
          .filter(({ organizer }) => organizer === "パフォーマンス大会")
          .filter((program) => !isVotedStagePerformanceProgram(program))
          .sort(() => Math.random() - 0.5)
          .sort((a, b) =>
            !isFavoriteProgram(a) && isFavoriteProgram(b) ? 1 : -1
          )
      )
    }
  }, [
    programs,
    text,
    mode,
    isFavoriteProgram,
    isVotedClassroomProgram,
    isVotedStagePerformanceProgram,
  ])
  return {
    text,
    setText,
    mode,
    setMode,
    programList,
  }
}

function search(allPrograms: Program[], text: string) {
  const searchedPrograms: Program[] = []
  for (const program of allPrograms) {
    if (
      !text ||
      program.title.includes(text) ||
      program.organizer.includes(text)
    ) {
      searchedPrograms.push(program)
    }
  }
  return searchedPrograms
}
