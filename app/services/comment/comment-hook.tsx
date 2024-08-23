import { createContext, ReactNode, useContext } from "react"

import { useAuth } from "~/services/auth/auth-hook"
import { Comment } from "~/services/comment/comment.type"
import { sendComment as sendCommentAsService } from "~/services/comment/comment-service"

type CommentContext = {
  sendComment: (comment: Comment) => Promise<void>
}

const CommentContext = createContext<CommentContext>({
  sendComment: async () => {},
})

export const useComment = () => useContext(CommentContext)

type Props = {
  children: ReactNode
}

export function CommentProvider({ children }: Props) {
  const { currentUser } = useAuth()
  const sendComment = async (comment: Comment) => {
    if (currentUser) {
      await sendCommentAsService(currentUser, comment)
    }
  }
  return (
    <CommentContext.Provider
      value={{
        sendComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  )
}
