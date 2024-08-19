import { Input } from "@headlessui/react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

type Props = {
  onChange: (text: string) => void
}

export function SearchInput({ onChange }: Props) {
  return (
    <div className="flex gap-4 rounded-full border border-dark-300 bg-white/5 px-6 py-3.5">
      <MagnifyingGlassIcon className="size-6 shrink-0 text-dark-600" />
      <Input
        placeholder="企画名・主催者名から検索"
        className="w-full bg-transparent text-white focus:outline-none"
        enterKeyHint="search"
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            event.currentTarget.blur()
          }
        }}
        onChange={(event) => {
          onChange(event.target.value)
        }}
      />
    </div>
  )
}
