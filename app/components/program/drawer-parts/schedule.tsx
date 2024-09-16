import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import clsx from "clsx"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"

import { Period } from "~/services/program/program.type"
import { TicketDistributionStatus } from "~/services/ticket/ticket.type"
import { useTicket } from "~/services/ticket/ticket-hook"

type Props = {
  schedule1st: Period[]
  schedule2nd: Period[]
}

export function Schedule({ schedule1st, schedule2nd }: Props) {
  const { ticketDistributionStatuses } = useTicket()
  return (
    <TabGroup className="space-y-2 rounded bg-dark-300 px-5 pb-0.5 pt-3">
      <div className="flex items-center justify-between">
        <p className="text-dark-600">出演スケジュール</p>
        <TabList>
          {["土曜日", "日曜日"]
            .filter(
              (day) =>
                (day === "土曜日" && schedule1st.length > 0) ||
                (day === "日曜日" && schedule2nd.length > 0)
            )
            .map((day) => (
              <Tab
                key={day}
                className="rounded px-3 text-dark-400 focus:outline-none data-[selected]:bg-primary-100 data-[selected]:font-medium data-[selected]:text-white"
              >
                {day}
              </Tab>
            ))}
        </TabList>
      </div>
      <TabPanels className="flex gap-3.5">
        <div className="flex flex-col items-center gap-2.5 whitespace-nowrap pb-3 pl-1.5 pr-0.5 pt-1.5 text-dark-500">
          <p className="leading-none">
            開始
            <br />
            終了
          </p>
        </div>
        {[schedule1st, schedule2nd]
          .filter(({ length }) => length > 0)
          .map((schedule) => (
            <TabPanel
              key={JSON.stringify(schedule)}
              className="flex gap-3.5 overflow-scroll"
            >
              {schedule
                .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
                .map((period) => (
                  <PeriodCard
                    key={period._id}
                    period={period}
                    status={ticketDistributionStatuses.get(period._id)}
                  />
                ))}
            </TabPanel>
          ))}
      </TabPanels>
    </TabGroup>
  )
}

type PeriodCardProps = {
  period: Period
  status?: TicketDistributionStatus
}

function PeriodCard({ period: { startTime, endTime } }: PeriodCardProps) {
  dayjs.extend(isBetween)
  const now = dayjs()
  return (
    <div className="flex flex-col items-end pb-3">
      <p
        className={clsx(
          "text-xl/tight",
          now.isBetween(startTime, endTime) && "font-medium text-green",
          now.isAfter(endTime) && "text-dark-400"
        )}
      >
        {dayjs(startTime).format("HH:mm")}
      </p>
      <p
        className={clsx(
          "whitespace-nowrap text-lg leading-none",
          now.isAfter(endTime) ? "text-dark-400" : "text-dark-600"
        )}
      >
        <span className="mr-0.5">-</span>
        {dayjs(endTime).format("HH:mm")}
      </p>
    </div>
  )
}
