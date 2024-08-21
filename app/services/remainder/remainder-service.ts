import {
  LocalNotificationDescriptor,
  LocalNotifications,
  LocalNotificationSchema,
} from "@capacitor/local-notifications"
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
  const notifications: LocalNotificationSchema[] = []
  if (program.category === "applicant" || program.category === "classroom") {
    if (program.timeTable1st.length > 0 || program.timeTable2nd.length > 0) {
      for (const period of [...program.timeTable1st, ...program.timeTable2nd]) {
        const localNotificationId = Math.floor(Math.random() * 10000000)
        const sendAt = dayjs(period.startTime).subtract(5, "minutes").toDate()
        if (dayjs(sendAt).isBefore()) {
          continue
        }
        batch.set(
          doc(collection(getFirestore(), "users", user.uid, "notices")),
          {
            title: `まもなく公演が始まります`,
            content: `お気に入りの企画「${program.title}」の公演が${dayjs(period.startTime).format("HH:mm")}から始まります。整理券をお持ちの方はお越しください。`,
            category: "remainder",
            createdAt: sendAt,
            targetProgram: doc(getFirestore(), "programs", program._id),
            targetPeriod: period._id,
            localNotificationId,
          }
        )
        notifications.push({
          id: localNotificationId,
          title: `✨まもなく公演が始まります`,
          body: `「${program.title}」の次の公演が${program.location}にて${dayjs(period.startTime).format("HH:mm")}から始まります`,
          schedule: {
            at: sendAt,
            allowWhileIdle: true,
          },
        })
      }
    }
  }
  await batch.commit()
  if (notifications.length > 0) {
    await LocalNotifications.schedule({ notifications })
  }
}

export async function cancelProgramRemainder(user: User, program: Program) {
  const batch = writeBatch(getFirestore())
  const notifications: LocalNotificationDescriptor[] = []
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
        const localNotificationId = noticeDoc.data()
          .localNotificationId as number
        batch.delete(noticeDoc.ref)
        notifications.push({ id: localNotificationId })
      }
    }
  }
  await batch.commit()
  if (notifications.length > 0) {
    await LocalNotifications.cancel({ notifications })
  }
}
