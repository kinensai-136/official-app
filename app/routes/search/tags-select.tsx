import { useState } from "react"

import { useToggle } from "@uidotdev/usehooks"
import clsx from "clsx"

type Props = {
  validTags: string[]
  onSelect: (selectedTags: string[]) => void
}

export function TagsSelect({ validTags, onSelect }: Props) {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
  const [isExpanded, toggleExpanded] = useToggle(false)
  const showTags = isExpanded
    ? validTags
    : [
        ...selectedTags,
        ...validTags.filter((tag) => !selectedTags.has(tag)),
      ].slice(0, Math.max(4, selectedTags.size))
  return (
    <div>
      <ul className="flex flex-wrap gap-x-1 gap-y-1.5">
        {showTags.map((tag) => (
          <li key={tag}>
            <button
              type="button"
              className={clsx(
                "whitespace-nowrap rounded-full px-3 py-0.5",
                selectedTags.has(tag)
                  ? "bg-primary-100 font-medium text-white"
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
        {validTags.length > 4 && !isExpanded && (
          <li>
            <button
              type="button"
              className="whitespace-nowrap rounded-full bg-dark-300 px-3 py-0.5 text-dark-600"
              onClick={() => toggleExpanded()}
            >
              ... {validTags.length - 4}
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
