/**
 * @fileoverview WSF Terminals API - React Hooks
 *
 * This module provides strongly-typed React hooks for WSF Terminals API
 * that re-export from the main hooks file with proper filtering.
 */

// Re-export only the WSF Terminals hooks from the main hooks file
export {
  useGetTerminalBasics,
  useGetTerminalBasicsByTerminalId,
  useGetTerminalBulletins,
  useGetTerminalBulletinsByTerminalId,
  useGetTerminalLocations,
  useGetTerminalLocationsByTerminalId,
  useGetTerminalSailingSpace,
  useGetTerminalSailingSpaceByTerminalId,
  useGetTerminalTransports,
  useGetTerminalTransportsByTerminalId,
  useGetTerminalVerbose,
  useGetTerminalVerboseByTerminalId,
  useGetTerminalWaitTimes,
  useGetTerminalWaitTimesByTerminalId,
} from "@/shared/tanstack/hooks";
