// Terminal Basics React Query hooks

import { useQuery } from "@tanstack/react-query";

import { createInfrequentUpdateOptions } from "@/shared/caching/config";

import type { TerminalBasics } from "../types";
import { getTerminalBasics, getTerminalBasicsByTerminalId } from "./api";

/**
 * React Query hook for fetching all terminal basics
 *
 * @returns Query result containing array of TerminalBasics objects
 */
export const useTerminalBasics = () => {
  return useQuery({
    queryKey: ["terminals", "basics"],
    queryFn: getTerminalBasics,
    ...createInfrequentUpdateOptions(),
  });
};

/**
 * React Query hook for fetching specific terminal basics by terminal ID
 *
 * @param terminalId - The unique identifier for the terminal
 * @returns Query result containing TerminalBasics object for the specified terminal
 */
export const useTerminalBasicsByTerminalId = (terminalId: number) => {
  return useQuery({
    queryKey: ["terminals", "basics", "byTerminalId", terminalId],
    queryFn: () => getTerminalBasicsByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions(),
  });
};
