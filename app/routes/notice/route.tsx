import { useBlocker } from "@remix-run/react"
import dayjs from "dayjs"

import { HeaderBar } from "~/components/layout/header-bar/header-bar"
import { HeaderBarTitle } from "~/components/layout/header-bar/header-bar-title"
import { DateDivider } from "~/routes/notice/date-divider"
import { NoticeCard } from "~/routes/notice/notice-card"
import { splitNotices } from "~/routes/notice/split-notices"
import { useNotice } from "~/services/notice/notice-hook"

export default function Page() {
  const { notices, markNoticeAsRead } = useNotice()
  const validNotices = notices.filter((notice) =>
    dayjs().isAfter(notice.createdAt)
  )
  useBlocker(() => {
    for (const notice of validNotices) {
      markNoticeAsRead(notice)
    }
    return false
  })
  return (
    <>
      <header className="sticky top-0 z-30">
        <HeaderBar>
          <HeaderBarTitle>お知らせ</HeaderBarTitle>
        </HeaderBar>
      </header>
      <main className="space-y-3 px-5">
        {splitNotices(validNotices).map((splittedNotices) => (
          <section key={splittedNotices[0]._id} className="space-y-2">
            <DateDivider date={splittedNotices[0].createdAt} />
            {splittedNotices.map((notice, index) => (
              <NoticeCard
                key={notice._id}
                isEvenIndex={index % 2 === 0}
                notice={notice}
              />
            ))}
          </section>
        ))}
      </main>
    </>
  )
}
