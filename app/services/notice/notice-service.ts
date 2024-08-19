import { User } from "firebase/auth"
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore"

import { Notice } from "~/services/notice/notice.type"

export async function fetchNotices(user: User) {
  const rawNotices = (
    await getDocs(
      query(
        collection(getFirestore(), "users", user.uid, "notices"),
        orderBy("createdAt", "desc")
      )
    )
  ).docs
  const notices = rawNotices.map<Notice>((snapshot) => {
    const raw = snapshot.data()
    return {
      _id: snapshot.id,
      category: raw.category,
      title: raw.title,
      content: raw.content,
      isAlreadyRead: raw.isAlreadyRead,
      createdAt: raw.createdAt.toDate(),
    }
  })
  return notices
}

export async function markNoticeAsRead(user: User, notice: Notice) {
  if (!notice.isAlreadyRead) {
    const noticeDoc = doc(
      getFirestore(),
      "users",
      user.uid,
      "notices",
      notice._id
    )
    await updateDoc(noticeDoc, {
      isAlreadyRead: true,
    })
  }
}
