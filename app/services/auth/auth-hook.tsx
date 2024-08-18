import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import { getAuth, onAuthStateChanged, User } from "firebase/auth"

import { initUserIfUndefined } from "~/services/auth/auth-service"

type AuthContext = {
  currentUser: User | null | undefined
}

const AuthContext = createContext<AuthContext>({
  currentUser: undefined,
})

export const useAuth = () => useContext(AuthContext)

type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<AuthContext["currentUser"]>()
  useEffect(() => onAuthStateChanged(getAuth(), setCurrentUser), [])
  useEffect(() => {
    initUserIfUndefined(currentUser)
  }, [currentUser])
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}
