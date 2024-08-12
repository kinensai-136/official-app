type CommonProps = {
  _id: string
  category: ProgramCategory
  title: string
  organizer: string
  introduction: string
  location: string
  tags: string[]
}

export type ProgramCategory = "applicant" | "auditorium" | "classroom" | "stage"

export type Program =
  | ApplicantProgram
  | AuditoriumProgram
  | ClassroomProgram
  | StageProgram

export type ApplicantProgram = CommonProps & {
  category: "applicant"
  timeTable1st: {
    startTime: Date
    endTime: Date
  }[]
  timeTable2nd: {
    startTime: Date
    endTime: Date
  }[]
}

export type AuditoriumProgram = CommonProps & {
  category: "auditorium"
  location: "講堂"
  schedule1st: {
    startTime: Date
    endTime: Date
  }[]
  schedule2nd: {
    startTime: Date
    endTime: Date
  }[]
}

export type ClassroomProgram = CommonProps & {
  category: "classroom"
  timeTable1st: {
    startTime: Date
    endTime: Date
  }[]
  timeTable2nd: {
    startTime: Date
    endTime: Date
  }[]
}

export type StageProgram = CommonProps & {
  category: "stage"
  location: "ステージ"
  schedule1st: {
    startTime: Date
    endTime: Date
  }[]
  schedule2nd: {
    startTime: Date
    endTime: Date
  }[]
}
