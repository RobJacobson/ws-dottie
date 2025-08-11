// WSF Terminals hooks

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { QueryOptionsWithoutKey } from "@/shared/types";

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
  TerminalWaitTimes,
} from "./schemas";

// ============================================================================
// TERMINAL BASICS HOOKS
// ============================================================================

/**
 * React Query hook for fetching all terminal basics
 *
 * Retrieves the most basic/brief information pertaining to terminals.
 * This includes location, contact details, and basic status information.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param options - Optional React Query options
 * @returns Query result containing array of TerminalBasics objects
 *
 * @example
 * ```typescript
 * const { data: terminals } = useTerminalBasics();
 * console.log(terminals?.[0]?.TerminalName); // "Anacortes"
 * ```
 */
export const useTerminalBasics = (
  options?: QueryOptionsWithoutKey<TerminalBasics[]>
): UseQueryResult<TerminalBasics[], Error> => {
  return useQuery({
    queryKey: ["wsf", "terminals", "basics"],
    queryFn: () => getTerminalBasics(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

/**
 * React Query hook for fetching specific terminal basics by terminal ID
 *
 * Retrieves the most basic/brief information for a specific terminal identified by terminal ID.
 * This includes location, contact details, and basic status information for the specified terminal.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param options - Optional React Query options
 * @returns Query result containing TerminalBasics object for the specified terminal
 *
 * @example
 * ```typescript
 * const { data: terminal } = useTerminalBasicsByTerminalId({ terminalId: 7 });
 * console.log(terminal?.TerminalName); // "Anacortes"
 * ```
 */
export const useTerminalBasicsByTerminalId = (
  params: { terminalId: number },
  options?: QueryOptionsWithoutKey<TerminalBasics>
): UseQueryResult<TerminalBasics, Error> => {
  return useQuery({
    queryKey: ["wsf", "terminals", "basics", "byTerminalId", params.terminalId],
    queryFn: () =>
      getTerminalBasicsByTerminalId({ terminalId: params.terminalId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
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
 * @param options - Optional React Query options
 * @returns React Query result containing an array of TerminalBulletin objects with bulletin information
 *
 * @example
 * ```typescript
 * const { data: bulletins } = useTerminalBulletins();
 * console.log(bulletins?.[0]?.TerminalName); // "Anacortes"
 * ```
 */
export const useTerminalBulletins = (
  options?: QueryOptionsWithoutKey<TerminalBulletin[]>
): UseQueryResult<TerminalBulletin[], Error> => {
  return useQuery({
    queryKey: ["wsf", "terminals", "bulletins"],
    queryFn: () => getTerminalBulletins(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

/**
 * Hook for fetching terminal bulletins for a specific terminal from WSF Terminals API
 *
 * Retrieves bulletin information for a specific terminal identified by terminal ID,
 * including announcements, notices, and important updates. This endpoint filters the
 * resultset to a single terminal, providing current bulletin information for that
 * specific terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param options - Optional React Query options
 * @returns React Query result containing a TerminalBulletin object with bulletin information for the specified terminal
 *
 * @example
 * ```typescript
 * const { data: bulletin } = useTerminalBulletinsByTerminalId({ terminalId: 7 });
 * console.log(bulletin?.TerminalName); // "Anacortes"
 * ```
 */
export const useTerminalBulletinsByTerminalId = (
  params: { terminalId: number },
  options?: QueryOptionsWithoutKey<TerminalBulletin>
): UseQueryResult<TerminalBulletin, Error> => {
  return useQuery({
    queryKey: [
      "wsf",
      "terminals",
      "bulletins",
      "byTerminalId",
      params.terminalId,
    ],
    queryFn: () =>
      getTerminalBulletinsByTerminalId({ terminalId: params.terminalId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
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
 * @param options - Optional React Query options
 * @returns React Query result containing an array of TerminalLocation objects with terminal location information
 *
 * @example
 * ```typescript
 * const { data: locations } = useTerminalLocations();
 * console.log(locations?.[0]?.TerminalName); // "Anacortes"
 * ```
 */
export const useTerminalLocations = (
  options?: QueryOptionsWithoutKey<TerminalLocation[]>
): UseQueryResult<TerminalLocation[], Error> => {
  return useQuery({
    queryKey: ["wsf", "terminals", "locations"],
    queryFn: () => getTerminalLocations(),
    ...tanstackQueryOptions.DAILY_UPDATES,
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
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param options - Optional React Query options
 * @returns React Query result containing an array of TerminalLocation objects with location information for the specified terminal
 *
 * @example
 * ```typescript
 * const { data: location } = useTerminalLocationsByTerminalId({ terminalId: 7 });
 * console.log(location?.TerminalName); // "Anacortes"
 * ```
 */
export const useTerminalLocationsByTerminalId = (
  params: { terminalId: number },
  options?: QueryOptionsWithoutKey<TerminalLocation>
): UseQueryResult<TerminalLocation, Error> => {
  return useQuery({
    queryKey: [
      "wsf",
      "terminals",
      "locations",
      "byTerminalId",
      params.terminalId,
    ],
    queryFn: () =>
      getTerminalLocationsByTerminalId({ terminalId: params.terminalId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
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
 * @param options - Optional React Query options
 * @returns React Query result containing an array of TerminalSailingSpace objects with real-time space availability information
 *
 * @example
 * ```typescript
 * const { data: sailingSpaces } = useTerminalSailingSpace();
 * console.log(sailingSpaces?.[0]?.TerminalName); // "Anacortes"
 * ```
 */
export const useTerminalSailingSpace = (
  options?: QueryOptionsWithoutKey<TerminalSailingSpace[]>
): UseQueryResult<TerminalSailingSpace[], Error> => {
  return useQuery({
    queryKey: ["wsf", "terminals", "sailing-space"],
    queryFn: () => getTerminalSailingSpace(),
    ...tanstackQueryOptions.REALTIME_UPDATES,
    ...options,
  });
};

/**
 * Hook for fetching terminal sailing space data for a specific terminal from WSF Terminals API
 *
 * Retrieves current space availability information for a specific terminal identified by terminal ID,
 * including vehicle capacity, wait times, and space status. This endpoint filters the resultset
 * to a single terminal, providing real-time information about space availability at that specific
 * terminal, including current vehicle capacity, estimated wait times, and space status for upcoming sailings.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param options - Optional React Query options
 * @returns React Query result containing a TerminalSailingSpace object with real-time space availability information for the specified terminal
 *
 * @example
 * ```typescript
 * const { data: sailingSpace } = useTerminalSailingSpaceByTerminalId({ terminalId: 7 });
 * console.log(sailingSpace?.TerminalName); // "Anacortes"
 * ```
 */
export const useTerminalSailingSpaceByTerminalId = (
  params: { terminalId: number },
  options?: QueryOptionsWithoutKey<TerminalSailingSpace>
): UseQueryResult<TerminalSailingSpace, Error> => {
  return useQuery({
    queryKey: [
      "wsf",
      "terminals",
      "sailingSpace",
      "byTerminalId",
      params.terminalId,
    ],
    queryFn: () =>
      getTerminalSailingSpaceByTerminalId({ terminalId: params.terminalId }),
    ...tanstackQueryOptions.REALTIME_UPDATES,
    ...options,
  });
};

// ============================================================================
// TERMINAL TRANSPORTS HOOKS
// ============================================================================

/**
 * Hook for fetching terminal transports from WSF Terminals API
 *
 * Retrieves transport information for all terminals including connections,
 * routes, and transportation options. This endpoint provides detailed
 * information about transportation connections for all WSF terminals.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of TerminalTransport objects with transport information
 *
 * @example
 * ```typescript
 * const { data: transports } = useTerminalTransports();
 * console.log(transports?.[0]?.TerminalName); // "Anacortes"
 * ```
 */
export const useTerminalTransports = (
  options?: QueryOptionsWithoutKey<TerminalTransport[]>
): UseQueryResult<TerminalTransport[], Error> => {
  return useQuery({
    queryKey: ["wsf", "terminals", "transports"],
    queryFn: () => getTerminalTransports(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

/**
 * Hook for fetching terminal transports for a specific terminal from WSF Terminals API
 *
 * Retrieves transport information for a specific terminal identified by terminal ID,
 * including connections, routes, and transportation options. This endpoint filters the
 * resultset to a single terminal, providing detailed information about transportation
 * connections for that specific terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param options - Optional React Query options
 * @returns React Query result containing a TerminalTransport object with transport information for the specified terminal
 *
 * @example
 * ```typescript
 * const { data: transport } = useTerminalTransportsByTerminalId({ terminalId: 7 });
 * console.log(transport?.TerminalName); // "Anacortes"
 * ```
 */
export const useTerminalTransportsByTerminalId = (
  params: { terminalId: number },
  options?: QueryOptionsWithoutKey<TerminalTransport>
): UseQueryResult<TerminalTransport, Error> => {
  return useQuery({
    queryKey: [
      "wsf",
      "terminals",
      "transports",
      "byTerminalId",
      params.terminalId,
    ],
    queryFn: () =>
      getTerminalTransportsByTerminalId({ terminalId: params.terminalId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

// ============================================================================
// TERMINAL WAIT TIMES HOOKS
// ============================================================================

/**
 * Hook for fetching terminal wait times from WSF Terminals API
 *
 * Retrieves wait time information for all terminals including current wait times,
 * estimated wait times, and wait time trends. This endpoint provides real-time
 * wait time data for all WSF terminals.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of TerminalWaitTimes objects with wait time information
 *
 * @example
 * ```typescript
 * const { data: waitTimes } = useTerminalWaitTimes();
 * console.log(waitTimes?.[0]?.TerminalName); // "Anacortes"
 * ```
 */
export const useTerminalWaitTimes = (
  options?: QueryOptionsWithoutKey<TerminalWaitTimes[]>
): UseQueryResult<TerminalWaitTimes[], Error> => {
  return useQuery({
    queryKey: ["wsf", "terminals", "wait-times"],
    queryFn: () => getTerminalWaitTimes(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

/**
 * Hook for fetching terminal wait times for a specific terminal from WSF Terminals API
 *
 * Retrieves wait time information for a specific terminal identified by terminal ID,
 * including current wait times, estimated wait times, and wait time trends. This endpoint
 * filters the resultset to a single terminal, providing real-time wait time data for that
 * specific terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param options - Optional React Query options
 * @returns React Query result containing a TerminalWaitTimes object with wait time information for the specified terminal
 *
 * @example
 * ```typescript
 * const { data: waitTime } = useTerminalWaitTimesByTerminalId({ terminalId: 7 });
 * console.log(waitTime?.TerminalName); // "Anacortes"
 * ```
 */
export const useTerminalWaitTimesByTerminalId = (
  params: { terminalId: number },
  options?: QueryOptionsWithoutKey<TerminalWaitTimes>
): UseQueryResult<TerminalWaitTimes, Error> => {
  return useQuery({
    queryKey: [
      "wsf",
      "terminals",
      "wait-times",
      "byTerminalId",
      params.terminalId,
    ],
    queryFn: () =>
      getTerminalWaitTimesByTerminalId({ terminalId: params.terminalId }),
    ...tanstackQueryOptions.REALTIME_UPDATES,
    ...options,
  });
};

// ============================================================================
// TERMINAL VERBOSE HOOKS
// ============================================================================

/**
 * Hook for fetching terminal verbose data from WSF Terminals API
 *
 * Retrieves comprehensive terminal information including all available data
 * for all terminals. This endpoint provides the most detailed information
 * available for all WSF terminals in a single call.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing an array of TerminalVerbose objects with comprehensive terminal information
 *
 * @example
 * ```typescript
 * const { data: terminals } = useTerminalVerbose();
 * console.log(terminals?.[0]?.TerminalName); // "Anacortes"
 * ```
 */
export const useTerminalVerbose = (
  options?: QueryOptionsWithoutKey<TerminalVerbose[]>
): UseQueryResult<TerminalVerbose[], Error> => {
  return useQuery({
    queryKey: ["wsf", "terminals", "verbose"],
    queryFn: () => getTerminalVerbose(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

/**
 * Hook for fetching terminal verbose data for a specific terminal from WSF Terminals API
 *
 * Retrieves comprehensive terminal information for a specific terminal identified by terminal ID,
 * including all available data. This endpoint filters the resultset to a single terminal,
 * providing the most detailed information available for that specific terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param options - Optional React Query options
 * @returns React Query result containing a TerminalVerbose object with comprehensive terminal information for the specified terminal
 *
 * @example
 * ```typescript
 * const { data: terminal } = useTerminalVerboseByTerminalId({ terminalId: 7 });
 * console.log(terminal?.TerminalName); // "Anacortes"
 * ```
 */
export const useTerminalVerboseByTerminalId = (
  params: { terminalId: number },
  options?: QueryOptionsWithoutKey<TerminalVerbose>
): UseQueryResult<TerminalVerbose, Error> => {
  return useQuery({
    queryKey: [
      "wsf",
      "terminals",
      "verbose",
      "byTerminalId",
      params.terminalId,
    ],
    queryFn: () =>
      getTerminalVerboseByTerminalId({ terminalId: params.terminalId }),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
};

// ============================================================================
// CACHE FLUSH DATE HOOKS
// ============================================================================

/**
 * Hook for fetching cache flush date from WSF Terminals API
 *
 * Retrieves the cache flush date for terminals data. This endpoint provides
 * information about when the terminals data was last updated, which can be
 * used to coordinate caching strategies.
 *
 * @param options - Optional React Query options
 * @returns React Query result containing cache flush date
 *
 * @example
 * ```typescript
 * const { data: flushDate } = useCacheFlushDateTerminals();
 * console.log(flushDate); // "2024-01-15T10:00:00Z"
 * ```
 */
export const useCacheFlushDateTerminals = (
  options?: QueryOptionsWithoutKey<Date | null>
) =>
  useQuery({
    queryKey: ["wsf", "terminals", "cache-flush-date"],
    queryFn: () => getCacheFlushDateTerminals(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
