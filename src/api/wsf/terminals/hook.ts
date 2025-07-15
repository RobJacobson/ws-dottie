// WSF Terminals hooks

import { useQuery } from "@tanstack/react-query";

import {
  createCacheFlushOptions,
  createFrequentUpdateOptions,
  createInfrequentUpdateOptions,
} from "@/shared/caching/config";

import {
  // Cache Flush Date API functions
  getCacheFlushDateTerminals,
  // Terminal Basics API functions
  getTerminalBasics,
  getTerminalBasicsByTerminalId,
  // Terminal Bulletins API functions
  getTerminalBulletins,
  getTerminalBulletinsByTerminalId,
  // Terminal Locations API functions
  getTerminalLocations,
  getTerminalLocationsByTerminalId,
  // Terminal Sailing Space API functions
  getTerminalSailingSpace,
  getTerminalSailingSpaceByTerminalId,
  // Terminal Transports API functions
  getTerminalTransports,
  getTerminalTransportsByTerminalId,
  // Terminal Verbose API functions
  getTerminalVerbose,
  getTerminalVerboseByTerminalId,
  // Terminal Wait Times API functions
  getTerminalWaitTimes,
  getTerminalWaitTimesByTerminalId,
} from "./api";
import type {
  TerminalBasics,
  TerminalBulletin,
  TerminalLocation,
  TerminalSailingSpace,
  TerminalTransport,
  TerminalVerbose,
  TerminalWaitTime,
  TerminalWaitTimes,
} from "./types";

// ============================================================================
// TERMINAL BASICS HOOKS
// ============================================================================

/**
 * React Query hook for fetching all terminal basics
 *
 * @param options - Optional React Query options
 * @returns Query result containing array of TerminalBasics objects
 */
export const useTerminalBasics = (
  options?: Parameters<typeof useQuery<TerminalBasics[]>>[0]
) => {
  return useQuery({
    queryKey: ["terminals", "basics"],
    queryFn: getTerminalBasics,
    ...createInfrequentUpdateOptions(),
    ...options,
  });
};

/**
 * React Query hook for fetching specific terminal basics by terminal ID
 *
 * @param terminalId - The unique identifier for the terminal
 * @param options - Optional React Query options
 * @returns Query result containing TerminalBasics object for the specified terminal
 */
export const useTerminalBasicsByTerminalId = (
  terminalId: number,
  options?: Parameters<typeof useQuery<TerminalBasics>>[0]
) => {
  return useQuery({
    queryKey: ["terminals", "basics", "byTerminalId", terminalId],
    queryFn: () => getTerminalBasicsByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });
};

// ============================================================================
// TERMINAL BULLETINS HOOKS
// ============================================================================

/**
 * Hook for fetching terminal bulletins from WSF Terminals API
 *
 * Retrieves bulletin information for all terminals including announcements,
 * notices, and important updates. This endpoint provides current bulletin
 * information for all WSF terminals.
 *
 * This data is updated as new bulletins are posted and provides current
 * announcement information for all terminals.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of TerminalBulletin objects with bulletin information
 */
export const useTerminalBulletins = (
  options?: Parameters<typeof useQuery<TerminalBulletin[]>>[0]
) => {
  return useQuery({
    queryKey: ["terminals", "bulletins"],
    queryFn: getTerminalBulletins,
    ...createInfrequentUpdateOptions(),
    ...options,
  });
};

/**
 * Hook for fetching terminal bulletins for a specific terminal from WSF Terminals API
 *
 * Retrieves bulletin information for a specific terminal identified by terminal ID,
 * including announcements, notices, and important updates. This endpoint filters
 * the resultset to a single terminal, providing current bulletin information
 * for that specific terminal.
 *
 * This data is updated as new bulletins are posted and provides current
 * announcement information for the specified terminal.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param options - Optional React Query options
 * @returns React Query result containing an array of TerminalBulletin objects with bulletin information for the specified terminal
 */
export const useTerminalBulletinsByTerminalId = (
  terminalId: number,
  options?: Parameters<typeof useQuery<TerminalBulletin>>[0]
) => {
  return useQuery({
    queryKey: ["terminals", "bulletins", "byTerminalId", terminalId],
    queryFn: () => getTerminalBulletinsByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });
};

// ============================================================================
// TERMINAL LOCATIONS HOOKS
// ============================================================================

/**
 * Hook for fetching terminal locations from WSF Terminals API
 *
 * Retrieves location information for all terminals including coordinates,
 * addresses, and geographic data. This endpoint provides the physical
 * location details for all WSF terminals.
 *
 * This data is updated infrequently and provides static terminal location
 * information that doesn't change often, such as terminal coordinates and addresses.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of TerminalLocation objects with terminal location information
 */
export const useTerminalLocations = (
  options?: Parameters<typeof useQuery<TerminalLocation[]>>[0]
) => {
  return useQuery({
    queryKey: ["terminals", "locations"],
    queryFn: getTerminalLocations,
    ...createInfrequentUpdateOptions(),
    ...options,
  });
};

/**
 * Hook for fetching terminal location for a specific terminal from WSF Terminals API
 *
 * Retrieves location information for a specific terminal identified by terminal ID,
 * including coordinates, address, and geographic data. This endpoint filters the
 * resultset to a single terminal, providing the physical location details for
 * that specific terminal.
 *
 * This data is updated infrequently and provides static terminal location
 * information that doesn't change often, such as terminal coordinates and addresses.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param options - Optional React Query options
 * @returns React Query result containing an array of TerminalLocation objects with location information for the specified terminal
 */
export const useTerminalLocationsByTerminalId = (
  terminalId: number,
  options?: Parameters<typeof useQuery<TerminalLocation>>[0]
) => {
  return useQuery({
    queryKey: ["terminals", "locations", "byTerminalId", terminalId],
    queryFn: () => getTerminalLocationsByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });
};

// ============================================================================
// TERMINAL SAILING SPACE HOOKS
// ============================================================================

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
 * @param options - Optional React Query options
 * @returns React Query result containing an array of TerminalSailingSpace objects with real-time space availability information
 */
export const useTerminalSailingSpace = (
  options?: Parameters<typeof useQuery<TerminalSailingSpace[]>>[0]
) => {
  return useQuery({
    queryKey: ["terminals", "sailingSpace"],
    queryFn: getTerminalSailingSpace,
    ...createFrequentUpdateOptions(),
    ...options,
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
 * @param options - Optional React Query options
 * @returns React Query result containing an array of TerminalSailingSpace objects with real-time space availability information for the specified terminal
 */
export const useTerminalSailingSpaceByTerminalId = (
  terminalId: number,
  options?: Parameters<typeof useQuery<TerminalSailingSpace>>[0]
) => {
  return useQuery({
    queryKey: ["terminals", "sailingSpace", "byTerminalId", terminalId],
    queryFn: () => getTerminalSailingSpaceByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createFrequentUpdateOptions(),
    ...options,
  });
};

// ============================================================================
// TERMINAL TRANSPORTS HOOKS
// ============================================================================

/**
 * Hook for fetching terminal transports from WSF Terminals API
 *
 * Retrieves transportation information for all terminals including transit options,
 * shuttle services, and transportation connections. This endpoint provides
 * comprehensive transportation information for all WSF terminals.
 *
 * This data is updated infrequently and provides static transportation
 * information that doesn't change often, such as transit connections and shuttle services.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of TerminalTransport objects with transportation information
 */
export const useTerminalTransports = (
  options?: Parameters<typeof useQuery<TerminalTransport[]>>[0]
) => {
  return useQuery({
    queryKey: ["terminals", "transports"],
    queryFn: getTerminalTransports,
    ...createInfrequentUpdateOptions(),
    ...options,
  });
};

/**
 * Hook for fetching terminal transports for a specific terminal from WSF Terminals API
 *
 * Retrieves transportation information for a specific terminal identified by terminal ID,
 * including transit options, shuttle services, and transportation connections.
 * This endpoint filters the resultset to a single terminal, providing
 * comprehensive transportation information for that specific terminal.
 *
 * This data is updated infrequently and provides static transportation
 * information that doesn't change often, such as transit connections and shuttle services.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param options - Optional React Query options
 * @returns React Query result containing an array of TerminalTransport objects with transportation information for the specified terminal
 */
export const useTerminalTransportsByTerminalId = (
  terminalId: number,
  options?: Parameters<typeof useQuery<TerminalTransport>>[0]
) => {
  return useQuery({
    queryKey: ["terminals", "transports", "byTerminalId", terminalId],
    queryFn: () => getTerminalTransportsByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });
};

// ============================================================================
// TERMINAL WAIT TIMES HOOKS
// ============================================================================

/**
 * Hook for fetching terminal wait times from WSF Terminals API
 *
 * Retrieves current wait time information for all terminals including
 * estimated wait times, queue lengths, and congestion data. This endpoint
 * provides real-time information about terminal congestion and wait times
 * for all WSF terminals.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of TerminalWaitTimes objects with wait time information
 */
export const useTerminalWaitTimes = (
  options?: Parameters<typeof useQuery<TerminalWaitTimes[]>>[0]
) => {
  return useQuery({
    queryKey: ["terminals", "waitTimes"],
    queryFn: getTerminalWaitTimes,
    ...createInfrequentUpdateOptions(),
    ...options,
  });
};

/**
 * Hook for fetching terminal wait times by terminal from WSF Terminals API
 *
 * Retrieves current wait time information for a specific terminal identified
 * by terminal ID, including estimated wait times, queue lengths, and congestion
 * data. This endpoint filters the resultset to a single terminal, providing
 * real-time information about terminal congestion and wait times for that
 * specific terminal.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param options - Optional React Query options
 * @returns React Query result containing a TerminalWaitTimes object with wait time information for the specified terminal
 */
export const useTerminalWaitTimesByTerminalId = (
  terminalId: number,
  options?: Parameters<typeof useQuery<TerminalWaitTimes>>[0]
) => {
  return useQuery({
    queryKey: ["terminals", "waitTimes", "byTerminalId", terminalId],
    queryFn: () => getTerminalWaitTimesByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });
};

// ============================================================================
// TERMINAL VERBOSE HOOKS
// ============================================================================

/**
 * Hook for fetching terminal verbose data from WSF Terminals API
 *
 * Retrieves comprehensive terminal information including location, facilities,
 * parking information, and operational status. This endpoint provides detailed
 * information about all terminals in the WSF system, including terminal
 * coordinates, available facilities, parking capacity, and current operational status.
 *
 * This data is updated infrequently and provides static terminal characteristics
 * that don't change often, such as terminal specifications and facilities.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of TerminalVerbose objects with comprehensive terminal information
 */
export const useTerminalVerbose = (
  options?: Parameters<typeof useQuery<TerminalVerbose[]>>[0]
) => {
  return useQuery({
    queryKey: ["terminals", "verbose"],
    queryFn: getTerminalVerbose,
    ...createInfrequentUpdateOptions(),
    ...options,
  });
};

/**
 * Hook for fetching terminal verbose data for a specific terminal from WSF Terminals API
 *
 * Retrieves comprehensive terminal information for a specific terminal identified by terminal ID,
 * including location, facilities, parking information, and operational status. This endpoint
 * provides detailed information about the specified terminal, including terminal coordinates,
 * available facilities, parking capacity, and current operational status.
 *
 * This data is updated infrequently and provides static terminal characteristics
 * that don't change often, such as terminal specifications and facilities.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param options - Optional React Query options
 * @returns React Query result containing a TerminalVerbose object with comprehensive information for the specified terminal
 */
export const useTerminalVerboseByTerminalId = (
  terminalId: number,
  options?: Parameters<typeof useQuery<TerminalVerbose>>[0]
) => {
  return useQuery({
    queryKey: ["terminals", "verbose", "byTerminalId", terminalId],
    queryFn: () => getTerminalVerboseByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions(),
    ...options,
  });
};

// ============================================================================
// CACHE FLUSH DATE HOOKS
// ============================================================================

/**
 * Hook for fetching terminals cache flush date from WSF Terminals API
 *
 * Retrieves the cache flush date for terminals data, which indicates when
 * the data was last updated. This endpoint provides information about data
 * freshness and can be used to determine when to refresh cached terminal data.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing cache flush date information
 */
export const useCacheFlushDateTerminals = (
  options?: Parameters<typeof useQuery<Date | null>>[0]
) =>
  useQuery({
    queryKey: ["terminals", "cacheFlushDate"],
    queryFn: getCacheFlushDateTerminals,
    ...createCacheFlushOptions(),
    ...options,
  });
