type CommonProps = {
  _id: string
  category: ProgramCategory
  title: string
  organizer: string
  introduction: string
  location: string
  tags: string[]
}

export type Period = {
  _id: string
  startTime: Date
  endTime: Date
}

export type ProgramCategory =
  | "applicant"
  | "auditorium"
  | "booth"
  | "classroom"
  | "stage"

export type Program =
  | ApplicantProgram
  | AuditoriumProgram
  | BoothProgram
  | ClassroomProgram
  | StageProgram

export type ApplicantProgram = CommonProps & {
  category: "applicant"
  timeTable1st: Period[]
  timeTable2nd: Period[]
}

export type AuditoriumProgram = CommonProps & {
  category: "auditorium"
  location: "講堂"
  schedule1st: Period[]
  schedule2nd: Period[]
}

export type BoothProgram = CommonProps & {
  category: "booth"
  location: "入場ゲート付近"
  productName: string
}

export type ClassroomProgram = CommonProps & {
  category: "classroom"
  timeTable1st: Period[]
  timeTable2nd: Period[]
}

export type StageProgram = CommonProps & {
  category: "stage"
  location: "ステージ"
  schedule1st: Period[]
  schedule2nd: Period[]
}
