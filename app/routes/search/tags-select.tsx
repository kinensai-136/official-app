import { useState } from "react"

import { useToggle } from "@uidotdev/usehooks"
import clsx from "clsx"

type Props = {
  validTags: string[]
  onSelect: (selectedTags: string[]) => void
}

export function TagsSelect({ validTags, onSelect }: Props) {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
  const sortedTags = [
    ...selectedTags,
    ...validTags.filter((tag) => !selectedTags.has(tag)),
  ]
  const [isExpanded, toggleExpanded] = useToggle(false)
  return (
    <div>
      <ul className="flex flex-wrap gap-x-1 gap-y-1.5">
        {sortedTags.splice(0, isExpanded ? 1000 : 4).map((tag) => (
          <li key={tag}>
            <button
              type="button"
              className={clsx(
                "whitespace-nowrap rounded-full px-3 py-0.5",
                selectedTags.has(tag)
                  ? "bg-primary-200 font-medium text-white"
                  : "bg-dark-200 text-dark-400"
              )}
              onClick={() => {
                if (selectedTags.has(tag)) {
                  selectedTags.delete(tag)
                } else {
                  selectedTags.add(tag)
                }
                setSelectedTags(selectedTags)
                onSelect([...selectedTags])
              }}
            >
              {tag}
            </button>
          </li>
        ))}
        {!isExpanded && (
          <li>
            <button
              type="button"
              className="whitespace-nowrap rounded-full bg-dark-300 px-3 py-0.5 text-dark-600"
              onClick={() => toggleExpanded()}
            >
              ... {validTags.length > 4 ? validTags.length - 4 : 0}
              つのタグを表示
            </button>
          </li>
        )}
      </ul>
      {isExpanded && (
        <button
          type="button"
          onClick={() => toggleExpanded()}
          className="ml-auto mt-2 block text-sm text-dark-600"
        >
          表示を少なくする
        </button>
      )}
    </div>
  )
}
