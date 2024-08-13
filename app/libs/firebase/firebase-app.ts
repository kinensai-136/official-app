import { initializeApp } from "firebase/app"
import {
  getAuth,
  indexedDBLocalPersistence,
  setPersistence,
  signInAnonymously,
} from "firebase/auth"

export async function initializeFirebase() {
  initializeApp({
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  })
  const fireAuth = getAuth()
  await setPersistence(fireAuth, indexedDBLocalPersistence)
  await signInAnonymously(fireAuth)
}
