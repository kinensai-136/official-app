import { Notice } from "~/services/notice/notice.type"

export function splitNotices(notices: Notice[]) {
  const stringDates = [
    ...new Set(notices.map(({ createdAt }) => createdAt.toDateString())),
  ]
  const splittedNotices = stringDates.map((stringDate) =>
    notices.filter(({ createdAt }) => createdAt.toDateString() === stringDate)
  )
  return splittedNotices
}
