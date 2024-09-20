import { ReactNode } from "react"

import {
  BellIcon,
  ClockIcon,
  MegaphoneIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid"
import clsx from "clsx"
import dayjs from "dayjs"

import { Notice } from "~/services/notice/notice.type"

const iconMap: { [K in string]: ReactNode } = {
  announcement: <MegaphoneIcon />,
  promotion: <SparklesIcon />,
  remainder: <ClockIcon />,
}

type Props = {
  isEvenIndex: boolean
  notice: Notice
}

export function NoticeCard({ isEvenIndex, notice }: Props) {
  return (
    <div
      className={clsx(
        "relative flex gap-4 rounded-lg bg-dark-200 p-4",
        notice.isAlreadyRead && "opacity-80"
      )}
    >
      <div
        className={clsx(
          "flex flex-col items-center justify-center gap-1 rounded-full p-1.5",
          isEvenIndex
            ? notice.isAlreadyRead
              ? "bg-dark-300 text-primary-400"
              : "bg-primary-100 text-white"
            : notice.isAlreadyRead
              ? "bg-dark-300 text-primary-600"
              : "bg-primary-200 text-white"
        )}
      >
        <div className="size-7 p-px">
          {iconMap[notice.category] ?? <BellIcon />}
        </div>
        {!notice.isAlreadyRead && (
          <p className="whitespace-nowrap text-xs font-semibold ">新着</p>
        )}
      </div>
      <div className="space-y-1 text-white">
        <h1 className="text-lg font-bold">{notice.title}</h1>
        <p className="text-sm">{notice.content}</p>
        <p className="text-sm text-dark-500">
          {dayjs(notice.createdAt).format("HH時mm分")}
        </p>
      </div>
    </div>
  )
}
