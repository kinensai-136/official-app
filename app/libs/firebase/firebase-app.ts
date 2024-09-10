import { initializeApp } from "firebase/app"
import {
  indexedDBLocalPersistence,
  initializeAuth,
  signInAnonymously,
} from "firebase/auth"

export async function initializeFirebase() {
  const fireApp = initializeApp({
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  })
  const fireAuth = initializeAuth(fireApp, {
    persistence: indexedDBLocalPersistence,
  })
  await signInAnonymously(fireAuth)
}
