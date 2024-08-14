import { Dispatch, SetStateAction, useEffect, useState } from "react"

import { Program, ProgramCategory } from "~/services/program/program.type"
import { getPrograms, getProgramTags } from "~/services/program/program-service"

type Props = {
  text: string
  setText: Dispatch<SetStateAction<Props["text"]>>
  categories: ProgramCategory[]
  setCategories: Dispatch<SetStateAction<Props["categories"]>>
  tags: string[]
  setTags: Dispatch<SetStateAction<Props["tags"]>>
  validTags: string[]
  programs: Program[]
}

export function useSearch(): Props {
  const [text, setText] = useState<Props["text"]>("")
  const [categories, setCategories] = useState<Props["categories"]>([
    "applicant",
    "auditorium",
    "classroom",
    "stage",
  ])
  const [tags, setTags] = useState<Props["tags"]>([])
  const [validTags, setValidTags] = useState<Props["validTags"]>([])
  const [programs, setPrograms] = useState<Props["programs"]>([])
  useEffect(() => {
    setPrograms(search(text, categories, tags))
    setValidTags(getProgramTags(categories))
  }, [text, categories, tags])
  return {
    text,
    setText,
    categories,
    setCategories,
    tags,
    setTags,
    validTags,
    programs,
  }
}

function search(text: string, categories: ProgramCategory[], tags: string[]) {
  const programs = getPrograms(categories)
  const detectedPrograms: Program[] = []
  for (const program of programs) {
    if (
      (!text ||
        program.title.includes(text) ||
        program.organizer.includes(text)) &&
      (!tags.length ||
        program.tags.find((tag) => tags.includes(tag)) !== undefined)
    ) {
      detectedPrograms.push(program)
    }
  }
  return detectedPrograms
}
