import { useEffect, useRef, useState } from "react"

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
  const navBarRef = useRef<HTMLDivElement>(null)
  const [navBarHeight, setNavBarHeight] = useState(0)
  useEffect(() => {
    setNavBarHeight(navBarRef.current?.getBoundingClientRect().height ?? 0)
  }, [])
  return (
    <>
      <Outlet />
      <div style={{ height: navBarHeight + 24 }} />
      <footer ref={navBarRef} className="fixed inset-x-0 bottom-0 z-20 mx-auto">
        <NavBar />
      </footer>
    </>
  )
}

export function HydrateFallback() {
  return <p>Loading...</p>
}
