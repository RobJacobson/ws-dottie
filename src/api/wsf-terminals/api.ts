// WSF Terminals API functions

import { createApiClient } from "@/shared/fetching/apiClient";

import type {
  TerminalBasics,
  TerminalBulletin,
  TerminalLocation,
  TerminalSailingSpace,
  TerminalTransport,
  TerminalVerbose,
  TerminalWaitTimes,
} from "./types";

// Module-scoped fetch function for WSF terminals API
const fetchTerminals = createApiClient(
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
 * @returns Promise resolving to an array of TerminalBasics objects containing basic terminal information
 */
export const getTerminalBasics = (): Promise<TerminalBasics[]> =>
  fetchTerminals<TerminalBasics[]>("/terminalbasics");

/**
 * API function for fetching specific terminal basics from WSF Terminals API
 *
 * Retrieves the most basic/brief information for a specific terminal identified by terminal ID.
 * This includes location, contact details, and basic status information for the specified terminal.
 * Please consider using /cacheflushdate to coordinate the caching of this data.
 *
 * @param terminalId - The unique identifier for the terminal
 * @returns Promise resolving to a TerminalBasics object containing basic information for the specified terminal
 */
export const getTerminalBasicsByTerminalId = (
  terminalId: number
): Promise<TerminalBasics> =>
  fetchTerminals<TerminalBasics>(`/terminalbasics/${terminalId}`);

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
 * @returns Promise resolving to an array of TerminalLocation objects containing terminal location information
 */
export const getTerminalLocations = (): Promise<TerminalLocation[]> =>
  fetchTerminals<TerminalLocation[]>("/terminallocations");

/**
 * API function for fetching terminal location for a specific terminal from WSF Terminals API
 *
 * Retrieves location information for a specific terminal identified by terminal ID,
 * including coordinates, address, and geographic data. This endpoint filters the
 * resultset to a single terminal, providing the physical location details for
 * that specific terminal.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns Promise resolving to an array of TerminalLocation objects containing location information for the specified terminal
 */
export const getTerminalLocationsByTerminalId = (
  terminalId: number
): Promise<TerminalLocation> =>
  fetchTerminals<TerminalLocation>(`/terminallocations/${terminalId}`);

// ============================================================================
// TERMINAL SAILING SPACE API FUNCTIONS
// ============================================================================

/**
 * API function for fetching terminal sailing space data from WSF Terminals API
 *
 * Retrieves current space availability information for all terminals including
 * vehicle capacity, wait times, and space status. This endpoint provides real-time
 * information about space availability at all WSF terminals, including current
 * vehicle capacity, estimated wait times, and space status for upcoming sailings.
 *
 * This data is updated frequently and provides dynamic terminal capacity information
 * that changes throughout the day based on current demand and vessel assignments.
 *
 * @returns Promise resolving to an array of TerminalSailingSpace objects containing real-time space availability information
 */
export const getTerminalSailingSpace = (): Promise<TerminalSailingSpace[]> =>
  fetchTerminals<TerminalSailingSpace[]>("/terminalsailingspace");

/**
 * API function for fetching terminal sailing space data for a specific terminal from WSF Terminals API
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
 * @returns Promise resolving to a TerminalSailingSpace object containing real-time space availability information for the specified terminal
 */
export const getTerminalSailingSpaceByTerminalId = (
  terminalId: number
): Promise<TerminalSailingSpace> =>
  fetchTerminals<TerminalSailingSpace>(`/terminalsailingspace/${terminalId}`);

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
 * @returns Promise resolving to an array of TerminalBulletin objects containing bulletin information
 */
export const getTerminalBulletins = (): Promise<TerminalBulletin[]> =>
  fetchTerminals<TerminalBulletin[]>("/terminalbulletins");

/**
 * API function for fetching terminal bulletins for a specific terminal from WSF Terminals API
 *
 * Retrieves bulletin information for a specific terminal identified by terminal ID,
 * including announcements, notices, and important updates. This endpoint returns a single terminal object
 * with a Bulletins array, not an array of bulletins.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns Promise resolving to a TerminalBulletin object containing bulletin information for the specified terminal
 */
export const getTerminalBulletinsByTerminalId = (
  terminalId: number
): Promise<TerminalBulletin> =>
  fetchTerminals<TerminalBulletin>(`/terminalbulletins/${terminalId}`);

// ============================================================================
// TERMINAL TRANSPORTS API FUNCTIONS
// ============================================================================

/**
 * API function for fetching terminal transports from WSF Terminals API
 *
 * Retrieves transportation information for all terminals including transit options,
 * shuttle services, and transportation connections. This endpoint provides
 * comprehensive transportation information for all WSF terminals.
 *
 * @returns Promise resolving to an array of TerminalTransport objects containing transportation information
 */
export const getTerminalTransports = (): Promise<TerminalTransport[]> =>
  fetchTerminals<TerminalTransport[]>("/terminaltransports");

/**
 * API function for fetching terminal transports for a specific terminal from WSF Terminals API
 *
 * Retrieves transportation information for a specific terminal identified by terminal ID,
 * including transit options, shuttle services, and transportation connections. This endpoint returns a single terminal object
 * with a TransitLinks array, not an array of transports.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns Promise resolving to a TerminalTransport object containing transportation information for the specified terminal
 */
export const getTerminalTransportsByTerminalId = (
  terminalId: number
): Promise<TerminalTransport> =>
  fetchTerminals<TerminalTransport>(`/terminaltransports/${terminalId}`);

// ============================================================================
// TERMINAL WAIT TIMES API FUNCTIONS
// ============================================================================

/**
 * API function for fetching terminal wait times from WSF Terminals API
 *
 * Retrieves current wait time information for all terminals including
 * estimated wait times, queue lengths, and congestion data. This endpoint
 * provides real-time information about terminal congestion and wait times
 * for all WSF terminals.
 *
 * @returns Promise resolving to an array of TerminalWaitTimes objects containing wait time information
 */
export const getTerminalWaitTimes = (): Promise<TerminalWaitTimes[]> =>
  fetchTerminals<TerminalWaitTimes[]>("/terminalwaittimes");

/**
 * API function for fetching terminal wait times by terminal from WSF Terminals API
 *
 * Retrieves current wait time information for a specific terminal identified
 * by terminal ID, including estimated wait times, queue lengths, and congestion
 * data. This endpoint filters the resultset to a single terminal, providing
 * real-time information about terminal congestion and wait times for that
 * specific terminal.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns Promise resolving to a TerminalWaitTimes object containing wait time information for the specified terminal
 */
export const getTerminalWaitTimesByTerminalId = (
  terminalId: number
): Promise<TerminalWaitTimes> =>
  fetchTerminals<TerminalWaitTimes>(`/terminalwaittimes/${terminalId}`);

// ============================================================================
// TERMINAL VERBOSE API FUNCTIONS
// ============================================================================

/**
 * API function for fetching terminal verbose data from WSF Terminals API
 *
 * Retrieves comprehensive terminal information including location, facilities,
 * parking information, and operational status. This endpoint provides detailed
 * information about all terminals in the WSF system, including terminal
 * coordinates, available facilities, parking capacity, and current operational status.
 *
 * This data is updated infrequently and provides static terminal characteristics
 * that don't change often, such as terminal specifications and facilities.
 *
 * @returns Promise resolving to an array of TerminalVerbose objects containing comprehensive terminal information
 */
export const getTerminalVerbose = (): Promise<TerminalVerbose[]> =>
  fetchTerminals<TerminalVerbose[]>("/terminalverbose");

/**
 * API function for fetching terminal verbose data for a specific terminal from WSF Terminals API
 *
 * Retrieves comprehensive terminal information for a specific terminal identified by terminal ID,
 * including location, facilities, parking information, and operational status. This endpoint
 * returns detailed information about terminal coordinates, available facilities, parking capacity,
 * and current operational status.
 *
 * This data is updated infrequently and provides static terminal characteristics
 * that don't change often, such as terminal specifications and facilities.
 *
 * @param terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns Promise resolving to a TerminalVerbose object containing comprehensive information for the specified terminal
 */
export const getTerminalVerboseByTerminalId = (
  terminalId: number
): Promise<TerminalVerbose> =>
  fetchTerminals<TerminalVerbose>(`/terminalverbose/${terminalId}`);

// ============================================================================
// CACHE FLUSH DATE API FUNCTIONS
// ============================================================================

/**
 * API function for fetching cache flush date from WSF Terminals API
 *
 * Returns the date when the terminal data cache was last flushed,
 * indicating when the data was last updated.
 *
 * @returns Promise resolving to TerminalsCacheFlushDate object or null
 */
export const getCacheFlushDateTerminals = (): Promise<Date | null> =>
  fetchTerminals<Date>("/cacheflushdate");
