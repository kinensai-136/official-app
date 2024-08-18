import { FavoriteButton } from "~/components/program/favorite-button"
import { ProgramDrawer } from "~/components/program/program-drawer"
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
    <div className="space-y-2 rounded bg-dark-200 px-5 pb-1 pt-4">
      <div className="flex gap-3">
        <ProgramDrawer program={program}>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm text-dark-600">{program.organizer}</p>
            <h1 className="truncate text-lg font-semibold text-white">
              {program.title}
            </h1>
          </div>
        </ProgramDrawer>
        <FavoriteButton program={program} size="small" />
      </div>
      <ProgramDrawer program={program}>
        <div className="flex justify-between gap-3">
          <ul className="flex gap-1 overflow-scroll pb-3">
            {...program.tags.map((tag) => (
              <li
                key={tag}
                className="inline-block whitespace-nowrap rounded-full bg-dark-300 px-2.5 py-px text-sm font-medium text-primary-500"
              >
                {tag}
              </li>
            ))}
          </ul>
          <p className="whitespace-nowrap text-sm text-dark-500">
            {categoriesMap[program.category]}
          </p>
        </div>
      </ProgramDrawer>
    </div>
  )
}
