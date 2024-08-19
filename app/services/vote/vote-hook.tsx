import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import { doc, getFirestore, onSnapshot } from "firebase/firestore"

import { useAuth } from "~/services/auth/auth-hook"
import { Program } from "~/services/program/program.type"
import { useProgram } from "~/services/program/program-hook"
import {
  fetchVotedClassroomProgram,
  fetchVotedStagePerformancePrograms,
  unvoteClassroomProgram as unvoteClassroomProgramAsService,
  unvoteStagePerformanceProgram as unvoteStagePerformanceProgramAsService,
  voteClassroomProgram as voteClassroomProgramAsService,
  voteStagePerformanceProgram as voteStagePerformanceProgramAsService,
} from "~/services/vote/vote-service"

type VoteContext = {
  votedClassroomProgram: Program | undefined
  votedStagePerformancePrograms: Program[]
  isVotedClassroomProgram: (program: Program) => boolean
  isVotedStagePerformanceProgram: (program: Program) => boolean
  voteClassroomProgram: (program: Program) => Promise<void>
  voteStagePerformanceProgram: (program: Program) => Promise<void>
  unvoteClassroomProgram: () => Promise<void>
  unvoteStagePerformanceProgram: (program: Program) => Promise<void>
}

const VoteContext = createContext<VoteContext>({
  votedClassroomProgram: undefined,
  votedStagePerformancePrograms: [],
  isVotedClassroomProgram: () => false,
  isVotedStagePerformanceProgram: () => false,
  voteClassroomProgram: async () => {},
  voteStagePerformanceProgram: async () => {},
  unvoteClassroomProgram: async () => {},
  unvoteStagePerformanceProgram: async () => {},
})

export const useVote = () => useContext(VoteContext)

type Props = {
  children: ReactNode
}

export function VoteProvider({ children }: Props) {
  const { currentUser } = useAuth()
  const { programs } = useProgram()
  const [votedClassroomProgram, setVotedClassroomProgram] =
    useState<VoteContext["votedClassroomProgram"]>()
  const [votedStagePerformancePrograms, setVotedStagePerformancePrograms] =
    useState<VoteContext["votedStagePerformancePrograms"]>([])
  const isVotedClassroomProgram = (program: Program) =>
    votedClassroomProgram?._id === program._id
  const isVotedStagePerformanceProgram = (program: Program) =>
    votedStagePerformancePrograms?.some(({ _id }) => _id === program._id)
  const voteClassroomProgram = async (program: Program) => {
    if (currentUser) {
      await voteClassroomProgramAsService(currentUser, program)
    }
  }
  const voteStagePerformanceProgram = async (program: Program) => {
    if (currentUser) {
      await voteStagePerformanceProgramAsService(currentUser, program)
    }
  }
  const unvoteClassroomProgram = async () => {
    if (currentUser) {
      await unvoteClassroomProgramAsService(currentUser)
    }
  }
  const unvoteStagePerformanceProgram = async (program: Program) => {
    if (currentUser) {
      await unvoteStagePerformanceProgramAsService(currentUser, program)
    }
  }
  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(
        doc(getFirestore(), "users", currentUser.uid),
        async () => {
          setVotedClassroomProgram(
            await fetchVotedClassroomProgram(
              Object.values(programs).flat(),
              currentUser
            )
          )
          setVotedStagePerformancePrograms(
            await fetchVotedStagePerformancePrograms(
              Object.values(programs).flat(),
              currentUser
            )
          )
        }
      )
      return unsubscribe
    }
  }, [currentUser, programs])
  return (
    <VoteContext.Provider
      value={{
        votedClassroomProgram,
        votedStagePerformancePrograms,
        isVotedClassroomProgram,
        isVotedStagePerformanceProgram,
        voteClassroomProgram,
        voteStagePerformanceProgram,
        unvoteClassroomProgram,
        unvoteStagePerformanceProgram,
      }}
    >
      {children}
    </VoteContext.Provider>
  )
}
