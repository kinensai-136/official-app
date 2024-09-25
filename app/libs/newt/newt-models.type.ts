import { Content } from "newt-client-js"

export const NewtModels = {
  APPLICANT_PROGRAMS: "applicant-programs",
  AUDITORIUM_PROGRAMS: "auditorium-programs",
  BOOTH_PROGRAMS: "booth-programs",
  CLASSROOM_PROGRAMS: "classroom-programs",
  STAGE_PROGRAMS: "stage-programs",
} as const

export type NewtPeriod = {
  _id: string
  startTime: string
  endTime: string
}

export type NewtApplicantProgram = Content & {
  title: string
  organizer: string
  introduction: string
  tags: string[]
  location: string
  timeTable1st: NewtPeriod[]
  timeTable2nd: NewtPeriod[]
}

export type NewtAuditoriumProgram = Content & {
  title: string
  organizer: string
  introduction: string
  tags: string[]
  schedule1st: NewtPeriod[]
  schedule2nd: NewtPeriod[]
}

export type NewtBoothProgram = Content & {
  title: string
  organizer: string
  introduction: string
  tags: string[]
  location: string
  productName: string
}

export type NewtClassroomProgram = Content & {
  title: string
  organizer: string
  introduction: string
  tags: string[]
  location: string
  timeTable1st: NewtPeriod[]
  timeTable2nd: NewtPeriod[]
}

export type NewtStageProgram = Content & {
  title: string
  organizer: string
  introduction: string
  tags: string[]
  schedule1st: NewtPeriod[]
  schedule2nd: NewtPeriod[]
}
