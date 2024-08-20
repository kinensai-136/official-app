import {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState,
} from "react"

import { Program, ProgramCategory } from "~/services/program/program.type"
import { fetchPrograms } from "~/services/program/program-service"

type ProgramContext = {
  programs: Record<ProgramCategory, Program[]>
  programTags: Record<ProgramCategory, string[]>
}

const ProgramContext = createContext<ProgramContext>({
  programs: {
    applicant: [],
    auditorium: [],
    classroom: [],
    stage: [],
  },
  programTags: {
    applicant: [],
    auditorium: [],
    classroom: [],
    stage: [],
  },
})

export const useProgram = () => useContext(ProgramContext)

type Props = {
  children: ReactNode
}

export function ProgramProvider({ children }: Props) {
  const [programs, setPrograms] = useState<ProgramContext["programs"]>({
    applicant: [],
    auditorium: [],
    classroom: [],
    stage: [],
  })
  const [programTags, setProgramTags] = useState<ProgramContext["programTags"]>(
    {
      applicant: [],
      auditorium: [],
      classroom: [],
      stage: [],
    }
  )
  useLayoutEffect(() => {
    const asyncRun = async () => {
      const programs = await fetchPrograms()
      setPrograms(programs)
      setProgramTags(
        Object.fromEntries(
          Object.entries(programs).map(([category, value]) => [
            category,
            [...new Set(value.flatMap(({ tags }) => tags))],
          ])
        ) as Record<ProgramCategory, string[]>
      )
    }
    asyncRun()
  }, [])
  return (
    <ProgramContext.Provider
      value={{
        programs,
        programTags,
      }}
    >
      {children}
    </ProgramContext.Provider>
  )
}
