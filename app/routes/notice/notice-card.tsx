import { ReactNode } from "react"

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react"
import {
  BellIcon,
  ChevronDownIcon,
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
  isDefaultOpen: boolean
  notice: Notice
}

export function NoticeCard({ isDefaultOpen, notice }: Props) {
  return (
    <Disclosure defaultOpen={isDefaultOpen}>
      <DisclosureButton
        className={clsx(
          "group relative flex w-full items-stretch gap-3 rounded bg-dark-200 p-4",
          notice.isAlreadyRead && "opacity-80"
        )}
      >
        <div
          className={clsx(
            "flex flex-col items-center justify-center gap-1 rounded p-1.5",
            notice.isAlreadyRead
              ? "bg-dark-300 text-primary-400"
              : "bg-primary-100 text-white"
          )}
        >
          <div className="size-7 p-px">
            {iconMap[notice.category] ?? <BellIcon />}
          </div>
          {!notice.isAlreadyRead && (
            <p className="hidden whitespace-nowrap text-xs font-semibold group-data-[open]:inline">
              新着
            </p>
          )}
        </div>
        <div className="w-full space-y-1.5 text-white">
          <div className="flex items-center justify-between gap-3 pr-2">
            <h1 className="text-left text-lg font-bold">{notice.title}</h1>
            <ChevronDownIcon className="size-5 text-dark-500 group-data-[open]:rotate-180" />
          </div>
          <DisclosurePanel className="text-left text-sm">
            {notice.content}
          </DisclosurePanel>
          <div className="flex justify-between pr-1 text-sm text-dark-500">
            <p>{dayjs(notice.createdAt).format("HH時mm分")}</p>
            <p className="group-data-[open]:hidden">タップして拡大</p>
            <p className="hidden group-data-[open]:inline">表示を少なくする</p>
          </div>
        </div>
      </DisclosureButton>
    </Disclosure>
  )
}
