import { ProgramDrawer } from "~/components/program/program-drawer"
import { BoothProgram } from "~/services/program/program.type"

type Props = {
  boothProgram: BoothProgram
}

export function BoothCard({ boothProgram }: Props) {
  return (
    <ProgramDrawer key={boothProgram._id} program={boothProgram}>
      <div className="flex items-center rounded-sm bg-dark-200 px-5 py-1">
        <div className="overflow-scroll py-2">
          <p className="whitespace-nowrap text-lg font-medium text-white">
            {boothProgram.productName}
          </p>
        </div>
      </div>
    </ProgramDrawer>
  )
}
