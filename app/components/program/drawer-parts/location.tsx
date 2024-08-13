import { MapPinIcon } from "@heroicons/react/24/solid"

type Props = {
  children: string
}

export function Location({ children }: Props) {
  return (
    <div className="flex items-center gap-1 whitespace-nowrap">
      <MapPinIcon className="mt-px size-5 text-dark-400" />
      <p>{children}</p>
    </div>
  )
}
