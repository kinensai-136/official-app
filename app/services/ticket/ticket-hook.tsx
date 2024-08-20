import { createContext, ReactNode, useCallback, useContext } from "react"

import { useMap } from "@uidotdev/usehooks"

import { Program } from "~/services/program/program.type"
import { TicketDistributionStatus } from "~/services/ticket/ticket.type"
import { fetchTicketDistributionStatuses as fetchTicketDistributionStatusesAsService } from "~/services/ticket/ticket-service"

type TicketContext = {
  ticketDistributionStatuses: Map<string, TicketDistributionStatus>
  fetchTicketDistributionStatuses: (program: Program) => Promise<void>
}

const TicketContext = createContext<TicketContext>({
  ticketDistributionStatuses: new Map(),
  fetchTicketDistributionStatuses: async () => {},
})

export const useTicket = () => useContext(TicketContext)

type Props = {
  children: ReactNode
}

export function TicketProvider({ children }: Props) {
  const ticketDistributionStatuses: Map<string, TicketDistributionStatus> =
    useMap()
  const fetchTicketDistributionStatuses = useCallback(
    async (program: Program) => {
      ;(await fetchTicketDistributionStatusesAsService(program)).forEach(
        (status, periodId) => ticketDistributionStatuses.set(periodId, status)
      )
    },
    [ticketDistributionStatuses]
  )
  return (
    <TicketContext.Provider
      value={{ ticketDistributionStatuses, fetchTicketDistributionStatuses }}
    >
      {children}
    </TicketContext.Provider>
  )
}
