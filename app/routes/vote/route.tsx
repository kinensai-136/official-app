import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react"

import { HeaderBar } from "~/components/layout/header-bar/header-bar"
import { HeaderBarTitle } from "~/components/layout/header-bar/header-bar-title"
import { InformationCard } from "~/routes/vote/information-card"
import { SearchInput } from "~/routes/vote/search-input"
import { VoteCard } from "~/routes/vote/vote-card"
import { useProgram } from "~/services/program/program-hook"
import { useVote } from "~/services/vote/vote-hook"

export default function Page() {
  const { programs } = useProgram()
  const {
    votedClassroomProgram,
    votedStagePerformancePrograms,
    isVotedClassroomProgram,
    isVotedStagePerformanceProgram,
  } = useVote()
  return (
    <TabGroup>
      <header className="sticky top-0 z-30">
        <HeaderBar>
          <div className="space-y-4">
            <HeaderBarTitle>人気投票</HeaderBarTitle>
            <TabList className="grid grid-cols-2 rounded-full bg-white/5 p-0.5">
              {["クラス企画", "パフォーマンス大会"].map((name) => (
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
      <main className="space-y-5 px-5">
        <TabPanels>
          <TabPanel className="space-y-4">
            <InformationCard>
              クラス企画では、2日間で1票だけ好きな企画に投票できます。結果は後日当アプリにて発表される予定です。
            </InformationCard>
            {votedClassroomProgram && (
              <VoteCard program={votedClassroomProgram} />
            )}
            <SearchInput onChange={() => {}} />
            <ul className="space-y-2">
              {programs.classroom
                .filter((program) => !isVotedClassroomProgram(program))
                .map((program) => (
                  <li key={program._id}>
                    <VoteCard program={program} />
                  </li>
                ))}
            </ul>
          </TabPanel>
          <TabPanel className="space-y-4">
            <InformationCard>
              パフォーマンス大会(ステージ企画)では一人あたり3票まで投票できます。結果はステージ上で発表される予定です。
            </InformationCard>
            <div className="space-y-2.5">
              {votedStagePerformancePrograms.map((program) => (
                <VoteCard key={program._id} program={program} />
              ))}
            </div>
            <SearchInput onChange={() => {}} />
            <ul className="space-y-2">
              {programs.stage
                .filter(({ organizer }) => organizer === "パフォーマンス大会")
                .filter((program) => !isVotedStagePerformanceProgram(program))
                .map((program) => (
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
