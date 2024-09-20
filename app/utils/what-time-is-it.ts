import dayjs from "dayjs"
import isBetween from "dayjs/plugin/isBetween"

export function whatTimeIsIt(date: Date) {
  dayjs.extend(isBetween)
  if (dayjs(date).isBefore("2024-9-28")) {
    return "soon"
  }
  if (dayjs(date).isBefore("2024-9-29")) {
    return "1st-day"
  }
  if (dayjs(date).isBefore("2024-9-30")) {
    return "2nd-day"
  }
  return "ended"
}
