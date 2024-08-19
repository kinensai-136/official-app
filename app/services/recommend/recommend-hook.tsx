import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import { useFavorite } from "~/services/favorite/favorite-hook"
import { Program } from "~/services/program/program.type"
import { useProgram } from "~/services/program/program-hook"
import { pickUpRecommendProgram } from "~/services/recommend/recommend-service"

type RecommendContext = {
  recommendPrograms: Program[]
}

const RecommendContext = createContext<RecommendContext>({
  recommendPrograms: [],
})

export const useRecommend = () => useContext(RecommendContext)

type Props = {
  children: ReactNode
}

export function RecommendProvider({ children }: Props) {
  const { programs } = useProgram()
  const { favoritePrograms } = useFavorite()
  const [recommendPrograms, setRecommendPrograms] = useState<
    RecommendContext["recommendPrograms"]
  >([])
  useEffect(() => {
    setRecommendPrograms(
      pickUpRecommendProgram(Object.values(programs).flat(), favoritePrograms)
    )
  }, [programs, favoritePrograms])
  return (
    <RecommendContext.Provider value={{ recommendPrograms }}>
      {children}
    </RecommendContext.Provider>
  )
}
