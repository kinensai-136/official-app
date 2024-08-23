import { User } from "firebase/auth"
import {
  arrayRemove,
  arrayUnion,
  doc,
  DocumentReference,
  getDoc,
  getFirestore,
  runTransaction,
  updateDoc,
} from "firebase/firestore"

import { Program } from "~/services/program/program.type"
import { showToast } from "~/utils/show-toast"

export async function fetchVotedClassroomProgram(
  allPrograms: Program[],
  user: User
) {
  const userDoc = doc(getFirestore(), "users", user.uid)
  const userDocSnapshot = await getDoc(userDoc)
  const votedClassroomProgramRef = userDocSnapshot.data()
    ?.votedClassroomProgram as DocumentReference | undefined
  const votedClassroomProgram = allPrograms.find(
    ({ _id }) => _id === votedClassroomProgramRef?.id
  )
  return votedClassroomProgram
}

export async function voteClassroomProgram(user: User, program: Program) {
  const userDoc = doc(getFirestore(), "users", user.uid)
  const programDoc = doc(getFirestore(), "programs", program._id)
  await updateDoc(userDoc, {
    votedClassroomProgram: programDoc,
  })
  showToast("投票ありがとうございます！")
}

export async function unvoteClassroomProgram(user: User) {
  const userDoc = doc(getFirestore(), "users", user.uid)
  await updateDoc(userDoc, {
    votedClassroomProgram: null,
  })
}

export async function fetchVotedStagePerformancePrograms(
  allPrograms: Program[],
  user: User
) {
  const userDoc = doc(getFirestore(), "users", user.uid)
  const userDocSnapshot = await getDoc(userDoc)
  const votedStagePerformanceProgramRefs =
    (userDocSnapshot.data()?.votedStagePerformancePrograms as
      | DocumentReference[]
      | undefined) ?? []
  const votedStagePerformancePrograms = []
  for (const votedStagePerformanceProgramRef of votedStagePerformanceProgramRefs) {
    const votedStagePerformanceProgram = allPrograms.find(
      ({ _id }) => _id === votedStagePerformanceProgramRef?.id
    )
    if (votedStagePerformanceProgram) {
      votedStagePerformancePrograms.push(votedStagePerformanceProgram)
    }
  }
  return votedStagePerformancePrograms
}

export async function voteStagePerformanceProgram(
  user: User,
  program: Program,
  swappedProgram?: Program
) {
  const firestore = getFirestore()
  const userDoc = doc(firestore, "users", user.uid)
  const programDoc = doc(firestore, "programs", program._id)
  if (swappedProgram) {
    await runTransaction(firestore, async (transaction) => {
      const swappedProgramDoc = doc(firestore, "programs", swappedProgram._id)
      transaction.get(userDoc)
      transaction.update(userDoc, {
        votedStagePerformancePrograms: arrayRemove(swappedProgramDoc),
      })
      transaction.update(userDoc, {
        votedStagePerformancePrograms: arrayUnion(programDoc),
      })
    })
  } else {
    await updateDoc(userDoc, {
      votedStagePerformancePrograms: arrayUnion(programDoc),
    })
  }
  showToast("投票ありがとうございます！")
}

export async function unvoteStagePerformanceProgram(
  user: User,
  program: Program
) {
  const userDoc = doc(getFirestore(), "users", user.uid)
  const programDoc = doc(getFirestore(), "programs", program._id)
  await updateDoc(userDoc, {
    votedStagePerformancePrograms: arrayRemove(programDoc),
  })
}
