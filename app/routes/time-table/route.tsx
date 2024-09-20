import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"

import { HeaderBar } from "~/components/layout/header-bar/header-bar"
import { HeaderBarTitle } from "~/components/layout/header-bar/header-bar-title"
import { DayTip } from "~/routes/time-table/day-tip"
import { GoToButton } from "~/routes/time-table/go-to-button"
import { PeriodCard } from "~/routes/time-table/period-card"
import { useTimeTable } from "~/routes/time-table/use-time-table"

export default function Page() {
  const {
    auditoriumTimeTable1st,
    auditoriumTimeTable2nd,
    stageTimeTable1st,
    stageTimeTable2nd,
  } = useTimeTable()
  const timeTables = {
    講堂: [auditoriumTimeTable1st, auditoriumTimeTable2nd],
    ステージ: [stageTimeTable1st, stageTimeTable2nd],
  }
  return (
    <TabGroup>
      <header className="sticky top-0 z-30">
        <HeaderBar>
          <div className="space-y-4">
            <div className="flex justify-between">
              <HeaderBarTitle>タイムテーブル</HeaderBarTitle>
            </div>
            <TabList className="grid grid-cols-2 rounded-full bg-white/5 p-0.5">
              {Object.keys(timeTables).map((name) => (
                <Tab
                  key={name}
                  className="rounded-full py-1 text-dark-400 focus:outline-none data-[selected]:bg-primary-100 data-[selected]:text-white"
                >
                  {name}
                </Tab>
              ))}
            </TabList>
          </div>
        </HeaderBar>
      </header>
      <main className="px-5">
        <TabPanels>
          {Object.entries(timeTables).map(
            ([name, [timeTable1st, timeTable2nd]]) => (
              <TabPanel key={name}>
                <section className="space-y-2">
                  <DayTip>1日目・土曜日</DayTip>
                  {timeTable1st.map(([[startTime, endTime], program]) => (
                    <div key={startTime.toString()}>
                      <PeriodCard
                        startTime={startTime}
                        endTime={endTime}
                        program={program}
                      />
                    </div>
                  ))}
                </section>
                <section className="space-y-2">
                  <DayTip>2日目・日曜日</DayTip>
                  {timeTable2nd.map(([[startTime, endTime], program]) => (
                    <div key={startTime.toString()}>
                      <PeriodCard
                        startTime={startTime}
                        endTime={endTime}
                        program={program}
                      />
                    </div>
                  ))}
                </section>
                <GoToButton to={`/map/?focusedLocation=${name}`}>
                  {name}
                </GoToButton>
              </TabPanel>
            )
          )}
        </TabPanels>
      </main>
    </TabGroup>
  )
}
