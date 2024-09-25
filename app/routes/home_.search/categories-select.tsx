import { useState } from "react"

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react"
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/solid"
import clsx from "clsx"

import { ProgramCategory } from "~/services/program/program.type"

const allCategories: ProgramCategory[] = [
  "classroom",
  "auditorium",
  "stage",
  "applicant",
  "booth",
]

const categoriesMap = {
  applicant: "有志企画",
  auditorium: "講堂企画",
  booth: "模擬店企画",
  classroom: "クラス企画",
  stage: "ステージ企画",
} as const satisfies Record<ProgramCategory, string>

type Props = {
  onSelect: (selectedCategories: ProgramCategory[]) => void
}

export function CategoriesSelect({ onSelect }: Props) {
  const [selectedCategories, setSelectedCategories] =
    useState<ProgramCategory[]>(allCategories)
  return (
    <Listbox
      multiple
      onChange={(value) => {
        setSelectedCategories(value)
        onSelect(value)
      }}
      value={selectedCategories}
    >
      <ListboxButton className="flex w-44 items-center justify-between rounded-sm border border-dark-300 bg-white/5 px-6 py-2.5 focus:outline-none">
        <p className="text-white">{generateLabel(selectedCategories)}</p>
        <ChevronDownIcon className="size-4 text-dark-600" />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "mt-2 flex w-[var(--button-width)] flex-col rounded border border-dark-300 bg-white/5 p-1 backdrop-blur focus:outline-none",
          "z-50 transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
        )}
      >
        {allCategories.map((category) => (
          <ListboxOption
            key={category}
            value={category}
            className="group flex items-center gap-3 rounded-sm px-4 py-3 data-[focus]:bg-white/5"
          >
            <CheckIcon className="invisible size-4 text-white group-data-[selected]:visible" />
            <p className="text-dark-600 group-data-[selected]:text-white">
              {categoriesMap[category]}
            </p>
          </ListboxOption>
        ))}
      </ListboxOptions>
    </Listbox>
  )
}

function generateLabel(selectedCategories: ProgramCategory[]) {
  let label = ""
  if (selectedCategories.length >= 4) {
    label = "全ての企画"
  } else if (selectedCategories.length >= 2) {
    label = selectedCategories.length + "つを選択中"
  } else if (selectedCategories.length == 1) {
    label = categoriesMap[selectedCategories[0]]
  } else {
    label = "選択なし"
  }
  return label
}
