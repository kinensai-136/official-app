import { Program } from "~/services/program/program.type"

export function pickUpRecommendProgram(
  allPrograms: Program[],
  favoritePrograms: Program[]
) {
  const orderedTags = orderByFrequency(
    favoritePrograms.flatMap(({ tags }) => tags)
  )
  const orderedCategories = orderByFrequency(
    favoritePrograms.map(({ category }) => category)
  )
  const calculatePoint = (program: Program) => {
    const tagsPoint =
      (program.tags.includes(orderedTags[0]) ? 5 : 1) +
      (program.tags.includes(orderedTags[1]) ? 3 : 1)
    const categoryPoint = 5 - orderedCategories.indexOf(program.category)
    return tagsPoint + categoryPoint
  }
  const recommendPrograms = allPrograms
    .filter(
      (program) =>
        !favoritePrograms.some(({ _id }) => _id === program._id) &&
        calculatePoint(program) > 0
    )
    .sort((a, b) => calculatePoint(b) - calculatePoint(a))
    .slice(0, 3)
  return recommendPrograms
}

function orderByFrequency<T>(array: T[]): T[] {
  const index = new Map<T, number>()
  array.forEach((value) => {
    const count = index.get(value)
    if (count) {
      index.set(value, count + 1)
    } else {
      index.set(value, 1)
    }
  })
  return [...new Set(array)].sort((a, b) => index.get(b)! - index.get(a)!)
}
