import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { Program, ProgramCategory } from "~/services/program/program.type"
import { useProgram } from "~/services/program/program-hook"

type Props = {
  text: string
  setText: Dispatch<SetStateAction<Props["text"]>>
  categories: ProgramCategory[]
  setCategories: Dispatch<SetStateAction<Props["categories"]>>
  tags: string[]
  setTags: Dispatch<SetStateAction<Props["tags"]>>
  validTags: string[]
  searchedPrograms: Program[]
}

export function useSearch(): Props {
  const { programs, programTags } = useProgram()
  const [text, setText] = useState<Props["text"]>("")
  const [categories, setCategories] = useState<Props["categories"]>([
    "applicant",
    "auditorium",
    "classroom",
    "stage",
  ])
  const [tags, setTags] = useState<Props["tags"]>([])
  const [validTags, setValidTags] = useState<Props["validTags"]>([])
  const [searchedPrograms, setSearchedPrograms] = useState<
    Props["searchedPrograms"]
  >([])
  useEffect(() => {
    setSearchedPrograms(
      search(
        Object.entries(programs)
          .filter(([category]) =>
            categories.includes(category as ProgramCategory)
          )
          .flatMap(([, programs]) => programs),
        text,
        tags
      )
    )
    setValidTags([
      ...new Set(
        Object.entries(programTags)
          .filter(([category]) =>
            categories.includes(category as ProgramCategory)
          )
          .flatMap(([, tags]) => tags)
      ),
    ])
  }, [programs, programTags, text, categories, tags])
  return {
    text,
    setText,
    categories,
    setCategories,
    tags,
    setTags,
    validTags,
    searchedPrograms,
  }
}

function search(programs: Program[], text: string, tags: string[]) {
  const searchedPrograms: Program[] = []
  for (const program of programs) {
    if (
      (!text ||
        program.title.includes(text) ||
        program.organizer.includes(text)) &&
      (!tags.length ||
        program.tags.find((tag) => tags.includes(tag)) !== undefined)
    ) {
      searchedPrograms.push(program)
    }
  }
  return searchedPrograms
}
