import { useEffect, useRef } from "react"

import clsx from "clsx"
import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"

import { ProgramCardForTimeTable } from "~/routes/time-table/program-card-for-time-table"
import { Program } from "~/services/program/program.type"

type Props = {
  startTime: Date
  endTime: Date
  program: Program
}

export function PeriodCard({ startTime, endTime, program }: Props) {
  dayjs.extend(isBetween)
  const isEnded = dayjs().isAfter(endTime)
  const isNow = dayjs().isBetween(startTime, endTime)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (isNow && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" })
    }
  }, [isNow])
  return (
    <div ref={ref} className={clsx("flex gap-1", isEnded && "opacity-40")}>
      <div className="flex flex-col items-center gap-5 px-3">
        <p className="relative bottom-3.5 text-lg/none text-dark-500">
          {dayjs(startTime).format("HH:mm")}
        </p>
        {isNow && (
          <p className="text-sm font-semibold text-[#4ade80]">出演中</p>
        )}
      </div>
      <div
        className={clsx(
          "flex-1 overflow-hidden rounded",
          isNow && "outline outline-2 outline-[#4ade80]"
        )}
      >
        <ProgramCardForTimeTable program={program} />
      </div>
    </div>
  )
}
