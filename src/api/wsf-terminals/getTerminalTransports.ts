import { z } from "zod";

import { zodFetch } from "@/shared/fetching";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminaltransports";

/**
 * API function for fetching terminal transports from WSF Terminals API
 *
 * Retrieves transportation information for all terminals including parking,
 * shuttle services, and transit connections. This endpoint provides comprehensive
 * information about how to access each terminal.
 *
 * @param params - No parameters required (empty object for consistency)
 * @returns Promise resolving to an array of TerminalTransport objects containing transportation information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const transports = await getTerminalTransports({});
 * console.log(transports[0].TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalTransports = async (
  params: GetTerminalTransportsParams = {}
): Promise<TerminalTransport[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalTransportsParamsSchema,
      output: terminalTransportArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTerminalTransportsParamsSchema = z
  .object({})
  .describe("No parameters required for getting all terminal transports.");

export type GetTerminalTransportsParams = z.infer<
  typeof getTerminalTransportsParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const terminalTransitLinkSchema = z
  .object({
    LinkName: z
      .string()
      .describe(
        "Name of the transit link. Provides a descriptive title for the transportation option."
      ),
    LinkURL: z
      .string()
      .describe(
        "URL for the transit link. Provides direct access to information about the transportation option."
      ),
    SortSeq: z
      .number()
      .int()
      .nullable()
      .describe(
        "Sort sequence for the transit link. Used to determine the display order of multiple transit options."
      ),
  })
  .describe(
    "Transit link information providing access to transportation options. Contains links to bus, train, and other transit services."
  );

export const terminalTransportSchema = z
  .object({
    TerminalID: z
      .number()
      .int()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
    TerminalSubjectID: z
      .number()
      .int()
      .describe(
        "Subject identifier for the terminal. Used for grouping related terminal information and maintaining data relationships."
      ),
    RegionID: z
      .number()
      .int()
      .describe(
        "Identifier for the geographic region where the terminal is located. Used for organizing terminals by area."
      ),
    TerminalName: z
      .string()
      .describe(
        "Full name of the terminal. Provides the complete, human-readable name for the ferry terminal."
      ),
    TerminalAbbrev: z
      .string()
      .describe(
        "Abbreviated name for the terminal. Used for display in space-constrained interfaces and quick identification."
      ),
    SortSeq: z
      .number()
      .int()
      .describe(
        "Sort sequence number for the terminal. Used to determine the display order of terminals in lists and menus."
      ),
    ParkingInfo: z
      .string()
      .describe(
        "Information about parking facilities at the terminal. Contains details about parking availability, rates, and restrictions."
      ),
    ParkingShuttleInfo: z
      .string()
      .nullable()
      .describe(
        "Information about parking shuttle services. Contains details about shuttle schedules and routes to parking areas."
      ),
    AirportInfo: z
      .string()
      .nullable()
      .describe(
        "Information about airport connections. Contains details about airport shuttle services and transportation options."
      ),
    AirportShuttleInfo: z
      .string()
      .nullable()
      .describe(
        "Information about airport shuttle services. Contains details about shuttle schedules and routes to airports."
      ),
    MotorcycleInfo: z
      .string()
      .describe(
        "Information about motorcycle access and parking. Contains details about motorcycle-specific facilities and policies."
      ),
    TruckInfo: z
      .string()
      .describe(
        "Information about truck access and parking. Contains details about truck-specific facilities and policies."
      ),
    BikeInfo: z
      .string()
      .nullable()
      .describe(
        "Information about bicycle access and parking. Contains details about bike racks and bicycle-friendly facilities."
      ),
    TrainInfo: z
      .string()
      .nullable()
      .describe(
        "Information about train connections. Contains details about nearby train stations and rail services."
      ),
    TaxiInfo: z
      .string()
      .nullable()
      .describe(
        "Information about taxi services. Contains details about taxi availability and pickup locations."
      ),
    HovInfo: z
      .string()
      .nullable()
      .describe(
        "Information about High Occupancy Vehicle (HOV) access. Contains details about HOV lanes and carpooling options."
      ),
    TransitLinks: z
      .array(terminalTransitLinkSchema)
      .describe(
        "Array of transit links providing access to various transportation options. Contains links to bus, train, and other transit services."
      ),
  })
  .describe(
    "Complete transportation information for a terminal including parking, shuttle services, and transit connections. Used for planning access to terminals."
  );

export const terminalTransportArraySchema = z
  .array(terminalTransportSchema)
  .describe(
    "Array of terminal transportation information. Contains complete transportation options and access details for multiple terminals."
  );

export type TerminalTransport = z.infer<typeof terminalTransportSchema>;
export type TerminalTransitLink = z.infer<typeof terminalTransitLinkSchema>;
