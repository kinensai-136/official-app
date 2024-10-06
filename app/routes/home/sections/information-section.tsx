import { InformationCircleIcon } from "@heroicons/react/24/solid"

type Props = {
  children: string
}

export function InformationSection({ children }: Props) {
  return (
    <div className="mb-4 flex gap-2.5 rounded bg-dark-200 px-4 py-3 text-dark-600">
      <InformationCircleIcon className="size-6 shrink-0" />
      <p>{children}</p>
    </div>
  )
}
