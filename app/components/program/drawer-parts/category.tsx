import { TagIcon } from "@heroicons/react/24/solid"

type Props = {
  children: string
}

export function Category({ children }: Props) {
  return (
    <div className="flex items-center gap-1.5 whitespace-nowrap">
      <TagIcon className="mt-px size-5 text-dark-400" />
      <p>{children}</p>
    </div>
  )
}
