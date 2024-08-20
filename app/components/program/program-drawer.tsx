import { ReactNode } from "react"

import { Drawer } from "vaul"

import { Category } from "~/components/program/drawer-parts/category"
import { Information } from "~/components/program/drawer-parts/information"
import { Introduction } from "~/components/program/drawer-parts/introduction"
import { Location } from "~/components/program/drawer-parts/location"
import { Schedule } from "~/components/program/drawer-parts/schedule"
import { Tags } from "~/components/program/drawer-parts/tags"
import { TimeTable } from "~/components/program/drawer-parts/time-table"
import { FavoriteButton } from "~/components/program/favorite-button"
import { OpenMapButton } from "~/components/program/open-map-button"
import { Program, ProgramCategory } from "~/services/program/program.type"
import { useTicket } from "~/services/ticket/ticket-hook"

const categoriesMap = {
  applicant: "有志企画",
  auditorium: "講堂企画",
  classroom: "クラス企画",
  stage: "ステージ企画",
} as const satisfies Record<ProgramCategory, string>

type Props = {
  program: Program
  children: ReactNode
}

export function ProgramDrawer({ program, children }: Props) {
  const { fetchTicketDistributionStatuses } = useTicket()
  const hasTimeTable =
    (program.category === "applicant" || program.category === "classroom") &&
    (program.timeTable1st.length > 0 || program.timeTable2nd.length > 0)
  const hasSchedule =
    (program.category === "auditorium" || program.category === "stage") &&
    (program.schedule1st.length > 0 || program.schedule2nd.length > 0)
  const handeClick = async () => fetchTicketDistributionStatuses(program)
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild onClick={handeClick}>
        {children}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-30 bg-dark-100/70" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 z-40 flex h-4/5 flex-col border-t border-dark-300 bg-dark-200 px-6 py-4 pb-16 text-white focus:outline-none">
          <div className="mx-auto mb-5 h-1 w-16 rounded-full bg-dark-400" />
          <div className="flex-1 space-y-3">
            <div className="flex justify-between gap-5">
              <div>
                <p className="leading-none text-dark-600">
                  {program.organizer}
                </p>
                <p className="text-2xl font-bold">{program.title}</p>
              </div>
              <FavoriteButton program={program} size="large" />
            </div>
            <Tags>{program.tags}</Tags>
            <div className="flex gap-8">
              <Location>{program.location}</Location>
              <Category>{categoriesMap[program.category]}</Category>
            </div>
            {hasTimeTable && (
              <>
                <TimeTable
                  timeTable1st={program.timeTable1st}
                  timeTable2nd={program.timeTable2nd}
                />
                <Information>
                  演劇のクラス企画や一部有志企画にはタイムテーブルが提供されています
                </Information>
              </>
            )}
            {hasSchedule && (
              <Schedule
                schedule1st={program.schedule1st}
                schedule2nd={program.schedule2nd}
              />
            )}
            <Introduction>{program.introduction}</Introduction>
          </div>
          <OpenMapButton />
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
