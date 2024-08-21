import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import clsx from "clsx"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"

import { Period } from "~/services/program/program.type"
import { TicketDistributionStatus } from "~/services/ticket/ticket.type"
import { useTicket } from "~/services/ticket/ticket-hook"
import { whatTimeIsIt } from "~/utils/what-time-is-it"

type Props = {
  timeTable1st: Period[]
  timeTable2nd: Period[]
}

export function TimeTable({ timeTable1st, timeTable2nd }: Props) {
  const { ticketDistributionStatuses } = useTicket()
  const show2ndDay =
    whatTimeIsIt(new Date()) === "2nd-day" ||
    whatTimeIsIt(new Date()) === "ended"
  return (
    <TabGroup
      defaultIndex={show2ndDay ? 1 : 0}
      className="space-y-2 rounded bg-dark-300 px-5 pb-1 pt-3"
    >
      <div className="flex items-center justify-between">
        <p className="text-dark-600">公演時間</p>
        <TabList>
          {["土曜日", "日曜日"].map((day) => (
            <Tab
              key={day}
              className="rounded px-3 text-dark-400 focus:outline-none data-[selected]:bg-primary-100 data-[selected]:text-white"
            >
              {day}
            </Tab>
          ))}
        </TabList>
      </div>
      <TabPanels className="flex gap-3.5">
        <div className="flex flex-col items-center gap-2.5 whitespace-nowrap pb-2 pt-1.5 text-dark-500">
          <p className="leading-none">
            開始
            <br />
            終了
          </p>
          <p className="text-sm">整理券</p>
        </div>
        {[timeTable1st, timeTable2nd].map((timeTable) => (
          <TabPanel
            key={JSON.stringify(timeTable)}
            className="flex gap-3.5 overflow-scroll"
          >
            {timeTable.map((period) => (
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

function PeriodCard({
  period: { startTime, endTime },
  status,
}: PeriodCardProps) {
  dayjs.extend(isBetween)
  const now = dayjs()
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex flex-col items-end">
        <p
          className={clsx(
            "text-xl/tight",
            now.isBetween(startTime, endTime) && "font-medium text-[#4ade80]",
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
      {
        <p
          className={clsx(
            "whitespace-nowrap text-sm",
            !status && "text-dark-400",
            status === "never" && "text-dark-400",
            status === "soon" && "text-white",
            status === "now" && "font-medium text-[#4ade80]",
            status === "ended" && "text-dark-500"
          )}
        >
          {!status && "- - -"}
          {status === "never" && "配布なし"}
          {status === "soon" && "配布予定"}
          {status === "now" && "配布中"}
          {status === "ended" && "配布終了"}
        </p>
      }
    </div>
  )
}
