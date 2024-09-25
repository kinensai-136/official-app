import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat"

import { NEWT_APP_UID, newtClient } from "~/libs/newt/newt-client"
import {
  NewtApplicantProgram,
  NewtAuditoriumProgram,
  NewtBoothProgram,
  NewtClassroomProgram,
  NewtModels,
  NewtStageProgram,
} from "~/libs/newt/newt-models.type"
import {
  ApplicantProgram,
  AuditoriumProgram,
  BoothProgram,
  ClassroomProgram,
  Program,
  ProgramCategory,
  StageProgram,
} from "~/services/program/program.type"

export async function fetchPrograms(): Promise<
  Record<ProgramCategory, Program[]>
> {
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
  const rawBoothPrograms = await newtClient.getContents<NewtBoothProgram>({
    appUid: NEWT_APP_UID,
    modelUid: NewtModels.BOOTH_PROGRAMS,
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
      timeTable1st: raw.timeTable1st.map(({ _id, startTime, endTime }) => ({
        _id,
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
      timeTable2nd: raw.timeTable2nd.map(({ _id, startTime, endTime }) => ({
        _id,
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
      schedule1st: raw.schedule1st.map(({ _id, startTime, endTime }) => ({
        _id,
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
      schedule2nd: raw.schedule2nd.map(({ _id, startTime, endTime }) => ({
        _id,
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
  const boothPrograms = rawBoothPrograms.items.map<BoothProgram>((raw) => ({
    _id: raw._id,
    category: "booth",
    title: raw.title,
    organizer: raw.organizer,
    introduction: raw.introduction,
    location: raw.location,
    tags: raw.tags,
    productName: raw.productName,
  }))
  const classroomPrograms = rawClassroomPrograms.items.map<ClassroomProgram>(
    (raw) => ({
      _id: raw._id,
      category: "classroom",
      title: raw.title,
      organizer: raw.organizer,
      introduction: raw.introduction,
      location: raw.location,
      tags: raw.tags,
      timeTable1st: raw.timeTable1st.map(({ _id, startTime, endTime }) => ({
        _id,
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
      timeTable2nd: raw.timeTable2nd.map(({ _id, startTime, endTime }) => ({
        _id,
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
    schedule1st: raw.schedule1st.map(({ _id, startTime, endTime }) => ({
      _id,
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
    schedule2nd: raw.schedule2nd.map(({ _id, startTime, endTime }) => ({
      _id,
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
  return {
    applicant: applicantPrograms,
    auditorium: auditoriumPrograms,
    booth: boothPrograms,
    classroom: classroomPrograms,
    stage: stagePrograms,
  }
}
