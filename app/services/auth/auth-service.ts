import { User } from "firebase/auth"
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore"

export async function initUserIfUndefined(user: User | null | undefined) {
  if (user) {
    const userDoc = doc(getFirestore(), "users", user.uid)
    const userDocSnapshot = await getDoc(userDoc)
    if (!userDocSnapshot.exists()) {
      await setDoc(userDoc, {})
    }
  }
}
