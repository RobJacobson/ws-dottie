// Terminal sailing space hooks

import { useQuery } from "@tanstack/react-query";

import { createFrequentUpdateOptions } from "@/shared/caching/config";
import type { TerminalSailingSpace } from "../types";
import { getTerminalSailingSpace, getTerminalSailingSpaceById } from "./api";

// Main hooks
/**
 * Hook for fetching terminal sailing space data from WSF Terminals API
 *
 * Retrieves current space availability information for all terminals including
 * vehicle capacity, wait times, and space status. This endpoint provides real-time
 * information about space availability at all WSF terminals, including current
 * vehicle capacity, estimated wait times, and space status for upcoming sailings.
 *
 * This data is updated frequently and provides dynamic terminal capacity information
 * that changes throughout the day based on current demand and vessel assignments.
 *
 * @returns React Query result containing an array of TerminalSailingSpace objects with real-time space availability information
 */
export const useTerminalSailingSpace = () => {
  return useQuery({
    queryKey: ["terminals", "sailingSpace"],
    queryFn: getTerminalSailingSpace,
    ...createFrequentUpdateOptions(),
  });
};

/**
 * Hook for fetching terminal sailing space data for a specific terminal from WSF Terminals API
 *
 * Retrieves current space availability information for a specific terminal identified by terminal ID,
 * including vehicle capacity, wait times, and space status. This endpoint filters the resultset
 * to a single terminal, providing real-time information about space availability, current
 * vehicle capacity, estimated wait times, and space status for upcoming sailings.
 *
 * This data is updated frequently and provides dynamic terminal capacity information
 * that changes throughout the day based on current demand and vessel assignments.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns React Query result containing an array of TerminalSailingSpace objects with real-time space availability information for the specified terminal
 */
export const useTerminalSailingSpaceById = (terminalId: number) => {
  return useQuery({
    queryKey: ["terminals", "sailingSpace", "byId", terminalId],
    queryFn: () => getTerminalSailingSpaceById(terminalId),
    enabled: !!terminalId,
    ...createFrequentUpdateOptions(),
  });
};
