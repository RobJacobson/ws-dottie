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
  TerminalsCacheFlushDate,
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
 * @returns React Query result containing an array of TerminalBulletin objects with bulletin information
 */
export const useTerminalBulletins = () => {
  return useQuery({
    queryKey: ["terminals", "bulletins"],
    queryFn: getTerminalBulletins,
    ...createInfrequentUpdateOptions(),
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
 * @returns React Query result containing an array of TerminalBulletin objects with bulletin information for the specified terminal
 */
export const useTerminalBulletinsByTerminalId = (terminalId: number) => {
  return useQuery({
    queryKey: ["terminals", "bulletins", "byTerminalId", terminalId],
    queryFn: () => getTerminalBulletinsByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions(),
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
 * @returns React Query result containing an array of TerminalLocation objects with terminal location information
 */
export const useTerminalLocations = () => {
  return useQuery({
    queryKey: ["terminals", "locations"],
    queryFn: getTerminalLocations,
    ...createInfrequentUpdateOptions(),
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
 * @returns React Query result containing an array of TerminalLocation objects with location information for the specified terminal
 */
export const useTerminalLocationsByTerminalId = (terminalId: number) => {
  return useQuery({
    queryKey: ["terminals", "locations", "byTerminalId", terminalId],
    queryFn: () => getTerminalLocationsByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions(),
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
export const useTerminalSailingSpaceByTerminalId = (terminalId: number) => {
  return useQuery({
    queryKey: ["terminals", "sailingSpace", "byTerminalId", terminalId],
    queryFn: () => getTerminalSailingSpaceByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createFrequentUpdateOptions(),
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
 * @returns React Query result containing an array of TerminalTransport objects with transportation information
 */
export const useTerminalTransports = () => {
  return useQuery({
    queryKey: ["terminals", "transports"],
    queryFn: getTerminalTransports,
    ...createInfrequentUpdateOptions(),
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
 * @returns React Query result containing an array of TerminalTransport objects with transportation information for the specified terminal
 */
export const useTerminalTransportsByTerminalId = (terminalId: number) => {
  return useQuery({
    queryKey: ["terminals", "transports", "byTerminalId", terminalId],
    queryFn: () => getTerminalTransportsByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions(),
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
 * @returns React Query result containing an array of TerminalWaitTimes objects with wait time information
 */
export const useTerminalWaitTimes = () => {
  return useQuery({
    queryKey: ["terminals", "waitTimes"],
    queryFn: getTerminalWaitTimes,
    ...createInfrequentUpdateOptions(),
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
 * @returns React Query result containing a TerminalWaitTimes object with wait time information for the specified terminal
 */
export const useTerminalWaitTimesByTerminalId = (terminalId: number) => {
  return useQuery({
    queryKey: ["terminals", "waitTimes", "byTerminalId", terminalId],
    queryFn: () => getTerminalWaitTimesByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions(),
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
 * @returns React Query result containing an array of TerminalVerbose objects with comprehensive terminal information
 */
export const useTerminalVerbose = () => {
  return useQuery({
    queryKey: ["terminals", "verbose"],
    queryFn: getTerminalVerbose,
    ...createInfrequentUpdateOptions(),
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
 * @returns React Query result containing a TerminalVerbose object with comprehensive information for the specified terminal
 */
export const useTerminalVerboseByTerminalId = (terminalId: number) => {
  return useQuery({
    queryKey: ["terminals", "verbose", "byTerminalId", terminalId],
    queryFn: () => getTerminalVerboseByTerminalId(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions(),
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
 * freshness for all terminals endpoints.
 *
 * @returns React Query result containing a TerminalsCacheFlushDate object with cache flush information
 */
export const useCacheFlushDateTerminals = () =>
  useQuery({
    queryKey: ["terminals", "cacheFlushDate"],
    queryFn: getCacheFlushDateTerminals,
    ...createCacheFlushOptions(),
  });
