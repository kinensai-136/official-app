import { Program, ProgramCategory } from "~/services/program/program.type"

const categoriesMap = {
  applicant: "有志企画",
  auditorium: "講堂企画",
  classroom: "クラス企画",
  stage: "ステージ企画",
} as const satisfies Record<ProgramCategory, string>

type Props = {
  program: Program
}

export function ProgramCard({ program }: Props) {
  return (
    <div className="flex items-end justify-between gap-2 rounded bg-dark-200 px-5 py-4">
      <div className="flex-1 space-y-2 overflow-hidden">
        <div>
          <p className="text-sm text-dark-600">{program.organizer}</p>
          <h1 className="truncate text-lg font-semibold text-white">
            {program.title}
          </h1>
        </div>
        <ul className="flex flex-wrap gap-1 [scrollbar-width:none]">
          {...program.tags.map((tag) => (
            <li
              key={tag}
              className="inline-block whitespace-nowrap rounded-full bg-dark-300 px-2.5 py-px text-sm font-medium text-primary-500"
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <p className="text-sm text-dark-500">{categoriesMap[program.category]}</p>
    </div>
  )
}
