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

import { NavItem } from "~/components/layout/nav-bar/nav-item"

export function NavBar() {
  return (
    <div className="flex w-dvw justify-between border-t border-dark-300 bg-dark-200 px-5 pb-[env(safe-area-inset-bottom)] pt-2.5">
      <NavItem
        label="ホーム"
        to="/home"
        icon={<HomeIconOutline />}
        selectedIcon={<HomeIconSolid />}
      />
      <NavItem
        label="予定表"
        to="/time-table"
        icon={<CalendarDaysIconOutline />}
        selectedIcon={<CalendarDaysIconSolid />}
      />
      <NavItem
        label="マップ"
        to="/map"
        icon={<MapPinIconOutline />}
        selectedIcon={<MapPinIconSolid />}
      />
      <NavItem
        label="人気投票"
        to="/vote"
        icon={<TrophyIconOutline />}
        selectedIcon={<TrophyIconSolid />}
      />
      <NavItem
        label="お知らせ"
        to="/notice"
        icon={<BellIconOutline />}
        selectedIcon={<BellIconSolid />}
      />
    </div>
  )
}
