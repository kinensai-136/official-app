import { useState } from "react"

import {
  BellIcon as BellIconOutline,
  CalendarDaysIcon as CalendarDaysIconOutline,
  HomeIcon as HomeIconOutline,
  MapPinIcon as MapPinIconOutline,
  TrophyIcon as TrophyIconOutline,
} from "@heroicons/react/24/outline"
import {
  BellIcon as BellIconSolid,
  CalendarDaysIcon as CalendarDaysIconSolid,
  HomeIcon as HomeIconSolid,
  MapPinIcon as MapPinIconSolid,
  TrophyIcon as TrophyIconSolid,
} from "@heroicons/react/24/solid"

import { NavItem } from "~/components/layout/navigation/nav-item"

export function NavBar() {
  const [selected, setSelected] = useState("ホーム")
  return (
    <div className="flex justify-between bg-dark-200 px-5 pb-[env(safe-area-inset-bottom)] pt-3">
      <NavItem
        label="ホーム"
        to="/"
        icon={<HomeIconOutline />}
        selectedIcon={<HomeIconSolid />}
        isSelected={"ホーム" === selected}
        onClick={() => setSelected("ホーム")}
      />
      <NavItem
        label="予定表"
        to="/"
        icon={<CalendarDaysIconOutline />}
        selectedIcon={<CalendarDaysIconSolid />}
        isSelected={"予定表" === selected}
        onClick={() => setSelected("予定表")}
      />
      <NavItem
        label="マップ"
        to="/"
        icon={<MapPinIconOutline />}
        selectedIcon={<MapPinIconSolid />}
        isSelected={"マップ" === selected}
        onClick={() => setSelected("マップ")}
      />
      <NavItem
        label="人気投票"
        to="/vote"
        icon={<TrophyIconOutline />}
        selectedIcon={<TrophyIconSolid />}
        isSelected={"人気投票" === selected}
        onClick={() => setSelected("人気投票")}
      />
      <NavItem
        label="お知らせ"
        to="/"
        icon={<BellIconOutline />}
        selectedIcon={<BellIconSolid />}
        isSelected={"お知らせ" === selected}
        onClick={() => setSelected("お知らせ")}
      />
    </div>
  )
}
