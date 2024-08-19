import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"

import { collection, getFirestore, onSnapshot } from "firebase/firestore"

import { useAuth } from "~/services/auth/auth-hook"
import { Notice } from "~/services/notice/notice.type"
import {
  fetchNotices,
  markNoticeAsRead as markNoticeAsReadAsService,
} from "~/services/notice/notice-service"

type NoticeContext = {
  notices: Notice[]
  markNoticeAsRead: (notice: Notice) => Promise<void>
}

const NoticeContext = createContext<NoticeContext>({
  notices: [],
  markNoticeAsRead: async () => {},
})

export const useNotice = () => useContext(NoticeContext)

type Props = {
  children: ReactNode
}

export function NoticeProvider({ children }: Props) {
  const { currentUser } = useAuth()
  const [notices, setNotices] = useState<Notice[]>([])
  const markNoticeAsRead = async (notice: Notice) => {
    if (currentUser) {
      await markNoticeAsReadAsService(currentUser, notice)
    }
  }
  useEffect(() => {
    if (currentUser) {
      const unsubscribe = onSnapshot(
        collection(getFirestore(), "users", currentUser.uid, "notices"),
        async () => {
          setNotices(await fetchNotices(currentUser))
        }
      )
      return () => {
        unsubscribe()
      }
    }
  }, [currentUser])
  return (
    <NoticeContext.Provider
      value={{
        notices,
        markNoticeAsRead,
      }}
    >
      {children}
    </NoticeContext.Provider>
  )
}
