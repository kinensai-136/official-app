import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"
import clsx from "clsx"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"

import { whatTimeIsIt } from "~/utils/what-time-is-it"

type Props = {
  timeTable1st: {
    startTime: Date
    endTime: Date
  }[]
  timeTable2nd: {
    startTime: Date
    endTime: Date
  }[]
}

export function TimeTable({ timeTable1st, timeTable2nd }: Props) {
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
          <Tab className="rounded px-3 text-dark-400 focus:outline-none data-[selected]:bg-dark-400 data-[selected]:text-white">
            土曜日
          </Tab>
          <Tab className="rounded px-3 text-dark-400 focus:outline-none data-[selected]:bg-dark-400 data-[selected]:text-white">
            日曜日
          </Tab>
        </TabList>
      </div>
      <TabPanels className="overflow-scroll pb-3 pl-1">
        <TabPanel className="flex gap-5">
          {timeTable1st.map(({ startTime, endTime }) => (
            <Period
              key={startTime.toString()}
              startTime={startTime}
              endTime={endTime}
            />
          ))}
        </TabPanel>
        <TabPanel className="flex gap-5">
          {timeTable2nd.map(({ startTime, endTime }) => (
            <Period
              key={startTime.toString()}
              startTime={startTime}
              endTime={endTime}
            />
          ))}
        </TabPanel>
      </TabPanels>
    </TabGroup>
  )
}

type PeriodProps = {
  startTime: Date
  endTime: Date
}

function Period({ startTime, endTime }: PeriodProps) {
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
