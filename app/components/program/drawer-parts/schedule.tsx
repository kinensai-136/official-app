import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import clsx from "clsx"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"

import { Period } from "~/services/program/program.type"
import { whatTimeIsIt } from "~/utils/what-time-is-it"

type Props = {
  schedule1st: Period[]
  schedule2nd: Period[]
}

export function Schedule({ schedule1st, schedule2nd }: Props) {
  const show2ndDay =
    whatTimeIsIt(new Date()) === "2nd-day" ||
    whatTimeIsIt(new Date()) === "ended"
  return (
    <TabGroup
      defaultIndex={show2ndDay ? 1 : 0}
      className="space-y-2 rounded bg-dark-300 px-5 pb-1 pt-3"
    >
      <div className="flex items-center justify-between">
        <p className="text-dark-600">出演スケジュール</p>
        <TabList>
          {["土曜日", "日曜日"].map((day) => (
            <Tab
              key={day}
              className="rounded px-3 text-dark-400 focus:outline-none data-[selected]:bg-dark-400 data-[selected]:text-white"
            >
              {day}
            </Tab>
          ))}
        </TabList>
      </div>
      <TabPanels className="overflow-scroll pb-3 pl-1">
        {[schedule1st, schedule2nd].map((schedule) => (
          <TabPanel key={schedule.toString()} className="flex gap-5">
            {schedule.map((period) => (
              <PeriodCard key={period.toString()} period={period} />
            ))}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  )
}

type PeriodCardProps = {
  period: Period
}

function PeriodCard({ period: { startTime, endTime } }: PeriodCardProps) {
  dayjs.extend(isBetween)
  const now = dayjs()
  return (
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
          "mr-px whitespace-nowrap leading-none",
          now.isAfter(endTime) ? "text-dark-400" : "text-dark-600"
        )}
      >
        {dayjs(endTime).format("- HH:mm")}
      </p>
    </div>
  )
}
