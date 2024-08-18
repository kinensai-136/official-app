import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import { doc, getFirestore, onSnapshot } from "firebase/firestore"

import { useAuth } from "~/services/auth/auth-hook"
import {
  disfavorProgram as disfavorProgramAsService,
  favorProgram as favorProgramAsService,
  fetchFavoritePrograms,
} from "~/services/favorite/favorite-service"
import { Program } from "~/services/program/program.type"
import { useProgram } from "~/services/program/program-hook"

type FavoriteContext = {
  favoritePrograms: Program[]
  isFavoriteProgram: (program: Program) => boolean
  favorProgram: (program: Program) => Promise<void>
  disfavorProgram: (program: Program) => Promise<void>
}

const FavoriteContext = createContext<FavoriteContext>({
  favoritePrograms: [],
  isFavoriteProgram: () => false,
  favorProgram: async () => {},
  disfavorProgram: async () => {},
})

export const useFavorite = () => useContext(FavoriteContext)

type Props = {
  children: ReactNode
}

export function FavoriteProvider({ children }: Props) {
  const { currentUser } = useAuth()
  const { programs } = useProgram()
  const [favoritePrograms, setFavoritePrograms] = useState<
    FavoriteContext["favoritePrograms"]
  >([])
  const isFavoriteProgram = (program: Program) =>
    favoritePrograms.some(({ _id }) => program._id === _id)
  const favorProgram = async (program: Program) => {
    if (currentUser) {
      await favorProgramAsService(currentUser, program)
    }
  }
  const disfavorProgram = async (program: Program) => {
    if (currentUser) {
      await disfavorProgramAsService(currentUser, program)
    }
  }
  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(
        doc(getFirestore(), "users", currentUser.uid),
        async () => {
          setFavoritePrograms(
            await fetchFavoritePrograms(
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
    <FavoriteContext.Provider
      value={{
        favoritePrograms,
        isFavoriteProgram,
        favorProgram,
        disfavorProgram,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  )
}
