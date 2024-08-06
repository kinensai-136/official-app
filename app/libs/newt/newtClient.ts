import { createClient } from "newt-client-js"

export const newtClient = createClient({
  spaceUid: import.meta.env.VITE_NEWT_SPACE_UID,
  token: import.meta.env.VITE_NEWT_TOKEN,
  apiType: "cdn",
})

export const NEWT_APP_UID = "official-app"
