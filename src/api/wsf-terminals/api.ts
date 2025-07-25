// WSF Terminals API functions

import { createFetchFactory } from "@/shared/fetching/api";

import type {
  TerminalBasics,
  TerminalBulletin,
  TerminalLocation,
  TerminalSailingSpace,
  TerminalTransport,
  TerminalVerbose,
  TerminalWaitTimes,
} from "./types";

// Create a factory function for WSF Terminals API
const createWsfTerminalsFetch = createFetchFactory(
  "https://www.wsdot.wa.gov/ferries/api/terminals/rest"
);

// ============================================================================
// TERMINAL BASICS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching all terminal basics from WSF Terminals API
 *
 * Retrieves the most basic/brief information pertaining to terminals.
 * This includes location, contact details, and basic status information.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to an array of TerminalBasics objects containing basic terminal information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const terminals = await getTerminalBasics();
 * console.log(terminals[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalBasics =
  createWsfTerminalsFetch<TerminalBasics[]>("/terminalbasics");

/**
 * API function for fetching specific terminal basics from WSF Terminals API
 *
 * Retrieves the most basic/brief information for a specific terminal identified by terminal ID.
 * This includes location, contact details, and basic status information for the specified terminal.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to a TerminalBasics object containing basic information for the specified terminal
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const terminal = await getTerminalBasicsByTerminalId({ terminalId: 7 });
 * console.log(terminal.TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalBasicsByTerminalId = createWsfTerminalsFetch<
  { terminalId: number },
  TerminalBasics
>("/terminalbasics/{terminalId}");

// ============================================================================
// TERMINAL LOCATIONS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching terminal locations from WSF Terminals API
 *
 * Retrieves location information for all terminals including coordinates,
 * addresses, and geographic data. This endpoint provides the physical
 * location details for all WSF terminals.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to an array of TerminalLocation objects containing terminal location information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const locations = await getTerminalLocations();
 * console.log(locations[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalLocations =
  createWsfTerminalsFetch<TerminalLocation[]>("/terminallocations");

/**
 * API function for fetching terminal location for a specific terminal from WSF Terminals API
 *
 * Retrieves location information for a specific terminal identified by terminal ID,
 * including coordinates, address, and geographic data. This endpoint filters the
 * resultset to a single terminal, providing the physical location details for
 * that specific terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to an array of TerminalLocation objects containing location information for the specified terminal
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const location = await getTerminalLocationsByTerminalId({ terminalId: 7 });
 * console.log(location.TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalLocationsByTerminalId = createWsfTerminalsFetch<
  { terminalId: number },
  TerminalLocation
>("/terminallocations/{terminalId}");

// ============================================================================
// TERMINAL SAILING SPACE API FUNCTIONS
// ============================================================================

/**
 * API function for fetching terminal sailing space data from WSF Terminals API
 *
 * Retrieves sailing space information for all terminals including capacity,
 * availability, and space allocation data. This endpoint provides detailed
 * information about the sailing space configuration for all WSF terminals.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to an array of TerminalSailingSpace objects containing sailing space information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const sailingSpaces = await getTerminalSailingSpace();
 * console.log(sailingSpaces[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalSailingSpace = createWsfTerminalsFetch<
  TerminalSailingSpace[]
>("/terminalsailingspace");

/**
 * API function for fetching terminal sailing space for a specific terminal from WSF Terminals API
 *
 * Retrieves sailing space information for a specific terminal identified by terminal ID,
 * including capacity, availability, and space allocation data. This endpoint filters the
 * resultset to a single terminal, providing detailed information about the sailing space
 * configuration for that specific terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to a TerminalSailingSpace object containing sailing space information for the specified terminal
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const sailingSpace = await getTerminalSailingSpaceByTerminalId({ terminalId: 7 });
 * console.log(sailingSpace.TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalSailingSpaceByTerminalId = createWsfTerminalsFetch<
  { terminalId: number },
  TerminalSailingSpace
>("/terminalsailingspace/{terminalId}");

// ============================================================================
// TERMINAL BULLETINS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching terminal bulletins from WSF Terminals API
 *
 * Retrieves bulletin information for all terminals including announcements,
 * notices, and important updates. This endpoint provides current bulletin
 * information for all WSF terminals.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to an array of TerminalBulletin objects containing bulletin information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const bulletins = await getTerminalBulletins();
 * console.log(bulletins[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalBulletins =
  createWsfTerminalsFetch<TerminalBulletin[]>("/terminalbulletins");

/**
 * API function for fetching terminal bulletins for a specific terminal from WSF Terminals API
 *
 * Retrieves bulletin information for a specific terminal identified by terminal ID,
 * including announcements, notices, and important updates. This endpoint filters the
 * resultset to a single terminal, providing current bulletin information for that
 * specific terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to a TerminalBulletin object containing bulletin information for the specified terminal
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const bulletin = await getTerminalBulletinsByTerminalId({ terminalId: 7 });
 * console.log(bulletin.TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalBulletinsByTerminalId = createWsfTerminalsFetch<
  { terminalId: number },
  TerminalBulletin
>("/terminalbulletins/{terminalId}");

// ============================================================================
// TERMINAL TRANSPORTS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching terminal transports from WSF Terminals API
 *
 * Retrieves transport information for all terminals including connections,
 * routes, and transportation options. This endpoint provides detailed
 * information about transportation connections for all WSF terminals.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to an array of TerminalTransport objects containing transport information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const transports = await getTerminalTransports();
 * console.log(transports[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalTransports = createWsfTerminalsFetch<
  TerminalTransport[]
>("/terminaltransports");

/**
 * API function for fetching terminal transports for a specific terminal from WSF Terminals API
 *
 * Retrieves transport information for a specific terminal identified by terminal ID,
 * including connections, routes, and transportation options. This endpoint filters the
 * resultset to a single terminal, providing detailed information about transportation
 * connections for that specific terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to a TerminalTransport object containing transport information for the specified terminal
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const transport = await getTerminalTransportsByTerminalId({ terminalId: 7 });
 * console.log(transport.TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalTransportsByTerminalId = createWsfTerminalsFetch<
  { terminalId: number },
  TerminalTransport
>("/terminaltransports/{terminalId}");

// ============================================================================
// TERMINAL WAIT TIMES API FUNCTIONS
// ============================================================================

/**
 * API function for fetching terminal wait times from WSF Terminals API
 *
 * Retrieves wait time information for all terminals including current wait times,
 * estimated wait times, and wait time trends. This endpoint provides real-time
 * wait time data for all WSF terminals.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to an array of TerminalWaitTimes objects containing wait time information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const waitTimes = await getTerminalWaitTimes();
 * console.log(waitTimes[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalWaitTimes =
  createWsfTerminalsFetch<TerminalWaitTimes[]>("/terminalwaittimes");

/**
 * API function for fetching terminal wait times for a specific terminal from WSF Terminals API
 *
 * Retrieves wait time information for a specific terminal identified by terminal ID,
 * including current wait times, estimated wait times, and wait time trends. This endpoint
 * filters the resultset to a single terminal, providing real-time wait time data for that
 * specific terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to a TerminalWaitTimes object containing wait time information for the specified terminal
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const waitTime = await getTerminalWaitTimesByTerminalId({ terminalId: 7 });
 * console.log(waitTime.TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalWaitTimesByTerminalId = createWsfTerminalsFetch<
  { terminalId: number },
  TerminalWaitTimes
>("/terminalwaittimes/{terminalId}");

// ============================================================================
// TERMINAL VERBOSE API FUNCTIONS
// ============================================================================

/**
 * API function for fetching terminal verbose data from WSF Terminals API
 *
 * Retrieves comprehensive terminal information including all available data
 * for all terminals. This endpoint provides the most detailed information
 * available for all WSF terminals in a single call.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to an array of TerminalVerbose objects containing comprehensive terminal information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const terminals = await getTerminalVerbose();
 * console.log(terminals[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalVerbose =
  createWsfTerminalsFetch<TerminalVerbose[]>("/terminalverbose");

/**
 * API function for fetching terminal verbose data for a specific terminal from WSF Terminals API
 *
 * Retrieves comprehensive terminal information for a specific terminal identified by terminal ID,
 * including all available data. This endpoint filters the resultset to a single terminal,
 * providing the most detailed information available for that specific terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to a TerminalVerbose object containing comprehensive terminal information for the specified terminal
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const terminal = await getTerminalVerboseByTerminalId({ terminalId: 7 });
 * console.log(terminal.TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalVerboseByTerminalId = createWsfTerminalsFetch<
  { terminalId: number },
  TerminalVerbose
>("/terminalverbose/{terminalId}");

// ============================================================================
// CACHE FLUSH DATE API FUNCTIONS
// ============================================================================

/**
 * API function for fetching cache flush date from WSF Terminals API
 *
 * Retrieves the cache flush date for terminals data. This endpoint provides
 * information about when the terminals data was last updated, which can be
 * used to coordinate caching strategies.
 *
 * @param logMode - Optional logging mode for debugging API calls
 * @returns Promise resolving to cache flush date
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const flushDate = await getCacheFlushDateTerminals();
 * console.log(flushDate); // "2024-01-15T10:30:00Z"
 * ```
 */
export const getCacheFlushDateTerminals =
  createWsfTerminalsFetch<Date>("/cacheflushdate");
