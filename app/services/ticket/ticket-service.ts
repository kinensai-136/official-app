import { doc, getDoc, getFirestore } from "firebase/firestore"

import { Program } from "~/services/program/program.type"
import { TicketDistributionStatus } from "~/services/ticket/ticket.type"

export async function fetchTicketDistributionStatuses(program: Program) {
  const programDoc = doc(getFirestore(), "programs", program._id)
  const programDocSnapshot = await getDoc(programDoc)
  const ticketDistributionStatuses =
    (programDocSnapshot.data()?.ticketDistributionStatuses as
      | { [periodId: string]: TicketDistributionStatus }
      | undefined) ?? {}
  return new Map(Object.entries(ticketDistributionStatuses))
}
