import { LocalNotifications } from "@capacitor/local-notifications"
import { redirect } from "@remix-run/react"

export function clientLoader() {
  LocalNotifications.requestPermissions()
  throw redirect("/home")
}

export default function Page() {
  return <></>
}
