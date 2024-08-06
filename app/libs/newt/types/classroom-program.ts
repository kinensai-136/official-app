import { Content } from "newt-client-js"

export type ClassroomProgram = Content & {
  title: string
  organizer: string
  introduction: string
  tags: string[]
  location: string
  timeTable1st: {
    startTime: string
    endTime: string
  }[]
  timeTable2nd: {
    startTime: string
    endTime: string
  }[]
}
