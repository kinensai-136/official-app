import { redirect } from "@remix-run/react"

export function clientLoader() {
  throw redirect("/home")
}

export default function Page() {
  return <></>
}
