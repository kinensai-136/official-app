import {
  AuditoriumProgram,
  StageProgram,
} from "~/services/program/program.type"
import { useProgram } from "~/services/program/program-hook"
import { whatTimeIsIt } from "~/utils/what-time-is-it"

export function useTimeTable() {
  const { programs } = useProgram()
  const auditoriumTimeTable = convertTimeTable(
    programs.auditorium as AuditoriumProgram[]
  )
  const auditoriumTimeTable1st = auditoriumTimeTable.filter(
    ([[startTime]]) => whatTimeIsIt(startTime) === "1st-day"
  )
  const auditoriumTimeTable2nd = auditoriumTimeTable.filter(
    ([[startTime]]) => whatTimeIsIt(startTime) === "2nd-day"
  )
  const stageTimeTable = convertTimeTable(programs.stage as StageProgram[])
  const stageTimeTable1st = stageTimeTable.filter(
    ([[startTime]]) => whatTimeIsIt(startTime) === "1st-day"
  )
  const stageTimeTable2nd = stageTimeTable.filter(
    ([[startTime]]) => whatTimeIsIt(startTime) === "2nd-day"
  )
  return {
    auditoriumTimeTable1st,
    auditoriumTimeTable2nd,
    stageTimeTable1st,
    stageTimeTable2nd,
  }
}

function convertTimeTable(programs: (AuditoriumProgram | StageProgram)[]) {
  const unorderedTimeTable = new Map<
    [Date, Date],
    AuditoriumProgram | StageProgram
  >()
  for (const program of programs) {
    ;[...program.schedule1st, ...program.schedule2nd].forEach(
      ({ startTime, endTime }) => {
        unorderedTimeTable.set([startTime, endTime], program)
      }
    )
  }
  const orederedTimeTable = [...unorderedTimeTable].sort(
    (a, b) => a[0][0].getTime() - b[0][0].getTime()
  )
  return orederedTimeTable
}
