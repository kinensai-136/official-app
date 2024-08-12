import { Content } from "newt-client-js"

export const NewtModels = {
  APPLICANT_PROGRAMS: "applicant-programs",
  AUDITORIUM_PROGRAMS: "auditorium-programs",
  CLASSROOM_PROGRAMS: "classroom-programs",
  STAGE_PROGRAMS: "stage-programs",
} as const

export type NewtApplicantProgram = Content & {
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

export type NewtAuditoriumProgram = Content & {
  title: string
  organizer: string
  introduction: string
  tags: string[]
  schedule1st: {
    startTime: string
    endTime: string
  }[]
  schedule2nd: {
    startTime: string
    endTime: string
  }[]
}

export type NewtClassroomProgram = Content & {
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

export type NewtStageProgram = Content & {
  title: string
  organizer: string
  introduction: string
  tags: string[]
  schedule1st: {
    startTime: string
    endTime: string
  }[]
  schedule2nd: {
    startTime: string
    endTime: string
  }[]
}
