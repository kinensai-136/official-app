import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"

import { HeaderBar } from "~/components/layout/header-bar/header-bar"
import { HeaderBarTitle } from "~/components/layout/header-bar/header-bar-title"
import { InformationCard } from "~/routes/vote/information-card"
import { SearchInput } from "~/routes/vote/search-input"
import { useVoteProgram } from "~/routes/vote/use-vote-program"
import { VoteCard } from "~/routes/vote/vote-card"
import { useVote } from "~/services/vote/vote-hook"

export default function Page() {
  const { votedClassroomProgram, votedStagePerformancePrograms } = useVote()
  const { setText, setMode, programList } = useVoteProgram()
  return (
    <TabGroup
      onChange={(index) => {
        index === 0 && setMode("classroom")
        index === 1 && setMode("stage-performance")
      }}
    >
      <header className="sticky top-0 z-30">
        <HeaderBar>
          <div className="space-y-4">
            <HeaderBarTitle>人気投票</HeaderBarTitle>
            <TabList className="grid grid-cols-2 rounded-full bg-white/5 p-0.5">
              {["クラス企画", "パフォーマンス大会"].map((name) => (
                <Tab
                  key={name}
                  className="rounded-full py-1 text-dark-400 focus:outline-none data-[selected]:bg-primary-100 data-[selected]:font-medium data-[selected]:text-white"
                >
                  {name}
                </Tab>
              ))}
            </TabList>
          </div>
        </HeaderBar>
      </header>
      <main className="space-y-5 px-5">
        <TabPanels>
          <TabPanel className="space-y-4">
            <InformationCard>
              クラス企画では、2日間で1票だけ好きな企画に投票できます。結果は後日当アプリにて発表される予定です。
            </InformationCard>
            <SearchInput onChange={setText} />
            {votedClassroomProgram && (
              <VoteCard program={votedClassroomProgram} />
            )}
            <ul className="space-y-2">
              {programList.map((program) => (
                <li key={program._id}>
                  <VoteCard program={program} />
                </li>
              ))}
            </ul>
          </TabPanel>
          <TabPanel className="space-y-4">
            <InformationCard>
              ステージ企画パフォーマンス大会では、3票まで投票できます。結果は当日ステージ上で発表される予定です。
            </InformationCard>
            <SearchInput onChange={setText} />
            <div className="space-y-2.5">
              {votedStagePerformancePrograms.map((program) => (
                <VoteCard key={program._id} program={program} />
              ))}
            </div>
            <ul className="space-y-2">
              {programList.map((program) => (
                <li key={program._id}>
                  <VoteCard program={program} />
                </li>
              ))}
            </ul>
          </TabPanel>
        </TabPanels>
      </main>
    </TabGroup>
  )
}
