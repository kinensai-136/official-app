import { User } from "firebase/auth"
import {
  arrayRemove,
  arrayUnion,
  doc,
  DocumentReference,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore"

import { Program } from "~/services/program/program.type"

export async function fetchFavoritePrograms(
  allPrograms: Program[],
  user: User
) {
  const firestore = getFirestore()
  const userDoc = doc(firestore, "users", user.uid)
  const favoritePrograms: DocumentReference[] =
    (await getDoc(userDoc)).data()?.favoritePrograms ?? []
  return allPrograms.filter((program) =>
    favoritePrograms.some(({ id }) => program._id === id)
  )
}

export async function favorProgram(user: User, program: Program) {
  const firestore = getFirestore()
  const userDoc = doc(firestore, "users", user.uid)
  const programDoc = doc(firestore, "programs", program._id)
  await updateDoc(userDoc, {
    favoritePrograms: arrayUnion(programDoc),
  })
}

export async function disfavorProgram(user: User, program: Program) {
  const firestore = getFirestore()
  const userDoc = doc(firestore, "users", user.uid)
  const programDoc = doc(firestore, "programs", program._id)
  await updateDoc(userDoc, {
    favoritePrograms: arrayRemove(programDoc),
  })
}
