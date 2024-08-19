import { FavoriteButton } from "~/components/program/favorite-button"
import { ProgramDrawer } from "~/components/program/program-drawer"
import { Program } from "~/services/program/program.type"

type Props = {
  program: Program
}

export function ProgramCardForTimeTable({ program }: Props) {
  return (
    <div className="space-y-2 rounded bg-dark-200 px-5 pb-1 pt-4">
      <div className="flex gap-3">
        <ProgramDrawer program={program}>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs/tight text-dark-600">{program.organizer}</p>
            <h1 className="truncate text-lg font-semibold text-white">
              {program.title}
            </h1>
          </div>
        </ProgramDrawer>
        <FavoriteButton program={program} size="small" />
      </div>
      <ProgramDrawer program={program}>
        <ul className="flex gap-1 overflow-scroll pb-3">
          {...program.tags.map((tag) => (
            <li
              key={tag}
              className="inline-block whitespace-nowrap rounded-full bg-dark-300 px-2.5 py-px text-xs font-medium text-primary-500"
            >
              {tag}
            </li>
          ))}
        </ul>
      </ProgramDrawer>
    </div>
  )
}
