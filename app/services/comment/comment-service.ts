import { User } from "firebase/auth"
import { addDoc, collection, doc, getFirestore } from "firebase/firestore"

import { Comment } from "~/services/comment/comment.type"
import { showToast } from "~/utils/show-toast"

export async function sendComment(user: User, comment: Comment) {
  const programDoc = doc(getFirestore(), "programs", comment.program._id)
  const userCommentColelction = collection(
    getFirestore(),
    "users",
    user.uid,
    "comments"
  )
  await addDoc(userCommentColelction, {
    body: comment.body,
    program: programDoc,
  })
  showToast("応援ありがとうございます！")
}
