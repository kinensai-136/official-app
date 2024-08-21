import { useEffect, useRef, useState } from "react"

import { SplashScreen } from "@capacitor/splash-screen"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"

import "~/tailwind.css"
import { NavBar } from "~/components/layout/nav-bar/nav-bar"
import { initializeFirebase } from "~/libs/firebase/firebase-app"
import { AuthProvider } from "~/services/auth/auth-hook"
import { FavoriteProvider } from "~/services/favorite/favorite-hook"
import { NoticeProvider } from "~/services/notice/notice-hook"
import { ProgramProvider } from "~/services/program/program-hook"
import { RecommendProvider } from "~/services/recommend/recommend-hook"
import { TicketProvider } from "~/services/ticket/ticket-hook"
import { VoteProvider } from "~/services/vote/vote-hook"
import { MergedProvider } from "~/utils/merged-provider"

import "@fontsource-variable/noto-sans-jp"

export async function clientLoader() {
  await initializeFirebase()
  await SplashScreen.hide()
  return null
}

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
    <MergedProvider
      providers={[
        AuthProvider,
        ProgramProvider,
        FavoriteProvider,
        NoticeProvider,
        RecommendProvider,
        VoteProvider,
        TicketProvider,
      ]}
    >
      <Outlet />
      <div style={{ height: navBarHeight + 24 }} />
      <footer ref={navBarRef} className="fixed inset-x-0 bottom-0 z-20 mx-auto">
        <NavBar />
      </footer>
    </MergedProvider>
  )
}

export function HydrateFallback() {
  return <p>Loading...</p>
}
