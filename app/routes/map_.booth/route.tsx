import { HeaderBar } from "~/components/layout/header-bar/header-bar"
import { HeaderBarTitle } from "~/components/layout/header-bar/header-bar-title"
import { BoothCard } from "~/routes/map_.booth/booth-card"
import { InformationCard } from "~/routes/map_.booth/information-card"
import { ReturnButton } from "~/routes/map_.booth/return-button"
import { useProgram } from "~/services/program/program-hook"

export default function Page() {
  const { programs } = useProgram()
  const boothPrograms = programs.booth.filter(
    (program) => program.category === "booth"
  )
  return (
    <>
      <header className="sticky top-0 z-30">
        <HeaderBar>
          <div className="flex justify-between">
            <HeaderBarTitle>模擬店</HeaderBarTitle>
            <ReturnButton />
          </div>
        </HeaderBar>
      </header>
      <main className="space-y-5 px-5">
        <InformationCard>
          土日ともに入場時刻から営業しております。売り切れ時には退場時刻より前に閉店する可能性がございます。
        </InformationCard>
        <div className="space-y-3">
          <h2 className="px-0.5 text-xl font-medium text-white">
            品目から探す
          </h2>
          <div className="grid grid-cols-2 place-items-stretch gap-1">
            {boothPrograms.map((boothProgram) => (
              <BoothCard key={boothProgram._id} boothProgram={boothProgram} />
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
