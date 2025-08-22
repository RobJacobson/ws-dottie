import { z } from "zod";

import { zodFetch } from "@/shared/fetching";

// ============================================================================
// FETCH FUNCTION
// ============================================================================

const ENDPOINT = "/ferries/api/terminals/rest/terminaltransports/{terminalId}";

/**
 * API function for fetching terminal transports for a specific terminal from WSF Terminals API
 *
 * Retrieves transportation information for a specific terminal identified by terminal ID,
 * including parking, shuttle services, and transit connections. This endpoint provides
 * comprehensive information about how to access the specified terminal.
 *
 * @param params - Object containing terminalId
 * @param params.terminalId - The unique identifier for the terminal (e.g., 7 for Anacortes, 8 for Friday Harbor)
 * @returns Promise resolving to a TerminalTransport object containing transportation information for the specified terminal
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const transport = await getTerminalTransportsByTerminalId({ terminalId: 7 });
 * console.log(transport.TerminalName); // "Anacortes"
 * ```
 */
export const getTerminalTransportsByTerminalId = async (
  params: GetTerminalTransportsByTerminalIdParams
): Promise<TerminalTransport> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalTransportsByTerminalIdParamsSchema,
      output: terminalTransportSchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTerminalTransportsByTerminalIdParamsSchema = z
  .object({
    terminalId: z
      .number()
      .int()
      .describe(
        "Unique identifier for the terminal. This ID is used to identify specific terminals across the WSF system."
      ),
  })
  .describe(
    "Parameters for retrieving transportation information for a specific terminal by ID."
  );

export type GetTerminalTransportsByTerminalIdParams = z.infer<
  typeof getTerminalTransportsByTerminalIdParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const terminalTransitLinkSchema = z
  .object({
    LinkName: z.string().describe("Name of the transit service"),
    LinkURL: z.string().describe("URL for the transit service"),
    SortSeq: z
      .number()
      .nullable()
      .describe("Sorting sequence for display order"),
  })
  .describe("Transit service link information");

export const terminalTransportSchema = z
  .object({
    TerminalID: z.number().describe("Unique identifier for the terminal"),
    TerminalSubjectID: z
      .number()
      .describe("Subject identifier for the terminal"),
    RegionID: z
      .number()
      .describe("Region identifier where the terminal is located"),
    TerminalName: z.string().describe("Full name of the terminal"),
    TerminalAbbrev: z
      .string()
      .describe("Abbreviated name/code for the terminal"),
    SortSeq: z.number().describe("Sorting sequence for display order"),
    ParkingInfo: z
      .string()
      .nullable()
      .describe("Information about parking at the terminal"),
    ParkingShuttleInfo: z
      .string()
      .nullable()
      .describe("Information about parking shuttle services"),
    AirportInfo: z
      .string()
      .nullable()
      .describe("Information about nearby airports"),
    AirportShuttleInfo: z
      .string()
      .nullable()
      .describe("Information about airport shuttle services"),
    MotorcycleInfo: z
      .string()
      .nullable()
      .describe("Information specific to motorcycle travelers"),
    TruckInfo: z
      .string()
      .nullable()
      .describe("Information specific to truck travelers"),
    BikeInfo: z
      .string()
      .nullable()
      .describe("Information specific to bicycle travelers"),
    TrainInfo: z
      .string()
      .nullable()
      .describe("Information about nearby train services"),
    TaxiInfo: z.string().nullable().describe("Information about taxi services"),
    HovInfo: z
      .string()
      .nullable()
      .describe("Information about high-occupancy vehicle lanes"),
    TransitLinks: z
      .array(terminalTransitLinkSchema)
      .describe("Links to transit services"),
  })
  .describe("Transportation information for a single terminal");

export type TerminalTransport = z.infer<typeof terminalTransportSchema>;
export type TerminalTransitLink = z.infer<typeof terminalTransitLinkSchema>;
