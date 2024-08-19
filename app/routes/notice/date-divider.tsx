import { ChevronUpDownIcon } from "@heroicons/react/24/solid"
import dayjs from "dayjs"

type Props = {
  date: Date
}

export function DateDivider({ date }: Props) {
  return (
    <div className="flex items-center gap-1 px-1 text-dark-500">
      <ChevronUpDownIcon className="mt-px size-6 p-px" />
      <p>{dayjs(date).format("M月DD日")}</p>
    </div>
  )
}
