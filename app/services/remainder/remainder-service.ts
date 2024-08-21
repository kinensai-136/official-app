import dayjs from "dayjs"
import { User } from "firebase/auth"
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
  writeBatch,
} from "firebase/firestore"

import { Program } from "~/services/program/program.type"

export async function scheduleProgramRemainder(user: User, program: Program) {
  const batch = writeBatch(getFirestore())
  if (program.category === "applicant" || program.category === "classroom") {
    if (program.timeTable1st.length > 0 || program.timeTable2nd.length > 0) {
      const title = `まもなく公演が始まります`
      const content = `お気に入りの企画「${program.title}」はまもなく次の公演が始まります。整理券をお持ちの方はお越しください。`
      for (const period of [...program.timeTable1st, ...program.timeTable2nd]) {
        batch.set(
          doc(collection(getFirestore(), "users", user.uid, "notices")),
          {
            title,
            content,
            category: "remainder",
            createdAt: dayjs(period.startTime).subtract(5, "minutes").toDate(),
            targetProgram: doc(getFirestore(), "programs", program._id),
            targetPeriod: period._id,
          }
        )
      }
    }
  }
  await batch.commit()
}

export async function cancelProgramRemainder(user: User, program: Program) {
  const batch = writeBatch(getFirestore())
  if (program.category === "applicant" || program.category === "classroom") {
    if (program.timeTable1st.length > 0 || program.timeTable2nd.length > 0) {
      const querySnapshot = await getDocs(
        query(
          collection(getFirestore(), "users", user.uid, "notices"),
          where(
            "targetProgram",
            "==",
            doc(getFirestore(), "programs", program._id)
          )
        )
      )
      for (const noticeDoc of querySnapshot.docs) {
        batch.delete(noticeDoc.ref)
      }
    }
  }
  await batch.commit()
}
