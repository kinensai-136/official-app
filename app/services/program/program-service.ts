import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"

import { NEWT_APP_UID, newtClient } from "~/libs/newt/newt-client"
import {
  NewtApplicantProgram,
  NewtAuditoriumProgram,
  NewtClassroomProgram,
  NewtModels,
  NewtStageProgram,
} from "~/libs/newt/newt-models.type"
import {
  ApplicantProgram,
  AuditoriumProgram,
  ClassroomProgram,
  Program,
  ProgramCategory,
  StageProgram,
} from "~/services/program/program.type"

const cachedPrograms: Record<ProgramCategory, Program[]> = {
  applicant: [],
  auditorium: [],
  classroom: [],
  stage: [],
}

const cachedProgramTags: Record<ProgramCategory, string[]> = {
  applicant: [],
  auditorium: [],
  classroom: [],
  stage: [],
}

export function getPrograms(categories: ProgramCategory[]) {
  const programs = []
  for (const category of categories) {
    programs.push(...cachedPrograms[category])
  }
  return programs
}

export function getProgramTags(categories: ProgramCategory[]) {
  const programTags = []
  for (const category of categories) {
    programTags.push(
      ...new Set(cachedPrograms[category].flatMap((program) => program.tags))
    )
  }
  return programTags
}

export async function refreshPrograms() {
  dayjs.extend(customParseFormat)
  const rawApplicantPrograms =
    await newtClient.getContents<NewtApplicantProgram>({
      appUid: NEWT_APP_UID,
      modelUid: NewtModels.APPLICANT_PROGRAMS,
    })
  const rawAuditoriumPrograms =
    await newtClient.getContents<NewtAuditoriumProgram>({
      appUid: NEWT_APP_UID,
      modelUid: NewtModels.AUDITORIUM_PROGRAMS,
    })
  const rawClassroomPrograms =
    await newtClient.getContents<NewtClassroomProgram>({
      appUid: NEWT_APP_UID,
      modelUid: NewtModels.CLASSROOM_PROGRAMS,
    })
  const rawStagePrograms = await newtClient.getContents<NewtStageProgram>({
    appUid: NEWT_APP_UID,
    modelUid: NewtModels.STAGE_PROGRAMS,
  })
  const applicantPrograms = rawApplicantPrograms.items.map<ApplicantProgram>(
    (raw) => ({
      _id: raw._id,
      category: "applicant",
      title: raw.title,
      organizer: raw.organizer,
      introduction: raw.introduction,
      location: raw.location,
      tags: raw.tags,
      timeTable1st: raw.timeTable1st.map(({ startTime, endTime }) => ({
        startTime: dayjs(startTime, "HH:mm")
          .year(2024)
          .month(9 - 1)
          .date(28)
          .toDate(),
        endTime: dayjs(endTime, "HH:mm")
          .year(2024)
          .month(9 - 1)
          .date(28)
          .toDate(),
      })),
      timeTable2nd: raw.timeTable2nd.map(({ startTime, endTime }) => ({
        startTime: dayjs(startTime, "HH:mm")
          .year(2024)
          .month(9 - 1)
          .date(29)
          .toDate(),
        endTime: dayjs(endTime, "HH:mm")
          .year(2024)
          .month(9 - 1)
          .date(29)
          .toDate(),
      })),
    })
  )
  const auditoriumPrograms = rawAuditoriumPrograms.items.map<AuditoriumProgram>(
    (raw) => ({
      _id: raw._id,
      category: "auditorium",
      title: raw.title,
      organizer: raw.organizer,
      introduction: raw.introduction,
      location: "講堂",
      tags: raw.tags,
      schedule1st: raw.schedule1st.map(({ startTime, endTime }) => ({
        startTime: dayjs(startTime, "HH:mm")
          .year(2024)
          .month(9 - 1)
          .date(28)
          .toDate(),
        endTime: dayjs(endTime, "HH:mm")
          .year(2024)
          .month(9 - 1)
          .date(28)
          .toDate(),
      })),
      schedule2nd: raw.schedule2nd.map(({ startTime, endTime }) => ({
        startTime: dayjs(startTime, "HH:mm")
          .year(2024)
          .month(9 - 1)
          .date(29)
          .toDate(),
        endTime: dayjs(endTime, "HH:mm")
          .year(2024)
          .month(9 - 1)
          .date(29)
          .toDate(),
      })),
    })
  )
  const classroomPrograms = rawClassroomPrograms.items.map<ClassroomProgram>(
    (raw) => ({
      _id: raw._id,
      category: "classroom",
      title: raw.title,
      organizer: raw.organizer,
      introduction: raw.introduction,
      location: raw.location,
      tags: raw.tags,
      timeTable1st: raw.timeTable1st.map(({ startTime, endTime }) => ({
        startTime: dayjs(startTime, "HH:mm")
          .year(2024)
          .month(9 - 1)
          .date(28)
          .toDate(),
        endTime: dayjs(endTime, "HH:mm")
          .year(2024)
          .month(9 - 1)
          .date(28)
          .toDate(),
      })),
      timeTable2nd: raw.timeTable2nd.map(({ startTime, endTime }) => ({
        startTime: dayjs(startTime, "HH:mm")
          .year(2024)
          .month(9 - 1)
          .date(29)
          .toDate(),
        endTime: dayjs(endTime, "HH:mm")
          .year(2024)
          .month(9 - 1)
          .date(29)
          .toDate(),
      })),
    })
  )
  const stagePrograms = rawStagePrograms.items.map<StageProgram>((raw) => ({
    _id: raw._id,
    category: "stage",
    title: raw.title,
    organizer: raw.organizer,
    introduction: raw.introduction,
    location: "ステージ",
    tags: raw.tags,
    schedule1st: raw.schedule1st.map(({ startTime, endTime }) => ({
      startTime: dayjs(startTime, "HH:mm")
        .year(2024)
        .month(9 - 1)
        .date(28)
        .toDate(),
      endTime: dayjs(endTime, "HH:mm")
        .year(2024)
        .month(9 - 1)
        .date(28)
        .toDate(),
    })),
    schedule2nd: raw.schedule2nd.map(({ startTime, endTime }) => ({
      startTime: dayjs(startTime, "HH:mm")
        .year(2024)
        .month(9 - 1)
        .date(29)
        .toDate(),
      endTime: dayjs(endTime, "HH:mm")
        .year(2024)
        .month(9 - 1)
        .date(29)
        .toDate(),
    })),
  }))
  cachedPrograms["applicant"] = applicantPrograms
  cachedPrograms["auditorium"] = auditoriumPrograms
  cachedPrograms["classroom"] = classroomPrograms
  cachedPrograms["stage"] = stagePrograms
}

export async function refreshProgramTags() {
  cachedProgramTags["applicant"] = [
    ...new Set(cachedPrograms["applicant"].flatMap((program) => program.tags)),
  ]
  cachedProgramTags["auditorium"] = [
    ...new Set(cachedPrograms["auditorium"].flatMap((program) => program.tags)),
  ]
  cachedProgramTags["classroom"] = [
    ...new Set(cachedPrograms["classroom"].flatMap((program) => program.tags)),
  ]
  cachedProgramTags["stage"] = [
    ...new Set(cachedPrograms["stage"].flatMap((program) => program.tags)),
  ]
}
