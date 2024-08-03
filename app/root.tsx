import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"

import "~/tailwind.css"
import { NavBar } from "~/components/layout/nav-bar/nav-bar"

import "@fontsource-variable/noto-sans-jp"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, viewport-fit=cover minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <Meta />
        <Links />
      </head>
      <body className="bg-dark-100">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <>
      <Outlet />
      <footer className="sticky inset-x-0 bottom-0 mx-auto mt-5">
        <NavBar />
      </footer>
    </>
  )
}

export function HydrateFallback() {
  return <p>Loading...</p>
}
